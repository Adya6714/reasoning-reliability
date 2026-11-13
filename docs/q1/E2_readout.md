# E2 Readout: is the right value inside the model when it fails? (C2)

**Question.** At the answer position of a failed run, can the correct value be read from the
residual stream, and at which layer does the competitor overtake it?

## Models
Qwen3.5-27B (thinking off), Gemma 3 27B-it. Code built first on Qwen3.5-2B.

## Inputs
E1 cells with 30-70% failure; ~1,000 failed and ~1,000 matched successful runs per mode.

## Procedure
1. Cache residual stream at every layer at: answer position, query tokens, last token of each update.
2. Probes (per layer, per mode):
   - Value probe: predict the gold value (classification over 2-99, or regression on value), trained on successes and tested on failures.
   - Contrast probe: correct vs designed competitor, using candidate unembeddings.
   - Controls: same probe on shuffled labels (selectivity), and on input embeddings only (text-only baseline).
3. Logit lens (and tuned lens if it trains stably on the hybrid model): logit(gold) - logit(competitor) per layer.
4. Qwen-specific: separate readouts after linear-attention (GatedDeltaNet) blocks vs full-attention blocks.
5. SAE features (Qwen-Scope 27B, Gemma Scope 2 27B) at the overtaking layer: top features that differ between failure and success.

## Outputs
Decodable share of failures by layer and mode; overtaking layer per mode; top SAE features; plots.

## Gate to E3
A layer band where the gold-competitor gap flips in failures, in at least one mode.

## Pass mark (C2)
Read-mode decodable share minus computed-mode share >= 15 points (95% CI excludes 0);
probe beats text-only baseline by >= 0.05 AUROC.
