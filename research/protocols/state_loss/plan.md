# Q1 plan (draft for review)

**Date:** 13 Nov 2026  
**Status:** DRAFT — awaiting Adya's sign-off (8 checkbox decisions in the external plan doc). No code until signed off.  
**External plan doc:** [Claude artifact](https://claude.ai/artifact/4QCEGk2Qux7akPpFAmmXAS)  
**Specs:** this folder (`research/protocols/state_loss/`). Delivered as `q1_specs.zip`; extracted here and tracked in git.

## First question

When a model tracking changing values answers wrong, which competing value wins (**stale**, **neighbour**, **prior**), and does the cause differ when the current value is written (**read mode**) vs must be computed (**computed mode**)?

## Why this cut (prior-art check, 13 Nov)

- Read-mode stale interference is crowded in 2026: PI-LLM (2506.08184, MIT data), Guo et al. "When Context Changes" (2609.38866: probes 82–85% decodable, adaptive attention routing 81–95% on 3–9B, data "after review"), Chen & Yeh (zenodo 23153676), Qiao et al. (2603.12271).
- Guo has a slot-replay log condition but no arithmetic computed condition, no prior competitor, no thinking/cost baseline; its fix needs current-value tokens, which computed mode lacks.
- Ortu et al. 2024 competition of mechanisms covers fact vs counterfactual only.

## Claims

| ID | Claim |
|---|---|
| C1 | Errors land on a designed competitor with dose-response |
| C2 | Read vs computed decodable shares differ by ≥ 15 pts |
| C3 | Different components (and E4 shared-vs-separate flip matrix = RQ1) |
| C4 | The matched fix beats the best generic fix per cost (= RQ3) |

Pass marks: `prereg.md`.

## Models

| Role | Models |
|---|---|
| Main | Qwen3.5-27B (64 layers, 48 GatedDeltaNet linear-attention + 16 full attention; Qwen-Scope 27B SAEs) |
| Replication | Gemma 3 27B-it (Gemma Scope 2, CC BY 4.0) |
| Code / pilot | Qwen3.5-2B / 9B |
| E1 only | Frontier + GLM / Kimi / DeepSeek |

## Experiments

| Exp | What |
|---|---|
| E0 | Instrument (UpdateLedger generator) |
| E1 | Behaviour |
| E2 | Readout |
| E3 | Localise |
| E4 | Shared vs separate |
| E5 | Seven fixes, including Guo's attention redirection as baseline |

Order and gates: `README.md` in this folder. Detail files: `E0_instrument.md` … `E5_fix.md`, `benchmarks.md`.

## Open (awaiting sign-off)

- Eight checkbox decisions at the end of the external plan doc.
- **comp-mech** licence unverified — check before use; drop if unclear (`benchmarks.md`).
- Kim & Schuster boxes: no licence (design reference only; do not use their data).

## Relation to the wider programme

Q1 is the first focused cut of the v3 pipeline on **state loss** (R1): measure → localise → fix → verify. Looping remains a later demo candidate. Canonical programme design stays in `research/docs/research_design.md`.
