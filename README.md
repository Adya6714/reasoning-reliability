# Reasoning Reliability

Two models with the same score can solve problems in different ways. This project measures those ways per problem, tests whether they predict failures on unseen task types beyond general skill, finds their causes, and uses that to choose fixes that make reasoning reliable.

## Status

Design stage. No experiments yet. The code in `src/` is a placeholder until the design is frozen.

## Plan in one line

Diagnose (measure habits) → predict (failures on a hidden task family) → explain (controlled exposure, then internals) → fix (harness, SFT, RL environments, JEPA).

## Where to look

| File | What it is |
|---|---|
| `docs/research_design.md` | The full research design: questions, dimensions, hypotheses, stages, benchmarks, analysis, novelty |
| `docs/roadmap.md` | Phases, weeks and gates |
| `docs/checklist.md` | What is done and what is next |
| `docs/decisions.md` | Dated log of every design decision |
| `docs/model_selection.md` and `configs/models.yaml` | Models and why |
| `configs/study.yaml` | Study settings |
| `docs/compute.md` | GPUs (JarvisLabs) |
| `docs/runner_requirements.md` | Rules the runner must meet before any GPU run |
| `docs/architecture.md` | Data flow and code layout |
| `docs/reading_list.md` | Papers and labs to read |
| `docs/v1_audit.md` | What went wrong in v1 and what we keep |
| `research-vault/00_Home.md` | Obsidian home (open the repo root as the vault) |

## Rules

- Raw logs are the truth. Append-only, never edited.
- Every prompt difference must be intended. QA tests block runs that fail.
- Answers are checked by program, never by trusting written reasoning.
- Hypotheses and the main test are pre-registered before confirmatory runs.

## Setup

```sh
uv sync --extra analysis --extra dev
uv run rr --help
```
