# Program state

Updated: 2026-11-13 (v3 + Q1 draft)

## Current state

**Q1 draft in `docs/q1/` (state loss: read vs computed). Awaiting Adya sign-off (8 plan checkboxes). No Q1 code until then.**

Pipeline: MEASURE → LOCALIZE → FIX → VERIFY → GENERALIZE. Prediction on the hidden sandbox is a supporting checkpoint. See `docs/q1/plan.md`, `docs/research_design.md`, `docs/root_abilities.md`, `docs/eval_suite.md`, `discussion.md`.

## Confirmed design choices

- Primary evidence comes from fresh generated instances with private test seeds and executable ground truth.
- Public datasets are secondary anchors because exposure is uncertain.
- PostTrainBench evaluates autonomous post-training agents; it is not the main behavioral benchmark.
- Dimension spine: 8 root abilities with 4-level ladders; profile = ladder breaking points (draft mapping).
- Eval suite: families A to E for profiling; hidden family F is a deterministic tool-use sandbox (`data/private/` seeds). Family G (long-horizon memory) proposed, not finalized.
- Maths family uses own templates on GSM8K (MIT); do not derive from GSM-Symbolic (CC-BY-NC-ND).
- Factor model: 2PL baseline, bifactor main; power and null simulations before the main run.
- Repeated runs start at k=5 with pre-registered adaptive expansion.
- Stage 0 frontier check is mandatory before trusting the instrument on current models.
- Stages after measurement gate on RQ1 (reliable contrast), not RQ3 (prediction).
- First demo: Q1 state loss via UpdateLedger (read vs computed; stale / neighbour / prior); looping later.
- Fix-first pilot early; matched / strong / mismatch baselines for targeted fixes.
- Reliability front-end (rewrite, runtime monitor, adaptive compute) is the product direction; demand tagger is open.
- Use three open model families behaviorally and at least one accessible dense checkpoint mechanistically; closed/frontier panel for Stage 0 and behaviour only.
- Analyze independently generated items as the main sampling units; repeated decoding estimates within-item variability.
- Record training recipe, serving stack, and harness; do not attribute cross-model differences to scale alone.
- For subjective outcomes, use a defined rubric and human calibration/audit; reserve deterministic verifiers for objectively checkable answers.

## Open decisions before confirmatory collection

- Q1 sign-off (8 checkbox decisions in plan doc; `docs/q1/plan.md`); comp-mech licence; Kim & Schuster design-only.
- Whether Family G becomes a full profiling family.
- Exact frontier panel strings, count, and API budget.
- Paper split: one long paper vs series of three.
- Demand tagger approach.
- GPU/API budget and what hardware is available.
- Exact GPU model and VRAM for activation capture.
- Whether behavioral panel is hosted open-weight inference or local inference.
- The exact immutable model revisions, licenses, and reasoning modes.
- Pilot-based power simulation and final item counts.
- Which root abilities survive Kendall's W across L1 templates.
- Licences still to verify (listed in `docs/eval_suite.md`).

## Gates

- G0: Stage 0 frontier check (models break on L1 to L3; else extend ladders).
- G1: generator/verifier/transform correctness and frozen run contract.
- G2 (RQ1): behavioural contrast stable above noise. **Gates localize/fix.**
- G3: hidden-family prediction (RQ3): reported checkpoint, not a hard stop.
- G4: exposure indicators validate against randomized known membership.
- G5: localize pass bars (probe +0.05 AUROC; patching 50% from ≤3 layers; steering >95th pct random).
- G6: targeted fix beats matched, strong, and mismatch on reliability per unit cost.
- G7: pipeline transfers to a new open model family with minimal manual intervention.
