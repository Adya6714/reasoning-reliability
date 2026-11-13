---
title: Program state
aliases: [Program state]
tags: [research, status]
---

# Program state

Updated: 2026-11-13 (programme architecture + Q1 draft + repo restructure)

## Current state

**Programme architecture** is canonical at [[../docs/programme_architecture]]. **Q1** (state loss: read vs computed) specs live in `research/protocols/state_loss/`. Lit agent installed; first seed notes in progress. **Awaiting Adya sign-off** on Q1 (8 plan checkboxes). No Q1 experiment code until then.

Tracks:

| Name | Repo | State |
|---|---|---|
| RvC v1.1 | retrieval-vs-computation | Stage 0 done; PR #1 open |
| RR-Failures (Q1) | this repo | Specs + architecture committed; sign-off open |
| RR-Layer | later | Only after Q1 E5 |

Pipeline: MEASURE → LOCALIZE → FIX → VERIFY → GENERALIZE → (RR-Layer). See [[../docs/programme_architecture]], [[../docs/research_design]], [[../protocols/state_loss/plan]].

## Confirmed design choices

- Formulation B: diagnosis-conditioned transformation (not generic rewriting).
- Primary failure first: computed-state loss (scored 12/12); premature "done" second.
- Causes on Qwen3.5-27B and Gemma 3 27B; GLM-5.3 transfer test only; Kimi behaviour-only.
- No LLM writes gold or scores answers. Four data pools (behavioural, mechanistic, intervention train, held-out).
- Repo layout: `research/`, `src/rr/`, `failures/<name>/{measurement,mechanistic_interpretability,interventions,output}`.
- Lit notes use `PAPER.md` (RQ1–RQ5, Q1-C1–C4, H1–H4).
- Stages after measurement gate on reliable contrast, not on prediction win.
- Fix-first pilot early; matched / strong / mismatch baselines for targeted fixes.

## Open decisions before confirmatory collection

- Q1 sign-off (8 checkbox decisions in plan doc).
- Adya reads Guo et al. lit note (THREAT check) before E0.
- comp-mech licence; Kim & Schuster design-only.
- Whether Family G becomes a full profiling family.
- Exact frontier panel strings, count, and API budget.
- Paper split: one long paper vs series.
- Demand tagger approach.
- GPU/API budget; JarvisLabs access for E2.

## Gates

- G0: Stage 0 frontier check (models break on L1 to L3; else extend ladders).
- G1: generator/verifier/transform correctness and frozen run contract.
- G2 (RQ1 / Q1 shared-cause): behavioural contrast stable above noise. **Gates localize/fix.**
- G3: hidden-family prediction: reported checkpoint, not a hard stop.
- G4: localize pass bars (probe +0.05 AUROC; patching 50% from ≤3 layers; steering >95th pct random).
- G5: targeted fix beats matched, strong, and mismatch on reliability per unit cost.
- G6: pipeline transfers to a new open model family with minimal manual intervention.
- G7 (layer): input-only cause classifier AUROC ≥ 0.7 (H3); only after two failures succeed through G5.
