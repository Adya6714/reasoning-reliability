# LLM and Agent Failure Taxonomies: Crosswalk for Benchmark Selection

Oct 29, 2026 · @Adya

## Scope and method

This doc merges published LLM and agent failure taxonomies into one map for picking program-checkable benchmarks for the reasoning-reliability eval suite.

- **Core sources (read in full or near full):** MAST, METR time horizons, tau-bench, OpenAI SWE-bench Verified post.
- **Read at abstract or summary level only:** tau2-bench, SWE-Bench+, Zhu et al. (ABC), and the sweep papers marked below. Their trust is lower.
- **Rule:** shares and counts are only what a source reports. "not reported" means absent from what was read.
- **Not yet read:** anything not listed in the source blocks.

## Source blocks

13 sources: 4 read in depth, 9 at abstract or summary level. All fields: status to-read, numbers\_checked false, overlap 0.

| # | Source | Studied | How failures found (n) | Agreement | Trust |
| --- | --- | --- | --- | --- | --- |
| 1 | [MAST, Cemri et al. 2025](https://arxiv.org/abs/2503.13657) | 7 multi-agent frameworks; GPT-4/4o, Claude 3.7, Qwen2.5, CodeLlama | Experts on 150+ traces, then o1 judge (1642 traces) | kappa 0.88 human; 0.77 judge vs human | high |
| 2 | [METR time horizons, Kwa et al. 2025](https://arxiv.org/abs/2503.14499) | 12 frontier models, 170 tasks (HCAST, RE-Bench, SWAA) | Human reading of 31 GPT-4 + 32 o1 failed runs | not reported | high (metric), low (failure counts) |
| 3 | [tau-bench, Yao et al. 2024](https://arxiv.org/abs/2406.12045) | 12 LLMs, retail (115 tasks), airline (50) | Manual review of 36 failed gpt-4o runs | not reported | medium-high |
| 4 | [tau2-bench, Barres et al. 2025](https://arxiv.org/abs/2506.07982) | Retail, airline, telecom dual-control | Ablation: no-user vs dual-control | not reported | medium (abstract only) |
| 5 | [SWE-bench Verified, OpenAI 2024](https://openai.com/index/introducing-swe-bench-verified/) | SWE-bench test samples | 93 developers, 3 labels each, 1699 samples | not reported | high |
| 6 | [SWE-Bench+, Aleithan et al. 2024](https://arxiv.org/abs/2410.06992) | SWE-Agent + GPT-4 resolved patches | Manual patch vs gold PR | not reported | medium (abstract only) |
| 7 | [ABC, Zhu et al. 2025](https://arxiv.org/abs/2507.02825) | Reward and task design in agent benchmarks | Survey plus audits | not reported | medium (abstract only) |
| 8 | [AgentErrorTaxonomy, 2025](https://arxiv.org/abs/2509.25370) | Agents in 3 environments | 500+ failed trajectories; 200 annotated (AgentErrorBench) | not reported in what was read | medium (abstract only) |
| 9 | [Behavioral abstractions, 2026](https://arxiv.org/html/2609.02371v1) | Agent trajectories | Taxonomy partly built on MAST; failures injected into successful runs | not reported in what was read | low-medium (snippet only) |
| 10 | [Lost in Conversation, Laban et al. 2025](https://arxiv.org/abs/2505.06120) | 15 open and closed LLMs, 6 tasks | Automated, 200,000+ simulated conversations | n/a (automated) | high (abstract) |
| 11 | [GSM-Symbolic, Mirzadeh et al. 2024](https://arxiv.org/pdf/2410.05229) | Open and closed LLMs on templated GSM8K | Automated perturbation | n/a | medium (contested, see below) |
| 12 | [GSM-IC, Shi et al. 2023](https://arxiv.org/pdf/2302.00093) | Prompting methods on GSM8K + irrelevant sentence | Automated | n/a | medium (abstract) |
| 13 | [EoG MAST replication, 2026](https://arxiv.org/pdf/2601.17915) | Gemini-3-Flash, Kimi-K2, GPT-OSS-120B agents | MAST labels on own traces | not reported in what was read | low-medium (snippet only) |

### Categories and key numbers per source

**1. MAST** (shares of all failure labels, sum about 100%)

- System design: disobey task spec 11.8%, disobey role 1.5%, step repetition 15.7%, history loss 2.8%, unaware of termination 12.4%.
- Inter-agent: conversation reset 2.2%, fail to ask clarification 6.8%, task derailment 7.4%, info withholding 0.85%, ignored other agent 1.9%, reasoning-action mismatch 13.2%.
- Verification: premature termination 6.2%, no or incomplete verification 8.2%, incorrect verification 9.1%.
- Failure rates per system: 41% to 86.7%.
- Fixes: role-spec fix +9.4% on ChatDev; high-level verification step +15.6% on ProgramDev.
- Limitation: mostly LLM-judged labels pooled across unlike systems.

**2. METR**

- Failures: poor planning/tool choice 4/31 GPT-4, 6/32 o1; mental math/reasoning 6, 7; premature abandonment 8, 16; repeating failed actions 12, 2.
- 50% horizon doubles about every 207 days (95% CI 166 to 240). 80% horizons are 4 to 6x shorter.
- Worse on "messier" tasks at equal length.
- Limitation: o1 failures sit on harder tasks, so counts are not like-for-like.

**3. tau-bench**

- Wrong argument or info about 55%, wrong decision 25%, partial resolution of compound requests 19% (text shares; verify slice labels in Figure 5).
- gpt-4o pass^1 about 61% retail, 35% airline; pass^8 below 25% retail.
- Policy removed: airline 33.2 to 10.8, retail 61.2 to 56.8 for gpt-4o.
- A "think" tool gave no gain.

**4. tau2-bench**

- About 20 points pass^1 lower in dual-control than no-user mode, separating reasoning from coordination failures.

**5. SWE-bench Verified**

- 38.3% of samples flagged underspecified; 61.1% flagged for tests that may reject valid fixes; 68.3% filtered.
- GPT-4o 33.2% on Verified vs 16% on original. GPT-4 on Lite ranged 2.7% to 28.3% by scaffold.

**6. SWE-Bench+**

- Of one agent's successes: 32.67% solution leakage, 31.08% passed weak tests. Resolution 12.47% to 3.97% after removal.
- Over 94% of issues predate model cutoffs.
- Thesis version reports 33.47% and 24.70%: different sample or method, not reconciled.

**7. ABC (Zhu et al.)**

- Benchmark reward or task bugs can mis-estimate agents by up to 100% relative. Examples named: SWE-bench Verified weak tests; tau-bench counts empty responses as success.
- Checklist cut CVE-Bench overestimation by 33%.

**8. AgentErrorTaxonomy**

- Five modules: memory, reflection, planning, action, system.
- Core claim: one root-cause error cascades into later steps. Shares not read.
- Fix tested: AgentDebug, root-cause feedback for recovery (effect size not read).

**9. Behavioral abstractions**

- Three groups: reasoning; control flow (termination miss, premature termination, step loop); action (action mismatch, invocation issue, execution failure).
- Caution: failures were injected into successful runs, so shares are constructed, not natural.

**10. Lost in Conversation**

- 39% average drop from single-turn to multi-turn underspecified, across all 15 models tested.
- Decomposed into a small aptitude loss and a large unreliability increase.
- Mechanism: early assumptions and premature final answers that the model then over-relies on.

**11. GSM-Symbolic**

- Accuracy varies when only names or numbers change; drops grow with more clauses.
- One relevant-looking but irrelevant clause (GSM-NoOp) cut accuracy by up to 65%.
- **Disagreement:** a 2026 replication on newer models found audited NoOp drops indistinguishable from zero ([LessWrong](https://www.lesswrong.com/posts/Ze4C99Dasj74YKCFh/revisiting-gsm-symbolic-models-seem-to-reason-okay-actually)). Likely causes: newer models, LLM-made distractors (original NoOp set unreleased), and filtering out clauses that were arguably relevant. Auditor agreement was low (kappa 0.32). A separate re-analysis questions the original significance test ([2605.28700](https://arxiv.org/pdf/2605.28700)).

**12. GSM-IC**

- Adding one irrelevant sentence lowers accuracy for all prompting methods tested.
- Lexical overlap with the problem matters more than the distractor's numbers.
- Fixes: self-consistency helps; an instruction to ignore irrelevant context helps.

**13. EoG MAST replication**

- Incorrect verification separates failed from successful traces most: 66% vs 14% (Gemini-3-Flash), 83% vs 43% (Kimi-K2), 94% vs 50% (GPT-OSS-120B).
- Step repetition appears in both: 71% vs 59% (Gemini-3-Flash), so it is not diagnostic alone.

### Not read

Kapoor et al. "AI Agents That Matter", HAL, SWE-agent error analysis, AgentBench, WebArena, GAIA, OSWorld error sections, Who&When failure attribution, reasoning-model overthinking papers.

## Crosswalk

Early stopping and wrong reasoning over given data have the widest support; distraction by irrelevant cues gains strong support once non-agent LLM studies are added. Source numbers follow the source blocks above.

| Unified failure type | Plain meaning | Source categories (source: name, share) | My dimension | Checkable? | Existing benchmark | Saturated / contaminated? |
| --- | --- | --- | --- | --- | --- | --- |
| Stops early or misjudges done | Quits, or ends before all goals are met | 1: unaware of termination 12.4%, premature termination 6.2%; 2: premature abandonment 8/31, 16/32; 3: partial resolution 19%; 9: termination miss, premature termination; 10: premature final answers | none (closest: uncertainty) | yes | tau-bench, HCAST | tau-bench has an empty-response reward bug (7) |
| Wrong reasoning over given data | Right tool, wrong values; miscomputes from state | 3: wrong argument/info \~55%; 2: mental math/reasoning 6/31, 7/32; 9: reasoning group | state tracking, structural understanding | yes | tau-bench | not assessed |
| Distracted by irrelevant cues | Uses a tempting but irrelevant detail | 11: NoOp clause, up to 65% drop (contested); 12: irrelevant sentence drop | inhibition | yes | GSM-IC, GSM-Symbolic, GSM-Plus | GSM-family likely near-saturated for 2026 models (11 replication) |
| Surface-change fragility | Fails when only names or numbers change | 11: variance across instantiations | structural understanding, misplaced retrieval | yes | GSM-Symbolic | contamination risk on GSM8K roots |
| Loops on failed actions | Repeats steps or failing actions | 1: step repetition 15.7%; 2: repeating failed actions 12/31, 2/32; 9: step loop; 13: repetition in 71% of successes too | self-correction | yes (trace) | none built for it | n/a |
| Breaks stated rules | Ignores task or policy constraints | 1: disobey task spec 11.8%; 3: wrong decision 25% | none (partly inhibition) | yes | tau-bench airline | not assessed |
| Weak or wrong self-check | Does not verify, or verifies wrongly | 1: no/incomplete 8.2%, incorrect 9.1%; 13: incorrect verification 66 to 94% of failed traces; 8: reflection module | self-correction, uncertainty | partly | ProgramDev | ProgramDev tasks common online |
| Early wrong assumption never revised | Commits early, cannot recover | 10: lost in conversation, 39% drop; 1: fail to ask clarification 6.8%; 8: root-cause cascade | self-correction, uncertainty | yes | Lost-in-Conversation sharded tasks | not assessed |
| Reasoning-action mismatch | Says one thing, does another | 1: 13.2%; 9: action mismatch | faithfulness | partly | none program-checked | n/a |
| Drifts off goal | Pursues irrelevant subgoals | 1: task derailment 7.4% | inhibition | partly | none found | n/a |
| Loses earlier context | Forgets earlier requests or state | 1: history loss 2.8%, reset 2.2%; 3: early requests dropped (in 19%); 8: memory module | state tracking | yes | tau-bench compound tasks | not assessed |
| Poor plan or tool choice | Bad approach up front | 2: 4/31, 6/32; 8: planning module | planning | partly | HCAST, RE-Bench | not assessed |
| Tool call execution errors | Malformed or failing invocation | 9: invocation issue, execution failure; 3: hallucinated IDs 0.46 to 6.34 per task; 8: action module | none (mostly harness) | yes | BFCL-style tool tests | not assessed |
| Fails to coordinate with a human actor | Cannot guide a user who holds state | 4: \~20 point drop | none | yes | tau2-bench telecom | not assessed |
| Copies a solution given in the input | Reuses a supplied fix instead of solving | 6: leakage 32.67% of successes | misplaced retrieval | yes (paired items) | SWE-Bench+ | SWE-bench: over 94% pre-cutoff |
| Role and handoff bugs | Wrong role, withheld info, ignored peers | 1: role 1.5%, withholding 0.85%, ignored 1.9% | system | partly | MAST traces | n/a |
| Benchmark defects | Bad tests, vague tasks, broken env, reward bugs | 5: underspecified 38.3%, unfair tests 61.1%; 6: weak tests 31.08%; 7: up to 100% mis-estimate | system (eval) | n/a | n/a | n/a |

Possible missing dimensions (rows marked none): goal-completion calibration, constraint adherence, and coordination with another actor.

## Summary

The best gaps for a fresh, program-checked suite are early stopping, loops after failure, uncorrected early assumptions, and copying supplied answers.

### 1. Top 8 failure types by evidence

| Rank | Failure type | Sources | Evidence |
| --- | --- | --- | --- |
| 1 | Stops early or misjudges done | 5 (1, 2, 3, 9, 10) | MAST 18.6% combined over 1642 traces; METR 24/63; tau 19% |
| 2 | Wrong reasoning over given data | 3 (2, 3, 9) | tau \~55% of 36; METR 13/63 |
| 3 | Loops on failed actions | 4 (1, 2, 9, 13) | MAST 15.7%; METR 14/63; but common in successes too (13) |
| 4 | Weak or wrong self-check | 3 (1, 8, 13) | MAST 17.3%; most predictive of failure in 13 |
| 5 | Early wrong assumption never revised | 3 (1, 8, 10) | 39% multi-turn drop over 200,000+ conversations |
| 6 | Distracted by irrelevant cues | 3 (1, 11, 12) | Up to 65% drop (11), contested by 2026 replication |
| 7 | Breaks stated rules | 2 (1, 3) | MAST 11.8%; tau 25%; airline policy ablation 33.2 to 10.8 |
| 8 | Reasoning-action mismatch | 2 (1, 9) | MAST 13.2% |

Caveat: no two sources share definitions, and agent-side counts are small or LLM-judged. Treat ranks as rough.

### 2. Gaps your suite could fill

- **Loops after failure.** Tasks where the first obvious action always fails; score whether strategy changes. Note 13: count only repetition that does not change state, since some repetition is normal exploration.
- **Goal-completion calibration.** Compound tasks with N goals and a state validator; score goals done vs the model's claim of done.
- **Uncorrected early assumption.** Shard a fully specified task across turns (the Lost-in-Conversation method) on fresh procedural tasks; compare single-turn and sharded accuracy per item.
- **Copying a supplied answer.** Paired items with and without a plausible wrong "known fix"; measures misplaced retrieval directly.
- **Counter-intuitive rules.** Rules that contradict common sense, checked by state, since tau shows common sense covers easy rules.
- **Distraction, refreshed.** GSM-family results are contested for 2026 models. Use harder base tasks and audit distractors for true irrelevance, with two raters and a reported kappa.

### 3. Support for your dimensions

- **Strong:** state tracking, self-correction, inhibition (now supported by 11 and 12, with the replication caveat).
- **Medium:** planning, uncertainty, faithfulness (one large MAST share), structural understanding (via 11 surface-change fragility).
- **Weak:** misplaced retrieval (only 6 and 11), knowledge (no source treats it as a failure type).
- **Suggested additions:** goal-completion calibration (strongest unmapped evidence), constraint adherence, and optionally coordination with another actor.

### 4. Reliability metrics

- **pass^k** (3): gpt-4o falls from about 61% to below 25% at k=8. Report k = 1, 4, 8.
- **Aptitude vs unreliability** (10): best-case score vs best-minus-worst spread per item. Fits your per-problem strategy framing well.
- **Variance over instantiations** (11): report mean and spread across templated variants, not one score.
- **Time horizon** (2): only if you collect human time ratings; costly and depends on whose time is measured.

### 5. Benchmark problems to avoid

- Tests that reject valid answers: 61.1% flagged (5).
- Weak tests that accept wrong answers: 31.08% (6). Attack validators with wrong solutions.
- Answer leaked in input: 32.67% (6).
- Contamination: over 94% of SWE-bench issues predate cutoffs (6). Use procedural or post-cutoff items.
- Underspecified tasks: 38.3% (5). Iterate until only one outcome is valid, as tau-bench did.
- Reward bugs: run a null agent (empty, echo, refuse) on every item and require zero (7).
- Unreleased perturbation sets block replication (11). Release yours.
- Injected failures produce artificial shares (9). Prefer natural traces.

## Sources

All links are in the source table above. Pages opened in full: MAST, METR, tau-bench, OpenAI SWE-bench Verified. Others read from abstracts or search summaries only.
