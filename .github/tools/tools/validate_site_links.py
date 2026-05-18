#!/usr/bin/env python3
"""
Validate local links and file references in the static site.

Scans docs/*.html files for href and src attributes, verifies that referenced
local files exist, and reports missing or broken links. Ignores external https
links and anchors.
"""

import os
import sys
import re
from pathlib import Path


def get_docs_path():
    """Get the path to the docs directory."""
    repo_root = Path(__file__).resolve().parent.parent.parent.parent
    return repo_root / 'docs'


def get_html_files(docs_path):
    """Get list of HTML files in docs directory."""
    return list(docs_path.glob('*.html'))


def get_md_files(docs_path):
    """Get list of MD files in docs directory recursively."""
    return list(docs_path.rglob('*.md'))


def extract_links(html_content):
    """Extract href and src links from HTML content."""
    links = []

    # Find href attributes
    for match in re.finditer(r'href=["\']([^"\']+)["\']', html_content):
        links.append(match.group(1))

    # Find src attributes
    for match in re.finditer(r'src=["\']([^"\']+)["\']', html_content):
        links.append(match.group(1))

    return links


def extract_md_links(md_content):
    """Extract markdown style links [text](url)."""
    links = []
    # Matches [text](url) where url does not have parentheses inside, or simply everything in parens
    for match in re.finditer(r'\[[^\]]*\]\(([^)]+)\)', md_content):
        links.append(match.group(1))
    return links


def is_external_link(url):
    """Check if URL is an external link (https://, http://, etc.)."""
    return url.startswith('http://') or url.startswith('https://') or url.startswith('mailto:')


def is_data_uri(url):
    """Check if URL is a data URI (e.g., data:image/svg+xml,...)."""
    return url.startswith('data:')


def is_template_variable(url):
    """Check if URL contains a template variable (e.g., ${...})."""
    return '${' in url or '}}' in url or '{{' in url


def is_anchor(url):
    """Check if URL is just an anchor reference."""
    return url.startswith('#')


def parse_link_path(url, base_path):
    """
    Parse a relative link and return the target path.

    Handles:
    - Relative paths: ../toolkit/file.md
    - Current dir: assets/style.css
    - Anchors: #section
    """
    if is_anchor(url):
        return None  # Anchor-only links are not file references

    if is_external_link(url):
        return None  # External links, skip

    # Remove anchor if present
    if '#' in url:
        url = url.split('#')[0]

    if not url:  # Empty after removing anchor
        return None

    # Resolve relative path
    target = (base_path.parent / url).resolve()
    return target


def validate_links(docs_path):
    """
    Validate all links in HTML and MD files.

    Returns tuple: (passed, failed_list)
    """
    html_files = get_html_files(docs_path)
    md_files = get_md_files(docs_path)
    failed_links = []

    def validate_file_list(files, is_md=False):
        for file in sorted(files):
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()

            if is_md:
                links = extract_md_links(content)
            else:
                links = extract_links(content)

            for link in links:
                if is_external_link(link) or is_anchor(link) or is_data_uri(link) or is_template_variable(link):
                    continue

                # Block relative links containing "../docs/" because they will result in a 404 on Pages
                if '../docs/' in link:
                    failed_links.append({
                        'file': str(file.relative_to(docs_path.parent)),
                        'link': link,
                        'target': "FORBIDDEN '../docs/' prefix (use relative link without '../docs/' parent context)"
                    })
                    continue

                target = parse_link_path(link, file)
                if target is None:
                    continue

                if not target.exists():
                    failed_links.append({
                        'file': str(file.relative_to(docs_path.parent)),
                        'link': link,
                        'target': str(target)
                    })

    validate_file_list(html_files, is_md=False)
    validate_file_list(md_files, is_md=True)

    passed = (len(html_files) > 0 or len(md_files) > 0) and len(failed_links) == 0
    return passed, failed_links


def main():
    """Run link validation."""
    docs_path = get_docs_path()

    if not docs_path.exists():
        print(f"ERROR: docs directory not found at {docs_path}")
        sys.exit(1)

    print(f"Validating local links in {docs_path}...")
    passed, failed = validate_links(docs_path)

    if failed:
        print(f"\nFAIL: Found {len(failed)} broken or missing links:\n")
        for item in failed:
            print(f"  {item['file']}: {item['link']}")
            print(f"    → target not found: {item['target']}\n")
        sys.exit(1)
    else:
        html_count = len(get_html_files(docs_path))
        md_count = len(get_md_files(docs_path))
        print(f"PASS: All local links valid ({html_count} HTML files and {md_count} MD files checked)")
        sys.exit(0)


if __name__ == '__main__':
    main()
