---
# ---------- identity (copy from the paper, never guess) ----------
title: "Unable to Forget: Proactive Interference Reveals Working Memory Limits in LLMs Beyond Context Length"
authors: [Chupei Wang, Jiaqiu Vince Sun]
year: 2025
venue: "arXiv preprint"
arxiv: "2506.08184"
link: "https://arxiv.org/abs/2506.08184"
code: "https://github.com/zhuangziGiantfish/Unable-to-Forget"
data: "https://github.com/zhuangziGiantfish/Unable-to-Forget"
data_licence: "not stated"
added: 2026-11-13
# ---------- reading state ----------
status: read
read_by: agent
numbers_checked: false
# ---------- classification (controlled vocabularies, see bottom) ----------
failures: [state_loss, misplaced_retrieval]
layer: [measurement, benchmark]
evidence_level: behavioural
models_scale: "0.6B–637B (Qwen3-0.6B to DeepSeek-V3-637B, plus GPT, Claude, Gemini, Grok API)"
# ---------- link to our programme ----------
rqs: [RQ1, RQ2, Q1-C1]
overlap: 2
use_as: [cite, borrow_data]
---

# Unable to Forget: Proactive Interference Reveals Working Memory Limits in LLMs Beyond Context Length

## 1. One-paragraph summary
Wang and Sun adapt the proactive interference (PI) paradigm from cognitive science to LLMs: a sequence of key–value updates is streamed, and models must retrieve the final value for each key. Retrieval accuracy declines log-linearly toward zero as interference accumulates—universally across 30+ models from 0.6B to 637B. Model size is the significant predictor of resistance (t = 3.03, p = 0.005), while context window length has no effect (p = 0.886). Natural language "forget" and "focus" prompts yield marginal improvement; only a mock-QA-reset hack partially restores accuracy. Chain-of-thought reasoning does not help. The paper is purely behavioural—no probes, patching, or mechanistic analysis.

## 2. Task and data
| Item | Value | Where in paper |
|---|---|---|
| Task (what the model must do) | Retrieve the most recently presented value for each of 46 keys after a stream of interleaved key–value updates | §2.1, Fig 2 |
| What is updated / varied | Update count per key (3–400), number of updated keys (1–46), number of tracked keys (1–46), value token length (1–40 words) | §2.1, §3.1, §4 |
| Number of unique items | Up to 46 keys × 400 values = 18,400 key–value pairs per input; word dictionary with 46 categories × 400 words | §2.1 |
| Variants or samples per item | Multiple test repetitions with bootstrap CI; words randomly re-sampled each run | §2.1 |
| Ground truth source (program, human, LLM judge) | Programmatic: last value per key in the generated sequence | §2.1 |
| Contamination evidence | not reported | |
| Prompt format, temperature, repeats | Plain text key–value stream with instruction header and query footer; temperature not stated; multiple prompt templates tested including meta-relevance prompt | §2.1, §2.2, Fig 12 |

## 3. Models
| Model | Size | Open/closed | Architecture note (MoE, hybrid, attention type) | Role |
|---|---|---|---|---|
| Qwen3-0.6B | 0.6B | open | dense | XS group |
| Qwen3-1.7B through Qwen3-235B | 1.7B–235B | open | dense and MoE (30B-A3B) | XS–L groups |
| Llama-3.1-8B through Llama-4-Maverick | 8B–400B | open | dense and MoE (Maverick 400B, Scout 109B) | S–L groups |
| DeepSeek-V3 | 637B | open (MoE) | MoE | L group |
| DeepSeek-R1 | not reported | open | MoE, CoT | CoT comparison |
| GPT-4o, GPT-4.1, GPT-4.1-mini/nano | not reported | closed | not reported | M–L groups |
| Claude-3.5-Sonnet, Claude-3.5-Haiku | not reported | closed | not reported | M group |
| Gemini-2.0-Flash, Gemini-2.5-Flash | not reported | closed | not reported | M group |
| Grok-3-beta, Grok-3-mini-beta | not reported | closed | not reported | L and M groups |
| Mistral-small-2503 | not reported | open | dense | S group |
| NVIDIA Nemotron variants | 8B–253B | open | dense | S–L groups |

## 4. Methods
| Method | Used? | Layers / components | Controls reported |
|---|---|---|---|
| Behavioural only | yes — accuracy, error-position distribution, IES (AUC of accuracy vs log-update-count) | — | Input-length-matched control (Exp 2); sequential vs random interleaving; multiple prompt variants |
| Linear probes | no | — | — |
| Logit / tuned lens | no | — | — |
| Activation patching | no | — | — |
| Ablation | no | — | — |
| Steering | no | — | — |
| SAEs / transcoders | no | — | — |
| Training (SFT, RL, LoRA) | no | — | — |
| Input rewriting / harness | yes — five prompt interventions: per-key forget, forward focus, relevance meta-prompt, soft session reset, mock QA reset | — | Baseline (no intervention); all tested on same update counts |

## 5. Findings (numbers exactly as printed)
| Finding | Number with interval | Table / figure / page | Evidence level |
|---|---|---|---|
| Log-linear decline is universal | All models decline log-linearly from 3 to 400 updates | Fig 1, Fig 3 | behavioural |
| Model size predicts IES | t = 3.03, p = 0.005; context length: t = −0.144, p = 0.886; R² = 0.261 (N = 30) | §2.2.2 | behavioural |
| Spearman ρ² (size vs IES, 128–131k window subset) | ρ² = 0.673, p = 0.0016 | §2.2.2, Fig 6 | behavioural |
| MoE underperforms dense at matched total params | Llama-4-Maverick (400B MoE) matches or underperforms smaller dense models | §2.2.2, Fig 7 | behavioural |
| Errors dominated by prior interfering values | Three-stage progression: Stage 1 nearby bins, Stage 2 earlier bins + hallucination, Stage 3 hallucination + primacy bias | §2.2.1, Fig 5 | behavioural |
| Per-key forget prompt | Δ < 10 pp improvement at 100 updates; induces error clustering at forget-instruction position | §5.2, Fig 12, Fig 13 | behavioural |
| Mock-QA-reset hack | Gemini Flash 2.0 at 150 updates with hack ≈ baseline at 30–45 updates | §5.3, Fig 12 | behavioural |
| CoT does not improve retrieval | 3 of 4 CoT variants perform ≤ base model; only weakest base improved | §6, Fig 14 | behavioural |
| Fixed-length experiment: same log-linear decline | Tracking 46 keys at fixed input length → same decay pattern as variable-length | §3.2.2, Fig 9 (right) | behavioural |
| Sequential ordering: step-function failure | Accuracy remains near-perfect until model-specific threshold, then drops abruptly to near-zero | §2.2, Fig 4 | behavioural |

## 6. Fixes tested
| Fix | Baselines compared | Gain | Correct answers broken | Cost / latency reported |
|---|---|---|---|---|
| Per-key forget prompt | No-intervention baseline | < 10 pp at 100 updates; sometimes negative (gpt-4.1-mini) | not reported | not reported |
| Forward focus prompt | No-intervention baseline | Minimal | not reported | not reported |
| Relevance meta-prompt | No-intervention baseline | Ineffective for all models; harmful for gpt-4.1-mini | not reported | not reported |
| Soft session reset | No-intervention baseline | Minimal | not reported | not reported |
| Mock QA reset | No-intervention baseline | Substantial but does not eliminate decline | not reported | not reported |

## 7. Limits
- Stated by the authors:
  - Synthetic key–value task only; ecological validity to real-world use is limited
  - Reasoning models excluded from IES regression due to latency constraints
  - No mechanistic analysis (acknowledged as future work)
- Found by us (confounds, missing controls, small n, judge use):
  - Purely behavioural: no probes, no patching, no causal mechanism identification
  - No computed-state condition: all values are explicitly written; retrieval target is always the last occurrence
  - No cross-variable confusion analysis (neighbour competitor)
  - No parametric knowledge interference (prior competitor): all values are novel random words
  - The IES metric confounds interference resistance with many other factors (attention architecture, training data, etc.)
  - MoE comparison is confounded by different training regimes, not just activated-parameter count
  - Experiments concluded May 2025; newer models not tested

## 8. Gap for us
- What they already did that we planned:
  - Demonstrated universal log-linear decline under stale interference (behavioural baseline for C1)
  - Showed that CoT/reasoning does not help with read-mode stale retrieval (relevant to E5 fix comparison)
  - Showed that prompt-based "forget" interventions are ineffective (relevant to E5)
  - Model-size scaling of interference resistance (calibrates which models to test in E1)
- What they leave open that our RQs answer:
  - No mechanism analysis at all → our C2 (probes), C3 (patching), E4 (shared cause) are novel relative to this paper
  - No computed-state condition → C2
  - No competitor-type separation (stale vs neighbour vs prior) → C1
  - No cost-matched fix comparison → C4
  - No test on hybrid linear-attention architectures → our Qwen3.5-27B
- Does it change our plan? **No.** This paper provides a behavioural ceiling for the stale-interference phenomenon and confirms that prompt-based interventions are weak. It validates our choice to go beyond behavioural measurement into mechanism (C2/C3). We should cite their IES metric and log-linear finding in E1 to motivate our update-count sweep.

## 9. Citations to follow
- Cited by this paper, worth reading:
  1. Vodrahalli et al. (2024) — "Michelangelo: Long Context Evaluations Beyond Haystacks via Latent Structure Queries" (2409.12640). Touches RQ2.
  2. Liu et al. (2024) — "Lost in the Middle" (2307.03172). Already in reading queue.
  3. Gong et al. (2024) — "Working Memory Capacity of ChatGPT" (AAAI 2024). Touches Q1 (WM capacity framing).
  4. Oberauer & Vockenberg (2009) — "Updating of Working Memory: Lingering Bindings." Core cognitive reference for the unbinding mechanism we test.
  5. Festini & Reuter-Lorenz (2014) — "Directed forgetting reduces proactive interference in working memory." Cognitive baseline for directed-forgetting intervention design.
- Papers citing this one (from Semantic Scholar):
  1. "Length Is Cheap, Competition Is Not: Attention Predicts Context Rot in Retrieval" (2611.04169). Touches RQ2 (attention as early signal).
  2. "In-Context Binding Capacity in Language Models" (2609.30634). Touches Q1-C1.
  3. "WMIP: A Working-Memory-Inspired Programmable Probe of Cumulative State Tracking" (2603.27343). Touches Q1-C2.
  4. "Learning to Forget: Sleep-Inspired Memory Consolidation for Resolving Proactive Interference" (2603.14517). Touches Q1-C4 (training fix for PI).
  5. "Compress and Forget: bitsandbytes Quantization Amplifies Proactive Interference" (2608.18578). Touches RQ1 (quantization as confound).

<!--
Controlled vocabularies are fixed so notes can be compared and filtered in Obsidian (Dataview).
Rules: never invent a number; write "not reported". Every number gets a location.
"evidence_level": behavioural < correlational (probes, attention stats) < causal (patching/ablation
with controls) < intervention_tested (a fix with baselines) < replicated (two+ independent groups).
-->
