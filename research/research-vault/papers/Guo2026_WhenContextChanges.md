---
# ---------- identity (copy from the paper, never guess) ----------
title: "When Context Changes: Understanding Update Failures in LLMs"
authors: [Junyu Guo, Yuchen Fang, Shangding Gu, Costas Spanos, James Demmel, Javad Lavaei]
year: 2026
venue: "arXiv preprint"
arxiv: "2609.38866"
link: "https://arxiv.org/abs/2609.38866"
code: "https://github.com/JamesJunyuGuo/CICM"
data: "https://github.com/JamesJunyuGuo/CICM"
data_licence: "not stated"
added: 2026-11-13
# ---------- reading state ----------
status: read
read_by: agent
numbers_checked: false
# ---------- classification (controlled vocabularies, see bottom) ----------
failures: [state_loss, misplaced_retrieval]
layer: [measurement, mechanism, intervention]
evidence_level: causal
models_scale: "160M–frontier API (Pythia-160M, 3B–72B open, GPT-4o/5/5.6 Sol, Claude Opus 4.8)"
# ---------- link to our programme ----------
rqs: [RQ1, RQ2, RQ3, Q1-C1, Q1-C2, Q1-C3, Q1-C4]
overlap: 3
use_as: [threat, cite, baseline, borrow_method]
---

# When Context Changes: Understanding Update Failures in LLMs

## 1. One-paragraph summary
THREAT: Guo et al. introduce Controlled In-Context Memory (CICM), a benchmark for tracking in-context value updates, and diagnose "stale binding"—where models answer with a superseded old value of the queried variable despite the current value being available. Linear probes recover the current value on 84.8% (Qwen) and 82.2% (Llama) of old-value errors, establishing that the failure is in *selection*, not *retention*. Component-replacement experiments in Qwen and Pythia causally implicate late-layer attention drift toward old values. A training-free adaptive attention routing intervention corrects most old-value errors across five model families while preserving nearly all correct answers. However, the paper studies only **read mode** (the current value is explicitly written in context); there is no computed-state condition, no "prior" (parametric) competitor, and no cost comparison of fixes—these are the gaps our Q1 fills.

## 2. Task and data
| Item | Value | Where in paper |
|---|---|---|
| Task (what the model must do) | Retrieve the current value of a repeatedly-updated variable from conversation or log history | §2, §3 |
| What is updated / varied | Number of overwrites k (2–256), proximity of old-value re-mentions, presence/absence of conflicting mentions | §2, §4.1, Fig 2 |
| Number of unique items | 1,200 preference dialogues + 180 pilot ledgers + 24 decision scenarios + 40 operational histories | §3 |
| Variants or samples per item | Factorial: distance × re-mention × variable count; 200 dialogues per condition in §4.1 | §3, §4.1 |
| Ground truth source (program, human, LLM judge) | Programmatic state labels via generator; independent state replay for operational logs | §3 |
| Contamination evidence | not reported |  |
| Prompt format, temperature, repeats | Direct answer and concise-reasoning formats; temperature not stated; operational logs paired with snapshot controls | §2, Appendix F |

## 3. Models
| Model | Size | Open/closed | Architecture note (MoE, hybrid, attention type) | Role |
|---|---|---|---|---|
| Pythia-160M | 160M | open | dense transformer | Mechanism analysis (exhaustive head-level interventions) |
| Qwen2.5-3B | 3B | open | dense | Adaptive routing target |
| Qwen2.5-7B | 7B | open | dense | Main mechanism + routing target |
| Qwen2.5-14B | 14B | open | dense | Fixed routing |
| Llama-3.2-3B | 3B | open | dense | Adaptive routing target |
| Llama-3.1-8B | 8B | open | dense | Mechanism + adaptive routing target |
| Llama-3.1-70B | 70B | open | dense | Scaling test |
| Mistral-7B | 7B | open | dense | Adaptive routing target |
| Gemma-2-9B | 9B | open | dense | Adaptive routing target |
| GPT-4o | not reported | closed | not reported | Scaling test |
| GPT-5 | not reported | closed | not reported | Scaling test (k=256) |
| GPT-5.6 Sol | not reported | closed | not reported | Frontier failure on operational logs |
| Claude Opus 4.8 | not reported | closed | not reported | Frontier failure on operational logs |
| Gemini | not reported | closed | not reported | Scaling test (k=256) |

## 4. Methods
| Method | Used? | Layers / components | Controls reported |
|---|---|---|---|
| Behavioural only | yes — accuracy, error category (current/old/other-variable/other) | — | Matched-length no-overwrite controls; parallel-variable control; multiple-choice vs free-form |
| Linear probes | yes — 21-class probe on final-layer hidden state at answer position, 5-fold CV | Final layer | Shuffled-label baseline (3.2–6.4%); text-only baseline not explicitly named but probe > chance |
| Logit / tuned lens | no | — | — |
| Activation patching | yes — component replacement: late vs early-middle hidden states; old vs current keys | Late layers (Qwen), all heads (Pythia) | Successful-run counterparts with renamed old assignments; layer-matched random controls |
| Ablation | yes — single-head removal in Pythia | All 12 layers × 12 heads | Layer-matched random head sets |
| Steering | yes — diagnostic: probe-weight difference added at answer position | Final layer vs middle | Equally-large random direction |
| SAEs / transcoders | no | — | — |
| Training (SFT, RL, LoRA) | no | — | — |
| Input rewriting / harness | yes — adaptive attention routing (Eq. 4); explicit reminder baseline | Selected attention heads at final position | Random-head and random-position controls; reversed-routing control |

## 5. Findings (numbers exactly as printed)
| Finding | Number with interval | Table / figure / page | Evidence level |
|---|---|---|---|
| Probe recovers current value on old-value errors | 84.8% (Qwen), 82.2% (Llama); shuffled 3.2–6.4% | §4.2, Fig 5a | correlational |
| Old-value attention share ρ_old higher on failures | 19.4 pp higher (Qwen), length-adjusted | §4.3 | correlational |
| Late hidden state replacement recovery | 78.1% (late) vs −0.5% (early-middle) | Table 1 | causal |
| Old-key replacement recovery | 49.2% (old) vs −21.3% (current) | Table 1 | causal |
| Pythia targeted head removal | 38.4% old-value errors corrected vs 8.7% random | Table 1 | causal |
| Pythia key input replacement | 75% recovery vs 6% random | Table 1 | causal |
| Adaptive routing: Qwen2.5-3B | 16.46% → 95.21% accuracy; 678/711 old errors corrected; 98.73% preserved | Table 2 | intervention_tested |
| Adaptive routing: Llama-3.2-3B | 27.71% → 93.12%; 514/541 corrected; 100% preserved | Table 2 | intervention_tested |
| Adaptive routing: Llama-3.1-8B | 41.71% → 88.63%; 395/467 corrected; 100% preserved | Table 2 | intervention_tested |
| Adaptive routing: Mistral-7B | 5.42% → 81.35%; 564/674 corrected; 98.08% preserved | Table 2 | intervention_tested |
| Adaptive routing: Gemma-2-9B | 47.08% → 91.88%; 407/455 corrected; 100% preserved | Table 2 | intervention_tested |
| GPT-5.6 Sol on operational logs | 9/40 correct; all 40 snapshots correct | §2 | behavioural |
| Claude Opus 4.8 on operational logs | 18/40 (18 of 31 completed); all 40 snapshots correct | §2 | behavioural |
| GPT-5.6 Sol at k=256, concise reasoning | 32/36 old-value errors | §2, Appendix Table 16 | behavioural |
| Near-source re-mention → old-value error rate | 75.5%–94.5% | §4.1, Fig 4 | behavioural |
| Re-mentioned value's share among old-value answers | 94.5%–100% (Qwen, Llama) | §4.1 | behavioural |

## 6. Fixes tested
| Fix | Baselines compared | Gain | Correct answers broken | Cost / latency reported |
|---|---|---|---|---|
| Adaptive attention routing (per-input β) | Original accuracy; explicit current-value reminder; random-head/random-position controls; reversed routing | +44.79 to +78.75 pp absolute accuracy | 0–1.92% broken (98.08–100% preserved) | not reported |
| Fixed attention routing (calibrated β) | Original accuracy; reminder | Qwen2.5-7B: 37.60→68.85%, Qwen2.5-14B: 40.52→41.67% | 0–1.54% broken | not reported |
| Explicit current-value reminder | Original accuracy | varies: 65–99% depending on model | not explicitly separated | not reported |

## 7. Limits
- Stated by the authors:
  - Controlled dialogues and operational logs do not estimate prevalence in deployed agents
  - Internal measurements only on open-source models; different patterns across comparisons
  - Routing requires internal model access, labeled calibration, and a structured parser that already knows the correct value
  - Probes establish recoverability, not that the model consults the value
- Found by us (confounds, missing controls, small n, judge use):
  - **No computed-state condition**: every current value is explicitly written in context (read mode only); no test where the value must be derived by arithmetic or logic
  - **No "prior" competitor**: interference is only among in-context values; parametric knowledge competition is not tested
  - **No "neighbour" competitor**: cross-variable confusion is reported as rare (2/333) and not systematically studied
  - **No cost or latency comparison of fixes**: the routing fix requires forward pass + parsing per input but no runtime cost is reported
  - The parser-based routing uses the known current value — this is an oracle fix, not deployable as-is
  - No thinking/extended-reasoning budget comparison for the fix
  - The CICM preference dialogues build on PrefEval content; independence from PrefEval's known distributional biases is not assessed
  - Small n for frontier models on operational logs (40 items)

## 8. Gap for us
- What they already did that we planned:
  - Stale-binding error attribution (maps to our C1 for the "stale" competitor in read mode)
  - Probe decodability of current value on failures (maps to C2 read-decodable share; their 82–85% is a prior for our power calc)
  - Component-level causal localisation in Qwen and Pythia (maps to C3's patching programme)
  - Attention routing as one fix (maps to one of the seven fixes in E5)
- What they leave open that our RQs answer:
  - **Computed-state condition** (C2): they never test whether the value-to-retrieve must be computed; their fix breaks without explicit value tokens
  - **Neighbour and prior competitors** (C1): they study only stale-vs-current, not which of three competitor types wins
  - **Shared vs separate cause across competitors** (C3/RQ1): they localise stale binding but never compare mechanisms across competitor types
  - **Cost-matched fix comparison** (C4/RQ3): they report accuracy gains but no cost or latency; our E5 requires matched-cost comparison
  - **Hybrid attention architectures** (our Qwen3.5-27B with GatedDeltaNet): not tested in their paper
- Does it change our plan? **No.** Guo's work validates the read-mode stale-binding arm of Q1 and provides a strong baseline (attention routing), but does not touch the read-vs-computed distinction that is the core of C2. Their probe numbers (82–85%) give us a prior for power analysis. We should: (1) include their attention routing fix in E5 as a named baseline, (2) cite their probe result for C2 power calculation, (3) use CICM preference dialogues as a validation set if licence permits. The plan in `research/protocols/state_loss/plan.md` already notes Guo's gap.

## 9. Citations to follow
- Cited by this paper, worth reading:
  1. Tang et al. (2026) — "Do LMs Track Entities Across State Changes?" (find parallel aggregation at query position). Already in seed list (2605.30233).
  2. Oh & Demberg (2026) — "Retrieval-conditioned rebinding circuit" (2606.08644). Already in seed list.
  3. Qian et al. (2026) — ICF-Bench: tests selective forgetting of superseded info. Not yet in vault; touches Q1-C1.
  4. Patel (2026) — "Supersede: Diagnosing and Training the Memory-Update Gap in LLM Agents" (2606.27472). Not in vault; touches Q1-C4 (training-based fix).
  5. Li et al. (2025) — "(How) Do Language Models Track State?" (ICML 2025). Touches entity tracking/state representations.
- Papers citing this one (from Semantic Scholar — rate-limited; from PI-LLM's citation graph since Guo cites PI-LLM):
  1. "Length Is Cheap, Competition Is Not: Attention Predicts Context Rot in Retrieval" (2611.04169). Touches RQ2 (attention as predictor of error correction).
  2. "In-Context Binding Capacity in Language Models" (2609.30634). Touches Q1-C1 (binding capacity).
  3. "WMIP: A Working-Memory-Inspired Programmable Probe of Cumulative State Tracking" (2603.27343). Touches Q1-C2.
  4. "AFVE-Bench: Measuring Abandoned-Frame Verbalization Errors in Multi-Turn LLM Revision" (2611.10541). Touches RQ2.
  5. "Factorized Representations of Concurrent Temporal Variables in Pretrained Language Models" (2610.40328). Touches Q1 (variable representations).

<!--
Controlled vocabularies are fixed so notes can be compared and filtered in Obsidian (Dataview).
Rules: never invent a number; write "not reported". Every number gets a location.
"evidence_level": behavioural < correlational (probes, attention stats) < causal (patching/ablation
with controls) < intervention_tested (a fix with baselines) < replicated (two+ independent groups).
-->
