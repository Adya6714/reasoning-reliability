# Roadmap

About five months, each phase gated. Detail in `docs/research_design.md`.

| Phase | Weeks | What | Gate |
|---|---|---|---|
| 0 Rebuild instrument | 1 to 3 | Generators, code-applied rewrites, verifiers, QA tests, runner, noise floor | QA suite passes; noise floor measured; models in the 30 to 80% band |
| 1 Behaviour and prediction | 4 to 7 | Screening and fix-first pilots; main run; three-baseline test on the hidden family | Primary contrasts replicate on a held-out twin set |
| 2 Causes | 8 to 10 | Controlled exposure on OLMo 3 7B plus one replication family; OLMo training stages | Exposure detection AUC at least .75 |
| 3 Mechanism | 11 to 16 | Probe ladder: probes, patching, lens comparison, steering with controls | Same-manipulation internal predictor plus controlled causal effect |
| 4 Build | 17 to 22 | Harness, rewrite-diverse SFT or RLVR, JEPA, invariance-checked answering harness, open eval harness | Targeted fix beats generic fix on private held-out items at matched compute |

## Gating rule

- Phases 2, 3 and 4 depend on **RQ1** (a reliable behavioural contrast exists), not on **RQ3** (prediction beats baselines).
- If RQ3 fails: diagnose (measurement, transfer, or real null), report the pre-registered result, and choose a pivot (reliability engineering, eval suite as product).

## Outputs

- Paper 1: eval suite + predictive finding (Phases 0 and 1).
- Paper 2: cause + mechanism (Phases 2 and 3).
- Paper 3: fixes and systems (Phase 4).

Realistic target: Paper 1 done well and Phase 2 started inside five months.

Do not advance a phase because a result is exciting. Each gate requires the preceding construct to be measurable and reproducible.
