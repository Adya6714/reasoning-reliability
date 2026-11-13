# Lit weekly — 13 Nov 2026

## Notes added
1. Guo2026_WhenContextChanges (2609.38866) — **THREAT**
2. Wang2025_UnableToForget / PI-LLM (2506.08184)
3. Qiao2026_RetrievalBiasUpdates (2603.12271)
4. Chattaraj2026_RememberFirstForgetLast (2603.00270)
5. ChenYeh2026_RemovingCompetitor (zenodo 23153676)

## New THREAT papers
- **Guo et al. 2026** — closest competitor to Q1. Read-mode stale binding + probes + attention routing. Does **not** cover computed mode, prior competitor, or costed fix comparison. Adya must read this note before E0.

## Three most important numbers (unchecked)
1. Guo: current value decodable on **84.8%** (Qwen) / **82.2%** (Llama) of old-value errors.
2. Chattaraj & Raj: proactive interference dominates retroactive across 39 models (**d = 1.73**).
3. Chen & Yeh: deleting competitor attention alone is not enough; redirecting to the current value is required for recall recovery (see note for table/page).

## Open questions for Adya
1. Confirm Guo has no computed-state condition we missed (note says none).
2. Set `numbers_checked: true` on any note you verify against the PDF.
3. Sign off Q1 8 checkboxes so E0 can start.
