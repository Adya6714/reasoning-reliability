# Model selection

## Behavioral panel

Use a deliberately small panel of three model families in the first confirmatory study:

| Candidate | Reason to include | Constraint |
|---|---|---|
| Qwen3.5-27B | Current open-weight Qwen family; Apache-2.0 card; strong behavioral anchor | Hybrid gated-delta/full attention; not the easiest first circuit target |
| Gemma 4 31B Dense | Current large dense checkpoint from an independent family; Apache-2.0 card; dense model is useful for later layerwise work | Hybrid local/global attention and multimodal family; confirm exact implementation and revision |
| Llama 4 Scout | Independent Meta family and mixture-of-experts contrast; 17B active / 109B total parameters | Very high total weight footprint, multimodal, and Llama Community License; hosted inference is likely needed |

“Best” is task- and inference-mode-dependent. This roster is a current, technically diverse open-weight panel, not a universal leaderboard claim. Three families provide an interpretable minimum for checking whether a behavioral effect is family-specific; they do not justify population-wide claims about all LLMs. Add a fourth model only if it answers a planned contrast, such as a closed frontier anchor or an explicitly reasoning-trained counterpart.

Use instruction-tuned checkpoints for the primary deployed-assistant behavior question. Do not compare a base model with an instruct model as though they differ only in scale. Freeze thinking mode, prompt, context, output cap, precision, server, and model revision. If thinking and non-thinking modes are both studied, preregister them as matched conditions.

The roster uses weights so that prompts, revisions, and serving can be controlled. Hosted inference can reduce local GPU barriers, but server details and revisions must still be recorded. Local quantized serving gives more environmental control but makes precision part of the intervention; do not silently compare an API FP16 result to a local 4-bit result.

## Mechanistic model

Use Qwen3.5-4B as an exploratory neuron-steering feasibility candidate because an open steering workflow and a public behavioral steering example exist for that exact checkpoint. This makes it useful for reproducing controls and validating the intervention stack, not automatically the right representative of the behavioral panel. Keep Qwen3-8B as a second tractable candidate; first verify each candidate's task accuracy, activation access, software compatibility, and the available GPU VRAM. A second-family replication should follow only after the same behavioral manipulation is measurable.

When comparing neuron, SAE/transcoder, or ICA explanations, use the same checkpoint and behavior-linked prompts first so training-recipe differences do not masquerade as method differences. A cross-family comparison is a later replication, not a controlled test of representational basis.

## Selection record

At each run, archive the Hugging Face commit hash, tokenizer files/revision, chat template, license snapshot, inference library/server version, precision, and generation configuration. Model display names are not stable identifiers.
