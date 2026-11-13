# Reasoning Reliability

Find where a language model breaks at reasoning, locate that failure inside the model, and fix it more effectively than generic interventions.

## Status (13 Nov 2026)

Design stage. First cut is **Q1** (state loss: read vs computed UpdateLedger). Specs and lit notes are in-repo; no Q1 experiment code until plan sign-off.

| Track | What | State |
|---|---|---|
| **RR-Failures (Q1)** | Measure → localise → fix one failure | Specs + architecture + 5 lit notes; awaiting sign-off |
| **RvC v1.1** | retrieval-vs-computation rerun | Separate repo; Stage 0 done, PR open |
| **RR-Layer** | Diagnosis-conditioned input transform | After Q1 E5 only |

Canonical programme doc: [`research/docs/programme_architecture.md`](research/docs/programme_architecture.md)  
Docs index: [`research/docs/README.md`](research/docs/README.md)

## Current pipeline

```mermaid
flowchart LR
  E0[E0 Instrument] --> E1[E1 Behaviour]
  E1 --> E2[E2 Readout]
  E2 --> E3[E3 Localise]
  E3 --> E4[E4 Shared]
  E4 --> E5[E5 Fix]
  E5 --> Layer[RR-Layer later]
```

Programme destination: diagnosis-conditioned reliability layer (not a generic prompt rewriter).

## Already delivered

- Programme architecture, RQs, budget, next steps
- Q1 protocol (`research/protocols/state_loss/`: E0–E5, prereg, benchmarks, plan)
- Repo layout: `research/`, `src/rr/`, `failures/state_loss/`
- Lit agent (`PAPER.md` + prompt) and first 5 seed notes (Guo marked THREAT)
- Interactive site + flowcharts

## Layout

```text
reasoning-reliability/
  README.md                 ← you are here
  research/
    docs/                   programme docs (see docs/README.md)
    protocols/state_loss/   Q1 specs
    research-vault/         Obsidian vault + lit notes
  src/rr/                   shared runners / clients / probes
  failures/state_loss/      failure-specific code (scaffold)
  configs/  data/  results/ tests/  site/
```

## Where to look

| Need | Open |
|---|---|
| Current programme / budget / next steps | [`research/docs/programme_architecture.md`](research/docs/programme_architecture.md) |
| Docs map | [`research/docs/README.md`](research/docs/README.md) |
| Q1 experiments | [`research/protocols/state_loss/`](research/protocols/state_loss/) |
| Scientific design detail | [`research/docs/research_design.md`](research/docs/research_design.md) |
| Checklist | [`research/docs/checklist.md`](research/docs/checklist.md) |
| Decision log | [`research/docs/decisions.md`](research/docs/decisions.md) |
| Lit notes | [`research/research-vault/papers/`](research/research-vault/papers/) |
| History / parking / old discussion | [`research/docs/archive/background.md`](research/docs/archive/background.md) |
| Site | [`site/`](site/) · [live](https://adya6714.github.io/reasoning-reliability/) |

## Rules

- Raw logs are the truth. Append-only, never edited.
- Every prompt difference must be intended. QA tests block bad runs.
- Answers are checked by program, never by trusting written reasoning.
- Hypotheses and confirmatory tests are pre-registered before confirm runs.

## Setup

```sh
uv sync --extra analysis --extra dev
uv run rr --help
```

```sh
cd site && python3 -m http.server 5173
```
