---
# ---------- identity (copy from the paper, never guess) ----------
title: "Removing the Competitor Is Not Enough: Reallocating Attention to the Current Value Restores Recall under Proactive Interference"
authors: [Guan-Yuan Chen, Ya-Fen Yeh]
year: 2026
venue: "Zenodo preprint (not peer reviewed)"
arxiv: ""
link: "https://zenodo.org/records/23153676"
code: "available from corresponding author upon reasonable request"
data: "not released"
data_licence: "All Rights Reserved"
added: 2026-11-13
# ---------- reading state ----------
status: read
read_by: agent
numbers_checked: false
# ---------- classification (controlled vocabularies, see bottom) ----------
failures: [state_loss]
layer: [mechanism, intervention]
evidence_level: causal
models_scale: "1.5B-8.79B"
# ---------- link to our programme ----------
rqs: [RQ1, RQ2, RQ3, Q1-C1, Q1-C3]
overlap: 2
use_as: [cite, baseline, borrow_method]
---

# Removing the Competitor Is Not Enough: Reallocating Attention to the Current Value Restores Recall under Proactive Interference

## 1. One-paragraph summary
Chen and Yeh study proactive interference—where repeated updates to a key cause the model to answer with a stale value—and ask: with the deletion of attention to old values held fixed, does the destination of that attention determine whether recall returns? Across five instruction-tuned models from four families (1.5B–8.79B), they delete the answer position's attention to superseded values by the same rule in every arm and vary only where the freed mass goes. Deletion alone never restores clean accuracy (recovers 0.25–0.88 of the gap), but redirecting attention to the queried key's current value restores clean accuracy in every model, beating the "elsewhere" arm by +0.18 to +0.63. Sending it to another key's value instead makes the model answer that value, showing the failure is in where attention reads, not in what it reads; this is confirmed by attention-vs-value swap experiments.

## 2. Task and data
| Item | Value | Where in paper |
|---|---|---|
| Task (what the model must do) | Retrieve the current value of a queried key after N keys are each updated U times in interleaved rounds | §2 |
| What is updated / varied | Number of updates per key U ∈ {1,2,4,8,16,32,64,128}; N = 4 keys; destination of deleted attention mass | §2, App. A.1 |
| Number of unique items | 100 minimal pairs per model for the interference set; 200 items per control; 400 items for the swap experiments | §2, App. A.1 |
| Variants or samples per item | Minimal pairs: each item paired with its clean (U = 1) member; separate fresh sample for replication of key results | §2 |
| Ground truth source (program, human, LLM judge) | Program (known assignment sequence, containment scoring) | §2 |
| Contamination evidence | Keys and values are common English nouns drawn without replacement from a pool of 1,535 words; freshly sampled | App. A.1 |
| Prompt format, temperature, repeats | System prompt "You are a precise assistant…"; key–value stream format and function-call transcript; greedy decoding; at most 32 new tokens | App. A.1, §6 |

## 3. Models
| Model | Size | Open/closed | Architecture note (MoE, hybrid, attention type) | Role |
|---|---|---|---|---|
| Qwen2.5-1.5B-Instruct | 1.5B | open | Dense, standard attention | Main (most detailed analysis) |
| SmolLM2-1.7B-Instruct | 1.7B | open | Dense | Replication |
| Phi-3.5-mini-instruct | 3.8B | open | Dense | Replication |
| Granite-4.2-3B | 3B | open | Dense | Replication |
| Granite-4.2-8B | 8.79B | open | Dense | Replication (largest) |
| Qwen3-4B | 4B | open | not reported | Localisation only (§6) |

## 4. Methods
| Method | Used? | Layers / components | Controls reported |
|---|---|---|---|
| Behavioural only | Yes (fingerprint sweep) | N/A | Log-linear R² ≥ 0.80, monotonic decline, ≥ 0.40 drop, ≥ 0.50 old-value error share (Table 5) |
| Linear probes | No | | |
| Logit / tuned lens | No | | |
| Activation patching | Yes | Ten selected heads in layers 16–26 (Qwen2.5-1.5B); model-specific head sets for others | Random-head null (100 sets of 10, one-sided p); held-out pairs separate from screening items |
| Ablation | Yes (mean ablation) | Same ten selected heads | Compared patching vs ablation: ablation removes old value but produces other errors |
| Steering | No | | |
| SAEs / transcoders | No | | |
| Training (SFT, RL, LoRA) | No | | |
| Input rewriting / harness | No | | |
| Attention manipulation (novel) | Yes | All heads (all-head dose) or ten selected heads (ten-head dose); post-softmax deletion and reallocation | No-interference control (matched line count, queried key updated once); no-competitor check (U = 1, no cells removed); five destination arms share one deletion rule and positions; fresh sample replication; interference-specific part measured by subtracting no-interference gain |
| Old-value projection | Yes | Residual stream, layers 16–24 | Random subspace of equal rank as control |
| Value/attention swaps | Yes | All heads, first answer token | New-key version: same old values assigned to different key; attention swap vs value swap separated |

## 5. Findings (numbers exactly as printed)
| Finding | Number with interval | Table / figure / page | Evidence level |
|---|---|---|---|
| Fingerprint: accuracy drop in Qwen2.5-1.5B | 0.940 (U = 1) to 0.053 (U = 32); 0.855 of errors are old values at U ≥ 2 | §1, Table 5 | behavioural |
| Patching 10 heads recovers gap (Qwen2.5-1.5B) | Recovery 0.54 [0.42, 0.66]; null p95 = 0.16; one-sided p = 0.0297 | §3, Table 1 | causal |
| Patching 10 heads (SmolLM2-1.7B) | Recovery 0.68; null p95 = 0.19 | §3 | causal |
| Ablation relocates error | Old-value rate 0.83 → 0.20 but accuracy only 0.11 → 0.14; other-error 0.06 → 0.66 | §3, Table 1 | causal |
| Old-value projection | Old-value rate 0.773 → 0.600; random control: 0.773; 15 of 116 become correct, 18 become other errors | §3 | correlational |
| Geometric measure does not predict failure | r = −0.0058 [−0.1445, +0.1330], n = 200, p = 0.935 | §3 | correlational |
| Destination contrast (Qwen2.5-1.5B, all-head) | +0.63 [+0.54, +0.72] | §4, Table 2 | causal |
| Destination contrast (SmolLM2-1.7B) | +0.49 [+0.39, +0.59] | §4 | causal |
| Destination contrast (Phi-3.5-mini) | +0.39 [+0.30, +0.49] | §4 | causal |
| Destination contrast (Granite-4.2-3B) | +0.31 [+0.22, +0.40] | §4 | causal |
| Destination contrast (Granite-4.2-8B) | +0.18 [+0.11, +0.26] | §4 | causal |
| Removal-only recovery across models | 0.25 (Qwen2.5-1.5B), 0.51, 0.78, 0.81, 0.88 (Granite-4.2-8B) | §4, Table 7 | causal |
| Current-value arm reaches clean accuracy | In all five models | §4, Table 2 | causal |
| Address contrast (SmolLM2-1.7B) | +0.89 [+0.82, +0.95] | §5 | causal |
| Address contrast (Phi-3.5-mini) | +0.97 [+0.93, +1.00] | §5 | causal |
| Address contrast (Granite-4.2-3B) | +0.91 [+0.85, +0.96] | §5 | causal |
| Redirected rate (other-key arm) | 0.85–0.97 across models; model answers the token at the destination | §5, Table 11 | causal |
| Attention swap vs value swap | Attention swap raises accuracy from 0.130–0.340 to 0.695–0.998; value swap lowers to 0.115–0.285 | §5, Table 14 | causal |
| Attention − value swap difference | +0.558 [+0.508, +0.608] (SmolLM2) to +0.835 [+0.798, +0.870] (Phi-3.5-mini) | §5, Table 14 | causal |
| Interference-specific part (logit difference) | Positive in all five models: +0.40 to +1.63 | §4, Table 14 | causal |
| CoDA routing falls short | Routing gap +0.59 to +0.90 (practical); +0.28 to +0.59 (oracle-anchor) | §5, Table 12 | causal |
| Localisation in Granite-4.2-8B | Recovery 1.00, null p95 = 0.17, gap 0.73 | §6, Table 6 | causal |

## 6. Fixes tested
| Fix | Baselines compared | Gain | Correct answers broken | Cost / latency reported |
|---|---|---|---|---|
| Current-value attention reallocation (all-head) | Removal only, proportional (≈ pre-softmax knockout), elsewhere, other key | Reaches clean accuracy in all 5 models; +0.18 to +0.63 over elsewhere | No-interference control: +0.120 gain in Qwen2.5-1.5B, 0.000 in Phi-3.5-mini (model-dependent) | Not reported (oracle positions required) |
| CoDA practical routing | Current-value arm; oracle-anchor routing | Falls short by +0.59 to +0.90; can cost accuracy without interference (up to −0.21) | Not reported | Not reported |
| Oracle-anchor deletion-and-reallocation hybrid | Current-value arm | Within 0.02 of current-value arm in every model | Can cost accuracy: −0.23 [−0.33, −0.13] in Qwen2.5-1.5B | Not reported |

## 7. Limits
- Stated by the authors: The destination is supplied (oracle positions); a practical router falls short. Only two formats tested (key–value stream and function-call transcript); transfer across formats not established because Qwen2.5-1.5B fails the no-interference criterion on function-call. Five models, all 1.5B–8.79B; claims beyond 8.79B require larger models. Attention and value swaps run on the key–value stream only.
- Found by us (confounds, missing controls, small n, judge use): Only stale-value competitors tested—no neighbour or prior competitor types as in our Q1 design. No read-vs-computed mode distinction—all items have the current value written in context. No probe analysis (C2 readout question not addressed). Limited model scale (max 8.79B, all dense attention)—does not test frontier models or hybrid linear-attention architectures (e.g., Qwen3.5-27B GatedDeltaNet). The interference-specific part on accuracy is small in some models (SmolLM2: +0.04 [−0.02, +0.10]), suggesting part of the current-value arm's benefit may be non-specific focusing. Code "available upon request" limits reproducibility.

## 8. Gap for us
- What they already did that we planned: (1) They localise late heads carrying the stale-value failure via activation patching with random-head null controls → overlaps E3_localise. (2) They test attention reallocation as a fix (current-value arm restores clean accuracy) → overlaps E5_fix, specifically as a baseline for our "attention redirection" fix. (3) They show ablation/projection of old-value components relocates errors rather than restoring accuracy → directly informs our E3 design (patching vs ablation distinction). (4) Their interference fingerprint (accuracy vs U, old-value share) overlaps our E1 behavioural characterisation.
- What they leave open that our RQs answer: (1) No read vs computed distinction → C2 is entirely open. (2) No neighbour or prior competitors → C1 competitor-type breakdown is open. (3) No linear probes or logit lens → C2 decodability question is open. (4) No shared-vs-separate analysis across competitor types → E4 is open. (5) No comparison of matched vs generic fixes with cost → C4 is open. (6) Only small models (≤ 8.79B); our main model is Qwen3.5-27B with hybrid linear attention. (7) Their practical router (CoDA) falls short; finding a non-oracle router is open → relevant to RQ5.
- Does it change our plan? No. Their destination-matters result strengthens our E5 by providing a mechanistic baseline: "redirect attention to the current value" is a known fix, so our matched fix (E5) needs to beat this or incorporate it. We should use their five-arm design as a reference for our E3 patching controls, and we should test whether their finding generalises to hybrid attention (Qwen3.5-27B). Their result that removal relocates errors should be noted in our E3 design—we should check this for our competitor types.

## 9. Citations to follow
- Cited by this paper, worth reading:
  1. Wang 2026 (arXiv 2606.07555) — Persistent priors, preserved targets: Stroop-style paradigm for lexical override. Separates lowering distractor from preserving target. → RQ1, RQ2
  2. Xiong et al. 2026 (arXiv 2604.09670) — In-context superposition: working memory interference in LLMs. N-back task, value-identity suppression. → RQ1
  3. Wu and Shomali 2026 (arXiv 2609.24635) — Written as a record, read as an address: KV cache entries as addresses. → RQ1
  4. Lee et al. 2026 (arXiv 2609.33093) — How linear attention remembers. Interference shaped by how new writes overlap existing memory; directly relevant to Qwen3.5-27B GatedDeltaNet. → RQ1, Q1-C3
  5. Ravulapalli and Chadha 2026 (arXiv 2609.30634) — In-context binding capacity in language models. → RQ1

- Papers citing this one (from Semantic Scholar), worth reading:
  (Zenodo preprint without arXiv ID; Semantic Scholar API was rate-limited at time of review. The paper's Related Work §7 cites these concurrent works as relevant: Guo et al. 2026 [arXiv 2609.38866, already in seed list]; Chattaraj and Raj 2026 [arXiv 2603.00270, reviewed above]; Shahrabi-Farahani and Rahmati 2026 [arXiv 2608.18578, quantization amplifies PI]; Xie 2026 [arXiv 2603.14517, sleep-inspired consolidation for PI]; Giannetti et al. 2026 [ACL Findings, SAE interventions for RAG distractors].)

<!--
Controlled vocabularies are fixed so notes can be compared and filtered in Obsidian (Dataview).
Rules: never invent a number; write "not reported". Every number gets a location.
"evidence_level": behavioural < correlational (probes, attention stats) < causal (patching/ablation
with controls) < intervention_tested (a fix with baselines) < replicated (two+ independent groups).
-->
