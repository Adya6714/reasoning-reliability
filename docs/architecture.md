# Architecture

## Data flow

```text
generator + exact solver ──> frozen task bank (JSONL) ──> QA tests ──> runner
                                                                         │
                                                         append-only raw logs (JSONL)
                                                                         │
                                                         parser + verifier ──> analysis ──> paper
```

## Code layout (target)

`src/reasoning_reliability/`:

- `items/` generators with difficulty knobs and seeds
- `surfaces/` rewrites applied by code (never by an LLM rewriting whole prompts)
- `protocol/` one fixed answer-format wrapper, added after rewriting
- `verify/` solvers and parsers (ported from v1 with tests)
- `run/` vLLM and API runners (see `docs/runner_requirements.md`)
- `probes/` behavioural and internal probes
- `analysis/` mixed-effects models, bootstrap, IRT, Kendall W

Also: `configs/` (models pinned by revision), `prereg/`, `runs/` (append-only), `tests/qa/`, `data/private/` (gitignored: hidden family and seeds).

## QA tests (block any run that fails)

- Instruction text identical across rewrites
- Gold re-solved for every variant
- Prompt length within a band
- Difficulty matched for reversals
- Whole-word renames only
- Equivalence check by a non-evaluated model

## Current state

`records.py`, `client.py`, `runner.py` and `cli.py` are a placeholder scaffold. They will be rebuilt in Block C.

## Later: systems layer

For agent and tool studies, add a versioned harness between model and task. Record model, harness version, tool/memory/retry policy and seed separately; compare same model with different harness, and different models with one harness.
