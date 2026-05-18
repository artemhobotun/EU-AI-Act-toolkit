---
title: "GPAI Copyright Training Data Policy"
category: "gpai"
applies_to: ["GPAI"]
eu_ai_act_article: "Article 53(1)(c)"
status: "current"
last_reviewed: "2026-05"
version: "1.0"
---

# GPAI Copyright and Training Data Policy Template

**Required under:** Article 53(1)(c) — Providers must publish a sufficiently detailed summary of training data policy regarding copyright.

---

## 1. Purpose

This document describes how **[Organisation Name]** approaches copyright, intellectual property, and data rights in the training of its General-Purpose AI models.

---

## 2. Training Data Sources

| Source Type | Description | Copyright Basis |
|---|---|---|
| Public web crawl | Common Crawl, C4, or equivalent | Public domain / TDM exception |
| Licensed datasets | [Dataset name] | License: [link] |
| Open datasets | Wikipedia, OpenWebText, etc. | CC-BY / public domain |
| Synthetic data | Internally generated | Own IP |
| Code | GitHub public repos | MIT / Apache licensed only |

---

## 3. Copyright Compliance Approach

### Text and Data Mining (TDM) Exception
We rely on the Text and Data Mining exception under **Article 4 of the EU DSM Directive** (2019/790) for content where rights holders have not opted out, and **Article 3** for research purposes.

### Opt-Out Compliance
- [ ] We respect `robots.txt` signals during web crawl collection
- [ ] We maintain and honour a documented opt-out registry
- [ ] Opt-out requests from rights holders are processed within [X] days
- [ ] Opted-out content is removed from future training runs

### Licensed Content
All data obtained under license is documented in our internal data register with:
- License type and scope
- Permitted use confirmation (including AI training)
- Expiry date (if applicable)

---

## 4. Personal Data

- [ ] Training data was filtered to remove or pseudonymise personal data
- [ ] Data minimisation principles (GDPR Article 5) were applied
- [ ] A Data Protection Impact Assessment (DPIA) was completed where required
- [ ] We did not use special category data (GDPR Article 9) without lawful basis

---

## 5. Rights Holder Contact

Rights holders seeking information or wishing to exercise opt-out rights may contact:

- **Email:** [legal@organisation.com]
- **Form:** [link to opt-out form]
- **Response time:** [e.g. within 30 days]

---

## 6. Updates and Review

| Version | Date | Changes | Approved by |
|---|---|---|---|
| 1.0 | 2026-05 | Initial publication | |

---

*Not legal advice. Consult qualified counsel for compliance decisions.*
