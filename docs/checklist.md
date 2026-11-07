# Checklist

v3 direction (2026-11-04). Full detail in `docs/research_design.md`. Eval suite: `docs/eval_suite.md`. Root abilities: `docs/root_abilities.md`.

## Block A: house in order (week 1)
- [x] A1 Compute: JarvisLabs
- [x] A2 Make the repo one plan (design doc, configs, docs)
- [ ] A3 Runner: moved to Block C (requirements in `docs/runner_requirements.md`)
- [ ] A4 Close out v1: "under revision" note, erratum, archive old repo
- [x] A5 Obsidian simple vault
- [ ] A6 Stage 0 frontier check: L1 to L3 on Opus, Fable, Astra, GLM (and peers)

## Pain points (done 2026-10-29)
- [x] Sweeps: X, LessWrong, GitHub/HN/Reddit, published taxonomies, arXiv gap fill
- [x] Master pain-point table (`research-vault/09_Test_Menu_and_Selection.md`)
- [x] Decide new dimensions: goal completion and constraint adherence added; coordination out of scope
- [x] Collapse 17 types into 8 root abilities with ladders (`docs/root_abilities.md`)
- [x] Choose eval suite families + hidden sandbox (`docs/eval_suite.md`)
- [x] Adopt v3 pipeline: measure → localize → fix → verify → generalize (`docs/research_design.md`)
- [x] Clean Mermaid flowcharts in `docs/flowcharts.md` + site Flowcharts panel
- [ ] Community form (on hold until the research outlook is shared)

## Open now (v3 design)
- [ ] Decide which 1 to 2 failure types first (proposed: state loss and looping)
- [ ] Decide whether Family G (long-horizon memory) becomes a full profiling family
- [ ] Run Stage 0 frontier check
- [ ] Build L1 tests for all 8 abilities (priority on first-demo abilities)
- [ ] Run L1 tests on the pilot roster
- [ ] Run power and null simulations (model counts 6, 8, 12, 20, 30; zero-specific and format/template nulls)
- [ ] Freeze and pre-register
- [ ] Verify listed licences (PlanBench, tau2/tau3, Lost in Conversation, Math-Perturb, Simmer, DyVal, GSM-Infinite, NPHardEval)
- [ ] Check OLMo 3 training data for Reasoning Gym, CRUXEval and GSM8K-derived data
- [ ] Sketch demand-tagger approach (open product component)
- [ ] v1 site: "under revision" note, erratum, archive old repo

## Block B: what to measure (weeks 1 to 2)
- [x] B1 Root ability spine (8 abilities, ladders); draft mapping to 17 failure types
- [ ] B2 Score the 15 tests on the six questions; pick top 5 to 6 (align with L1 templates and first-demo failures)

## Block C: build the instrument (weeks 2 to 4)
- [x] C1 Choose families (A to E + hidden F; G proposed); see `docs/eval_suite.md`
- [ ] C2 Build items, surfaces, protocol, verify, analysis; port v1 modules with tests
- [ ] C3 QA tests that block bad runs
- [ ] C4 Build the runner to `docs/runner_requirements.md`
- [ ] C5 Measure the noise floor

## Block D: pilots (weeks 4 to 5)
- [ ] D1 Screening pilot (Jev, five confidence signals)
- [ ] D2 Fix-first pilot
- [ ] D3 Decide: continue, narrow, or pivot

## Block E: lock the study (week 6)
- [ ] E1 Choose abilities that survive Kendall's W across templates
- [x] E2 Hidden family chosen: deterministic tool-use sandbox
- [x] E3 Three-baseline prediction test written (B2 includes ADeLe-style profile)
- [ ] E4 Power simulation; final item counts
- [ ] E5 Pre-register in `prereg/`

## Block F: main behavioural run (weeks 7 to 9)
- [ ] F1 Run all models; surprise checklist; replicate on fresh twins
- [ ] F2 Report hidden-family prediction checkpoint (does not gate later stages)

## Block G: causes (weeks 9 to 11)
- [ ] G1 Controlled exposure on OLMo 3 7B; replicate on a second family
- [ ] G2 OLMo training stages

## Block H: localize (weeks 11 to 16)
- [ ] H1 Probe ladder: probes, patching, lens comparison, steering with controls, attribution graph
- [x] H2 Stage 3 pass bars fixed in design

## Block I: fix, verify, generalize (weeks 17 to 22+)
- [ ] I1 Harness, SFT, RL, steering, weight edits; matched / strong / mismatch; cost and side effects
- [ ] I2 Re-run pipeline on a second open model family
- [ ] I3 Front-end sketch: rewrite, runtime monitor, adaptive compute

## In parallel
- [ ] Read closest papers (`docs/research_design.md` Section 14); file in Obsidian
