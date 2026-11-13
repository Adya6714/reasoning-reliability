# Q1: read versus computed state (spec files)

Status: DRAFT FOR REVIEW, 13 Nov 2026. No code until the plan is signed off.

- Plan summary (claims, models, prior art, open decisions): [`plan.md`](plan.md)
- External plan doc: [Claude artifact](https://claude.ai/artifact/4QCEGk2Qux7akPpFAmmXAS)

**Q1.** When a model tracking changing values answers wrong, which competing value wins
(stale, neighbour, prior), and does the cause differ when the current value is written in the
context (read) versus when it must be computed and never appears (computed)?

| File | What |
|---|---|
| `plan.md` | Draft plan: question, prior art, claims, models, experiments, open decisions |
| `benchmarks.md` | Selection rules, the chosen sets, why each was chosen or rejected |
| `E0_instrument.md` | UpdateLedger generator, solvers, competitor labels, QA gates |
| `E1_behaviour.md` | Breaking points and error attribution on all models (C1) |
| `E2_readout.md` | Probes and logit lens: is the right value inside on failure? (C2) |
| `E3_localise.md` | Patching: which components make the competitor win? (C3) |
| `E4_shared.md` | Do the three competitors share a cause? (C3, RQ1) |
| `E5_fix.md` | Seven fixes, head to head, with cost (C4, RQ3) |
| `prereg.md` | Definitions and pass marks to freeze with a git tag |
| `item_example.json` | One formal item, both modes |

Order: E0 -> E1 (9B pilot first) -> E2 -> E3 -> E4 -> E5. Each gate is in its file.

Code layout (to build after sign-off; reuses the v1.1 runner design):

```
src/reasoning_reliability/
  ledger/       generator.py, solver.py, solver_check.py, competitors.py, render.py
  runner/       client.py, runner.py, scoring.py     (port of rvc11)
  interp/       hooks.py, cache.py, probes.py, lens.py, patching.py, attribution.py, sae.py
  fixes/        prompts.py, scaffold.py, redirect.py, reask.py, steer.py, lora.py
  analysis/     e1.py ... e5.py
configs/q1/     study.yaml, models.yaml
data/q1/        bank.jsonl (frozen, hashed), splits.json
results/q1/<run>/  calls.jsonl, acts/, scored.csv, analysis/
```
