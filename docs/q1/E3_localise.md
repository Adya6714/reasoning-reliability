# E3 Localise: which components make the competitor win? (C3)

## Inputs
Minimal pairs from E0 (one update differs; gold changes, competitor does not), restricted to E1 cells.

## Procedure
1. Attribution patching (gradient approximation) over all heads in full-attention layers, every
   GatedDeltaNet block (Qwen) and every MLP, metric = logit(gold) - logit(competitor). Ranks components cheaply.
2. Exact activation patching on the top 30 components, success -> failure, per mode and competitor.
3. Path patching on the top 5: through which later components does the effect flow to the answer?
4. Read mode only: replicate Guo et al.'s query-key finding (old-value attention share) at 27B.
5. Controls: 100 random component sets of equal size, layer-matched.

## Outputs
Ranked component list per (model, mode, competitor) with recovered fraction of the logit gap and CI.

## Pass mark (C3)
Patching <= 3 components recovers >= 50% of the gap in one mode and < 20% in the other mode.

## Notes
- Patching tools assume attention everywhere; GatedDeltaNet blocks are patched as whole blocks
  (their recurrent state is patched at the update token positions).
- All code passes a unit test on Qwen3.5-2B before any 27B run.
