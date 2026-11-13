---
title: Reasoning Reliability Research Vault
aliases: [Research home]
tags: [research, reasoning-reliability]
---

# Reasoning Reliability

## Current research question (v3)

For a specific reasoning failure (for example state loss or looping), can we:

1. Measure where any model breaks (MEASURE)
2. Find an internal signal that predicts the failure before it happens (LOCALIZE)
3. Use that signal for a targeted fix that beats generic fixes at equal cost (FIX and VERIFY)
4. As a pipeline that runs on any new open model (GENERALIZE)

Prediction (profiles on a hidden tool-use sandbox) remains a supporting checkpoint. Mechanistic work is core, not optional.

**Current state:** v3 design in docs; **Q1** (state loss: read vs computed) drafted 13 Nov 2026 in `docs/q1/` — awaiting sign-off. Stage 0 and E0 next after approval. See [[01_Program_State]].

## Key docs

- [[../docs/q1/plan]] : **Q1 draft plan** (first demo cut)
- [[../docs/q1/README]] : Q1 experiment specs (E0–E5)
- [[../docs/research_design]] : canonical v3 design (pipeline, RQs, stages, product)
- [[../docs/flowcharts]] : Mermaid diagrams for the full programme
- [[../research_design]] : short mental-model overview
- [[../discussion]] : Nov 4 discussion log
- [[../docs/eval_suite]] : families, selection rules, benchmark review, generator rules
- [[../docs/root_abilities]] : 8 root abilities, ladders, profile measures
- [[../docs/model_selection]] : behavioural and mechanistic roster
- [[../docs/roadmap]] : stages and gates
- [[../docs/checklist]] : run checklist
- [[../docs/decisions]] : decision log
- [[../docs/reading_list]] : papers to read
- [[../configs/models.yaml]] : model roster; pin revisions before running
- [[../configs/study.yaml]] : study settings
- [[../site/index]] : interactive site (includes flowchart viewer)

Models note: pin revisions before any run. Candidate recommendations were checked against official model cards on 2026-10-27; frontier panel strings still TBD.

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
