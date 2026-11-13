---
title: "Published LLM and agent failure taxonomies: crosswalk"
type: sweep
source: taxonomies
run_date: 2026-10-29
period_covered: "2023 to 2026"
items_found: 13
items_kept: 13
status: skimmed
trust: medium
numbers_checked: false
overlap: 1
---

# Failure taxonomies: crosswalk for benchmark selection

## At a glance

| | |
|---|---|
| **Role** | Merge published taxonomies into one map for program-checkable benchmarks |
| **Period** | 2023 to 2026 |
| **Sources** | **13** (4 deep reads, 9 abstract/summary) |
| **Status / trust** | skimmed / medium |
| **Overlap** | 1 |

> Widest support: **stops early / misjudges done**, wrong reasoning over given data, loops after failure, weak self-check. Best suite gaps: early stopping, loops, uncorrected early assumptions, copying a supplied answer.

## Takeaways

1. **Early stop / false done** has the widest multi-source support (MAST, METR, tau, Lost in Conversation).
2. **Wrong reasoning over given data** and **loops after failure** are next; loops also appear in successful traces, so count only non-progressing repetition.
3. **Distraction / surface fragility** are real but GSM-family results are contested for 2026 models - refresh with audited distractors.
4. Missing dimensions in the old map: **goal-completion calibration** and **constraint adherence**.
5. Before trusting any agent bench: null-agent check, validator attacks, contamination / leakage audit.

## Scope and method

- **Deep reads:** MAST, METR time horizons, tau-bench, OpenAI SWE-bench Verified.
- **Abstract / summary only:** tau2-bench, SWE-Bench+, ABC, AgentErrorTaxonomy, behavioral abstractions, Lost in Conversation, GSM-Symbolic, GSM-IC, EoG MAST replication.
- **Rule:** shares and counts are only what a source reports. "not reported" means absent from what was read.
- Author note: Oct 29, 2026 · @Adya

## Sources

| # | Source | Studied | How failures found | Trust |
|---|---|---|---|---|
| 1 | [MAST, Cemri et al. 2025](https://arxiv.org/abs/2503.13657) | 7 multi-agent frameworks | Experts 150+ traces; o1 judge on 1642 (kappa 0.88 / 0.77) | high |
| 2 | [METR time horizons](https://arxiv.org/abs/2503.14499) | 12 frontier models, 170 tasks | Human reading of 31 GPT-4 + 32 o1 fails | high metric / low counts |
| 3 | [tau-bench](https://arxiv.org/abs/2406.12045) | 12 LLMs; retail 115, airline 50 | Manual review of 36 failed gpt-4o runs | medium-high |
| 4 | [tau2-bench](https://arxiv.org/abs/2506.07982) | Retail, airline, telecom dual-control | Ablation: no-user vs dual-control | medium |
| 5 | [SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/) | SWE-bench test samples | 93 developers × 3 labels, 1699 samples | high |
| 6 | [SWE-Bench+](https://arxiv.org/abs/2410.06992) | SWE-Agent + GPT-4 patches | Manual patch vs gold PR | medium |
| 7 | [ABC, Zhu et al. 2025](https://arxiv.org/abs/2507.02825) | Agent benchmark reward/task design | Survey + audits | medium |
| 8 | [AgentErrorTaxonomy](https://arxiv.org/abs/2509.25370) | Agents in 3 environments | 500+ fails; 200 annotated | medium |
| 9 | [Behavioral abstractions](https://arxiv.org/html/2609.02371v1) | Agent trajectories | Partly on MAST; injected failures | low-medium |
| 10 | [Lost in Conversation](https://arxiv.org/abs/2505.06120) | 15 LLMs, 6 tasks | Automated, 200k+ conversations | high (abstract) |
| 11 | [GSM-Symbolic](https://arxiv.org/pdf/2410.05229) | Templated GSM8K | Automated perturbation | medium (contested) |
| 12 | [GSM-IC](https://arxiv.org/pdf/2302.00093) | GSM8K + irrelevant sentence | Automated | medium |
| 13 | [EoG MAST replication](https://arxiv.org/pdf/2601.17915) | Gemini-3-Flash, Kimi-K2, GPT-OSS-120B | MAST labels on own traces | low-medium |

### Key numbers by source

**1. MAST** (shares ≈ 100% of labels)

| Bucket | Categories |
|---|---|
| System design | disobey task 11.8%, role 1.5%, step repetition 15.7%, history loss 2.8%, unaware of termination 12.4% |
| Inter-agent | reset 2.2%, no clarification 6.8%, derailment 7.4%, withhold 0.85%, ignored peer 1.9%, reasoning-action mismatch 13.2% |
| Verification | premature termination 6.2%, no/incomplete verify 8.2%, incorrect verify 9.1% |

- Failure rates per system: 41% to 86.7%.
- Fixes: role-spec +9.4% (ChatDev); high-level verification +15.6% (ProgramDev).
- Limitation: mostly LLM-judged labels pooled across unlike systems.

**2. METR**

| Failure | GPT-4 (n=31) | o1 (n=32) |
|---|---:|---:|
| Poor planning / tool choice | 4 | 6 |
| Mental math / reasoning | 6 | 7 |
| Premature abandonment | 8 | 16 |
| Repeating failed actions | 12 | 2 |

- 50% horizon doubles ~every 207 days (95% CI 166-240). 80% horizons are 4-6× shorter.
- Limitation: o1 failures sit on harder tasks (not like-for-like).

**3. tau-bench**

- Wrong argument/info ~55%, wrong decision 25%, partial resolution 19%.
- gpt-4o pass^1 ≈ 61% retail / 35% airline; pass^8 below 25% retail.
- Policy removed: airline 33.2 → 10.8; retail 61.2 → 56.8.
- A "think" tool gave no gain.

**4. tau2-bench** - ~20 points pass^1 lower in dual-control than no-user mode (reasoning vs coordination).

**5. SWE-bench Verified** - underspecified 38.3%; unfair tests 61.1%; 68.3% filtered. GPT-4o 33.2% Verified vs 16% original.

**6. SWE-Bench+** - of one agent's successes: leakage 32.67%, weak tests 31.08%; resolution 12.47% → 3.97% after removal. >94% issues predate cutoffs.

**7. ABC** - reward/task bugs can mis-estimate agents by up to 100% relative (empty responses as success in tau-bench; weak SWE tests). Checklist cut CVE-Bench overestimation 33%.

**8. AgentErrorTaxonomy** - modules: memory, reflection, planning, action, system. Claim: one root-cause cascades. AgentDebug recovery (effect size not read).

**9. Behavioral abstractions** - reasoning / control-flow / action groups. Caution: failures *injected* into successes, so shares are constructed.

**10. Lost in Conversation** - 39% average drop single-turn → multi-turn underspecified (15 models). Small aptitude loss, large unreliability rise. Mechanism: early assumptions + premature final answers.

**11. GSM-Symbolic** - name/number variance; NoOp clause up to −65%. **Contested:** 2026 replication on newer models found audited NoOp drops ≈ 0 ([LW](https://www.lesswrong.com/posts/Ze4C99Dasj74YKCFh/revisiting-gsm-symbolic-models-seem-to-reason-okay-actually)); also see [2605.28700](https://arxiv.org/pdf/2605.28700).

**12. GSM-IC** - one irrelevant sentence lowers accuracy for all prompting methods; lexical overlap matters more than distractor numbers.

**13. EoG MAST replication** - incorrect verification separates fails best (66% vs 14% Gemini-3-Flash; 83% vs 43% Kimi-K2; 94% vs 50% GPT-OSS-120B). Step repetition appears in successes too (71% vs 59%), so not diagnostic alone.

### Not read yet

Kapoor et al. "AI Agents That Matter", HAL, SWE-agent error analysis, AgentBench, WebArena, GAIA, OSWorld error sections, Who&When, overthinking papers (see arXiv gap sweep).

## Crosswalk

| Unified failure type | Plain meaning | Source evidence | Dimension | Checkable? | Benchmark notes |
|---|---|---|---|---|---|
| Stops early / misjudges done | Quits before all goals met | MAST term. 12.4% + prem. 6.2%; METR abandon 8+16; tau partial 19%; Lost-in-Conv | none → **goal completion** | yes | tau-bench, HCAST; tau empty-response bug (ABC) |
| Wrong reasoning on given data | Right tool, wrong values | tau ~55%; METR math 6+7 | state tracking, structural | yes | tau-bench |
| Distracted by irrelevant cues | Tempting but useless detail | GSM-NoOp up to 65% (contested); GSM-IC | inhibition | yes | GSM-IC / Symbolic / Plus; near-sat for 2026? |
| Surface-change fragility | Fails on name/number change | GSM-Symbolic variance | structural, misplaced retrieval | yes | GSM-Symbolic; GSM8K contamination risk |
| Loops on failed actions | Repeats failing steps | MAST 15.7%; METR 12+2; EoG also in successes | self-correction | yes (trace) | none purpose-built |
| Breaks stated rules | Ignores task/policy | MAST 11.8%; tau wrong decision 25% | none → **constraint adherence** | yes | tau airline policy ablation |
| Weak / wrong self-check | Does not verify, or verifies wrong | MAST 8.2%+9.1%; EoG 66-94% of fails | self-correction, uncertainty | partly | ProgramDev (common online) |
| Early assumption never revised | Commits early, cannot recover | Lost-in-Conv 39%; MAST no clarify 6.8% | self-correction, uncertainty | yes | sharded Lost-in-Conv style |
| Reasoning-action mismatch | Says one thing, does another | MAST 13.2% | faithfulness | partly | none program-checked |
| Drifts off goal | Irrelevant subgoals | MAST derailment 7.4% | inhibition | partly | none found |
| Loses earlier context | Forgets prior requests/state | MAST history 2.8%, reset 2.2% | state tracking | yes | tau compound tasks |
| Poor plan / tool choice | Bad approach up front | METR 4+6 | planning | partly | HCAST, RE-Bench |
| Tool execution errors | Malformed / failing calls | behavioral abstractions; tau halluc. IDs | mostly harness | yes | BFCL-style |
| Fails to coordinate with human | Cannot guide user who holds state | tau2 ~20pt drop | none (coordination) | yes | tau2 telecom |
| Copies a supplied solution | Reuses leaked fix | SWE-Bench+ leakage 32.67% | misplaced retrieval | yes (pairs) | SWE-Bench+; >94% pre-cutoff |
| Role / handoff bugs | Wrong role, withhold, ignore peers | MAST small shares | system | partly | MAST traces |
| Benchmark defects | Bad tests, vague tasks, reward bugs | Verified 38.3%/61.1%; SWE+ 31%; ABC ≤100% | system (eval) | n/a | n/a |

Rows marked "none" suggested new dimensions: **goal-completion calibration**, **constraint adherence**, optionally coordination.

## Summary

### Top 8 by evidence

| Rank | Failure type | Sources | Headline evidence |
|---:|---|---|---|
| 1 | Stops early / misjudges done | 5 | MAST ~18.6% combined; METR 24/63; tau 19% |
| 2 | Wrong reasoning on given data | 3 | tau ~55% of 36; METR 13/63 |
| 3 | Loops on failed actions | 4 | MAST 15.7%; METR 14/63; also in successes (EoG) |
| 4 | Weak / wrong self-check | 3 | MAST 17.3%; most predictive in EoG |
| 5 | Early assumption never revised | 3 | 39% multi-turn drop (200k+ convos) |
| 6 | Distracted by irrelevant cues | 3 | up to 65% (contested for 2026) |
| 7 | Breaks stated rules | 2 | MAST 11.8%; tau 25%; airline 33.2→10.8 |
| 8 | Reasoning-action mismatch | 2 | MAST 13.2% |

Caveat: no two sources share definitions; agent counts are small or LLM-judged. Treat ranks as rough.

### Gaps the suite could fill

1. **Loops after failure** - first obvious action always fails; score whether strategy changes. Count only repetition that does not change state.
2. **Goal-completion calibration** - N goals + state validator; score goals done vs claim of done.
3. **Uncorrected early assumption** - shard a fully specified task across turns; compare single-turn vs sharded per item.
4. **Copying a supplied answer** - paired items with/without a plausible wrong "known fix".
5. **Counter-intuitive rules** - rules that contradict common sense, checked by state.
6. **Distraction, refreshed** - harder bases; audit distractors with two raters and reported kappa.

### Support for dimensions

| Strength | Dimensions |
|---|---|
| Strong | state tracking, self-correction, inhibition (with GSM caveat) |
| Medium | planning, uncertainty, faithfulness, structural understanding |
| Weak | misplaced retrieval, knowledge |
| Suggested adds | goal-completion calibration, constraint adherence, optional coordination |

### Reliability metrics to report

| Metric | Source | Use |
|---|---|---|
| pass^k (k=1,4,8) | tau-bench | gpt-4o ~61% → <25% at k=8 |
| Aptitude vs unreliability | Lost in Conversation | best vs best-minus-worst per item |
| Variance over instantiations | GSM-Symbolic | mean + spread across templates |
| Time horizon | METR | only if you collect human time ratings |

### Benchmark problems to avoid

| Defect | Evidence | Mitigation |
|---|---|---|
| Tests reject valid answers | 61.1% flagged (Verified) | Attack validators with wrong solutions too |
| Weak tests accept wrong answers | 31.08% (SWE-Bench+) | Same |
| Answer leaked in input | 32.67% (SWE-Bench+) | Paired with/without leak |
| Contamination | >94% SWE issues pre-cutoff | Procedural or post-cutoff items |
| Underspecified tasks | 38.3% (Verified) | Iterate until one valid outcome |
| Reward bugs | empty response = success (ABC) | Null agent must score zero |
| Unreleased perturbation sets | GSM-NoOp | Release yours |
| Injected failure shares | behavioral abstractions | Prefer natural traces |
