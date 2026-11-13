---
title: Program state
aliases: [Program state]
tags: [research, status]
---

# Program state

Updated: 2026-11-13

## Current state

**Delivered:** programme architecture, Q1 protocol, repo layout, lit agent + 5 seed notes.  
**Blocked on:** Adya Q1 sign-off + reading Guo THREAT note.  
**No Q1 experiment code until then.**

Canonical: [[../docs/programme_architecture]].

| Track | State |
|---|---|
| RvC v1.1 | Separate repo; Stage 0 done; PR #1 open |
| RR-Failures (Q1) | Specs + docs + lit notes; sign-off open |
| RR-Layer | After Q1 E5 |

## Pipeline (Q1)

E0 Instrument → E1 Behaviour → E2 Readout → E3 Localise → E4 Shared → E5 Fix → (RR-Layer later)

## Confirmed choices

- Formulation B: diagnosis-conditioned transformation
- First failure: computed-state loss (12/12); premature "done" second
- Causes on Qwen3.5-27B + Gemma 3 27B; GLM transfer only; Kimi behaviour-only
- No LLM gold or scoring; four data pools
- Layout: `research/`, `src/rr/`, `failures/<name>/…`
- Root history archived in [[../docs/archive/background]]

## Open before confirm runs

- Q1 8 checkboxes; Guo note; comp-mech licence
- Family G; frontier panel; budgets; paper split

## Gates

- Sign-off → E0 QA → E1 cells 30–70% fail → prereg tag → E2–E5 bars in `protocols/state_loss/prereg.md`
- RR-Layer only after cause-matched fix wins on cost for ≥1 (preferably 2) failures
