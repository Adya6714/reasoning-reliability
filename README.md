# Reasoning Reliability

An open research workspace for testing whether controlled behavioral measurements predict how language models fail on held-out tasks, beyond aggregate accuracy and psychometric skill profiles.

The project starts with a behavioral instrument. It does not assign “retrieval” or “computation” labels until those signals have been calibrated against known exposure and validated by interventions.

## Research sequence

1. Freeze a precise behavioral protocol, task generators, verifiers, contamination policy, baselines, and the held-out task-family split.
2. Run a small, multi-family pilot to estimate item difficulty, parse failures, decoding variance, construct reliability, and paired effects.
3. Compare score, psychometric skill-profile, and process-diagnostic predictions on fresh generated tasks; include answer-preserving and answer-changing probes.
4. Calibrate any retrieval/exposure interpretation against controlled, known training exposure.
5. Use accessible open-weight checkpoints for mechanistic and checkpoint studies, then test training interventions.

The design and current decisions are in `docs/`. Open the repository root as an Obsidian vault; the research home is `research-vault/00_Home.md`.
The data flow is documented in `docs/architecture.md`.

The research vault also includes a test-selection plan and a novelty/reliability note. Open `research-vault/00_Home.md` in Obsidian to navigate the literature and decisions.

## Models and benchmark policy

The candidate behavioral panel is Qwen3.5-27B, Gemma 4 31B Dense, and Llama 4 Scout, with model revisions pinned at launch. Qwen3.5-4B is now an exploratory mechanistic instrumentation candidate because an open neuron-steering workflow exists; Qwen3-8B remains a second tractable candidate. Neither is selected until task accuracy, GPU VRAM, and tool compatibility are checked. Mechanistic methods will be compared on the same checkpoint before any cross-family claims. See `configs/models.yaml`.

Primary outcomes use newly generated, oracle-verified task instances with private test seeds and controlled surface variants. Public benchmarks such as GSM8K, AIME, and MATH are secondary anchors only. PostTrainBench evaluates an AI agent's ability to post-train another model; it is not itself a reasoning benchmark. See `docs/benchmark_policy.md`.

## Reproducibility

- One row per model × task item × surface × decoding replicate.
- Save exact prompt, model/provider revision, chat template, decoding parameters, raw response, parser/verifier versions, and timestamps.
- Keep item-level outputs append-only; regenerate aggregate results from those records.
- The independent unit for behavioral claims is the generated task item (or generator family/seed cluster), not each repeated model call.
- Do not use repeated calls as a substitute for more independent items. See `docs/research_design.md`.

## Development setup

```sh
uv sync --extra analysis --extra dev
uv run rr --help
```

The initial implementation is a research scaffold. A fixed experiment run command will be configured only after the pilot protocol and environment are frozen.
