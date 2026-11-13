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

**Current state:** Programme architecture and Q1 drafted 13 Nov 2026. Specs in `research/protocols/state_loss/`. Awaiting sign-off. See [[01_Program_State]].

Open the vault folder as `research/research-vault/` (or open the repo root and navigate here).

## Key docs

- [[../docs/programme_architecture]] : **programme architecture, next steps, budget** (canonical)
- [[../protocols/state_loss/plan]] : **Q1 draft plan** (first demo cut)
- [[../protocols/state_loss/README]] : Q1 experiment specs (E0–E5)
- [[../docs/research_design]] : canonical v3 design (pipeline, RQs, stages, product)
- [[../docs/flowcharts]] : Mermaid diagrams for the full programme
- [[../../research_design]] : short mental-model overview
- [[../../discussion]] : Nov 4 discussion log
- [[../docs/eval_suite]] : families, selection rules, benchmark review, generator rules
- [[../docs/root_abilities]] : 8 root abilities, ladders, profile measures
- [[../docs/model_selection]] : behavioural and mechanistic roster
- [[../docs/roadmap]] : stages and gates
- [[../docs/checklist]] : run checklist
- [[../docs/decisions]] : decision log
- [[../docs/reading_list]] : papers to read
- [[../docs/agents/LIT_AGENT_PROMPT]] : literature-review agent prompt
- [[../../configs/models]] : model roster; pin revisions before running
- [[../../configs/study]] : study settings
- [[../../site/index]] : interactive site (includes flowchart viewer)

Models note: pin revisions before any run. Candidate recommendations were checked against official model cards on 2026-10-27; frontier panel strings still TBD.

## Working notes

- [[01_Program_State]] : confirmed decisions, open questions, gates
- [[07_Paper_Landscape]] : papers grouped by dimension
- [[08_X_Link_Review]] : older annotated X links (new clips go in `clips/`)
- [[09_Test_Menu_and_Selection]] : candidate tests, scoring table, 17 failure types
- [[11_Reading_Queue]] : deduplicated inventory and staged one-paper-at-a-time review order

## Closest to my work

See [[07_Paper_Landscape]] and the Q1 prior-art section in [[../protocols/state_loss/plan]].
