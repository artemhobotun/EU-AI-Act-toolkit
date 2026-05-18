---
title: "GPAI Downstream Deployer Transparency Disclosure"
category: "gpai"
applies_to: ["GPAI"]
eu_ai_act_article: "Article 53(1)(b), Article 13, Article 50"
status: "current"
last_reviewed: "2026-05"
version: "1.0"
---

# GPAI Downstream Deployer Transparency Disclosure Template

**Purpose:** As a GPAI provider, you must give downstream deployers the information they need to comply with their own EU AI Act obligations (Article 53(1)(b)).

Use this template in your API documentation, developer portal, or as a downloadable disclosure notice.

---

## 1. Model Identity

| Field | Value |
|---|---|
| Model name | |
| Version | |
| Provider | |
| Provider contact | |
| Date of this disclosure | |

---

## 2. What Downstream Deployers Must Know

### 2.1 Intended Use
This model is designed for:
- [e.g. text generation, summarisation, coding assistance, Q&A, …]

### 2.2 Prohibited Uses
Deployers must not use this model for:
- [ ] Biometric identification systems (Article 5)
- [ ] Social scoring systems (Article 5)
- [ ] Real-time remote biometric identification in public spaces (Article 5)
- [ ] Manipulation of persons using subliminal techniques (Article 5)
- [Any additional provider-level restrictions]

### 2.3 High-Risk Use Warning
⚠️ If you intend to deploy this model in a **High-Risk AI system** (Annex III), you must comply with all High-Risk obligations including conformity assessment, registration, and post-market monitoring.

---

## 3. Technical Limitations Affecting Compliance

| Limitation | Description | Deployer Action Required |
|---|---|---|
| Hallucination | Model may generate factually incorrect output | Do not use for high-stakes factual decisions without human review |
| Bias | Model reflects biases in training data | Evaluate bias impact for your use case |
| Language quality | Performance varies by language | Test in target language before deployment |
| Context window | Maximum input: [X] tokens | Implement chunking or summarisation for long documents |

---

## 4. Human Oversight Recommendations

As the deployer, you are responsible for ensuring appropriate human oversight (Article 14). We recommend:
- [ ] Human review of outputs before use in high-stakes decisions
- [ ] Clear user disclosure that content is AI-generated (Article 50)
- [ ] Escalation path for uncertain or high-impact outputs

---

## 5. Deployer Obligations Summary

| Obligation | EU AI Act Article | Deployer's Responsibility |
|---|---|---|
| Disclose AI-generated content to end users | Article 50 | Required |
| Human oversight for high-risk uses | Article 14 | Required if High-Risk |
| Register high-risk system | Article 49 | Required if High-Risk |
| Incident reporting | Article 73 | Required if serious incident occurs |

---

## 6. Contacting the Provider

For compliance questions or to report incidents:
- Email: [compliance@organisation.com]
- Documentation: [link]
- SLA for responses: [e.g. 5 business days]

---

*Not legal advice. Consult qualified counsel for compliance decisions.*
