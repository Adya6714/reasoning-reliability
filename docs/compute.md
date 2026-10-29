# Compute

## Provider: JarvisLabs

- GPUs: L4 (24GB), A100 40GB and 80GB, H100, H200, A6000 and others. India datacenter. Per-minute billing, no minimum.
- Has a CLI (`pip install jarvislabs`, `jl ...`) that Cursor can drive.
- Lists managed and serverless endpoints for open models. Check which of our models are available there before self-hosting.
- Prices change. Check the pricing page before planning a run. Rough guide (2026): L4 about $0.44/hr, A100 80GB about $1.49/hr.

## Which GPU for what

| GPU | Use |
|---|---|
| L4 (24GB) | Small models (7B to 9B), debugging pipelines, tests |
| A100 80GB | Main workhorse: models up to about 27B at full precision, OLMo fine-tuning |
| H100 | Only if a run is too slow on A100 |

## Rules

- Confirm vLLM batch-invariant mode works on the chosen GPU on setup day (needs compute capability 8.0+).
- Use spot (interruptible) instances only after the runner can resume from where it stopped.
- Keep model weights on persistent storage; do not re-download every session.
- Record GPU type, driver, CUDA, vLLM version and precision in every run's metadata.

## TODO

- [ ] Monthly budget (GPU hours and API spend).
- [ ] Check which roster models are on JarvisLabs managed endpoints.
