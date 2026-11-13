# Reasoning Reliability

Find where a language model breaks at reasoning, locate that failure inside the model, and fix it more effectively than generic interventions. Same accuracy can hide different weaknesses; profiles and internals make those weaknesses actionable.

## Status

Design stage (v3). First focused cut is **Q1** (state loss: read vs computed) — draft for review, 13 Nov 2026. Programme architecture, next steps and budget: [`research/docs/programme_architecture.md`](research/docs/programme_architecture.md). Specs: [`research/protocols/state_loss/`](research/protocols/state_loss/). No Q1 code until sign-off.

## Plan in one line

Measure (breaking points) → Localize (internal signal) → Fix → Verify (vs generic and mismatch) → Generalize (new model family). Destination: diagnosis-conditioned reliability layer (RR-Layer), only after Q1 E5.

```mermaid
flowchart LR
  M[Measure] --> L[Localize]
  L --> F[Fix]
  F --> V[Verify]
  V --> G[Generalize]
  G --> FE[RR-Layer]
```

Full diagram set: [`research/docs/flowcharts.md`](research/docs/flowcharts.md).

## Layout

| Path | What |
|---|---|
| `research/docs/` | Programme docs (architecture, design, roadmap, …) |
| `research/protocols/state_loss/` | Q1 protocol (UpdateLedger, E0–E5, prereg) |
| `research/research-vault/` | Obsidian vault + lit-agent paper notes |
| `src/rr/` | Shared runners, clients, probes, scoring |
| `failures/state_loss/` | Failure-specific measurement / mech / interventions / output |
| `configs/` | Model and study YAML |
| `site/` | Interactive research site |

## Where to look

| File | What it is |
|---|---|
| `research/docs/programme_architecture.md` | **Canonical** programme architecture, next steps, budget (13 Nov) |
| `research/protocols/state_loss/` | Q1 specs (UpdateLedger, E0–E5, prereg, benchmarks) |
| `research/protocols/state_loss/plan.md` | Q1 draft plan (claims, models, prior art, open decisions) |
| `research/docs/agents/LIT_AGENT_PROMPT.md` | Literature-review agent prompt |
| `research/research-vault/templates/PAPER.md` | Paper-note template for the lit agent |
| `research/docs/research_design.md` | Canonical research design (v3 pipeline, RQs, stages, stats, product) |
| `research/docs/flowcharts.md` | Clean Mermaid diagrams for the whole programme |
| `research_design.md` | Short mental-model overview (points to docs) |
| `discussion.md` | Nov 4 discussion log that set the v3 direction |
| `research/docs/eval_suite.md` | Families, selection rules, benchmark review, generator build rules |
| `research/docs/root_abilities.md` | 8 root abilities, ladders, profile measures |
| `research/docs/roadmap.md` | Phases, weeks and gates |
| `research/docs/checklist.md` | What is done and what is next |
| `research/docs/decisions.md` | Dated log of every design decision |
| `research/docs/model_selection.md` and `configs/models.yaml` | Models and why |
| `configs/study.yaml` | Study settings |
| `research/docs/compute.md` | GPUs (JarvisLabs) |
| `research/docs/runner_requirements.md` | Rules the runner must meet before any GPU run |
| `research/docs/architecture.md` | Data flow, code layout, front-end sketch |
| `research/docs/reading_list.md` | Papers and labs to read |
| `research/docs/v1_audit.md` | What went wrong in v1 and what we keep |
| `research/research-vault/00_Home.md` | Obsidian home (open `research/research-vault/` as the vault) |
| `site/` | Interactive research website (static; includes flowchart viewer) |
| `flow_chart.md` | Raw ChatGPT export; superseded by `research/docs/flowcharts.md` |

## Rules

- Raw logs are the truth. Append-only, never edited.
- Every prompt difference must be intended. QA tests block runs that fail.
- Answers are checked by program, never by trusting written reasoning.
- Hypotheses and the main tests are pre-registered before confirmatory runs.

## Interactive research site

Static site in the same style as
[retrieval-vs-computation](https://adya6714.github.io/retrieval-vs-computation/):
left rail, full-page panels, Instrument Serif / Inter, playable explorers.

```sh
cd site
python3 -m http.server 5173
```

Open http://127.0.0.1:5173/ · details in `site/README.md`.

Live: [adya6714.github.io/reasoning-reliability](https://adya6714.github.io/reasoning-reliability/)

## Setup

```sh
uv sync --extra analysis --extra dev
uv run rr --help
```
