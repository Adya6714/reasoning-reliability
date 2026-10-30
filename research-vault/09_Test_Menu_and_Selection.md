---
title: Test Menu and Selection Plan
aliases: [Candidate probes, How to choose tests, Pain points, Master pain-point table]
tags: [research-design, probes, evaluation, pain-points]
---

# Test menu and selection plan

The full method, controls, and prioritization logic are maintained in [[../docs/research_design]]. This page holds the real-world evidence (pain points) and the test selection that follows from it. The candidates are not all confirmed dimensions; pilot evidence may show overlap, poor measurement, or no predictive value.

![[../docs/research_design#Test menu and how to choose]]

---

## Pain points: master table

Merged from five sweeps (October 2026):

- [[clips/sweep_taxonomies_2026-10]]: 13 published taxonomies (MAST, METR, tau-bench, SWE-bench analyses and others), referred to as T1 to T13
- [[clips/sweep_arxiv_gaps_2026-10]]: 14 arXiv papers filling planning, number-change, overthinking and memorization gaps, referred to as AR + item number
- [[clips/sweep_x_2026-10]]: 44 X posts, referred to as X + item number
- [[clips/sweep_github_hn_reddit_2026-10]]: 12 GitHub, HN and Reddit items, referred to as GH
- [[clips/sweep_lesswrong_2026-10]]: 16 LessWrong / Alignment Forum posts, referred to as LW + post ID

**Rules used**

- Only failures a program can check are ranked. Others are listed under "Excluded".
- **Evidence grade:** **A** = measured in at least 2 independent sources, at least one high-trust · **B** = measured in 1 source, or many concrete reports without numbers · **C** = anecdotes only.
- **Independent sources** = distinct papers, posts or reporters. Same-author posts count once. An item can support two failure types.
- Ranked by grade first, then number of independent sources.
- Counts are reports found, not how often failures happen in the world.

### Ranked table

| Rank | Failure type | Plain meaning | Grade | Sources | Strongest evidence | Model or harness | Dimension | How to test by program | Existing benchmark (status) |
|---:|---|---|:---:|---:|---|---|---|---|---|
| 1 | Loses context or state | Forgets earlier requests, tool results or what has changed | A | 17 | MAST history loss 2.8% + reset 2.2% (1642 traces); tau-bench drops early requests; Arbor: PlanBench chains accumulate infeasible steps (AR2); Fermat agents lost shared state (X36) | Mostly harness in real use; model in long tasks | State tracking | Long sequences of state updates, then query the state; items needing an earlier tool result | tau-bench compound tasks (reward bug noted). **No fresh long-state benchmark: gap** |
| 2 | Says one thing, does another | Written reasoning or claims do not match what drove the answer or what was done | A | 14 | MAST reasoning-action mismatch 13.2%; 11-model hint replication, verified (LW AoBTiL7); OLMo-3 stage study, verified (LW ywrdwT); premature confidence (X46) | Model | Faithfulness (side measure) | Planted hints on exact-answer items; compare claimed actions with the tool-call log | Chen et al. hint setup on GPQA / MMLU-Pro (with-CoT arm near saturated) |
| 3 | Breaks stated rules | Ignores task, policy or format constraints | A | 11 | MAST disobey task spec 11.8%; tau-bench airline policy removed: 33.2 to 10.8; aider edit format 20% to 61%, verified; DSPy schema failures 37% to 2.4% with grammar | Both (format rules partly harness) | Constraint adherence | Tasks with explicit rules, including counter-intuitive ones; a validator checks every rule | tau-bench airline; aider benchmarks. **Counter-intuitive rules: gap** |
| 4 | Loops after failure | Repeats failed or already-completed actions | A | 10 | MAST step repetition 15.7%; METR repeating failed actions 12/31; Llama calls the same tool 25 times (GH #49). Caveat: repetition also in 59 to 71% of successful traces (T13) | Model | Self-correction | Environment where the obvious first action always fails; count repeats that do not change state | **None built for it: gap** |
| 5 | Stops early or misjudges "done" | Quits early, claims completion that did not happen, or keeps working after the goal is met | A | 9 | MAST unaware of termination 12.4% + premature termination 6.2%; METR premature abandonment 8/31 and 16/32; tau-bench partial resolution 19%; claimed edits with no tool call (GH #67847) | Model | Goal completion | Compound tasks with N goals and a state validator; compare "done" claim with validator; tasks already done at the start | tau-bench, HCAST. **Nothing scores claim vs actual state: gap** |
| 6 | Overthinking | Correct early then keeps exploring; inverted-U length vs accuracy; abandons early from "token anxiety" | A | 9 | Illusion of Thinking (AR11), with critique showing token-limit artifacts (AR12); extra thinking drops 87.3% to 70.3% (AR13); inverted-U curves (AR "When More is Less"); Qwen3.5 / QwQ loops (GH) | Model, plus sampler config | Uncertainty (efficiency), self-correction | Accuracy vs thinking-token budget on solvable items; rate of hitting max tokens; model-card sampler settings | None standard. **Controlled length-budget test: gap** |
| 7 | Surface or number-change fragility | Fails when only names, numbers or format change | A | 8 | Numeric remapping GSM8K drops 12 to 26 pp on strong open models (AR8); GSM-Ranges +14 pp logical errors with larger numbers (AR7); **caveat:** re-evaluation finds only 8/20 models keep a significant effect, half explained by larger numbers (AR6) | Model | Structural understanding | Answer-preserving rewrites and schema-preserving number remaps by code, **number magnitude matched** in twins | GSM-Symbolic (contamination risk on GSM8K roots) |
| 8 | Misplaced retrieval | Reuses a remembered answer, skill or state where it does not fit | A | 8 | MATH-Perturb hard set: o1-mini drops 16.49 pp, applies remembered skill without checking fit (AR9); GSM-SEM: some models keep the pre-edit answer (AR10); SWE-Bench+ leakage 32.67%; edits from memory, verified (GH #64171) | Model | Misplaced retrieval | Famous item vs fresh twin with a different answer; structure-changing edits; supplied plausible wrong "known fix" | SWE-Bench+, MATH-Perturb. **Supplied-wrong-fix pairs: gap** |
| 9 | Weak or wrong self-check | Does not verify, or verifies wrongly | A | 5 | Incorrect verification in 66 to 94% of failed vs 14 to 50% of successful traces, the best separator found (T13); MAST no/incorrect verification 17.3% | Model | Self-correction, uncertainty | Give correct and planted-wrong solutions to verify; score verification accuracy | ProgramDev (contamination risk) |
| 10 | Poor or latent plan | Plan looks fine but fails later; greedy first step | A | 5 | Simmer: at most 17% error-free plans, up to 56% latent failures; explicit foresight cuts them up to 72% (AR1); METR poor planning 4/31 and 6/32; PlanBench (AR4) | Model | Planning | Greedy-trap tasks with a lookahead knob; label latent vs immediate failures with a state executor | PlanBench, Mystery Blocksworld. **Public greedy-trap generator: gap** |
| 11 | Wrong reasoning over given data | Right tool or data, wrong computed value or decision | A | 4 | tau-bench wrong argument or info about 55% of failures; METR mental math/reasoning 6/31 and 7/32 | Model | State tracking, structural understanding | Provide data or tool outputs; ask for a computed decision with an exact answer | tau-bench |
| 12 | Early wrong assumption never revised | Commits to an early guess on an underspecified task | A | 4 | Lost in Conversation: 39% average drop single-turn to multi-turn, 15 models, 200,000+ conversations; MAST fail to ask clarification 6.8% | Model | Self-correction, uncertainty | Shard a fully specified task across turns on fresh generated tasks; compare per item | Lost-in-Conversation tasks. **Fresh procedural version: gap** |
| 13 | Follows misleading hints | Takes a planted wrong answer or yields to user pressure | A | 4 | Simple hints followed and hidden by all 11 models, up to +0.38 (LW AoBTiL7, verified); non-monotone across OLMo-3 stages (LW ywrdwT, verified); sycophancy evals (LW WrKL, xFZv, 3ou8) | Model | Inhibition | Planted wrong hint (metadata or user suggestion) on exact-answer items | Perez et al. sycophancy set; Chen et al. hint setup |
| 14 | Tool hallucination or misuse | Invents tools, endpoints, IDs or packages; treats failed or empty results as data | B | 10 | tau-bench hallucinated IDs 0.46 to 6.34 per task; invented endpoint, null read as missing data (X41); Qwen invented URLs with reproducer (X2) | Both | Inhibition, faithfulness | Sandbox tools with fixed schema; check calls against it; plant failing or null returns | BFCL-style tool tests, tau-bench. **Null or failed results: gap** |
| 15 | Distracted by irrelevant cues | Uses a tempting but irrelevant detail | B | 3 | GSM-IC: one irrelevant sentence lowers accuracy for all methods; GSM-NoOp up to 65%, **contested** for newer models | Model | Inhibition | Audited irrelevant clauses (two raters, report kappa) on harder base tasks | GSM-IC, GSM-Symbolic (near-saturated for 2026 models) |
| 16 | Fails at composition depth | Breaks when facts or steps must be chained | B | 2 | Two-hop and three-hop latent reasoning on synthetic facts (LW CdWb, aYtr), both with code | Model | Structural understanding (composition) | Synthetic multi-hop facts with controlled depth | Synthetic two-hop sets (redwoodresearch/sdf-twohop, rgreenblatt/multi_hop) |
| 17 | Confidently wrong | High stated confidence on wrong answers or actions | C | 2 | Replit agent wrongly said rollback impossible (X16); ASIC design agent (X39). Strong literature outside the sweeps (Kadavath; No Answer Needed) | Model | Uncertainty | Five confidence signals vs correctness (`docs/research_design.md` Section 10) | None standard in sweeps |

### Source trace

| Rank | Failure type | Sources |
|---:|---|---|
| 1 | Loses context or state | T1, T3, T8 · AR2, AR3 · GH #10029, #16546, #64171 · X5, X6, X9, X10, X25, X29, X36, X42, X43 |
| 2 | Says one thing, does another | T1, T9 · GH #67847 · X11, X12, X13, X14, X15, X18, X46 · LW AoBTiL7 + ywrdwT (same authors), WAxkA6, ScyXz7, GwvWt |
| 3 | Breaks stated rules | T1, T3 · GH aider #558, aider HISTORY, aider #4716, DSPy #10439 · X1 (and X19, same author), X32, X33, X34, X35 |
| 4 | Loops after failure | T1, T2, T9, T13 · GH langchain-oracle #49, #10029 · X17, X27, X44, X45 |
| 5 | Stops early or misjudges "done" | T1, T2, T3, T9, T10 · GH #67847, HN claimed-done comment · X34, X44 |
| 6 | Overthinking | AR11, AR12, AR13, AR14, When More is Less, Between Under/Overthinking · GH Reddit Qwen3.5, Reddit QwQ · X38 |
| 7 | Surface or number-change fragility | T11 · AR6, AR7, AR8, Readout Shortcut · GH aider #558 · X47 |
| 8 | Misplaced retrieval | T6, T11 · AR9, AR10 · GH #16546, #64171 · LW SCqD · X15 |
| 9 | Weak or wrong self-check | T1, T8, T13 · GH #64171 · X17 |
| 10 | Poor or latent plan | T2, T8 · AR1, AR4 · (AR2 also) |
| 11 | Wrong reasoning over given data | T2, T3, T9 · X41 |
| 12 | Early wrong assumption never revised | T1, T8, T10 · X46 |
| 13 | Follows misleading hints | LW AoBTiL7 + ywrdwT, WrKL, xFZv, 3ou8 |
| 14 | Tool hallucination or misuse | T3, T8, T9 · X2, X3, X4, X7, X41, X48, X49 |
| 15 | Distracted by irrelevant cues | T1 (derailment 7.4%), T11, T12 |
| 16 | Fails at composition depth | LW CdWb, aYtr |
| 17 | Confidently wrong | X16, X39 |

### Excluded (not checkable by program, or out of scope)

| Failure type | Evidence | Why excluded | Where it goes instead |
|---|---|---|---|
| Harness-only failures | Compaction amnesia, session state on one machine, chat template dropping thinking (GH pi #3325), framework version bugs (LangGraph #6731), ctest exit code | Not a model reasoning failure | Stage 4 harness design; label every pain point "model or harness" |
| Role and handoff bugs | MAST role 1.5%, withholding 0.85%, ignored peers 1.9% | System design, multi-agent specific | Out of scope |
| Coordination with another actor | tau2-bench: about 20 points lower in dual-control mode | Out of scope (see `docs/decisions.md`) | Single-model part covered by rank 12 tests |
| Drifts off goal | MAST task derailment 7.4% | Needs a judge to decide "off goal" | Partly covered by distraction tests |
| Eval awareness | 4 LW posts (yTame, E3da, dbBe, B2o6) | Not checkable from answers | Noted as a confound for every eval |
| Reward hacking | METR: 43x more common on RE-Bench than HCAST | Gaming the grader, not reasoning | Eval design rule: attack our own validators |
| Benchmark defects and contamination | SWE-bench Verified: 61.1% tests may reject valid fixes, 38.3% underspecified; SWE-Bench+: 31.08% weak tests; X20 to X23, X30 | Problems with benchmarks, not models | Eval design rules below |
| Vision, product behaviour, security | X26, X40, X47 (safety framing), X50, X51 | Out of scope | None |

### What this changes

**Dimensions** (decided in `docs/decisions.md`, 2026-10-29)

- **Strongest real-world support:** state tracking (rank 1), self-correction (ranks 4, 9, 12), structural understanding and misplaced retrieval (ranks 7, 8), inhibition (ranks 13 to 15).
- **Planning moved up** once arXiv was added (rank 10, grade A). Latent plan failures are the useful label, not only invalid actions.
- **Added:** goal completion (rank 5) and constraint adherence (rank 3).
- **Out of scope:** coordination with another actor.
- **Faithfulness** has lots of evidence (rank 2) but is crowded. Kept as a side measure.
- **Overthinking** (rank 6) depends on token limits and sampler settings. Use solvable items, fixed model-card settings, and length budgets.

**Best gaps for our eval suite** (checkable, real, not covered by a fresh benchmark)

1. Claim vs actual state on compound tasks (rank 5)
2. Loops after a failing first action (rank 4)
3. Fresh long state tracking (rank 1)
4. Counter-intuitive rules (rank 3)
5. Controlled thinking-length budget (rank 6)
6. Supplied plausible-but-wrong fix (rank 8)
7. Public greedy-trap generator with latent failure labels (rank 10)
8. Early assumptions on sharded fresh tasks (rank 12)
9. Null or failed tool results (rank 14)

**Eval design rules from the sweeps**

- Run a null agent (empty, echo, refuse) on every item and require a zero score.
- Attack every validator with wrong solutions before trusting it.
- Iterate tasks until only one outcome is valid (underspecification was 38.3% in SWE-bench).
- Use procedural or post-cutoff items only.
- **Match number magnitude** between famous items and fresh twins, or memorization is confounded with arithmetic difficulty.
- Include structure-changing edits, not only paraphrases.
- Check every puzzle instance is solvable and that answers fit the token limit (the Illusion of Thinking critique).
- Report pass^k (k = 1, 4, 8) and aptitude vs unreliability, not only mean accuracy.
- Hold harness and output format fixed when measuring the model. A format change alone moved aider from 20% to 61%.
- Fix sampler settings per model card; record them.
- Release perturbation sets so others can replicate.

### Status

- **Verified:** LW AoBTiL7, ywrdwT, WAxkA6, ScyXz7; GH aider HISTORY (20% to 61%), Claude Code #64171.
- **Not yet verified:** the 9 must-read X items; T13 verification numbers; most AR items (abstract and skim level); remaining GH and LW items.
- Taxonomies use different definitions; ranks are rough.
- Failure analysis continues in a separate thread; this table is closed for benchmark selection.

---

## Rubric scores and evidence

User impact is pre-filled from the pain-point table (2 = grade A pain point; 1 = grade B or C, or research-only evidence; 0 = no real-world evidence found). Fill the other columns yourself.

| Candidate | User impact (0–2) | Clean measure/control (0–2) | Actionable fix (0–2) | Novelty (0–2) | Feasibility (0–2) | Mechanistic follow-up (0–2) | Total /12 | Evidence / notes |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Answer-changing edits | 2 | | | | | | | Ranks 7, 8 |
| Changed-rule worlds | 2 | | | | | | | Rank 3 (counter-intuitive rules) |
| Distractors | 1 | | | | | | | Rank 15, contested |
| Missing information | 2 | | | | | | | Rank 12 |
| Composition depth | 1 | | | | | | | Rank 16 |
| Length generalization | 1 | | | | | | | Rank 1 (indirect) |
| Long state tracking | 2 | | | | | | | Rank 1 |
| Mid-problem change | 2 | | | | | | | Ranks 1, 12 |
| Self-correction | 2 | | | | | | | Ranks 4, 9 |
| Misleading hints | 1 | | | | | | | Rank 13, research-only evidence |
| Two-way consistency | 0 | | | | | | | Reversal curse only |
| Explanation versus answer | 1 | | | | | | | Rank 2, mostly research concern |
| Repeated sampling | 1 | | | | | | | pass^k reliability |
| Confidence versus correctness | 2 | | | | | | | Ranks 5, 17 |
| Tool errors | 1 | | | | | | | Rank 14 (grade B) |
| **NEW** Goal-completion check | 2 | | | | | | | Rank 5: claim vs validator on N-goal tasks |
| **NEW** Loop after failing first action | 2 | | | | | | | Rank 4 |
| **NEW** Thinking-length budget | 2 | | | | | | | Rank 6 |
| **NEW** Greedy trap with latent failure | 2 | | | | | | | Rank 10 |

## My decisions and notes

### GPU and practical constraints

- GPU model / VRAM: JarvisLabs (L4, A100 80GB, H100 as needed)
- Local model sizes that fit:
- Available API budget:
- Annotation capacity:

## Screening pilot record

- Chosen 5–6 candidates:
- Models (target 2):
- Independent items per candidate (target about 50):
- Matched controls and answer-changing conditions:
- Stability and matched-accuracy separation criteria:
- Candidates retained, revised, or dropped:
- Rationale for changes from the initial recommendation:

## Deep-study decision

Initial recommendation: (1) state tracking plus mid-problem updating; and (2) planning plus inhibition (greedy traps, distractors, and misleading hints), while keeping their measures separate. Reconsider after screening using the rubric and feasibility. Do not treat the screening pilot as confirmatory evidence.

Pain-point update: state tracking and self-correction have the strongest real-world support; planning is grade A once arXiv evidence is added; goal completion and constraint adherence are new candidates; coordination is out of scope.

- Final two focus areas:
- Confirmatory families and item targets:
- What evidence justified this choice?
- What would cause us to stop or revise?

## Notes to self

-
