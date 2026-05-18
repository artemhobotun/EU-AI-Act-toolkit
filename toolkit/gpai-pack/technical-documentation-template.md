---
title: "GPAI Technical Documentation Template"
category: "gpai"
applies_to: ["GPAI"]
eu_ai_act_article: "Article 53(1)(a), Annex XI, Annex XII"
status: "current"
last_reviewed: "2026-05"
version: "1.0"
---

# GPAI Technical Documentation Template

**Required under:** Article 53(1)(a), Annex XI (provider documentation) and Annex XII (model card for downstream deployers)

---

## Part A — Provider Technical Documentation (Annex XI)

### 1. General Description

| Field | Value |
|---|---|
| Model name and version | |
| Model type | LLM / Vision / Multimodal / Other |
| Release date | |
| Provider name | |
| Contact for documentation | |
| Model card URL (public) | |

### 2. Architecture and Training

- **Architecture:** (e.g. Transformer, decoder-only, 7B parameters)
- **Training paradigm:** (e.g. pre-training on next-token prediction, RLHF fine-tuning)
- **Training hardware:** (e.g. 512× NVIDIA H100, training cluster location)
- **Training duration:** (e.g. 4 weeks)
- **Estimated compute (FLOPs):** (Systemic risk threshold: 10²⁵)
- **Systemic risk classification:** [ ] Yes  [ ] No  [ ] Pending

### 3. Training Data

- **Data sources:** (List major corpora, datasets)
- **Data cutoff date:** 
- **Approximate size:** (tokens or GB)
- **Languages represented:**
- **Data filtering approach:** (e.g. quality filters, deduplication, safety filtering)
- **Copyright and IP summary:** (see [copyright-policy-template.md](copyright-policy-template.md))
- **Personal data handling:** (confirmation that GDPR/data minimisation principles were applied)

### 4. Intended Use

- **Primary intended tasks:** (text generation, code completion, Q&A, summarisation, …)
- **Target deployers:** (enterprise, developers, researchers, end consumers)
- **Foreseeable downstream uses:**
- **Explicitly out-of-scope uses:**

### 5. Known Limitations

- **Benchmark performance:** (Key evals — MMLU, HumanEval, etc.)
- **Known failure modes:**
- **Hallucination characteristics:**
- **Bias and fairness notes:**
- **Languages where performance degrades:**

### 6. Safety and Red-Teaming *(Systemic risk models only — Article 55)*

- **Red-teaming scope:**
- **Testing methodology:**
- **Key findings:**
- **Mitigations applied:**
- **Residual risks:**

### 7. Cybersecurity *(Systemic risk models only — Article 55(1)(d))*

- **Model weights access controls:**
- **API security measures:**
- **Incident response plan reference:**

---

## Part B — Model Card for Downstream Deployers (Annex XII)

> This section is intended to be shared publicly or with downstream deployers via API documentation, Hugging Face model card, etc.

| Field | Details |
|---|---|
| **Model name** | |
| **Model version** | |
| **Provider** | |
| **Model type** | |
| **Intended use** | |
| **Out-of-scope use** | |
| **Training data summary** | |
| **Evaluation results** | |
| **Known limitations** | |
| **Bias and fairness** | |
| **Copyright policy** | See: [link] |
| **Contact / support** | |
| **License** | |
| **Last updated** | |

---

*Not legal advice. Consult qualified counsel for compliance decisions.*
