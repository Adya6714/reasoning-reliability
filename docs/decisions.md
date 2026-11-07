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
| 2026-10-29 | Pain-point analysis closed for benchmark selection: master table of 17 checkable failure types from 5 sweeps in `research-vault/09_Test_Menu_and_Selection.md` | Evidence base for benchmarks and dimensions; failure discussion continues separately |
| 2026-10-29 | Added candidate dimension: goal completion | Rank 5 failure (grade A, 9 sources); checkable; clear fix; benchmark gap |
| 2026-10-29 | Added candidate dimension: constraint adherence (content rules separate from format rules) | Rank 3 failure (grade A, 11 sources); distinct from inhibition; goal-neglect theory |
| 2026-10-29 | Coordination with another actor is out of scope | Different research question; needs simulated user (judge noise); mostly system design; single-model part covered by sharded-task tests |
| 2026-10-29 | Eval design rules added: match number magnitude in twins, include structure-changing edits, check puzzle solvability and token limits, hold harness and format fixed | arXiv gap sweep (GSM-Symbolic re-evaluation, MATH-Perturb, Illusion of Thinking critique, aider) |
| 2026-10-30 | 8 root abilities with 4-level ladders adopted as the dimension spine; profile = ladder breaking points | 17 failure types too many to study directly |
| 2026-10-30 | Eval suite: 5 profiling families + hidden deterministic tool-use sandbox | Tests transfer from cheap tasks to agent tasks |
| 2026-10-30 | GSM-Symbolic not used as a base (CC-BY-NC-ND); own templates on GSM8K (MIT) | Licence |
| 2026-10-30 | Bifactor is the main factor model; 2PL baseline | Confirmatory, tagged items; tests CogArena risk directly |
| 2026-10-30 | Power and null simulations required before the main run | Know recovery threshold and false-positive rate |
| 2026-10-30 | Harness check uses Kendall's tau, not W | Only two rankers |
| 2026-10-30 | ADeLe-style profile is an explicit part of Baseline 2, on occurrence and failure type | Strongest prior baseline |
| 2026-10-30 | Instruction drift run as its own experiment: 3 levels x thinking on/off | v1 confound becomes a measured factor |
| 2026-10-30 | Stage 3 pass bars fixed (probe +0.05 AUROC, patching 50% from <=3 layers, steering > 95th pct random) | Pre-registered success criteria |
| 2026-10-30 | Stage 4 uses matched baseline, strong baseline and mismatch control | Shows targeting matters |
| 2026-10-30 | Repeated runs start at k=5 with pre-registered adaptive expansion (replaces k=3) | Better per-item estimates near threshold |
| 2026-11-04 | Headline moves to diagnose → localize → fix → verify → generalize; mech interp is central | Nov 4 discussion; prediction becomes supporting checkpoint |
| 2026-11-04 | Stage 0 frontier sanity check mandatory (L1 to L3 on current frontier) | Confirm ladders still break models people use |
| 2026-11-04 | Stages after measurement still gate on RQ1, not RQ3 | Keep localize/fix useful if prediction is null |
| 2026-11-04 | First demo narrowed to state loss and looping (proposed) | Focused end-to-end story; not all 17/8 at once |
| 2026-11-04 | Reliability front-end: query rewrite + runtime monitor + adaptive compute | Product direction; research supplies per-model diagnosis |
| 2026-11-04 | Long-horizon memory (Family G) proposed, not finalized | Multi-session changing facts; R1, R3, R7 |
| 2026-11-04 | Closed/frontier panel expanded (Opus, Fable, Astra-class, Gemini examples) | Stage 0 + deployment relevance; exact strings TBD |
| 2026-11-04 | GLM treated as open-weight frontier (not API-only) | Performance, not access mode, defines frontier here |
| 2026-11-04 | Fix-first pilot mandatory early | If generic fixes solve almost everything, pivot |
| 2026-11-04 | Instruction drift is reference effect size (3 levels × thinking on/off) | Yardstick for later variants |
| 2026-11-04 | Demand tagger marked open challenge | Needed for load-rating product claim |
| 2026-11-04 | Docs and configs updated to v3; root `research_design.md` is overview only | Absorb Nov 4 mental model into `docs/` |
| 2026-11-07 | Clean Mermaid set in `docs/flowcharts.md`; raw paste kept as `flow_chart.md` pointer | Flowcharts for docs, README, and site |
