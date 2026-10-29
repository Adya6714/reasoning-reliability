# Decision log

One line per decision: date, decision, reason. Newest at the bottom. `docs/research_design.md` is the main design document; this log records each change.

| Date | Decision | Reason |
|---|---|---|
| 2026-10-28 | v1 archived; every problem bank regenerated | Three confounds in v1 raw logs (instruction drift, Blocksworld reversal difficulty, n=1) |
| 2026-10-28 | New repo `reasoning-reliability` built from scratch, porting verified v1 modules with tests | Clean provenance |
| 2026-10-29 | `docs/research_design.md` is the single design document; old benchmark, novelty and reference docs merged into it or into `docs/reading_list.md` | Earlier docs had diverged |
| 2026-10-29 | Compute: JarvisLabs (L4 for small models, A100 80GB main, H100 only if needed) | Removes the T4 limit; supports batch-invariant vLLM |
| 2026-10-29 | New model roster (see `configs/models.yaml`); Llama 4 Scout and Gemma 4 31B dropped | Size (Scout 109B total) and no matching interp tools (Gemma 4) |
| 2026-10-29 | Pilot roster: Qwen 27B (thinking on and off), OLMo 3 7B Instruct, Jev | Small, contrast-creating pilot |
| 2026-10-29 | Closed models are behaviour-only | No internals, no training control, versions can change |
| 2026-10-29 | Jev used as a recognition baseline and later router, not as a judge | Fixed-option model, no reasoning, closed |
| 2026-10-29 | At least 5 profiling families plus 1 hidden family | Holding out one of 3 families leaves too little to profile |
| 2026-10-29 | Items: plan 250 to 300 per family at k=3, plus 60 per family at k=20; final from power simulation | Power simulation in planning chat |
| 2026-10-29 | Decoding: temperature above 0 at model-card settings as primary; small greedy check set; thinking on/off as a planned factor | Thinking models are meant to be sampled; v1 confound |
| 2026-10-29 | Accuracy band 30 to 80% per model, tuned by difficulty knobs (replaces 0.50 floor) | Room to see drops and gains |
| 2026-10-29 | Dimensions are provisional candidates; 2 chosen after the screening pilot | Old four came from v1 probes, not theory or data |
| 2026-10-29 | Runner deferred to Block C; requirements written in `docs/runner_requirements.md` | Runner depends on frozen design |
| 2026-10-29 | Obsidian vault simplified: papers/, clips/, one template, Dataview only | Minimal maintenance |
| 2026-10-29 | Stages 2, 3 and 4 gate on RQ1 (reliable contrast), not RQ3 (prediction win) | Keeps the project useful if the headline fails |
| 2026-10-29 | If Baseline 3 does not win: report the pre-registered result; check measurement reliability, then transfer; pivots are reliability engineering, eval suite as product, publish the null | Plan for all outcomes |
| 2026-10-29 | Stage 2: OLMo 3 7B main; replicate controlled exposure on one more open family; Pythia/LLM360 optional; corpus search on closed-data models is descriptive only | Show the effect is not OLMo-specific |
| 2026-10-29 | Stage 3 method ladder: probes, patching, compare 2 to 3 lenses on one target, steer/ablate with random-direction controls, attribution graphs if tooling fits | Avoid doing every method shallowly |
| 2026-10-29 | The eval suite is a named contribution of Paper 1 | It is a real resource; novelty also needs the predictive finding |
| 2026-10-29 | Screening pilot logs five confidence signals (written, k-sample agreement, gold log-prob, Jev, rule-based); Brier and AUROC per family, split famous vs fresh twin | Uncertainty measured for free; misplaced-retrieval check |
| 2026-10-29 | Jev distractors come from the generator, never from evaluated-model samples; agreement on samples 1 to k, correctness on held-out sample k+1 | Keep signals independent |
| 2026-10-29 | Added hypothesis H10 (question-only vs mid-reasoning correctness signals) | From "No Answer Needed" GSM8K caveat |
| 2026-10-29 | Keep package name `src/reasoning_reliability/` (not `src/rvc/`) | Already exists in the repo |
