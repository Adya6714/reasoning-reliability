# Research design

## 1. Question

Two models with the same score can solve problems in different ways. Can we measure those ways per problem, show they predict failures beyond general skill, find their cause, and use that to choose fixes?

**Goals:** understand how models reason (science), make reasoning reliable (engineering), and build tools others use: an eval suite, RL environments, a reliability harness.

## 2. Research questions

| RQ | Question |
|---|---|
| RQ1 Measurement | Can each dimension be measured per problem, above noise, separately from the others? |
| RQ2 Beyond general skill | Do dimensions add information beyond overall ability? |
| RQ3 Prediction (main) | Do they predict specific failures on a task family never used for profiling? |
| RQ4 Origin | Memorized data, or a specific training step? |
| RQ5 Mechanism | Is there a signature inside the model? |
| RQ6 Reliability | Does fixing the weakest dimension beat generic training? |

Order matters: you cannot look inside for a failure until you can label it, and you cannot call a fix targeted until you know its target.

**Assumptions:** answer-preserving rewrites exist and are solver-checkable; repeated samples estimate stable tendencies above a measured noise floor; dimensions are hidden and seen only through behaviour; retrieval and computation form a continuum; known-structure problems (greedy traps) define planning by construction; open models are representative, checked by a closed panel.

## 3. Dimensions

A dimension is a hidden habit seen only through behaviour, like working memory in people. All are provisional. Two are chosen after the screening pilot.

**A dimension stays only if:** (1) theory or prior work supports it, (2) two different tests of it agree, (3) it predicts failures beyond general skill.

**Main risk:** abilities collapsing into one general factor (CogArena 2026).

| Candidate | Plain meaning | Theory | Example test | Fix it points to |
|---|---|---|---|---|
| Structural understanding | Sees the problem, not the wording | Analogical transfer (Gick and Holyoak; Kotovsky, Hayes and Simon) | Answer-preserving and answer-changing edits | Rewrite-diverse training, JEPA |
| Planning | Thinks ahead vs reacts | Polya; Tower of London | Greedy traps, lookahead depth | Planner scaffold, RL on traps |
| State tracking | Keeps track of what changed | Working memory, updating (Miyake) | Many moves, then "what is the state?" | Written state |
| Inhibition | Ignores tempting irrelevant cues | Executive function (Miyake) | Distractors, misleading hints | Distractor training |
| Misplaced retrieval | Reuses a remembered answer where it does not fit | Gershman | Famous problem vs fresh twin with a different answer | Recall monitor, varied training |
| Self-correction | Notices and fixes errors | Metacognition (Flavell, Schoenfeld) | True vs false feedback | Verifier in the loop |
| Uncertainty | Knows when it may be wrong | Metacognition | Confidence signals (Section 10) | "Check this" flag |
| Faithfulness | Shown reasoning drives the answer | Source monitoring | Plant a false step | Side measure only |
| Knowledge (control) | Has prerequisite facts and skills | CHC crystallized knowledge | Prerequisite mini-tests | A control, not a dimension |

Variant design uses Brown and Walter's "What-If-Not": list every attribute of a problem, change it, and split edits into answer-preserving (robustness) and answer-changing (attention).

## 4. Hypotheses

| # | Hypothesis | Refuted if |
|---|---|---|
| H1 | Accuracy-matched models differ on at least one dimension | Differences within noise |
| H2 | Profile predicts failures on a hidden family beyond accuracy | No gain over accuracy plus difficulty |
| H3 | Dimensions are distinct | Cross-dimension correlations as high as within |
| H4 | Surface dependence rises with controlled exposure | No exposure gradient |
| H5 | Reactive models fail greedy traps beyond a lookahead horizon at equal accuracy | No trap gap difference |
| H6 | Planting a false step changes answers in faithful models only | Same effect everywhere |
| H7 | Removing step-by-step working raises surface dependence more for non-reasoning models | No interaction |
| H8 | Each OLMo training stage shifts specific dimensions | No stage-specific change |
| H9 | Targeted fix beats generic training at matched compute | No advantage |
| H10 | Question-only correctness signals work on recall-heavy items but fail on computation-heavy items; mid-reasoning signals close the gap; confidence is inflated on fresh twins of famous items | Equal performance across item types; no twin inflation |

## 5. The main test

Predict failure on held-out families with three baselines:

- **B1:** overall ability
- **B2:** B1 + difficulty + domain + knowledge-skill profile
- **B3:** B2 + process measures

Dimensions matter only if B3 clearly beats B2 on unseen families. Metrics: AUC and log-loss, cross-validated by family. Written down and pre-registered before data.

| Outcome | Action |
|---|---|
| Clear win | Main claim |
| Partial win (some families or failure types) | Narrower claim, report where it works |
| No win | Check measurement reliability, then transfer; report the pre-registered null; pivot to reliability engineering or the eval suite as product |

**Gating:** Stages 2 to 4 depend on RQ1 (a reliable contrast exists), not on RQ3.

## 6. Evidence rules

- A rewrite drop is a symptom, not a diagnosis. Possible causes: contamination, fragile procedure, difficulty change, meaning change, prompt change. Claim a cause only when answer-changing edits, controlled exposure, fresh twins and other probes agree.
- Surprising result (either direction): re-verify gold; hand-audit 30 failures; run the "prompts differ only as intended" check; rerun on fresh twins with a new seed; rerun on a second family; log every step in a result ledger.
- Repeatable runs are not faithful reasoning. Check answers by program.
- Never trust an LLM's written confidence without calibration.

## 7. Stages

The core asset is a set of **generators with exact solvers**. They become the test bank, the hidden family, controlled training data, labelled probing examples, and RL environments.

| Stage | Weeks | What | Output |
|---|---|---|---|
| 0 Instrument | 1 to 3 | Generators, code-applied rewrites, verifiers, QA tests, runner, noise floor | Trusted test bank |
| 1 Behaviour + prediction | 4 to 7 | Screening and fix-first pilots; main run; three-baseline test | Paper 1 |
| 2 Causes | 8 to 10 | Controlled exposure (fine-tune OLMo 3 7B on half the items), replicated on one more open family; OLMo training stages; OLMoTrace and infini-gram | RQ4 |
| 3 Mechanism | 11 to 16 | Probe ladder (below) | Paper 2 |
| 4 Fixes | 17 to 22 | Harness, rewrite-diverse SFT, RL environments, JEPA; targeted vs generic at matched compute; measure what each fix breaks | Paper 3 |

**Stage 3 ladder** (stop if an early step finds nothing):

1. Linear probes: is "this will fail" readable before answering?
2. Activation patching: which layers and positions matter?
3. Compare 2 to 3 lenses on one target: neurons, Gemma Scope 2 (SAE or transcoder), ICA.
4. Steer or ablate with random-direction controls, dose response, side effects.
5. Attribution graph for one clean case, if tooling supports the model.

Corpus search on models without public data is descriptive only; only controlled exposure is causal. Pythia and LLM360 checkpoints are optional for pretraining-over-time analysis.

## 8. Benchmarks and the eval suite

Contamination is the variable: pair famous items with freshly generated twins of identical structure and solver-verified gold.

**Family rules:** program-checkable answer; generator with difficulty knobs; a famous version exists; surface changes while structure is fixed; answer-changing edits possible; models land at 30 to 80%; tests at least one dimension; licence fine. At least 5 profiling families plus 1 hidden family.

| Family | Sources | Build | Main dimension |
|---|---|---|---|
| Classical planning | PlanBench, Mystery Blocksworld, Fast Downward | Greedy traps, matched reversal | Planning, state tracking |
| Algorithms | CLRS-style | Coin change, routes, scheduling with traps | Planning |
| Logic puzzles | Reasoning Gym, Zebra-style | Wrapper | Structural understanding |
| Code reasoning | CRUXEval-style | Program generator run for gold | State tracking |
| Maths word problems | GSM-Symbolic | Fresh twins, answer-changing edits | Surface dependence, retrieval |
| Fresh natural problems | MathArena post-cutoff contests | None | Memorization check |
| Agent tasks | Agent benchmarks | Small checkable environment | Planning, self-correction |

**Generator audit:** gold vs an independent solver on 200 samples; difficulty changes accuracy smoothly; identical wrapper; freshness spot-check; trap and answer-changing versions possible; maintained and licensed.

**Eval suite as a contribution:** generator-based and contamination-resistant, paired edits applied by code, QA-guaranteed prompts, private hidden family. Public split released; hidden seeds stay in `data/private/`.

PostTrainBench measures agents doing post-training, not reasoning; context for Stage 4 only.

## 9. Sample sizes, runs, analysis

- **Population claims:** 250 to 300 items per family at k=3 (300 items give about 85% power for a 10-point drop after correcting for about 12 tests).
- **Per-problem claims:** 60 items per family at k=20 (k=20 gives about 84% power to tell .9 from .5 on one item).
- Final counts from a power simulation after the pilot. The unit is the item or template, never the repeated call.
- **Decoding:** temperature above 0 at model-card settings; small greedy check set; thinking on/off as a planned factor.
- **Repeats:** start at k=5; add samples only near the decision threshold (pre-registered rule); measure the noise floor across batch sizes and seeds.
- **Analysis:** mixed-effects logistic, `correct ~ variant x protocol x model + (1 + variant | item) + (1 | template)`; cluster bootstrap over templates; Holm correction; few pre-registered primary contrasts.
- **Logging:** see `docs/runner_requirements.md`.

## 10. Confidence signals

Logged in the screening pilot and every run after:

| Signal | Source |
|---|---|
| Written confidence | Generated text |
| k-sample agreement | Sampled answers |
| Gold-answer log-prob | Logits (open models) |
| Jev probability | External model, question + options |
| Rule-based score | Agreement, backtracking, family, difficulty, from our own records |

- Report Brier, reliability diagram and AUROC per family, split by famous vs fresh twin.
- Jev distractors come from the generator, never from evaluated-model samples.
- Agreement uses samples 1 to k; correctness is scored on held-out sample k+1.
- Expected weak spot: agreement can be 5/5 and wrong on fresh twins of famous items (misplaced retrieval).

## 11. Test menu and pilots

**15 tests:** answer-changing edits; changed-rule worlds; distractors; missing information; composition depth; length generalization; long state tracking; mid-problem change; self-correction under true or false feedback; misleading hints; two-way consistency; explanation vs answer; repeated sampling; confidence vs correctness; tool errors.

**Scoring (0 to 2 each):** hurts real users; clean control; known fix; less studied; cheap; inspectable inside.

**Screening pilot:** top 5 to 6 tests, pilot roster, about 50 items each, plus Jev and the confidence signals. Feasibility only, not claims.

**Fix-first pilot:** majority vote, code tool, verifier, written state on pilot failures.

- Generic fixes repair almost everything: pivot to reliability engineering.
- Models need different fixes: diagnosis is justified.
- Failures that survive every fix: the deep study.

## 12. Novelty

The broad version (multi-family stress tests, same score different profile) is taken. The open gap: process dimensions that predict specific failures on unseen task types beyond general skill, with causes controlled and checked inside the same models.

| Route others took | Examples | Where it stops | What we take |
|---|---|---|---|
| Perturb and measure drop | GSM-Symbolic, GSM-Plus, GSM-SEM, Golsefid 2026 | A drop is only a symptom | Templated twins, paired tests |
| Counterfactual worlds | Wu et al.; Mystery Blocksworld | Unfamiliar is often also harder | Changed rules, difficulty matched |
| Trace to training data | Xie et al. (K&K); Ruis et al.; infini-gram | One domain; searched, not controlled | OLMo 3 and controlled exposure |
| Psychology batteries | CogBench, CogArena | General skill dominates | Theory of abilities |
| Skill profiles predicting items | Beyond Scores, SkillEval, Burden et al., ADeLe | Knowledge skills, not process | Baseline B2 |
| Read the chain of thought | Lanham; Turpin | Not a reliable window | Check by program |
| Look inside first | Circuits, SAEs, neuron atlases | Which features matter is unknown | Tools, after labels |
| Just fix it | Self-consistency, verifiers, ReAct, RLVR | Which fix for which failure | Fix-first pilot, Stage 4 |
| Train from scratch | Physics of Language Models | Toy models | Middle road: fine-tune OLMo |

**Openings:** A (main) process dimensions predicting failure type on an unseen family; B controlled exposure across planning, logic, code and maths; C one model family (OLMo 3) for behaviour, training stage and internals; D a cross-domain planning horizon via greedy traps. Strongest: A plus C.

**Closest papers:** Golsefid 2026; Missing Primitive 2026; CogArena 2026; Beyond Scores 2026; ADeLe (Zhou et al. 2025). Full list in `docs/reading_list.md`.

## 13. Risks

- Dimensions collapse into general skill: publish the null, pivot to fixes.
- Generic fixes solve everything: pivot to reliability engineering.
- Scope: target Paper 1 done well and Stage 2 started within five months.
- Prior art is close: read the closest papers first.

## 14. Open decisions

- Monthly compute budget
- Closed panel and open frontier model
- The 2 deep dimensions (after the pilot)
- The hidden family
- Vault public or private
- RAMPbench link, if it exists
