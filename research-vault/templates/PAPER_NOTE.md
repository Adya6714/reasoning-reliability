---
title: "{{title}}"
authors: []
year:
venue: ""
paper_type: "empirical-study" # empirical-study | benchmark | method | theory | survey
doi: ""
arxiv: ""
url: ""
zotero_uri: ""
reading_status: "discovered" # discovered | abstract-read | full-text-read | quality-checked
dimensions: [] # dependence | organization | source | faithfulness | cross-cutting
tags: [paper]
---

# {{title}}

## Citation and access

Full citation:

- DOI / publisher:
- arXiv / preprint:
- Project page / code / data:
- Zotero item:
- Version read (include date/version):

## One-minute summary

**In one sentence:**

**Why it matters to our project:**

**My confidence in the paper's main claim:** low / medium / high — why?

## Motivation and research question

### Problem the authors identify

### Gap they claim

### Research questions or hypotheses

### What is new compared with the closest prior work?

Record the authors' novelty claim, then assess it separately in [[06_Literature_Index]] or related paper notes.

## Study design: what they did and how

### Approach

Describe the experimental or theoretical strategy in enough detail to reproduce its logic.

### Models / participants / systems

| Model or system | Version / size | Training or access type | Role in study |
|---|---|---|---|
| | | | |

### Task and evaluation procedure

- Input/task format:
- Prompt, tools, or interaction setup:
- Conditions / interventions and controls:
- Decoding or sampling settings:
- Scoring procedure, including human or automated judges:
- Statistical analysis and uncertainty estimates:

## Benchmarks, data, and scale

| Benchmark / dataset / task family | Purpose | Unique source items (N) | Generated variants / conditions | Total evaluated cases or calls | Split / contamination notes |
|---|---|---:|---:|---:|---|
| | | | | | |

Keep **unique independent items**, **variants per item**, **model calls / repeats**, and **human annotations** separate. If the paper does not report a count, write “not reported” rather than infer it.

### Item construction and validity

- Where did items come from? Were they generated, public, or human-authored?
- How were gold answers established or verified?
- How were transformations, labels, and exclusions validated?
- What are the train/dev/test or calibration splits?
- What evidence addresses benchmark contamination or prior exposure?

## Measures and operational definitions

| Construct / outcome | How the paper operationalizes it | Metric / scoring rule | Main validity concern |
|---|---|---|---|
| | | | |

## Findings

| Finding | Evidence: metric, comparison, effect size / interval | Location (page, figure, table) | Authors' interpretation | My interpretation / caveat |
|---|---|---|---|---|
| | | | | |

Separate measured results from the authors' explanations. Include null results and trade-offs, not only headline gains.

## Limitations and alternative explanations

- Limitations stated by the authors:
- Additional limitations I see:
- Could general ability, data leakage, prompt format, parsing, evaluator bias, or task-specific skill explain the result?
- What does this study **not** establish?

## Map to our provisional dimensions

Select every relevant dimension in frontmatter and fill the applicable rows. A paper may inform multiple dimensions; relevance does not mean it validates our measure.

| Dimension | Directly studied, indirectly relevant, or not covered? | What evidence bears on it? | What remains unanswered for our project? |
|---|---|---|---|
| **Dependence** — presentation and irrelevant-cue sensitivity | | | |
| **Organization** — planning, state tracking, long-horizon control | | | |
| **Source** — controlled exposure, retrieval-like behavior, novel composition | | | |
| **Faithfulness** — relation between intermediate reasoning and the answer | | | |
| **Cross-cutting** — ability, calibration, benchmark validity, or evaluation method | | | |

## Relationship to our research and novelty map

- Which research question, hypothesis, probe, benchmark decision, or stage gate does this affect?
- Is it direct prior art, a neighboring method, a competing claim, or background theory?
- Which part of our proposed contribution does it make less novel?
- What precise difference or unresolved question remains?
- Project notes affected: [[02_Research_Design]] / [[03_Benchmark_Selection]] / [[04_Model_Selection]] / [[05_Roadmap]]

## Takeaways and next steps

### Takeaways to retain

1.
2.
3.

### Ideas worth testing

For each idea, specify: hypothesis; manipulation; control; outcome; independent unit; and what result would change our mind.

### Questions for follow-up reading

-

## Reading notes and evidence locations

Page-specific notes, short quotations if needed, and links to figures, tables, appendices, code, or supplementary material. Prefer paraphrase and exact locations over long copied passages.
