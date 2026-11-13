---
# ---------- identity (copy from the paper, never guess) ----------
title: "Diagnosing Retrieval Bias Under Multiple In-Context Knowledge Updates in Large Language Models"
authors: [Boyu Qiao, Sean Guo, Xian Yang, Kun Li, Wei Zhou, Songlin Hu, Yunya Song]
year: 2026
venue: "arXiv preprint"
arxiv: "2603.12271"
link: "https://arxiv.org/abs/2603.12271"
code: "not released"
data: "not released"
data_licence: "not stated"
added: 2026-11-13
# ---------- reading state ----------
status: read
read_by: agent
numbers_checked: false
# ---------- classification (controlled vocabularies, see bottom) ----------
failures: [state_loss, misplaced_retrieval]
layer: [measurement]
evidence_level: correlational
models_scale: "7B–405B open + frontier API (LLaMA 3.1 8B–405B, Qwen 2.5 7B–72B, Qwen3-235B, GPT5-N, Claude-S-4, Gemini2.5-F, DeepSeek-V3)"
# ---------- link to our programme ----------
rqs: [RQ1, RQ2, Q1-C1, Q1-C2]
overlap: 2
use_as: [cite, borrow_data]
---

# Diagnosing Retrieval Bias Under Multiple In-Context Knowledge Updates in Large Language Models

## 1. One-paragraph summary
Qiao et al. propose the Dynamic Knowledge Instance (DKI) evaluation framework, inspired by the AB-AC interference paradigm in cognitive psychology, to study retrieval bias when the same fact is updated multiple times in context. Using endpoint probing (querying the earliest and latest states), they find a widening earliest–latest accuracy gap (ELAG) across diverse LLMs as updates increase from 32 to 512: earliest-state accuracy stays near ceiling while latest-state accuracy degrades substantially. Internal-signal diagnostics (attention scores, hidden-state cosine similarity, output logits) show these signals become flat and weakly discriminative on error cases. Cognitively inspired prompt interventions yield only modest gains. The evidence is correlational—no causal patching or ablation is performed, and the authors acknowledge this limitation explicitly.

## 2. Task and data
| Item | Value | Where in paper |
|---|---|---|
| Task (what the model must do) | Retrieve the earliest (initial) or latest (current) value in a sequence of cue–value updates | §3.1.2 |
| What is updated / varied | Update length T (32, 64, 128, 256, 512 for synthetic; avg 8.77 for real-world); format (structured cue:value vs narrative long-text) | §3.1.3, Table 2 |
| Number of unique items | 200 synthetic DKIs + 164 real-world DKIs from EvolveBench | Table 2, §3.1.3 |
| Variants or samples per item | 5 random seeds per condition | Table 2 |
| Ground truth source (program, human, LLM judge) | Programmatic for synthetic (cue-value trajectory); human-curated for real-world (EvolveBench data) | §3.1.3 |
| Contamination evidence | not reported | |
| Prompt format, temperature, repeats | Structured cue:value prompt + query; also narrative rewrite via GPT-4.1-N; temperature 0.0; 5 seeds | Table 2, Appendix B |

## 3. Models
| Model | Size | Open/closed | Architecture note (MoE, hybrid, attention type) | Role |
|---|---|---|---|---|
| LLaMA-3.1-8B-Instruct | 8B | open | dense | Primary analysis + internal signals |
| LLaMA-3.1-70B-Instruct | 70B | open | dense | Scale comparison |
| LLaMA-3.1-405B-Instruct | 405B | open | dense | Scale comparison |
| Qwen2.5-7B-Instruct | 7B | open | dense | Primary analysis + internal signals |
| Qwen2.5-14B-Instruct | 14B | open | dense | Scale + interventions |
| Qwen2.5-32B-Instruct | 32B | open | dense | Scale + interventions |
| Qwen2.5-72B-Instruct | 72B | open | dense | Scale + interventions |
| Qwen3-235B-A22B | 235B | open | MoE (22B active) | Scale comparison |
| GPT5-Nano | not reported | closed | not reported | Commercial comparison |
| GPT4.1-Nano | not reported | closed | not reported | Commercial comparison |
| Claude-Sonnet-4 | not reported | closed | not reported | Commercial comparison |
| Gemini-2.5-Flash | not reported | closed | not reported | Commercial comparison |
| DeepSeek-V3 | not reported | open | MoE | Commercial comparison |

## 4. Methods
| Method | Used? | Layers / components | Controls reported |
|---|---|---|---|
| Behavioural only | yes — endpoint probing accuracy, ELAG, error-position distributions | — | 5 random seeds; structured vs narrative format; real-world vs synthetic data |
| Linear probes | no | — | — |
| Logit / tuned lens | no (logit analysis at output layer only, not tuned lens) | — | — |
| Activation patching | no | — | — |
| Ablation | no | — | — |
| Steering | no | — | — |
| SAEs / transcoders | no | — | — |
| Training (SFT, RL, LoRA) | no | — | — |
| Input rewriting / harness | yes — 7 prompt interventions: CoT, 2-shot, index, rote rehearsal, semantic elaboration, memory integration, directed forgetting | — | No-intervention baseline |
| Internal-signal diagnostics (correlational) | yes — attention-based scores (layer-wise, head-wise), hidden-state cosine similarity, output logits/confidence | All layers and heads of Qwen2.5-7B (28L×28H) and LLaMA3.1-8B (32L×32H) | Correct vs wrong sample split; no causal controls |

## 5. Findings (numbers exactly as printed)
| Finding | Number with interval | Table / figure / page | Evidence level |
|---|---|---|---|
| ELAG widens with T; rapid increase T=32→128, plateau T≥256 | ELAG curves shown per model; see Appendix Fig 10 | Fig 2, Fig 10 | behavioural |
| Real-world ELAG at avg T=8.77 | LLaMA3.1-8B: earliest 96.34%, latest 75.61%, ELAG 20.73; Qwen2.5-7B: earliest 99.39%, latest 88.41%, ELAG 10.98 | Table 1 | behavioural |
| Error patterns model-specific | LLaMA3.1-8B drifts to earlier candidate positions; Qwen2.5-7B clusters near end but produces OOF outputs | Fig 9 | behavioural |
| Attention scores flat on wrong samples | Layer-wise and head-wise heatmaps show concentrated vs diffuse patterns on correct vs wrong | Fig 4 (wrong), Fig 12 (correct) | correlational |
| Hidden-state similarity peaks on correct, flat on wrong | Aggregated cosine similarity across layers: sharp peak at latest candidate on correct, weaker/flatter on wrong | Fig 6 | correlational |
| Logit confidence: Qwen overconfident, LLaMA conservative | Qwen outputs high confidence even when wrong; LLaMA shows lower overall confidence | Fig 7 | correlational |
| Shallow-layer attention may lock onto final output early | Match rate between top-attention candidate and final output shows high rate in some early layers | Fig 5 | correlational |
| Best intervention on real-world (LLaMA3.1-8B) | 2-shot: latest 84.76% (from 75.61%), ELAG 12.80; memory integration: latest 84.76%, ELAG 12.19 | Table 1 | behavioural |
| Best intervention on real-world (Qwen2.5-7B) | 2-shot: latest 89.02%, ELAG 9.76; memory integration: latest 89.02%, ELAG 10.37 | Table 1 | behavioural |
| Synthetic T=32 (Qwen2.5-7B): memory integration best | Latest 25.83% (from 18.67%), ELAG 74.17 (from 80.66) | Table 3 | behavioural |
| Synthetic T=32 (LLaMA3.1-8B): 2-shot best | Latest 8.67% (from 4.50%), ELAG 91.00 (from 93.83) | Table 3 | behavioural |
| Index prompting can hurt | Qwen2.5-72B latest drops from 55.33% to 27.00% with index prompt | Table 3 | behavioural |

## 6. Fixes tested
| Fix | Baselines compared | Gain | Correct answers broken | Cost / latency reported |
|---|---|---|---|---|
| 2-shot prompting | No-intervention baseline | Best general prompting: +4 to +11 pp latest accuracy on real-world data | Earliest accuracy preserved ±1 pp | not reported |
| Memory integration prompt | No-intervention baseline | Best cognitive: +0.6 to +9 pp latest accuracy on real-world data | Earliest accuracy preserved ±1 pp | not reported |
| Directed forgetting prompt | No-intervention baseline | Modest: +1 to +2 pp latest on most models | Earliest accuracy preserved | not reported |
| Rote rehearsal prompt | No-intervention baseline | Minimal or negative | not reported | not reported |
| Semantic elaboration prompt | No-intervention baseline | Minimal or negative | not reported | not reported |
| CoT | No-intervention baseline | Mixed: +5 pp on LLaMA3.1-8B real-world, −1 pp on Qwen2.5-7B | Earliest drops 0.6 pp (LLaMA) | not reported |
| Index-based prompting | No-intervention baseline | Often negative; catastrophic for some models (Qwen2.5-72B: 55→27%) | Earliest drops up to 4 pp | not reported |

## 7. Limits
- Stated by the authors:
  - Endpoint probing only (earliest and latest); no intermediate state retrieval tested
  - Ecological gap between synthetic and real-world data
  - Internal-signal analyses are correlational; no causal claims
  - Limited model families for internal analysis (only 7B/8B)
- Found by us (confounds, missing controls, small n, judge use):
  - No causal mechanism identification: attention/similarity/logit diagnostics are descriptive correlations, not interventions
  - No computed-state condition: all values are explicitly written in context
  - No parametric knowledge competition: synthetic DKIs use arbitrary word bindings; real-world DKIs test context vs context, not context vs parametric memory
  - No neighbour competitor: only one cue per DKI instance; no cross-variable confusion
  - Small real-world dataset (164 instances, avg T=8.77) limits generalisability
  - The narrative rewrite via GPT-4.1-N may introduce uncontrolled confounds (semantic associations, positional biases in generated text)
  - Intervention effectiveness evaluated on real-world data (T≈9) which is below the T where bias is severe; synthetic results at T=32 show much larger remaining gaps

## 8. Gap for us
- What they already did that we planned:
  - Endpoint probing of earliest vs latest states under increasing updates (behavioural baseline for C1 stale competitor)
  - Internal-signal correlation analysis (attention, hidden-state similarity, logits) gives qualitative picture that errors correspond to flat/uninformative signals — useful context for C2 probe design
  - Cognitively inspired prompt interventions (rehearsal, integration, forgetting) show limited gains — validates that our E5 must go beyond prompt engineering
- What they leave open that our RQs answer:
  - No causal mechanism analysis → our C2 (probes with controls), C3 (patching), E4 (shared cause)
  - No computed-state condition → C2 read vs computed
  - No competitor-type separation → C1
  - No cost-matched fix comparison → C4
  - Their diagnostics are at the model level (7B/8B); no component-level localisation → our C3
  - No hybrid-attention architectures tested → our Qwen3.5-27B
- Does it change our plan? **No.** This paper provides correlational internal-signal diagnostics that complement our C2 probe programme but do not substitute for it (no causal controls, no computed mode). Their ELAG metric and endpoint-probing protocol are useful validation for E1. We should cite their attention-flattening finding and their negative results on prompt interventions.

## 9. Citations to follow
- Cited by this paper, worth reading:
  1. Su et al. (2024) — "ConflictBank: A Benchmark for Evaluating the Influence of Knowledge Conflicts" (NeurIPS 2024). Touches Q1 (knowledge conflict taxonomy).
  2. Zhu et al. (2025) — "EvolveBench: Assessing Temporal Awareness in LLMs on Evolving Knowledge" (ACL 2025). Data source for real-world DKIs; touches Q1.
  3. Tao et al. (2024) — "When Context Leads but Parametric Memory Follows" (EMNLP 2024). Touches Q1-C1 (context vs parametric trade-off).
  4. Sun et al. (2025) — "Task Matters: Knowledge Requirements Shape LLM Responses to Context-Memory Conflict" (2506.06485). Touches Q1 (task-dependent conflict resolution).
  5. Lewis-Peacock & Norman (2014) — "Competition between items in working memory leads to forgetting" (Nature Comms). Core cognitive reference for the AB-AC paradigm.
- Papers citing this one (Semantic Scholar rate-limited; listing from cross-references):
  1. Guo et al. (2026) — "When Context Changes" (2609.38866). Already noted above; cites Qiao's framework.
  2. Wang & Sun (2025) — "Unable to Forget / PI-LLM" (2506.08184). Cited by Qiao; noted above.
  3. Chattaraj & Raj (2026) — "LLMs Remember First, Forget Last" (2603.00270). Already in seed list; touches Q1-C1.
  4. Not enough data to identify more citing papers due to rate limit.
  5. —

<!--
Controlled vocabularies are fixed so notes can be compared and filtered in Obsidian (Dataview).
Rules: never invent a number; write "not reported". Every number gets a location.
"evidence_level": behavioural < correlational (probes, attention stats) < causal (patching/ablation
with controls) < intervention_tested (a fix with baselines) < replicated (two+ independent groups).
-->
