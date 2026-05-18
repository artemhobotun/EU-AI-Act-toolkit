---
title: "GPAI Systemic Risk Self-Assessment"
category: "gpai"
applies_to: ["GPAI"]
eu_ai_act_article: "Article 51, 55"
status: "current"
last_reviewed: "2026-05"
version: "1.0"
---

# GPAI Systemic Risk Self-Assessment

**Required under:** Article 51 — providers must assess whether their GPAI model meets systemic risk thresholds triggering Article 55 obligations.

> **Systemic risk threshold:** Training compute exceeding **10²⁵ FLOPs** (Article 51(1)(a)), or Commission designation (Article 51(1)(b)).

---

## Part 1 — Compute Threshold Assessment

| Question | Response |
|---|---|
| Model name and version | |
| Total pre-training compute (FLOPs) | |
| Compute estimation method | (e.g. measured, calculated from GPU hours) |
| Compute exceeds 10²⁵ FLOPs? | [ ] Yes → Systemic risk applies  [ ] No → Systemic risk does not apply |
| Fine-tuning compute included? | [ ] Yes  [ ] No  [ ] N/A |
| Third-party compute audit completed? | [ ] Yes  [ ] No |

---

## Part 2 — Commission Designation Check

- [ ] We have reviewed the European AI Office's public list of designated systemic-risk models
- [ ] Our model **is / is not** on the current designation list
- Date of last check: ___________
- Source URL: https://digital-strategy.ec.europa.eu/en/policies/european-ai-office

---

## Part 3 — Systemic Risk Obligations (if applicable)

If systemic risk is confirmed, complete the following:

### Article 55(1)(a) — Adversarial Testing

- [ ] Red-teaming plan documented
- [ ] External red-team engaged (recommended)
- [ ] Testing scope covers: CBRN risks, large-scale manipulation, cybersecurity threats
- [ ] Results documented and shared with AI Office upon request
- Completion date: ___________

### Article 55(1)(b) — Serious Incident Reporting

- [ ] Incident response procedure established
- [ ] Serious incident definition documented (Article 3(49))
- [ ] Reporting channel to AI Office identified
- [ ] Internal escalation path defined

### Article 55(1)(c) — Cybersecurity

- [ ] Cybersecurity assessment completed
- [ ] Model weight access controls in place
- [ ] Insider threat mitigations documented
- [ ] Penetration testing completed

### Article 55(1)(d) — Energy Efficiency

- [ ] Energy consumption per inference documented
- [ ] Training energy consumption documented
- [ ] Efficiency improvements under consideration

---

## Part 4 — Assessment Outcome

| Field | Value |
|---|---|
| Assessment date | |
| Conducted by | |
| Outcome | [ ] Systemic risk  [ ] Not systemic risk  [ ] Borderline — legal review required |
| Review date | |
| Approved by | |

---

*Not legal advice. Consult qualified counsel for compliance decisions.*
