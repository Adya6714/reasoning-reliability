# Behavioral research design

## Primary question and interpretation boundary

Primary question: do reliable, problem-level behavioral measurements predict *which kinds of unseen problems* a model will fail, beyond canonical accuracy, task difficulty, and domain? The motivating comparison is between models with similar aggregate accuracy but different failure profiles. The first paper's strongest possible claim is incremental predictive validity on held-out task families; descriptive profile differences alone are not sufficient.

The four provisional dimensions are **Dependence** (sensitivity to presentation and irrelevant cues), **Organization** (planning, state tracking, and long-horizon control), **Source** (sensitivity to controlled prior exposure versus novel composition), and **Faithfulness** (whether intermediate reasoning supports and causally influences the answer). These are working constructs, not established internal properties. They may overlap, collapse into general ability, or fail to predict. Treat uncertainty/calibration as a cross-cutting outcome and prerequisite skill as a control. Add an answer-changing counterfactual condition alongside answer-preserving transformations: invariance without sensitivity to a changed constraint can reward ignoring the prompt.

Behavioral evidence does not directly reveal a hidden reasoning process. Use terms such as “planning-like behavior,” “exposure sensitivity,” and “rationale-answer consistency” unless an intervention justifies stronger causal language. Retrieval and computation may contribute to the same answer; novel instances alone do not prove computation.

## Predictive validity design

The confirmatory comparison is between nested predictors of item-level failure or preregistered failure strata:

1. Score baseline: canonical performance, task difficulty, and task family.
2. Psychometric skill-profile baseline: fine-grained skill estimates (where adequately measured), task difficulty, and task family. This is necessary because recent cognitive-diagnosis work already reports prediction on held-out benchmark items.
3. Process-diagnostic model: the same controls plus preregistered, manipulation-validated Dependence, Organization, Source, and Faithfulness indicators.

Define the prediction unit before collecting data. A model-level profile by itself can predict aggregate risks for a family or condition, but cannot identify the exact next item that will fail unless item-level features or item-specific probe outcomes are available. For item-level prediction, specify those features and train only on development items. Evaluate on untouched items and, for the main generalization claim, a task family excluded from probe construction and model fitting. The target contribution is not merely predicting benchmark items from a learned skill taxonomy; it is testing whether controlled, task-conditioned behavioral indicators add predictive value beyond both aggregate accuracy and psychometric ability profiles. Report change in log loss/Brier score and discrimination with uncertainty, plus calibration and failure-category performance. Split by generator, template, and underlying rule—not by surface variant—so paired variants cannot leak across splits. Compare against simple baselines and report when the profile adds no predictive value.

Do not treat a small roster of models as the statistical sample for broad claims about models. Estimate item-level effects across several model families, and state that conclusions generalize to the tested checkpoints and task families. A leave-one-family-out result is a meaningful stress test, but not proof of universal transfer.

Construct validity requires multiple indicators per dimension across more than one task family where feasible. Check repeatability, known-group sensitivity under controlled manipulations, discriminant value, and residual failure patterns. Recent cognitive-battery work shows that theory-named dimensions may fail selective-intervention and held-out-family tests; the framework must permit that outcome. Avoid declaring four dimensions “independent” from one probe each or from a factor analysis with too few independent models.

## Instrument

### Test menu and how to choose

The menu below is a hypothesis-generating inventory, not a commitment to run every test. Keep the constructs provisional: several tests can measure overlapping abilities, and each probe needs a clean answer-changing or matched-control condition where applicable.

| Candidate test | Operation | Primary construct to investigate | Key control / scoring note |
|---|---|---|---|
| Answer-changing edits | Flip one task-defining detail | Structural understanding / constraint sensitivity | Verify the new answer independently; ignoring the edit must count as failure. |
| Changed-rule worlds | Use arithmetic in base 9 or a toy world with a newly stated rule | Rule induction / fluid transfer versus familiar-rule reliance | Check prerequisite knowledge and provide all novel rules. |
| Distractors | Add irrelevant details | Inhibition / relevance filtering | Pair with a matched item without distractors and preserve the gold answer. |
| Missing information | Omit a necessary fact | Metacognition / uncertainty | Correct response is to identify the missing fact or abstain; include answerable controls. |
| Composition depth | Chain 2, 4, then 8 individually familiar operations | Compositionality / depth limits | Hold primitive operations constant; score intermediate state and final answer. |
| Length generalization | Increase sequence/problem length beyond training examples | Length generalization / working-memory load | Generate lengths systematically and avoid confounding length with operation type. |
| Long state tracking | Apply many moves, then report the current state | State tracking / updating | Use an executable environment and query exact state; include shorter matched trajectories. |
| Mid-problem change | Change a rule after the task begins | Updating / cognitive flexibility | Counterbalance change timing and include no-change and irrelevant-announcement controls. |
| Self-correction | Present a candidate solution containing a true or false claimed error | Monitoring / resistance to pressure | Balance correct and incorrect suggestions; score correction against oracle, not agreement. |
| Misleading hints | Suggest a plausible but wrong answer | Inhibition / social influence | Pair with neutral and correct-hint conditions; distinguish hint-following from independent errors. |
| Two-way consistency | Ask A→B, then B→A | Relational / structural consistency | Use reversible relations only and verify both directions independently. |
| Explanation versus answer | Compare stated steps with final result | Rationale-answer consistency / faithfulness | Arithmetic or symbolic checks are preferable; consistency alone does not prove causal faithfulness. |
| Repeated sampling | Sample the same prompt with matched stochastic decoding | Response variability / uncertainty | Replicates estimate within-item sampling variation; they do not increase independent item count. |
| Confidence versus correctness | Elicit confidence and compare with outcomes | Calibration | Predefine confidence scale and report calibration and selective risk, not accuracy alone. |
| Tool errors (agents) | Return an incorrect tool result | Verification / recovery | Compare correct-tool, wrong-tool, and unavailable-tool conditions; use a logged deterministic tool. |

#### Six-question prioritization rubric

Score each candidate from 0 (weak/unclear) to 2 (strong) on each question, with a short evidence note:

1. Would this failure harm users or agents in a plausible use case?
2. Can it be measured cleanly, including an answer-changing or matched-control condition?
3. Does the diagnosis point to a plausible targeted fix?
4. Is the construct or predictive claim meaningfully under-tested in prior work?
5. Is it feasible with the available models, GPU/API budget, and annotation effort?
6. Can a later phase test an internal signal or causal mechanism for it?

Maximum score is 12. This score is a transparent screening aid, not a validated measure of scientific importance. Record disagreements, evidence, and feasibility assumptions; do not use novelty score to override weak construct validity.

#### Screening, then depth

Use the rubric to choose 5–6 candidates for a screening pilot across 2 models, with roughly 50 independent base items per candidate where feasible. Prefer generated items with executable answer keys. Check whether candidates have adequate difficulty range, clean scoring, paired-control sensitivity, and stable rank/effect estimates under resampling and repeat decoding. This small screen is for feasibility and prioritization, not definitive significance claims or final sample-size justification. Keep candidates that separate models or conditions at matched overall accuracy and give sufficiently stable measures; revise or drop probes that are noisy, redundant, floor/ceiling limited, or confounded.

For the first deep study, prioritize two connected but separately measured areas:

- **State tracking and updating:** long state-tracking trajectories plus a mid-problem rule/state change. This is directly checkable, relevant to tool-using agents, and supports a clear intervention such as externalizing state. Preserve separate measures for tracking and responding to a change.
- **Planning and inhibition:** greedy-trap tasks plus distractor or misleading-hint controls. This extends Probe 2 and tests whether attractive local choices or irrelevant cues derail multi-step performance. Keep planning quality, action execution, and cue susceptibility distinct.

Treat repeated sampling and confidence-versus-correctness as low-cost cross-cutting side measures. Use randomized controlled exposure as a way to validate Source/exposure interpretations, not as another loosely defined behavioral dimension. Do not start deep mechanistic analysis until a behavioral contrast is reliable and independently scored. If pilot data contradict these priorities, choose the deep-study pair using the recorded rubric and report that change before confirmatory collection.

The principle is breadth for screening and depth for the paper: a focused, validated study of two constructs is stronger than thinly testing all fifteen candidates. The final pair and confirmatory protocol must be frozen before confirmatory data collection.

### Probe 1 — surface invariance

For every independently generated task, create the canonical item and pre-registered variants. Separate the interventions instead of combining them into a single “rename” condition:

- lexical/entity binding: nonce names, tokenization balanced per model tokenizer;
- domain transfer: real-word cover-story isomorph, with semantic plausibility rated independently;
- representation: notation/layout changes;
- order: reorder premises, options, or steps while preserving the problem;
- new-instance transfer: new values/graph/state generated from the same rule; answer may change and must be freshly solved by the oracle;
- optional cross-lingual transfer only after translation equivalence is independently checked.

Primary measures: canonical accuracy; transformed accuracy; paired correctness retention among canonical-correct items; variant-dependent discordance; response validity/abstention. Report denominators and confidence intervals. Do not collapse transformations into a single robustness score unless the aggregation is preregistered and validated.

### Probe 2 — plan/execution coupling

The model first declares a plan in a separate session. A second session receives the task and initial state, then executes without access to the declaration. A deterministic environment checks each action and final state. Keep declaration quality, execution accuracy, and declaration–execution agreement as separate outcomes. Prompt format and tool affordances must be matched across arms.

### Probe 3 — controlled exposure

Use an open-weight checkpoint that can be trained on a small, synthetic corpus with known item/template membership. Randomize exposure by item and surface diversity, with untouched nonmember controls. Measure exact-template recall, paraphrase/nonce transfer, novel-instance solving, and confidence/calibration. This provides ground truth for whether any proposed “retrieval” score tracks exposure. Public-corpus proximity is descriptive only and cannot stand in for known membership.

### Probe 4 — false-premise / state-injection recovery

In a separate interactive task, inject a plausible but false intermediate state or instruction at a preregistered point. Measure acceptance, detection, correction, and final task success separately. Verify the correct state with the environment; do not use self-reported rationale as the outcome.

## Mechanistic extension: compare lenses, then intervene

Mechanistic work is a gated follow-up to a repeatable behavioral contrast. Do not assume that SAEs are obsolete, that the neuron basis is complete, or that a feature label explains the whole mechanism. Compare methods on the same model, checkpoint, prompts, and behavior-linked target where compute permits:

- native MLP-neuron activations / neuron-based attribution;
- one learned feature lens (SAE or transcoder);
- ICA or another non-neural decomposition as a lower-cost baseline.

Choose a target using the behavioral data, not an appealing neuron anecdote. For each candidate signal, pre-register held-out activation prediction, matched random/neighbouring-unit controls, dose-response, task-specificity, and side-effect measures. Test the same behavioral effect with intervention and a rescue or reversal condition where feasible. Record whether a result reflects a localized causal contribution, an incomplete explanation, or a broader circuit; do not infer exhaustive understanding from one successful steer.

Training recipe and architecture can change the representational basis. Record architecture, checkpoint, training/post-training provenance, optimizer or intervention history when known, and model implementation. Cross-checkpoint or cross-family comparisons are descriptive unless the training/architecture factor is controlled. Older toy/vision results motivate hypotheses but do not establish what happens in current language models.

For outcomes that cannot be checked by an exact solver, use a documented rubric, calibrated human judgments on a sampled subset, and inter-rater agreement. An LLM judge can scale exploration, but should not be the sole source of truth for a headline construct claim.

## Item counts and power

Start with 40 independent generated items per family for a pilot. Use the pilot to check verifier validity, difficulty, parse failures, variant plausibility, within-item decoding variance, and paired discordance rates. Do not use pilot items in the confirmatory test.

The current planning target is 200 independent base items per family, each evaluated under canonical plus the frozen transforms. This is a planning target, not a substitute for a prospective power calculation. Before confirmatory collection, simulate power using pilot discordance rates and generator-cluster structure. Require at least 80% power for an 8 percentage-point paired difference after correcting the three primary family contrasts; if the item count is infeasible, revise the minimum effect and claim scope before collecting confirmatory results.

Items sharing a template, parameter seed, or graph skeleton may not be independent. Bootstrap or model at the generator-seed/template cluster level. For algorithmic items, cluster by underlying instance family or generator seed. Log the effective number of independent clusters.

## Repeats: what “20 runs” means

Separate three sources of uncertainty:

1. **Item sampling:** more independently generated items improve generalization estimates. This is usually the most important source.
2. **Decoding sampling:** multiple random seeds on the same prompt estimate the response distribution for stochastic inference. Use 3 matched samples in the pilot; use 5 if within-item variance is material. Expand to 20 only if the preregistered estimand is a per-prompt success probability or tail risk and the pilot shows 5 is too imprecise.
3. **Serving/model drift:** repeat a fixed canary set after changes in model revision, quantization, batch size, backend, or provider. These are separate conditions, not interchangeable random repeats.

For greedy decoding, rerunning an identical prompt 20 times on a frozen deterministic stack adds little information. Instead, repeat a small canary set across controlled stack settings to estimate the noise floor. If the provider cannot pin a model revision, record endpoint/model string and UTC date; treat date as part of the condition.

Do not count 20 generations of one item as 20 independent items. Analyze paired outcomes with item-level clustering and report both item uncertainty and decoding variability.

## Models and controls

Use three open-weight families for the behavioral panel, selected to vary training and architecture while keeping each checkpoint within a documented, reproducible serving path. Use instruction-tuned checkpoints for the primary user-facing behavior question. Pin revision, tokenizer, chat template, reasoning mode, precision, inference engine, batch size, and maximum output tokens. A closed model may be included as a fourth external anchor, but not in mechanistic claims.

Freeze a primary inference mode. If reasoning-mode models offer a think/non-think control, treat mode as a planned within-model factor, not an undocumented prompt tweak. Use deterministic decoding for the primary paired contrast, then a separate stochastic robustness condition if resources permit.

## Analysis and reporting

- Primary diagnostic comparison: held-out predictive performance of the diagnostic model versus the canonical-accuracy/difficulty baseline. Also report within-item paired correctness differences by transform, restricted to canonical-correct items for retention, and unconditional accuracy.
- Use cluster bootstrap or a mixed-effects logistic model with item and generator-cluster effects; include model × transform interaction.
- Report raw counts, denominators, effect sizes, 95% intervals, and exact protocol. Correct for the frozen family-level primary tests.
- Report every failed, excluded, and below-floor cell. Parser failures count as invalid, with a sensitivity analysis separating parsing from reasoning.
- Separate confirmatory from exploratory analyses. No post-hoc relabeling of transforms or thresholds.
- Preserve raw prompts and responses append-only; regenerate all summaries from them.

## Stage gates

- **G0: instrument validity.** Gold answers round-trip through independent verifiers; every transformation preserves or recomputes gold as declared; no unresolved generator/parser defects.
- **G1: measurement and prediction.** Indicators are repeatable and valid enough to estimate; the held-out predictive comparison is reported whether positive or null, with parsing, floor/ceiling, and stack noise assessed.
- **G2: exposure calibration.** Proposed exposure indicators predict randomized known membership on held-out items with preregistered discrimination and calibration; otherwise drop retrieval/computation labels.
- **G3: mechanism.** Candidate internal signal predicts item-level behavior on the same manipulation; causal intervention changes behavior in the predicted direction with matched random/control interventions.
- **G4: intervention/development.** Test whether surface-diverse post-training improves held-out invariance at matched canonical accuracy, then use checkpoints to locate when it emerges.
