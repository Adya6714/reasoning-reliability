---
# ---------- identity (copy from the paper, never guess) ----------
title: "LLMs Remember First, Forget Last: Dual-Process Interference in Large Language Models"
authors: [Sourav Chattaraj, Kanak Raj]
year: 2026
venue: "arXiv preprint"
arxiv: "2603.00270"
link: "https://arxiv.org/abs/2603.00270"
code: "not released"
data: "not released"
data_licence: "not stated"
added: 2026-11-13
# ---------- reading state ----------
status: read
read_by: agent
numbers_checked: false
# ---------- classification (controlled vocabularies, see bottom) ----------
failures: [state_loss]
layer: [measurement, benchmark]
evidence_level: behavioural
models_scale: "1B-2.5T"
# ---------- link to our programme ----------
rqs: [RQ1, Q1-C1]
overlap: 1
use_as: [cite, borrow_method]
---

# LLMs Remember First, Forget Last: Dual-Process Interference in Large Language Models

## 1. One-paragraph summary
Chattaraj and Raj adapt the classic AB-AC paired-associate interference paradigm from cognitive psychology to compare retroactive interference (RI; recalling initial values after updates) and proactive interference (PI; recalling recent values despite competing prior encodings) across 39 LLMs spanning 1B to 2.5T parameters. Every model shows PI >> RI (Cohen's d = 1.73), the opposite of the typical human finding. Four lines of evidence suggest RI and PI engage distinct mechanisms: model size predicts RI resistance (R² = 0.49) but not PI (R² = 0.06), the two scores correlate only weakly (r = 0.21), error profiles differ qualitatively (passive retrieval failure for RI vs active primacy intrusion for PI), and PI collapses bimodally at high interference while RI decays smoothly.

## 2. Task and data
| Item | Value | Where in paper |
|---|---|---|
| Task (what the model must do) | Retrieve the first-assigned value (RI) or most-recently-assigned value (PI) for a category after N interleaved updates | §3, Figure 2 |
| What is updated / varied | Number of updates per category N ∈ {3, 10, 50, 100, 200, 300}; RI vs PI query direction | §3 |
| Number of unique items | 46 semantic categories × 478–624 values per category; fresh random sample each session | §3 |
| Variants or samples per item | Minimum 5 sessions per (model, N); up to 50 sessions (standard) or 20 (reasoning) with adaptive stopping | §3 |
| Ground truth source (program, human, LLM judge) | Program (known assignment sequence) | §3 |
| Contamination evidence | Fresh random samples each session from real-world category instances; not a fixed benchmark | §3 |
| Prompt format, temperature, repeats | Category–value assignments in plain text, temperature = 0, multiple sessions with fresh random sequences | §3 |

## 3. Models
| Model | Size | Open/closed | Architecture note (MoE, hybrid, attention type) | Role |
|---|---|---|---|---|
| GPT-5 | 2.5T | closed | MoE | Main |
| o1 | 1.76T | closed | MoE, reasoning | Main |
| o3 | 2T | closed | MoE, reasoning | Main |
| Claude-4.5-opus | 300B | closed | Dense | Main |
| Claude-4.5-sonnet | 250B | closed | Dense | Main |
| Gemini 2.5 Pro | 300B | closed | MoE | Main |
| DeepSeek-R1 | 671B | open | Dense, reasoning | Main |
| Llama 3.1/3.2/4 (various) | 1B–405B | open | Dense/MoE | Main |
| Qwen 3 | 30B | open | MoE | Main |
| (+ 30 others, 39 total with complete data) | 1B–2.5T | mixed | mixed | Main |

## 4. Methods
| Method | Used? | Layers / components | Controls reported |
|---|---|---|---|
| Behavioural only | Yes | N/A | Shared-stimulus design (identical input, only query differs); adaptive bootstrap CI with 10,000 resamples; 95% CI narrowing criterion | 
| Linear probes | No | | |
| Logit / tuned lens | No | | |
| Activation patching | No | | |
| Ablation | No | | |
| Steering | No | | |
| SAEs / transcoders | No | | |
| Training (SFT, RL, LoRA) | No | | |
| Input rewriting / harness | No | | |

## 5. Findings (numbers exactly as printed)
| Finding | Number with interval | Table / figure / page | Evidence level |
|---|---|---|---|
| PI universally harder than RI | 39/39 models RIES > PIES; mean gap 69.5 pts; paired t(38) = 10.71, p < 0.0001, d = 1.73 | §4.5, Figure 5 | behavioural |
| RIES–PIES correlation weak | r = 0.21, R² = 0.044, p = 0.201, 95% CI [−0.11, 0.49] | §4.5, Figure 5 | behavioural |
| Parameter count predicts RI | R² = 0.491, β = 0.70, p < 0.0001 | §4.2, Figure 3 | behavioural |
| Parameter count does not predict PI | R² = 0.06, p = 0.14 (n.s.) | §4.2 | behavioural |
| Context length does not predict RI | R² = 0.003, p = 0.746 | §4.2 | behavioural |
| Reasoning models excel at RI | RIES = 178.0 (SD = 12.6) vs 150.3 (SD = 18.2); t(37) = 3.54, p = 0.001, d = 1.76 | §4.3 | behavioural |
| Reasoning models poor at PI | o1: RIES = 186.4, PIES = 22.0 (8.5× disparity) | §4.3, Table 4 | behavioural |
| RI errors: retrieval failure dominant | 50.8% retrieval failure, 46.0% same-key intrusion | §4.6, Table 2 | behavioural |
| PI errors: same-key intrusion dominant | 56.1% same-key intrusion, 42.5% retrieval failure | §4.6, Table 2 | behavioural |
| Hallucination rate | < 1% in both conditions (0.9% RI, 0.2% PI) | §4.6, Table 2 | behavioural |
| PI intrusions from early positions | Mean normalised position 0.12 at N = 3; 14% return very first value | §4.6, Figure 6 | behavioural |
| RI decays smoothly, PI bimodal | PI at N ≥ 200 alternates between > 85% and < 5% accuracy | §4.4 | behavioural |
| RI accuracy range at N = 300 | 2%–100% across models | Table 1 | behavioural |
| PI at N = 300 | 3% average (Figure 1) | Figure 1 | behavioural |
| Self-monitoring PI-specific | 8.6% of PI retrieval failures have explicit refusal; 0% for RI | §4.6 | behavioural |

## 6. Fixes tested
| Fix | Baselines compared | Gain | Correct answers broken | Cost / latency reported |
|---|---|---|---|---|
| None tested | — | — | — | — |

## 7. Limits
- Stated by the authors: Single paradigm (AB-AC); mechanistic accounts post-hoc and unconfirmed; proprietary parameter counts are estimates; n = 39 limits power; transformer-only; English-only; temperature = 0; non-converging PI carries wide CIs.
- Found by us (confounds, missing controls, small n, judge use): No mechanistic analysis (no probes, patching, or ablation). The post-hoc dual-process interpretation (consolidation vs retrieval) is speculative without internal evidence. Error classification uses an algorithmic classifier, not a human judge, which is appropriate here. The AB-AC paradigm with semantic categories may conflate category-level familiarity with pure interference. PIES values across models are not directly compared to PI-LLM (Wang and Sun 2025) on matched models.

## 8. Gap for us
- What they already did that we planned: They establish that PI (stale-value intrusion) is the harder failure mode across 39 models, confirming that our focus on stale competitors in Q1 targets the dominant failure. Their error taxonomy (same-key intrusion vs retrieval failure) partially overlaps our C1 competitor attribution.
- What they leave open that our RQs answer: No read vs computed distinction (C2). No mechanistic analysis at all—no probes (C2), no localisation (C3), no shared-vs-separate analysis (C3/E4). No competitor type breakdown (stale vs neighbour vs prior). No fixes tested (C4/E5). Their claim of "dual processes" is purely behavioural and requires the causal evidence our E2–E4 would supply.
- Does it change our plan? No. It strengthens the motivation for Q1 by confirming PI as the dominant failure across scales and architectures. Their RIES/PIES scores could serve as a behavioural calibration for our E1 (if we test some of the same models). We should cite their asymmetry result in our introduction and note that they do not distinguish competitor types or test mechanisms.

## 9. Citations to follow
- Cited by this paper, worth reading:
  1. Wang and Sun 2025 (arXiv 2506.08184) — PI-LLM, direct precursor. Already in seed list.
  2. Anderson et al. 1994 — Retrieval-induced forgetting; the cognitive framework invoked for PI. Background only.
  3. Xiao et al. 2024 — Attention sinks / streaming LMs (ICLR 2024). Cited for primacy bias mechanism. → RQ1
  4. Liu et al. 2024 — Lost in the middle. Already in queue.
  5. Elhage et al. 2022 — Toy models of superposition. Already in queue.

- Papers citing this one (from Semantic Scholar), worth reading:
  (Semantic Scholar API rate-limited at time of review; retry needed. The paper itself cites concurrent work that likely also cites it: Wang 2026, Tang et al. 2026, Oh and Demberg 2026.)

<!--
Controlled vocabularies are fixed so notes can be compared and filtered in Obsidian (Dataview).
Rules: never invent a number; write "not reported". Every number gets a location.
"evidence_level": behavioural < correlational (probes, attention stats) < causal (patching/ablation
with controls) < intervention_tested (a fix with baselines) < replicated (two+ independent groups).
-->
