# Template Changelog

Tracks version changes to individual toolkit templates. Updated automatically by `scratch/bump-template-version.js`.

## How to bump a template version

```bash
# Patch — small correction, typo fix, link update
node scratch/bump-template-version.js toolkit/templates/ai-use-policy-template.md patch --reason "Fixed Article 13 reference"

# Minor — new section, expanded content
node scratch/bump-template-version.js toolkit/gpai-pack/systemic-risk-assessment.md minor --reason "Added Art. 55 cybersecurity checklist"

# Major — structural rewrite or legal change
node scratch/bump-template-version.js toolkit/starter-pack/printable/30-minute-readiness-self-assessment.md major --reason "Updated for 2026 enforcement dates"
```

## Version history

| Date | Template | Change | Reason |
|---|---|---|---|
| 2026-05 | All templates | Initial v1.0 front-matter added | Baseline versioning system launch |
