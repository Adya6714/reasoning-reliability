---
# ---------- identity (copy from the paper, never guess) ----------
title: ""
authors: []
year:
venue: ""            # e.g. "ICLR 2026", "arXiv preprint", "not peer reviewed"
arxiv: ""
link: ""
code: ""             # URL or "not released"
data: ""             # URL or "not released"
data_licence: ""     # exact licence or "not stated"
added: YYYY-MM-DD
# ---------- reading state ----------
status: to-read      # to-read | abstract-only | read | numbers-checked
read_by: agent       # agent | adya
numbers_checked: false   # true only after a human checked every number against the PDF
# ---------- classification (controlled vocabularies, see bottom) ----------
failures: []         # state_loss, looping, premature_stop, rule_breaking, misplaced_retrieval, tool_hallucination, faithfulness, overthinking, distraction, composition, confidence, other
layer: []            # measurement, mechanism, intervention, input_restructuring, routing, theory, benchmark
evidence_level:      # behavioural | correlational | causal | intervention_tested | replicated
models_scale: ""     # e.g. "1.5B-9B", "toy (38M)", "frontier API"
# ---------- link to our programme ----------
rqs: []              # RQ1..RQ5, Q1-C1..Q1-C4, H1..H4
overlap: 0           # 0 unrelated, 1 background, 2 neighbour, 3 direct competitor
use_as: []           # cite, baseline, borrow_method, borrow_data, anchor_benchmark, threat
---

# {{title}}

## 1. One-paragraph summary
Question, method, main result, in at most 4 sentences. Plain words.

## 2. Task and data
| Item | Value | Where in paper |
|---|---|---|
| Task (what the model must do) | | |
| What is updated / varied | | |
| Number of unique items | | |
| Variants or samples per item | | |
| Ground truth source (program, human, LLM judge) | | |
| Contamination evidence | | |
| Prompt format, temperature, repeats | | |

## 3. Models
| Model | Size | Open/closed | Architecture note (MoE, hybrid, attention type) | Role |
|---|---|---|---|---|

## 4. Methods
| Method | Used? | Layers / components | Controls reported |
|---|---|---|---|
| Behavioural only | | | |
| Linear probes | | | (shuffled labels? text-only baseline?) |
| Logit / tuned lens | | | |
| Activation patching | | | (random components?) |
| Ablation | | | |
| Steering | | | (random directions? side effects?) |
| SAEs / transcoders | | | |
| Training (SFT, RL, LoRA) | | | |
| Input rewriting / harness | | | |

## 5. Findings (numbers exactly as printed)
| Finding | Number with interval | Table / figure / page | Evidence level |
|---|---|---|---|

## 6. Fixes tested
| Fix | Baselines compared | Gain | Correct answers broken | Cost / latency reported |
|---|---|---|---|---|

## 7. Limits
- Stated by the authors:
- Found by us (confounds, missing controls, small n, judge use):

## 8. Gap for us
- What they already did that we planned:
- What they leave open that our RQs answer:
- Does it change our plan? (yes/no; which section of research/protocols/state_loss or the programme doc)

## 9. Citations to follow
- Cited by this paper, worth reading:
- Papers citing this one (from Semantic Scholar), worth reading:

<!--
Controlled vocabularies are fixed so notes can be compared and filtered in Obsidian (Dataview).
Rules: never invent a number; write "not reported". Every number gets a location.
"evidence_level": behavioural < correlational (probes, attention stats) < causal (patching/ablation
with controls) < intervention_tested (a fix with baselines) < replicated (two+ independent groups).
-->
