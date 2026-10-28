# Novelty and routes to more reliable reasoning

## The question

Neuron atlases, sparse autoencoders (SAEs), probes, and steering tools make internal model activity easier to inspect and manipulate. This project asks a different, complementary question: can we create reliable ground truth about *which task conditions produce which reasoning failures*, then test whether internal signals predict those failures and whether targeted interventions reduce them?

The distinction is a research hypothesis, not a novelty claim already established by the repository. Prior work may already connect behavioral labels to internal mechanisms. The related-work review must check task-conditioned failure prediction, causal localization, and intervention studies before the paper claims this gap.

## How this differs from a neuron atlas

An atlas can sweep units and collect model responses to a prompt, then organize or label those responses. That is useful for discovery. It does not, by itself, establish that a unit explains a specific reasoning failure, predicts failure on held-out problems, or offers a reliable fix.

The project should supply a validated behavioral target:

1. Define task families with executable answers and controlled conditions (e.g., long state tracking, a mid-task rule change, greedy traps, or misleading hints).
2. Label success and failure from the environment/verifier, and distinguish error types without treating the model's own rationale as ground truth.
3. For Source/exposure questions, randomize known training exposure; do not call a problem “memorized” from familiarity or benchmark contamination guesses alone.
4. Ask whether internal activations predict these labels on held-out items and conditions.
5. Test candidate mechanisms with matched controls, dose response, reversals/rescue where feasible, and side-effect measurements.
6. Test whether a diagnosis-selected intervention improves private held-out reliability, not only the probe score.

The plausible contribution is the validated link among task-level failure labels, internal signals, and a tested fix. Whether that is novel must be established by a paper-by-paper literature review. The relevant causal chain is **diagnose → predict → intervene → verify generalization**.

## Qwen neuron-site example: scope and caveat

The user-provided example describes a site that sweeps Qwen3-8B's MLP neurons in both directions, asks one identity question, and collects 34,220 persona-like labels from 884,736 neuron-direction responses. It also reports that labels were produced by Claude Haiku without human checking. These counts and methodological details are recorded here as **user-supplied and pending direct verification**: the site was not readable through the available browser, so check its own methods/limitations page and save a dated snapshot or notes before citing those numbers in a manuscript.

Even if those details are accurate, the experiment answers a narrower question than this project: how outputs change under a large sweep of interventions for one prompt. It does not establish which units matter for correctly solving independently verified reasoning tasks, whether they generalize across problem families, or whether steering them improves reliability without harming other tasks. The two projects can be complementary: an atlas supplies candidate units and tooling; a reliability study supplies task labels and outcome criteria.

## Routes to more reliable reasoning

These are intervention families to evaluate, not a claim that any single route is universally effective. Some can be applied without diagnosing a particular weakness; diagnosis is especially useful for selecting targeted scaffolds, training, and monitoring.

| Route | Examples | Does targeted diagnosis help? | Evaluation question |
|---|---|---|---|
| Inference-time sampling | Self-consistency, multiple candidates, majority vote | Usually not required to try it; useful to know which failures sampling resolves | Does success rise with samples, and at what compute/latency cost? |
| Verifiers | Exact code checks, symbolic checks, a second model | Partly: choose what can be checked and detect verifier blind spots | Does verification reject wrong answers without rejecting valid ones? |
| Tools | Calculator, code execution, search, domain solver | Not always for access; diagnosis helps route tasks to the right tool | Does the tool reduce errors, including when it returns bad or stale output? |
| Scaffolds | Explicit planner, external state ledger, search, checklists | Yes: match scaffold to planning, state-tracking, or updating failures | Does the targeted scaffold help more than a generic prompt, on held-out tasks? |
| Training | RL with verifiable rewards, process supervision, diverse examples, representation/world-model objectives (including JEPA-style ideas) | Yes: identify target failures and prevent regressions | Does training improve the target failure and preserve unrelated skills at matched budget? |
| Monitoring | Confidence/uncertainty flags, activation probes, runtime monitors | Yes: define a calibrated signal and action policy | Does the signal predict errors under distribution shift, and does acting on it help? |
| Steering or model editing | Activation steering, feature interventions, targeted parameter updates | Yes: identify a behavior-linked candidate and controls | Does intervention causally improve the target behavior, reverse as predicted, and avoid side effects? |

Organize these by *where they act*: inference procedure, external system/harness, training process, or model internals. Compare model and harness separately for agentic settings. A mitigation that improves end-task success may still increase cost, latency, or another error type, so log those outcomes too.

## Novelty checks before making a claim

- Search for prior work that uses executable task-level failure labels to predict internal activations on held-out items.
- Search for causal interventions tied to specific reasoning failures, not only feature/persona changes or benchmark accuracy.
- Check whether prior work already tests targeted diagnosis-to-scaffold or diagnosis-to-training improvements.
- State precisely what the atlas, SAE, and neuron-steering baselines can already do; do not claim interpretability researchers lack behavioral targets without evidence.
- Make the contribution conditional on results: a null predictive or intervention result is informative and must not be reframed post hoc.

## Reading links and my notes

- [Qwen neuron persona atlas (primary site; verify before citing)](https://qwen-neurons-site.vercel.app/)
- [Self-Consistency Improves Chain of Thought Reasoning in Language Models](https://arxiv.org/abs/2203.11171) — inference-time sampling example.
- [Let's Verify Step by Step](https://arxiv.org/abs/2305.20050) — process supervision / step-verification example.
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) — reasoning plus external tool interaction example.
- [Trust but Verify! A Survey on Verification Design for Test-time Scaling](https://arxiv.org/abs/2508.16665) — verifier taxonomy lead; survey, not efficacy evidence for every verifier.
- [A Survey of Frontiers in LLM Reasoning: Inference Scaling, Learning to Reason, and Agentic Systems](https://arxiv.org/abs/2504.09037) — broad taxonomy lead, not claim-level evidence for any one method's efficacy.

### Notes to add

- Which prior paper most directly overlaps with this proposed contribution?
- What is the strongest claim the data could support, including if the result is null?
- Which one diagnosis-to-fix pathway is feasible on the available GPU and time budget?
-
