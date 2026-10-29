---
title: "{{title}}"
type: paper            # paper | clip (tweet, thread, blog, OpenResearch summary)
authors: []
year:
venue: ""
link: ""
arxiv: ""
code: ""
added: {{date}}
status: to-read        # to-read | skimmed | read | checked
trust: medium          # low (unchecked tweet) | medium | high (read and checked by me)
numbers_checked: false # true only after I checked the numbers in the actual paper
dimensions: []         # structural, planning, state-tracking, inhibition, retrieval,
                       # self-correction, uncertainty, faithfulness, knowledge, method
overlap: 0             # 0 unrelated, 1 background, 2 neighbour, 3 direct competitor
uses: []               # cite, borrow-method, borrow-data, baseline, compare-against
---

# {{title}}

> Clips (tweets, threads, blogs): fill sections 1, 2 and 7 only.
> Papers: fill everything.

## 1. In short

- **What they did and found (one sentence):**
- **Why I care:**
- **How much I trust the main claim:** low / medium / high, because

## 2. Closeness to my project

| Part | Same as mine? (0 no, 1 partly, 2 yes) | Note |
|---|---|---|
| Research question | | |
| Method / probes | | |
| Tasks / benchmarks | | |
| Models | | |
| Main claim | | |

- **Overlap score** (copy into `overlap` above):
- **What they already did that I was planning to do:**
- **What is still mine (the gap):**
- **Does this change my plan?** research question / dimensions / tests / benchmarks /
  models / roadmap / nothing. What exactly:
- **Which of my RQs or hypotheses it touches** (RQ1 to RQ6, H1 to H10):

## 3. What they did

- **Problem and gap they claim:**
- **Approach in plain words:**
- **What is new vs the closest earlier work (their claim):**

| Model | Version / size | Open or closed | Role in study |
|---|---|---|---|
| | | | |

- **Task format and prompt setup:**
- **Conditions and controls:**
- **Temperature / sampling / repeats:**
- **How answers were scored** (program, human, LLM judge):
- **Statistics and uncertainty:**

## 4. Data and scale

| Benchmark / task family | Purpose | Unique items | Variants per item | Total calls / repeats | Split and contamination notes |
|---|---|---:|---:|---:|---|
| | | | | | |

Keep unique items, variants, repeats and human labels separate.
Write "not reported" if the paper does not say. Never guess.

- **Where items came from** (generated, public, human-written):
- **How gold answers were checked:**
- **Evidence about contamination:**

## 5. Findings

| Finding | Number / effect size / interval | Where (page, table, figure) | Their reading | My reading |
|---|---|---|---|---|
| | | | | |

Include null results and trade-offs, not only headline wins.

## 6. Weak spots

- **Limits they admit:**
- **Limits I see:**
- **Other explanations** (general ability, data leakage, prompt format, parsing,
  judge bias):
- **What this does NOT show:**

## 7. Takeaways

- **Keep in mind:**
  1.
  2.
- **Idea to test:** hypothesis, what I change, control, outcome, what would change my mind
- **Claims to verify** (for clips: link the original paper here):
- **Read next:**

## 8. Notes and page locations

Short notes with page / figure / table numbers. Paraphrase, do not copy long passages.
