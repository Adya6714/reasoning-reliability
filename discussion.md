# Reasoning Reliability: Discussion Log

A running record of where the research stands, Adya's concerns, and the points the research must answer.

**Note (2026-11-07):** The 4 Nov 2026 entries below set the v3 direction. That direction is now written into `docs/research_design.md`, `configs/study.yaml`, `configs/models.yaml`, and related docs. Prefer those files as the operational source of truth; keep this log for history and open debate.

## Where the research stands (as of 4 Nov 2026)

- **Question:** two models with the same score can solve problems differently. Can we measure those hidden habits per problem, show they predict failures on an unseen task family beyond general skill, find their causes, and pick the right fix?
- **Done:** v1 audit (instruction drift, Blocksworld reversal, n=1); five failure sweeps (103 failures, 17 types); 8 root abilities with 4-level ladders (draft); eval suite draft (5 profiling families plus a hidden tool-use sandbox); statistics plan (bifactor, null and power simulations, Kendall's tau harness check); interp ladder with pass bars; fix baselines with a mismatch control.
- **Not started:** generators, verifiers, QA tests, any new experiment.
- **Parked but agreed:** independent check of the failure list; simulations on the real model pool with matched difficulty; one-variant-per-family check; instruction drift as a reference effect size.

## Adya's concerns and inputs

1. **Models are stale.** v1 never tested current frontier models (e.g. Opus, GLM, others Adya named). Facts: v1 tested Claude Sonnet 4, GPT-4o, Gemini 2.5 Flash, o4-mini, Llama 3.1 8B, and R1-distill-70B (planning only), about 5 to 6 months ago. v2 has tested nothing yet. The plan puts open-weight models at the core, plus one open frontier model via API (DeepSeek, GLM or Kimi) and a 1 to 2 model closed panel. Open question: how big the frontier panel should be, and which models go in it.

2) **Is this obsolete for today's models?** Current frontier models may be too capable for these probes to matter.
3) **Why does it matter in the real world?** If frontier models can do everything, why improve smaller models? The story needs to be clear.
4) **The field is crowded.** There is a lot of work on reasoning, reliability and mech interp, including models automatically retraining open models to score better on benchmarks.
5) **Adya wants critical, direct feedback** on where this research is heading.

6. **How does this help an everyday \*\***A\***\*I\*\*** user?\*\* How would anyone know where it will break?
7. **Why not just engineer fixes up front** (memory, harnesses) instead of building a test? (This is the generic-fix threat.)
8. **Explain the full repo design:** why each stage exists, who it helps, and whether measurement to mech interp to fixes hangs together.
9. **A researcher's idea: a query-rewriting model in front of the main LLM.** What is it, and does it relate to this work?
10. **What prior work exists** in reliability, mech interp and measurement, and how can this work be more unique and impactful? What is the one question to be obsessed with?

11) **Product or company angle.** Adya wants research that can become a product or a lab (AI intelligent systems for LLMs). Candidate products: a pre-deployment reliability report for agent builders; a runtime monitor that flags likely failure mid-task; a profile-guided harness or router. Reference point asked about: Reflection AI (US open-weight frontier lab, valued at about $25B, first model Beam released Oct 2026).

12. **Core interest confirmed:** mech interp, activation patching, harnesses and post-training, and building something on activations. Reference: MIT CSAIL used GPT-6 Astra to edit about 0.016% of Qwen3.5-0.8B's weights directly, with no training. That fixed reasoning loops, and MATH-500 rose from 7.9% to 48.1%, GSM8K from 13.8% to 67.1% and IFEval from 21.0% to 62.3% (as reported; not independently verified). Link to this work: looping is failure type 4, so diagnosis-guided weight or activation edits are a direct fit.

## Points the research must answer

- **Real-world impact (draft answer):** a cheap test profile that predicts where a model will fail on a new task before it is deployed. Who uses it: teams choosing a model for an agent, teams deciding where to add checks or human review, and model builders deciding what to train. It only has impact if the prediction actually works on frontier models.

**Advisor answers given in the discussion (4 Nov):**

- **Models.** GLM is open weights. It counts as frontier because of its performance, not because it is closed. The open roster is OLMo 3 7B, Qwen 27B plus a small Qwen, Gemma 3, gpt-oss-20b and Llama 3.1 8B. Closed models are API calls, so 3 to 4 are affordable (for example Opus and other current frontier models).
- **Obsolescence (harsh).** v1-style rewording does not break today's frontier models, so a paper built on it is dated. The 17 failure types, however, come from 2026 agent failures (state loss, rule breaking, stopping early, looping). Frontier models still pass once and fail on the 8th try. The question is where and how predictably a model breaks. If a model does not break, the ladder is too short.
- **Scope (revised).** Assume no limit on time or effort when designing solutions; Adya will execute. The full chain (measure, mech interp, fixes) stays in. Judge each part only on whether it is sound and novel, and keep each paper focused on one slice so its claim is sharp.
- **Everyday users.** They never run the test. They benefit indirectly, like crash-test ratings. The direct users are teams that build and choose agents.
- **"Why not just engineer it?"** This is the strongest objection. Every generic fix costs money and time, can break other things, and does not help every model equally. Diagnosis earns its place only if it picks a cheaper or better fix. The fix-first pilot tests this early, and if generic fixes solve almost everything, pivot.
- **Query rewriter.** It connects to v1 (rewording changes answers). Prompt rewriting and optimization are already well studied, so it is new only if guided by diagnosed, model-specific weaknesses.
- **Prior work.** Reliability: tau-bench pass^k, the MAST taxonomy, Lost in Conversation. Measurement: ADeLe, CogArena, IRT profiling. Mech interp: SAEs, Gemma Scope, probes that predict correctness.
- **Question to obsess over:** can we know before a model breaks, and act on it?
- **Product space.** LLM evals and observability is crowded. The moat is a published predictive result plus a trusted open suite. Reflection AI (an open-weight frontier lab, about $25B) is not the path, because the edge here is knowing where models break, not training them.

## Decisions and next steps

**Proposed new direction (4 Nov, discussion; not yet final)**

- **Three directions considered:**
  1. Profiles that predict failure before deployment. Measurement science. Judged on research value, not personal interest: it is the foundation the other two directions need, because it supplies the failure labels.
  2. A runtime monitor. Probes on activations spot "about to loop" or "about to lose state" mid-task, and the harness steps in. Works on any open model, and is the strongest product angle.
  3. Scaling laws for breaking points.
- **Proposed core:** direction 2 plus the Astra lesson. Find the internal signal of one or two specific failures (for example looping, losing state). Then use it twice:
  - **Detect:** a monitor in the harness that catches the failure live.
  - **Fix:** a targeted fix (steering, a small weight edit, or post-training) that removes it, compared against generic fixes.
- **Role of existing work:** the root-ability ladders become the generator of clean, labelled failures to study, not the headline.
- **Ambition:** high but focused. One or two failure types, a few open models, one story from detection to fix.
- **Open question:** should the runtime monitor or weight editing be the centre?
- **Earlier advice still stands:** before building, run a cheap frontier check (a few L1 to L2 ladders on Opus and GLM) to confirm current models still break.

**Adya's response (4 Nov):** no single centre. The story is the full procedure: measure, then mech interp, then fix. It must be model-agnostic, so any new model can be run through it.

- Advisor note: this works if it is framed as a **repeatable pipeline** (diagnose, localize, fix, verify), where running a new model is cheap and mostly automatic. Each paper still covers one slice in depth, so the first full demonstration should use one or two failure types.

**Elevator pitch (draft, 4 Nov):** "I'm building a repeatable pipeline for reasoning reliability. It finds where a model breaks, locates that failure inside the model, and fixes it surgically. It works on any open model, so every new release can be run through it."

**Research question (draft v3):** For a specific reasoning failure (for example looping or losing state), can we (1) reliably measure where a model breaks, (2) find an internal signal that predicts the failure before it happens, and (3) use that signal for a targeted fix that beats generic fixes at the same cost, across model families?

**What changed today:** the headline moves from "habits predict failures beyond general skill" to "diagnose, localize, fix, verify" as one pipeline. Mech interp moves from an optional later stage to the core. The ladders and eval suite stay, as the failure generator. The bifactor / RQ2 work becomes supporting, not the headline.

**People:** Subho (Subhabrata) Majumdar, Assistant Professor of Decision Sciences at IIM Bangalore. Trustworthy AI and AI security: the garak LLM vulnerability scanner, the AI Vulnerability Database, founder of the AI Risk and Vulnerability Alliance, former Head of AI at Vijil, author of _Practicing Trustworthy Machine Learning_, co-developer of the Nexbax AI Index (utility beyond benchmarks: cost, resilience, trust). Overlap: probing and testing frameworks, reliability as deployment value.

**Adya's product idea, restated (4 Nov):** a "transformer LLM" front-end. A user's query goes first to a small model that rewrites or restructures it so the main LLM performs reliably, and the answer then goes back to the user. Also: **token and cost efficiency.** Tell the model where to spend more compute in a task, and where to spend less.

- Advisor note: Majumdar's work is adjacent, not the same. His is security and vulnerability scanning (garak), plus a utility index that includes cost. Neither covers reasoning reliability or internals. The useful lessons: garak shows how an open-source scanner gets adopted widely, and his index shows a framing of reliability that includes cost.
- Possible unifying idea: a **reliability front-end**. The diagnosis pipeline tells it, per model, what to rewrite and where to spend extra compute. The rewriter and compute allocator are the product; the pipeline is the research that makes them better than generic prompt optimizers. Not compeltely sure how and what product will look like though

**Token allocation and durability (4 Nov):**

- **Idea:** spend more compute on the critical parts of a question and less on irrelevant ones, even when the user has not marked them. Known as adaptive compute or thinking-budget allocation, and an active research area (overthinking studies, thinking budgets in hybrid models, routers).
- **How it could be built:** split the task into steps; score each step's risk using the model's diagnosed weak spots plus live signals (uncertainty, activation probes); give risky steps more budget, extra samples or a verifier; give easy steps a short budget.
- **Durability risk:** any fix hard-coded to today's model weaknesses gets absorbed by the next model.
- **What survives model upgrades:**
  1. The process re-profiles each new model automatically and recalibrates, like a compiler re-tuned for each new chip.
  2. Cost: stronger models stay expensive, so deciding where to spend compute keeps its value.
  3. Verification: better models still need evidence they will not fail on a given task.

**Q: Must the front-end be tested on every task and benchmark? (4 Nov)**

- No. Profile each model once on the 8 root abilities, giving its breaking points (for example "loses state after about 12 updates").
- For a new task, estimate its **demands** (how many state updates, rules, lookahead steps, hops), then compare them with the model's breaking points. This works like a load rating: test the beam once, then check any building against it.
- Calibrate on a small sample (about 20 to 50) of the customer's own real tasks.
- This is exactly what RQ3 tests: do profiles from cheap tasks predict failures on the unseen tool-use family? If yes, the product claim holds. If no, task-specific testing is needed and the product changes.
- Open work: an automatic **demand tagger** that reads a task and estimates its demands.

## Rundown: the research as of 4 Nov

**Research question.** For a specific reasoning failure (for example looping or losing state), can we (1) measure reliably where any model breaks, (2) find an internal signal that predicts the failure before it happens, and (3) use that signal for a targeted fix that beats generic fixes at the same cost, as a pipeline that runs on any new model?

**Why.** Accuracy hides where models break. Teams deploying agents find failures only after damage, and generic fixes waste compute. A reusable diagnose, localize, fix, verify pipeline turns that into a routine check.

**Step by step:**

1. **Frontier sanity check (now).** Run a few L1 to L2 ladders on Opus, GLM and one more frontier model. If they do not break, lengthen the ladders or rethink.
2. **Build the instrument.** Generators with exact solvers for the 8 root abilities, verifiers, QA tests and the noise floor. Keep harness and format fixed.
3. **Measure.** Find breaking points per model on each ladder, with k=5 adaptive sampling. Include the instruction-drift run as a reference effect size.
4. **Predict.** Check that profiles predict failures on the hidden tool-use sandbox beyond general skill (B1, B2, B3), with one-variant-per-family and null-simulation checks.
5. **Localize (mech interp).** On open models: probes, then patching, then lens comparison, then steering, each against pre-registered pass bars. The goal is an internal signal that fires before the failure.
6. **Fix.** Monitor-triggered harness actions, steering or small weight edits (the Astra-style result), SFT and RL, compared with matched, strong and mismatch baselines. Measure what each fix breaks.
7. **Allocate compute.** Use the signals to give risky steps more tokens or samples and easy steps fewer. Measure the cost saved at equal reliability.
8. **Generalize.** Rerun the pipeline on a new model family to show it is model-agnostic.
9. **Build.** A reliability front-end: query rewriting, compute allocation and a runtime monitor, powered by the per-model profile.

**First demonstration:** one or two failure types (for example looping and state loss), a few open models, run end to end.

**Open decisions:** which failure types come first; the closed frontier panel; whether to frame the work as one long paper or a short series.

## Full research design (v3 draft, 4 Nov)

This section is the detailed design behind the rundown above. It replaces nothing in the repo yet; once agreed, it gets folded into docs/research_design.md.

### 1. Research question and claims

- **Main question:** for specific reasoning failures, can we measure where any model breaks, find an internal signal that predicts the failure before it happens, and use that signal for a targeted fix (or compute allocation) that beats generic fixes at equal cost, as a pipeline that runs on any new model?
- **Claim 1 (measure):** each root ability has a stable breaking point per model, above noise.
- **Claim 2 (predict):** breaking points predict failures on an unseen task family beyond general skill (B3 beats B2).
- **Claim 3 (localize):** on open models, an internal signal predicts the failure before it shows in the output, and causally contributes to it.
- **Claim 4 (fix):** using the diagnosis gives better reliability per unit of cost than generic fixes.
- **Claim 5 (generalize):** the pipeline transfers to a model family it was not built on.

### 2. Models

| Group                | Models                                                                                                                                                          | Used for                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Open, internals      | OLMo 3 7B (all stages: Base, SFT, DPO, Instruct, Think), Qwen3.6-27B (thinking on/off) plus a small Qwen, Gemma 3 with Gemma Scope 2, gpt-oss-20b, Llama 3.1 8B | All stages: behaviour, internals, fixes, training-stage causes    |
| Open frontier (API)  | GLM-5.x, DeepSeek V4.x, Kimi K3                                                                                                                                 | Behaviour, prediction, front-end                                  |
| Closed frontier      | Opus 5.5, Fable 5.1, GPT-6 Astra, one Gemini model                                                                                                              | Behaviour, prediction, front-end, the "does it still break" check |
| Recognition baseline | Jev (pinned version)                                                                                                                                            | Item feature: solvable by recognition alone                       |

- Freeze exact versions and revision hashes on run day. Fix sampler settings per model card.
- The panel is large enough for the bifactor recovery simulation (target 12 or more models).

### 3. Benchmarks and contamination strategy

- **Contamination handled three ways:** (1) fresh items from own generators with exact solvers; (2) famous items paired with structure-matched fresh twins, so exposure is a measured variable; (3) post-cutoff contests (for example MathArena) as a small memorization check.
- **Correction:** PostTrainBench is not a reasoning benchmark. It measures agents post-training a model on a GPU budget. It is possibly useful later for the build stage, not for measurement.
- **Selection rules:** program-checkable, generator with a difficulty knob, famous version exists, structure fixed while surface changes, can be tuned to 30 to 80% for every model, tests at least one root ability, licence fine.
- **Difficulty is unbounded:** every ladder extends until frontier models break. If Opus does not break, the ladder is too short.

| Family                                   | Root abilities | How it gets hard enough for frontier models                                                                                                    |
| ---------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| A Planning and greedy traps              | R4, R1         | Long plans (20 to 40+ steps), Mystery-style renamed worlds, deeper traps                                                                       |
| B Long state tracking and compound goals | R1, R2         | Hundreds of updates, interleaved entities, goals with many parts                                                                               |
| C Code execution                         | R1, R8         | Long generated programs, nested loops, mutation-heavy state                                                                                    |
| D Maths with twins                       | R5, R8         | Twins that change the answer, deep composition                                                                                                 |
| E Logic and rule worlds                  | R3, R5         | Changed rules versus famous puzzles, many rules held over long contexts                                                                        |
| G Long-horizon memory (new candidate)    | R1, R3, R7     | Multi-session tasks where facts change over time. Recall of one fact works; tracking many changing details does not (Adya's Fable observation) |
| F HIDDEN tool-use sandbox                | all            | Deterministic agent tasks, never used for profiling                                                                                            |

### 4. Item plan and run protocol

- About 300 structural items per family (50 famous, 50 twins, 200 fresh), about 5 surface versions each.
- Split: 40% development, 60% confirmation. Confirmation stays closed until the design is frozen and pre-registered.
- Repeated runs: every item starts at k=5; add samples only where the interval straddles the decision threshold (pre-registered rule). 60 items per family at k=20 for per-item claims.
- Noise floor: rerun a fixed subset across seeds and batch sizes. Per-item verdicts count only above it.
- Ladders: for each root ability, 4 levels (atomic, scaled, mixed, real world), 4 to 6 templates across at least 2 families. Breaking point is estimated by fitting a logistic curve of accuracy against difficulty (for example number of updates) and reading the 50% point with a CI.
- Log every row: model, revision, engine, precision, batch-invariant flag, temperature, seed, sample index, prompt and hash, raw output, finish reason, gold log-probability.
- Report pass^k at k = 1, 4, 8.

### 5. Statistical models

| Question                                   | Model                                                                                                                                                                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Does a variant hurt a model?               | Mixed-effects logistic: correct \~ variant x protocol x model + (1 + variant \| item) + (1 \| template) + model-family random effect; cluster bootstrap over templates; Holm correction                                      |
| Where does each model break?               | Per-ability logistic difficulty curve, breaking point at 50% with a bootstrap CI                                                                                                                                             |
| Are abilities real, or just general skill? | Baseline 2PL IRT; main bifactor model (general factor plus one specific factor per ability), confirmatory                                                                                                                    |
| Can we trust the factor results?           | Simulations first: model counts 6 to 30; null with zero specific factors; null with format or template noise; simulations use the real ability spread and matched item difficulty                                            |
| Does the harness change rankings?          | Kendall's tau between two scaffolds, bootstrap over items                                                                                                                                                                    |
| Do templates agree?                        | Kendall's W across 3+ templates per ability                                                                                                                                                                                  |
| Do profiles predict unseen failures?       | Logistic prediction race B1 (ability), B2 (+ difficulty, domain, ADeLe-style skill profile), B3 (+ breaking points); AUC and log-loss, cross-validated by family; also failure-type prediction; one-variant-per-family check |
| Is confidence informative?                 | Five independent signals, Brier score and AUROC on a held-out sample                                                                                                                                                         |
| Reference effect size                      | Instruction drift (3 levels x thinking on/off) as the yardstick for all other variants                                                                                                                                       |

### 6. Localize (mech interp, open models)

- Labelled data comes from the ladders: same item, pass versus fail, with the failing step known.
- Ladder of methods; stop if a step fails:
  1. Probes on activations at each step. Pass bar: at least +0.05 AUROC over question-only and text-only baselines, CI excluding 0, and it must fire before the failing step.
  2. Activation patching between pass and fail runs. Pass bar: at least 50% of the gap from 3 or fewer layers.
  3. Lens comparison on the same failure: neurons versus Gemma Scope 2 SAE or transcoder features versus ICA.
  4. Steering and ablation. Pass bar: beyond the 95th percentile of random-direction controls, with a dose response.
  5. Attribution graph for one clean example where tooling allows.
- OLMo 3 stages show which training stage introduces the signal. Controlled exposure (fine-tune on half) separates memorized from computed.

### 7. Fix and allocate

- **Fixes, from cheapest to deepest:**
  - A probe-triggered harness: written state, rule restatement, verifier gate, simulate before acting.
  - Activation steering.
  - Small targeted weight edits (Astra-style).
  - SFT on rewrite-diverse data.
  - RL environments from the generators.
  - LLM-JEPA and ReFT.
- **Compute allocation:** split a task into steps; score each step's risk from (a) the model's breaking points versus the step's demands and (b) live signals (uncertainty, probe). Give risky steps more thinking, samples or a verifier; give safe steps a short budget.
- **Comparisons:** matched baseline (same data, steps and compute, no targeting); strong baseline (generic "check your work", RL on pooled generators, uniform budget); mismatch control (the fix meant for a different weakness). Report reliability per unit of cost, plus what each fix breaks.

### 8. Generalize and build

- Rerun the full pipeline on a model family it was not built on, with as few manual steps as possible. Track how much is automatic.
- **Demand tagger:** a model that reads a real task and estimates its demands (updates, rules, lookahead, hops). Trained on generated tasks where demands are known, then checked on real tasks.
- **Product: a reliability front-end** on top of any LLM. It does query rewriting, step-wise compute allocation and runtime monitoring, powered by the per-model profile. On closed models it uses behaviour only; on open models it also reads activations.

### 9. Gates and order of work

| Step               | Output                                                  | Gate                                                          |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------------- |
| 0 Frontier check   | L1 to L3 ladders on Opus, Fable, Astra, GLM             | Frontier models break somewhere; if not, extend ladders first |
| 1 Instrument       | Generators, solvers, QA tests, noise floor, simulations | QA passes; simulations show recovery with the planned panel   |
| 2 Measure          | Breaking points per model                               | Stable above noise (RQ1). Gates everything after              |
| 3 Predict          | Prediction race on hidden family                        | Reported checkpoint (RQ3); does not block later stages        |
| 4 Localize         | Probes, patching, steering                              | Pre-registered pass bars                                      |
| 5 Fix and allocate | Targeted vs generic, cost curves                        | Beats matched and strong baselines; mismatch control loses    |
| 6 Generalize       | New model family run                                    | Pipeline transfers                                            |
| 7 Build            | Front-end                                               | Beats generic prompt optimizers on reliability per cost       |

### 10. Main risks

- Abilities collapse into general skill (CogArena). The bifactor model and null simulations detect it; stages 4 to 7 still run on reliable behavioural contrasts.
- Generic fixes solve almost everything. The fix-first comparison detects it; the pivot is reliability engineering.
- Frontier models do not break on the ladders. Extend difficulty and the long-horizon family.
- Internals do not show a clean signal. Report it; behaviour-only fixes and allocation still stand.

### 11. Open decisions

- Which 1 to 2 failure types run end to end first (proposed: state loss and looping).
- Whether long-horizon memory (G) becomes a full family.
- Exact frontier panel and API budget.
- Paper split: one long paper versus a series.

## Which failures and which benchmarks (proposal, 4 Nov)

**Criteria for picking the first failures:**

- Still breaks frontier models.
- A program can check it.
- It plausibly has an internal signal.
- A known fix exists to compare against.
- It matters for agents.
- Evidence grade A.

| Failure                            | Evidence      | Why first                                                                      | Fix and allocation link                           |
| ---------------------------------- | ------------- | ------------------------------------------------------------------------------ | ------------------------------------------------- |
| State loss (type 1, R1)            | A, 17 sources | Most common real failure; ladders scale without limit; clean step-level labels | Written state, extra compute at high-update steps |
| Looping after failure (type 4, R2) | A, 10 sources | Astra weight edit fixed exactly this; easy to detect in traces                 | Probe-triggered break-out, weight or steering fix |
| Rule breaking (type 3, R3)         | A, 11 sources | Grows with context length; clear goal-neglect theory                           | Rule restatement where risk peaks                 |

- **Proposal:** state loss and looping run end to end first. Rule breaking is the third, as a replication.
- **Three layers of benchmarks:**
  1. **Profiling (generated, controlled):** ladders and families A to E plus G, with exact solvers and fresh items.
  2. **Hidden test:** the deterministic tool-use sandbox (F), never used for profiling.
  3. **Real-world anchor:** a small set of existing agent benchmarks or real traces, used only to show the targeted failures happen in practice and that fixes carry over. These are not used for the measurements.
- **Open:** which existing benchmarks serve as the real-world anchor (to search and verify).

## Reusing v1 probes and tests (4 Nov)

| v1 item                                        | What it did                            | Reuse in v3                                                                                                                                                                                                              | Serves failure type / stage                              |
| ---------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Probe 1: rewrites W1 to W6                     | Answer-preserving rewrites             | Keep as a core test (Adya's decision: models still swing a lot under small changes). Code-applied only, fixed instruction, W3a nonce rename, number magnitude matched, and graded ladders so frontier models still break | 7 surface fragility, 8 misplaced retrieval               |
| D3 graded rename ladders                       | Rename distance 10% to 100%            | Keep: already a ladder                                                                                                                                                                                                   | 7, 8                                                     |
| Probe 2a: plan vs execute (CCI)                | Plan in chat A, execute in chat B      | Keep, upgraded                                                                                                                                                                                                           | 2 says one thing does another, 10 latent plan            |
| Probe 2b: false-value injection                | Plant a wrong intermediate value       | Keep, central. A planted wrong state is a clean state-loss and self-check test, and a fixed step for mech interp                                                                                                         | 1 state loss, 9 self-check, 13 misleading hints; Stage 3 |
| Probe 3: corpus familiarity (infini-gram)      | Exposure proxy                         | Keep as a covariate; real exposure via OLMo 3 and controlled fine-tune                                                                                                                                                   | Stage 2 causes                                           |
| D1-lite seen/unseen fine-tune                  | Calibrate labels on known exposure     | Keep: this is Stage 2                                                                                                                                                                                                    | 8; Stage 2                                               |
| Intrusion errors                               | Wrong answers reuse original words     | Keep, free signal                                                                                                                                                                                                        | 8                                                        |
| D2 patching, Commitment Depth, H5              | Where the answer is fixed              | Keep                                                                                                                                                                                                                     | Stage 3                                                  |
| Source monitoring (CC-2)                       | Can a model say it recalled            | Fold into confidence signals                                                                                                                                                                                             | 17, R6                                                   |
| T1 noise floor                                 | Verdict flips across batch and backend | Keep (already in design)                                                                                                                                                                                                 | Instrument                                               |
| Surface ensembling, backward prompt            | Cheap inference fixes                  | Keep as harness baselines                                                                                                                                                                                                | Stage 5                                                  |
| Diversity vs dose (H7)                         | Varied surfaces in training            | Keep as SFT/RL fix                                                                                                                                                                                                       | Stage 5                                                  |
| Mixture IRT, variance decomposition, Kendall W | Strategy classes, variance sources     | Keep, superseded by bifactor plan                                                                                                                                                                                        | Statistics                                               |
| Precision, distillation, code CPT, W7 language | Side studies                           | Park                                                                                                                                                                                                                     | None now                                                 |
| W8 bias (D18 to D20)                           | Name-swap bias                         | Park, out of scope                                                                                                                                                                                                       | None now                                                 |

- **Proposal:** Probe 2 (plan/execute split plus injection) is the signature method carried into v3. It tests state loss directly (does a planted wrong state survive or get caught?) and gives a known step for internals.

## Decisions and next steps (end of 4 Nov discussion)

**Decided:**

- **Rewording stays a core test.** Models still swing a lot under small changes. It is now built as code-applied, graded ladders (rename distance, notation, numbers) rather than six fixed rewrites, so frontier models still break.
- **The failure taxonomy is the starting point.** The 17 types and 8 root abilities choose what to measure, and every test aligns to at least one type.
- **Probe 2 carries forward as a signature method:** the plan/execute split plus false-state injection.
- **v1 is reused where it fits:** D1-lite controlled exposure becomes Stage 2; patching and Commitment Depth become Stage 3; intrusion errors and the noise floor stay.
- **No limit on time or effort** is assumed when judging ideas; judge only soundness and novelty.
- **Pipeline framing:** measure, localize, fix, verify, model-agnostic, with a reliability front-end as the product.

**Still open:**

- Final choice of first failure types (proposed: state loss and looping, plus rewording fragility since it stays core).
- Final benchmark set and families.
- Frontier panel.
- The rubric scores for the 19 candidate tests.

**Next steps, in order:**

1. **New chat:** walk through the research design end to end, then finalize benchmarks, failure types and what each test is for.
2. **Precursor (baseline) test** before the full design is frozen. Run a small battery (rewording ladders, state-tracking ladder, Probe 2 injection, a looping sandbox) on a few open models and 2 to 3 frontier models. Goals: confirm frontier models still break, find each model's rough breaking points, and set the baseline the full design is built on.
3. Then freeze, pre-register and update docs/research_design.md through a Cursor prompt.
