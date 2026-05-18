# 🚀 EU AI Act Toolkit — v2.0.0 (Enterprise-Grade Upgrade)

Welcome to the **v2.0.0** major release of the **EU AI Act Toolkit**! This release marks a significant milestone, transitioning the project from a static collection of documents into a robust, community-supported, machine-readable, and academically-citable resource.

Here is what's new in this major version:

---

## 📋 What's New & Core Features

### 1. 🔢 Template Versioning System (SemVer)
* **YAML Front-Matter**: All **96 legal templates, checklists, and sector packs** now have high-fidelity YAML metadata containing:
  * `version`: Strict Semantic Versioning (`1.0.0`, `1.1.0`, etc.) to track updates.
  * `last_reviewed`: Clear review timestamps to ensure legal accuracy.
  * `review_interval`: Automatic review schedules (e.g., `12m`).
* **Automated Version Bumper**: Added a safe CLI utility (`node scratch/bump-template-version.js <path> [patch|minor|major]`) to seamlessly increment version numbers and log changes.

### 2. ⚡ Dynamic JSON APIs & Machine-Readability
* Built automated build pipelines that compile markdown metadata into public JSON endpoints for automated integrations:
  * `api/templates.json`: Metadata inventory of all 96 templates.
  * `api/glossary.json`: A comprehensive dictionary of EU AI Act legal definitions.
  * `api/versions.json`: Version snapshot tracking the state of all templates.

### 💬 3. GitHub Discussions & Community Hub
* **GitHub Discussions Enabled**: Active discussions are now the official community portal for Q&A, general feedback, and suggestions.
* **Streamlined Issue Templates**: Reorganized `.github/ISSUE_TEMPLATE` to disable blank issues and guide users directly to either structured template requests, bug reports, or Q&A discussions.

### 🎓 4. Academic Citation & Zenodo Integration
* **`CITATION.cff` Specification**: Added an industry-standard citation file containing comprehensive metadata (abstract, ORCID identifiers, precise legal keywords, URLs).
* **Zenodo Ready**: Ready for direct Zenodo integration to secure a persistent **DOI (Digital Object Identifier)** for academic citations.

### 🛡️ 5. Clean Repository Architecture & CI/CD
* **Spotless Project Root**: Reorganized all configuration files (markdownlint, link checker, release-please) into hidden `.github/` and `.github/linters/` folders.
* **Permissive CI Linter**: Optimized `.github/workflows/build-and-check.yml` to prevent spacing and styling differences from blocking open source contributions.
* **Auto-generated Search Index**: Built automated link-auditing and index generation scripts running on every pull request.

---

## 💖 Community & Contributing

We welcome community feedback! Jump into the [GitHub Discussions](https://github.com/artemhobotun/EU-AI-Act-Toolkit/discussions) to ask questions, share feedback, or propose templates. Let's make EU AI Act compliance open and accessible to all organisations!
