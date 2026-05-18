---
title: "GPAI Pack — README"
category: "gpai"
applies_to: ["GPAI"]
eu_ai_act_article: "Article 51–56, Annex XII"
status: "current"
last_reviewed: "2026-05"
version: "1.0"
---

# 🤖 GPAI Model Pack — EU AI Act Toolkit

**For providers of General-Purpose AI (GPAI) models under the EU AI Act.**

> **Enforcement deadline:** August 2, 2025. GPAI obligations apply **earlier** than most High-Risk system rules.

## Who this pack is for

This pack is for organisations that **develop, fine-tune, or release** a General-Purpose AI model — including:
- Foundation model providers (LLMs, image models, multimodal models)
- Organisations that fine-tune open or closed models and release them
- Companies offering GPAI via API as a product

If you only **deploy** GPAI (e.g. using OpenAI API in your product), see the [Vendor Pack](../vendor-pack/) instead.

## What's in this pack

| File | Purpose | Recommended owner |
|---|---|---|
| [gpai-model-inventory.md](gpai-model-inventory.md) | Register of GPAI models you provide | AI/ML Lead, Legal |
| [technical-documentation-template.md](technical-documentation-template.md) | Annex XI/XII-compliant model documentation | AI/ML Lead |
| [copyright-policy-template.md](copyright-policy-template.md) | Summary of training data copyright policy | Legal, Compliance |
| [systemic-risk-assessment.md](systemic-risk-assessment.md) | Self-assessment for systemic risk designation | Legal, AI Safety |
| [transparency-disclosure-template.md](transparency-disclosure-template.md) | Downstream deployer disclosure notice | Legal |

## Key obligations (Articles 51–56)

| Obligation | Article | Applies to |
|---|---|---|
| Technical documentation | Art. 53(1)(a), Annex XI | All GPAI providers |
| Copyright training data summary | Art. 53(1)(c) | All GPAI providers |
| Machine-readable model card | Art. 53(1)(b) | All GPAI providers |
| Adversarial testing / red-teaming | Art. 55(1)(a) | Systemic risk models only |
| Incident reporting to AI Office | Art. 55(1)(c) | Systemic risk models only |
| Cybersecurity measures | Art. 55(1)(d) | Systemic risk models only |

## Systemic risk threshold

A GPAI model is classified as **systemic risk** if trained using compute exceeding **10²⁵ FLOPs** (Article 51(1)). The European Commission may designate additional models.

---

*Not legal advice. Consult qualified counsel for compliance decisions.*
