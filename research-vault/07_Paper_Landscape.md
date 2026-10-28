---
title: Paper landscape by research dimension
aliases: [Paper map, Literature landscape]
tags: [literature, research-map]
---

# Paper landscape by research dimension

This is the working map of papers you named and the closest papers found for those areas. It is a reading map, not a claim that this is an exhaustive systematic review. The dimension names are provisional. Open a citation link to visit the paper; use the local note link when we create a full review note. For your own thoughts, use the **My notes** prompts under each entry or the personal-notes section in the linked paper note.

## 1. Dependence: wording, format, distractors, and counterfactuals

### GSM-Symbolic (Mirzadeh et al., 2024)

- [Paper](https://www.alphaxiv.org/abs/2410.05229) · [arXiv](https://arxiv.org/abs/2410.05229)
- Studies generated variants of grade-school math problems, including changed values and added clauses. Its results motivate testing stability across controlled variants, but a fresh numeric instance does not by itself prove computation; a model can learn the generator's procedure.
- **My notes:** What exact transformation seems most diagnostic? Which results could be explained by benchmark/task familiarity?

### GSM-Plus (Li et al., 2024)

- [Paper](https://www.alphaxiv.org/abs/2402.19255) · [arXiv](https://arxiv.org/abs/2402.19255)
- A broad robustness evaluation of math problem solvers under multiple perturbation types. Read the paper to record each perturbation, validity procedure, and item count before reusing any probe.
- **My notes:** Which perturbation families overlap with Dependence? Which test attention to changed constraints rather than invariance?

### Structured perturbation and failure profiles (Golsefid, 2026)

- [Paper](https://www.alphaxiv.org/abs/2608.22138)
- A graded, multi-family stress test using 100 GSM-Symbolic seed items expanded to 4,473 validity-gated cases, evaluated on four models. It reports per-family degradation and failure behavior. This is close prior work for a broad behavioral profile; its study is limited to one task family and relies partly on automated validity judges.
- **My notes:** What should we improve beyond adding more perturbation families? How can our tests avoid using one seed benchmark as the whole domain?

## 2. Knowledge, skill profiles, and cognitive diagnosis

### Beyond Scores: Diagnostic LLM Evaluation via Fine-Grained Abilities (2026)

- [Paper](https://www.alphaxiv.org/abs/2604.12191) · [arXiv](https://arxiv.org/abs/2604.12191)
- Proposes a 35-dimension mathematics ability taxonomy and multidimensional item-response modeling; its abstract reports ability-profile estimation and prediction of held-out item performance across 41 models. This directly overlaps the broad idea that scalar accuracy hides ability profiles. It measures fine-grained task abilities; that does not automatically establish behavioral processes such as planning or retrieval.
- **My notes:** How are the 35 dimensions defined and assigned? Is the holdout by items, task family, or benchmark? Do profiles predict failures beyond general ability?

### SkillEval: Learning Interpretable Ability Profiles via Cognitive Diagnosis Models (2026)

- [Paper](https://www.alphaxiv.org/abs/2610.28767) · [arXiv](https://arxiv.org/abs/2610.28767) · [Code](https://github.com/berkearda/skilleval)
- Learns skill clusters from questions and applies cognitive-diagnosis models across MATH, BBH, GPQA, MuSR, and IFEval. Its abstract claims prediction on unseen items and downstream model routing. This is especially close to profile-based prediction; the full paper notes that item-derived skills are available for held-out items, making the test transductive with respect to the item bank, and reports limits on transfer to unseen benchmark domains.
- **My notes:** Which splits are genuinely out of distribution? How stable are skill labels and cluster assignments? What evidence separates a learned ability profile from item difficulty?

### Scalable Text-Embedding-Informed Cognitive Diagnosis (2026)

- [Paper](https://www.alphaxiv.org/abs/2603.14676) · [arXiv](https://arxiv.org/abs/2603.14676)
- Adapts cognitive-diagnosis models to large LLM benchmark item pools and uses text embeddings to inform item-skill associations; demonstrates on MATH Level 5. This is prior art on latent skill profiles and psychometric diagnosis, not direct evidence about internal reasoning processes.
- **My notes:** What assumptions are made by the Q-matrix and latent skill model? How are learned attributes validated independently?

### MathCog: diagnosing students' skills from math work (2025; revised 2026)

- [Paper](https://www.alphaxiv.org/abs/2504.00843) · [arXiv v2 PDF](https://arxiv.org/pdf/2504.00843v2)
- Distinguish this from model self-diagnosis: MathCog evaluates whether LLMs can diagnose a student's cognitive skills from handwritten work. The reported dataset contains 639 student responses to 110 middle-school problems, with teacher annotations; newer version reports 3,036 diagnostic verdicts. Useful for evidence-grounded diagnosis and uncertainty, but not a direct benchmark of an LLM's own reasoning dimensions.
- **My notes:** How are labels defined and adjudicated? What counts as evidence for a skill? What false-confidence pattern matters for our scoring?

### GAUSS: Benchmarking Structured Mathematical Skills (2025)

- [Paper](https://www.alphaxiv.org/abs/2509.18122) · [arXiv](https://arxiv.org/abs/2509.18122)
- Profiles mathematical performance across 12 named skill dimensions grouped into knowledge/understanding, problem solving/communication, and meta-skills/creativity. Treat its “underlying skills” interpretation as a claim to evaluate, not as established by labeled score differences alone.
- **My notes:** What is the item-to-skill assignment method? Are the dimensions discriminable and predictive on held-out task families?

## 3. Discovery versus execution of the key idea

### The Missing Primitive (2026)

- [Paper](https://www.alphaxiv.org/abs/2610.02191) · [arXiv](https://arxiv.org/abs/2610.02191) · [Project/code](https://taco-group.github.io/Math-Primitive/)
- Introduces mathematical primitives and PRIM's Discovery, Generation, Digestion, and Execution dimensions; reports that final-answer accuracy hides different profiles and that supplying a correct primitive can unlock execution. This overlaps structural understanding and diagnostic profiles, with a different task-specific operationalization.
- **My notes:** How are primitives authored and judged? Does prompted access to a primitive measure independent discovery? What transfers beyond mathematics?

## 4. Faithfulness of written reasoning

### Measuring Faithfulness in Chain-of-Thought Reasoning (Lanham et al., 2023)

- [Paper](https://www.alphaxiv.org/abs/2307.13702) · [arXiv](https://arxiv.org/abs/2307.13702)
- Studies whether chain-of-thought explanations reflect answer-generating behavior using interventions such as truncation and input modifications. It provides methodological grounding for testing rationale faithfulness; consistency alone is weaker than interventions.
- **My notes:** Which interventions give the clearest causal evidence? How do they control for prompt disruption and answer changes caused by the intervention itself?

### Language Models Don't Always Say What They Think (Turpin et al., 2023)

- [Paper](https://www.alphaxiv.org/abs/2305.04388) · [arXiv](https://arxiv.org/abs/2305.04388)
- Demonstrates unfaithful chain-of-thought explanations under biasing prompt conditions. Relevant to the limit on treating the model's stated rationale as a transparent report of its internal process.
- **My notes:** What are the exact bias interventions? What claims are behavioral versus mechanistic?

## 5. Calibration, uncertainty, and abstention

### Language Models (Mostly) Know What They Know (Kadavath et al., 2022)

- [Paper](https://www.alphaxiv.org/abs/2207.05221) · [arXiv](https://arxiv.org/abs/2207.05221)
- A foundational study of model confidence and knowledge uncertainty. Useful starting point for separating stated confidence from correctness and for measuring calibration.
- **My notes:** What confidence elicitation methods work? How sensitive are findings to answer format and task type?

### TruthfulQA (Lin et al., 2022)

- [Paper](https://www.alphaxiv.org/abs/2109.07958) · [arXiv](https://arxiv.org/abs/2109.07958)
- A benchmark of questions designed to elicit common falsehoods and measure truthfulness. It is relevant to confident error and abstention, but not a general calibration measure or a clean test of reasoning ability.
- **My notes:** How does truthfulness scoring differ from selective prediction or calibrated abstention?

### Unanswerable questions for SQuAD (Rajpurkar et al., 2018)

- [Paper](https://www.alphaxiv.org/abs/1806.03822) · [arXiv](https://arxiv.org/abs/1806.03822)
- Introduces answerable and unanswerable question evaluation, an important design precedent for testing when a system should abstain.
- **My notes:** How can answerability be manipulated while keeping paired questions comparable?

## 6. Cognitive-psychology batteries

### CogBench: a large language model walks into a psychology lab (Coda-Forno et al., 2024)

- [Paper](https://www.alphaxiv.org/abs/2402.18225) · [arXiv](https://arxiv.org/abs/2402.18225)
- Adapts seven cognitive-psychology experiments into ten behavioral metrics and evaluates 35 LLMs. This is the likely CogBench meant by the cognitive-psychology battery reference; other unrelated projects also use the name CogBench.
- **My notes:** Which original constructs survive the text-prompt adaptation? How are repeated trials and model versions handled? Do measures predict outside the battery?

### CogArena: cognitive-ability structure in LLMs (Hou et al., 2026)

- [Paper](https://www.alphaxiv.org/abs/2607.24999) · [arXiv](https://arxiv.org/abs/2607.24999)
- A 13-paradigm, multimethod study of five proposed cognitive groupings. It evaluates 55 open-weight models, then runs a separate frozen study across 12 models from six families; the paper reports that its preregistered evidence did not establish stable five-dimensional profiles or improve held-out-family prediction. This is highly relevant to our construct-validity and predictive-validity design, including the possibility that proposed dimensions fail.
- **My notes:** How were groupings and interventions defined? How was the held-out-family test constructed? What should our study inherit or avoid?

### CogArena: interactive behavioral experiments for multimodal agents (Fernandez et al., 2026)

- [Paper](https://www.alphaxiv.org/abs/2610.36484) · [arXiv](https://arxiv.org/abs/2610.36484) · [Code](https://github.com/kiante-fernandez/CogArena)
- A separate benchmark with the same name: ten browser-based behavioral paradigms using visual interfaces. It evaluates four multimodal models, ten runs per task, and scores task completion, task accuracy, and recovery of human behavioral signatures separately. Useful for future systems-level work, but its agent/interface demands differ from our initial text-model probes.
- **My notes:** Which paradigms isolate planning, learning, memory, or calibration? How do task non-completion and model behavior get separated?

## 7. User-provided resources on interpretability

These are resources, not all peer-reviewed papers. Use them for orientation and record primary research citations before using a claim in the paper.

- [AlphaXiv interpretability guide](https://www.alphaxiv.org/guides/interpretability)
- [Dario Amodei, “The Urgency of Interpretability”](https://darioamodei.com/post/the-urgency-of-interpretability)
- [Goodfire: Already Clean](https://already-clean.goodfire.com/)

**My notes:** Which claims are conceptual, which are empirical, and which primary papers should we read next?

## 8. Additional links you supplied earlier

- [POSTTRAINBENCH](https://www.alphaxiv.org/abs/2603.08640) — [local note](papers/Rank2026_PostTrainBench)
- [Competence-Based Evaluation](https://www.alphaxiv.org/abs/2610.22894) — [local note](papers/Jiang2026_CompetenceBasedEvaluation)

## Working comparison table

| Dimension / area | Closest references in this map | What they already establish | Candidate opening for our project |
|---|---|---|---|
| Dependence | GSM-Symbolic, GSM-Plus, Golsefid | Perturbation effects and family-specific degradation | Validated measures that add held-out failure prediction beyond ability |
| Ability profiles | Beyond Scores, SkillEval, Scalable CD, GAUSS, CogArena | Fine-grained profiles can summarize/predict benchmark outcomes; dimension validity is contested | Test whether behaviorally manipulated profiles predict failures under unseen task mechanisms |
| Discovery/execution | Missing Primitive | Accuracy can mask distinct math sub-capabilities | Cross-family validity and separation from prerequisite knowledge / general ability |
| Faithfulness | Lanham, Turpin | Verbalized CoT can be unfaithful; interventions are needed | Predictive value of faithfulness measures for specific downstream failure types |
| Calibration/abstention | Kadavath, TruthfulQA, SQuAD 2.0 | Confidence and answerability are measurable but distinct | Calibration under controlled reasoning difficulty and exposure shifts |
| Cognitive batteries | CogBench, two CogArena papers | Human-derived tasks can yield profiles, but adaptation and construct validity matter | Oracle-scored tasks and preregistered cross-family prediction |

## My overall notes

### Papers to read first

1. 
2. 
3. 

### Claims that changed my view

-

### Questions to discuss next

-
