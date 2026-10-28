# Benchmark policy

## What the study measures

The primary target is diagnostic predictive validity: whether behavioral measurements predict a model's item-level failures on held-out tasks beyond canonical accuracy, estimated ability, difficulty, and domain. Correctness on matched canonical and transformed presentations is one source of indicators; it does not by itself identify how a model arrived at its answer. Include both answer-preserving variants and minimal answer-changing counterfactuals, so that ignoring an altered constraint is not mistaken for robustness.

## Three evidence tiers

1. **Primary: private generated task families.** Build deterministic generators with exact solvers/verifiers. Hold back generator seeds, parameter ranges, and a final test split. Generate test items after the prompt, model revisions, exclusions, outcomes, and analysis plan are frozen. Keep train/dev/test seeds disjoint, and hold out at least one whole family from probe development for the main transfer test. The task families should differ in the computation they require, not merely in story wording.
2. **Secondary: fresh human-authored tasks.** Use a small, expert-verified set to test whether results transfer beyond generator style. Keep authoring instructions, source provenance, adjudication, and answer keys private until the model roster is frozen.
3. **Context only: public benchmark anchors.** GSM8K, MATH, AIME, and existing planning/algorithmic sets can show continuity with prior work. Their scores are not clean evidence against memorization. Report known exposure risk and avoid using them to calibrate retrieval labels.

## Is PostTrainBench appropriate?

PostTrainBench (Rank et al., 2026) asks whether an AI agent can post-train a provided base model within a bounded compute budget. It is a benchmark for AI research/post-training agents, not a direct benchmark of a model's reasoning reliability. Its underlying task datasets can be used as secondary capability anchors, but they cannot replace a controlled behavioral battery. The benchmark's authors use held-out test splits and restrict test-set training, while their paper also documents reward-hacking routes; therefore, any reuse needs its own contamination and protocol audit.

## Selection rubric

Score each candidate task family before collecting outcomes:

| Criterion | Required question |
|---|---|
| Construct fit | Does the task require a clearly stated operation relevant to reliable reasoning? |
| Exact ground truth | Can an independent solver or formal verifier determine correctness? |
| Transform validity | Can we change the surface while preserving the underlying problem and answer? |
| Contamination resistance | Can we generate private items and keep test instances unavailable before evaluation? |
| Difficulty coverage | Can parameters create easy, medium, and hard items without changing the target operation? |
| Family diversity | Does it add a distinct reasoning operation rather than another paraphrase of the same one? |
| Practicality | Can humans audit samples and can the benchmark be run at the available budget? |

Include a family in the primary suite only if it passes all but the practicality criterion; practicality determines scale, not construct validity. Do not call an item “uncontaminated” merely because exact n-gram search found no match. Use “freshly generated with no known public exposure” and preserve the generator commit and seed manifest.

## Proposed first three families

- Arithmetic with generated quantities and multiple operation structures. Use GSM8K only as a legacy comparison, not as the source of primary items.
- Graph optimization with generated weighted graphs and exact shortest-path / scheduling solvers.
- Planning with generated state-transition tasks and executable action validators.

Before finalizing, test all families for solvability, verifier round-trip, difficulty range, and enough model accuracy to estimate retention. Keep a family-specific canonical accuracy floor; report below-floor results as capability-limited rather than treating zero retention as a strategy signal.

## Objective versus subjective outcomes

Prefer programmatic gold answers and execution/state validators for the primary reasoning outcomes. If an outcome requires judgment (for example, rationale quality or behavioral-signature similarity), define the rubric with domain expertise, calibrate annotators, measure agreement, and audit a sample with human ratings. LLM judges can support inexpensive screening, but do not treat them as ground truth without independent validation. Keep model capability, parser/verifier success, and subjective quality as separate outcomes.
