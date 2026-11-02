---
title: Reasoning Reliability Research Vault
aliases: [Research home]
tags: [research, reasoning-reliability]
---

# Reasoning Reliability

## Current research question

When do language models preserve correct behavior across equivalent task presentations, and which training, inference, or system conditions explain failures?

Behavioral invariance is the measured construct. Retrieval/computation labels need validation against known exposure and causal evidence. A model's rationale is not ground truth about its internal process.

**Current state:** design complete, building L1 tests next. See [[01_Program_State]].

## Key docs

- [[../docs/research_design]] : probes, sample sizes, repeats, analysis, novelty
- [[../docs/eval_suite]] : families, selection rules, benchmark review, generator rules
- [[../docs/root_abilities]] : 8 root abilities, ladders, profile measures
- [[../docs/model_selection]] : behavioral and mechanistic roster
- [[../docs/roadmap]] : phases and stop/go criteria
- [[../docs/checklist]] : run checklist
- [[../docs/decisions]] : decision log
- [[../docs/reading_list]] : papers to read
- [[../configs/models.yaml]] : model roster; pin revisions before running
- [[../configs/study.yaml]] : study settings

Models note: pin revisions before any run. Candidate recommendations were checked against official model cards on 2026-10-27.

## Working notes

- [[01_Program_State]] : confirmed decisions, open questions, gates
- [[07_Paper_Landscape]] : papers grouped by dimension
- [[08_X_Link_Review]] : older annotated X links (new clips go in `clips/`)
- [[09_Test_Menu_and_Selection]] : candidate tests, scoring table, 17 failure types
- [[11_Reading_Queue]] : deduplicated inventory and staged one-paper-at-a-time review order

## Closest to my work

```dataview
TABLE type, overlap, status, dimensions
FROM "research-vault/papers" OR "research-vault/clips"
SORT overlap DESC
```

## Reading queue

```dataview
TABLE type, added, dimensions, overlap
FROM "research-vault/papers" OR "research-vault/clips"
WHERE status = "to-read"
SORT added ASC
```

## Numbers not yet checked

```dataview
TABLE type, status, link, arxiv
FROM "research-vault/papers" OR "research-vault/clips"
WHERE numbers_checked = false AND status != "to-read"
SORT added ASC
```

## How to add a note

1. Create a new file in `papers/` (papers) or `clips/` (tweets, blogs, OpenResearch dumps).
2. Command palette → **Templates: Insert template** → pick `NOTE`.
3. Clips: fill sections 1, 2, and 7. Papers: fill everything you can.
4. Set `overlap` (0–3) so the table above stays useful.
5. Link the note under the right dimension in [[07_Paper_Landscape]].

## Rules

- Nothing is cited until read.
- Never cite a tweet's number without checking the paper.
- No PDFs in git. Zotero (or local storage) holds PDFs; notes hold links.
