# Reasoning reliability: mental model

Canonical operational design: [`docs/research_design.md`](docs/research_design.md). Discussion log (Nov 4 direction): [`discussion.md`](discussion.md). This file is the short overview only.

## What we are building

A scientific method to find, understand, and fix specific ways language models fail at reasoning. Not "which model scores higher" and not "does this prompt help."

> Can we identify how a model is likely to fail before it fails, understand what is happening inside when it fails, and fix it more effectively than generic interventions?

## Pipeline (v3)

1. **Measure:** controlled tests and L1 to L4 ladders; breaking points per root ability.
2. **Localize:** mechanistic interpretability on labelled failures (probes, patching, steering).
3. **Fix:** targeted harness, steering, weight edits, SFT, or RL.
4. **Verify:** beat matched, strong generic, and mismatch controls; measure cost and side effects.
5. **Generalize:** re-run on another open model family with minimal manual work.

**Stage 0 first:** frontier sanity check (current frontier models on L1 to L3). If they do not break, extend ladders before building the instrument.

**Eventually:** a reliability front-end (query rewriting, runtime monitoring, adaptive compute) guided by per-model profiles.

## Evolution

| Version | Focus |
|---|---|
| V1 | Sensitivity to rewording and instruction changes (archived; confounds) |
| V2 | Ability profiles that predict failures beyond general skill |
| V3 | Full diagnose → localize → fix → verify pipeline; mech interp is central |

Prediction work (B3 vs B2 on the hidden sandbox) remains, as a supporting question and Phase 1 checkpoint. Stages after measurement gate on **RQ1** (reliable contrast), not on RQ3.

## Two taxonomies

- **17 failure types:** what goes wrong (from five sweeps). Table in `research-vault/09_Test_Menu_and_Selection.md`.
- **8 root abilities (R1 to R8):** candidate underlying skills with 4-level ladders. Profile = breaking points. Draft mapping and caveats in `docs/root_abilities.md`.

First demo (proposed): **state loss** and **looping** end-to-end, not all 17 or all 8 equally.

## Eval instrument

One set of generators with exact solvers, used for behaviour, hidden prediction, controlled training, labelled interp examples, and RL/SFT. Families A to E + hidden deterministic tool-use sandbox F. Family G (long-horizon memory) is proposed, not finalized. Details: `docs/eval_suite.md`.

## Statistics (short)

- Kendall's W across 3+ templates per ability.
- Baseline 2PL; main bifactor (general + specific per tagged ability).
- Power and null simulations before the main run.
- B1 / B2 (ADeLe-style) / B3 race on the hidden family.
- Start k=5 with adaptive expansion; pass^k at 1, 4, 8.

## Interpretability and fixes (short)

- Probe +0.05 AUROC; patching 50% gap from ≤3 layers; steering beyond 95th percentile of random directions.
- Fix baselines: matched, strong generic, mismatch. Always measure what each fix breaks.

## Product sketch

Profile model once → estimate task demands (demand tagger: open) → risk-based rewrite / monitor / compute. Calibrate on about 20 to 50 real tasks.

## Where to read next

1. `docs/research_design.md`
2. `docs/flowcharts.md` (full Mermaid set)
3. `docs/eval_suite.md`
4. `docs/root_abilities.md`
5. `research-vault/09_Test_Menu_and_Selection.md`
6. `docs/reading_list.md`
7. `docs/decisions.md`
8. `discussion.md`
9. `site/` interactive explainer

## Status

Design stage. Groundwork drafted. Generators, verifiers, QA, runner, and new experiments: not started. Next: Stage 0 frontier check and L1 tests (prioritize first demo failures).
