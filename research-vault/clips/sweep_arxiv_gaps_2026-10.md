---
title: "arXiv gap fill: planning, number changes, overthinking, memorization (2025-2026)"
type: sweep
source: other
run_date: 2026-10-29
period_covered: 2025-01 to 2026-10
items_found: 18
items_kept: 14
status: skimmed
trust: medium
numbers_checked: false
overlap: 3
---

# arXiv gaps: planning, numbers, overthinking, memorization

## At a glance

| | |
|---|---|
| **Role** | Fill thin areas from X / LW / GitHub sweeps |
| **Period** | 2025-01 to 2026-10 |
| **Found → kept** | 18 → **14** (+ several abstract-only extras) |
| **Status / trust** | skimmed / medium |
| **Overlap** | 3 |
| **Depth** | Abstracts + HTML skims (not full replications) |

> Planning failures are often **latent**. Number changes hurt, with a large-number caveat. Overthinking is real, but some "collapse" is an eval artifact. Memorization needs hard structure edits, not only paraphrases.

## Method

Follow-up search after social sweeps were thin on (1) greedy / no-planning, (2) "changed the numbers", (3) overthinking, (4) memorization vs reasoning. Numbers below are from abstracts and skimmed sections.

## Takeaways

1. **Planning is measurable and often latent.** Simmer: ≤17% error-free plans, up to 56% latent failures; foresight cuts latent failures ~72%. Arbor attributes long-CoT failures via reasoning-state trees (incl. PlanBench).
2. **Number changes are real, with a caveat.** GSM-Symbolic / GSM-Ranges / remapping / MATH-Perturb show large drops. Earnest (2605.28700): GSM-Symbolic numbers are shifted larger, so some "surface fragility" is arithmetic difficulty.
3. **Overthinking is established; collapse can be faked.** Illusion of Thinking documents early correct solutions then wasted exploration. Critiques: token limits and unsolvable River Crossing items inflate failure.
4. **Memorization needs hard perturbations.** MATH-Perturb hard set: o1-mini −16.5pp. GSM-SEM semantic variants: ~28% drop at max strictness; some models keep the old answer after numbers change.
5. **Design implication.** Generators should (a) rematch numbers under a fixed schema, (b) change answer-relevant structure, (c) hold harness / output format fixed. aider's 20%→61% shows format alone can dwarf these effects.

## Failure types

| Failure type | Items | Strong |
|---|---:|---:|
| Planning / latent / state tracking | 4 | 3 |
| Incorrect numbers / numeric remapping | 5 | 4 |
| Overthinking / length collapse | 5 | 3 |
| Memorization / hard perturb | 4 | 3 |
| **Total kept** | **14** | **10** |

## Must-read

| # | Paper | Why it matters | Depth |
|---|---|---|---|
| 1 | [Simmer](https://arxiv.org/abs/2606.14574) | Latent planning failures + foresight fix | abstract+html |
| 2 | [Arbor](https://arxiv.org/abs/2610.22717) | Failure attribution via reasoning-state trees | abstract+html |
| 3 | [GSM-Symbolic](https://arxiv.org/abs/2410.05229) | Famous-vs-twin precedent (name/number templates) | abstract |
| 4 | [Earnest re-eval](https://arxiv.org/html/2605.28700v3) | Large-number confound for GSM-Symbolic | abstract+html |
| 5 | [MATH-Perturb](https://arxiv.org/html/2502.06453v2) | Hard vs simple perturbations; blind skill reuse | abstract+html |
| 6 | [Illusion of Thinking](https://arxiv.org/abs/2506.06941) + [critique](https://arxiv.org/html/2506.09250v2) | Overthinking regimes + eval artifacts | abstracts |
| 7 | [Numeric remapping](https://arxiv.org/html/2606.03606) | Schema-preserving remaps; GSM8K −12 to −26pp | abstract+html |
| 8 | [GSM-SEM](https://arxiv.org/html/2605.07053) | Semantic variants beyond name/number swaps | abstract+html |

### Must-read notes

**1. Simmer** · latent planning

- Executable-looking kitchen plans hide latent / irreversible failures; frontier ≤17% error-free; up to 56% latent.
- World model: 77 actions, 262 objects; state-machine executor.
- Foresight / counterfactual state reasoning: latent −72%, irreversible −75%.
- Use: planning family with latent labels; foresight as a fix-first harness.

**2. Arbor** · reasoning-state attribution

- Refines overthinking / underthinking / unsupported steps into tree operations (create, verify, prune, revisit).
- Tasks: ZebraLogic, 24 Game, PlanBench.
- PlanBench fails by accumulating infeasible steps that pass local checks.
- Use: label *which step* broke planning/state for process measures.

**3-4. GSM-Symbolic + Earnest**

- Number changes hurt; Earnest: only 8/20 open models keep a significant variant effect after stats + large-number control (K-S D=0.12).
- Use: famous-vs-twin is right; **match number magnitude** in twins.

**5. MATH-Perturb**

- Hard perturbations (solution pattern no longer applies): o1-mini −16.49pp, Gemini-flash-thinking −12.9pp.
- Use: separate answer-preserving rewrites from structure-changing edits.

**6-7. Illusion (+ critique) and numeric remapping**

- Easy: correct early, then overthink. Hard: collapse and fixate on early wrong paths. Critiques: token limits + unsolvable items.
- Schema-preserving remaps still drop GSM8K 12-26pp on strong open models.
- Use: solvable instances + length controls; hold schema fixed and recompute gold.

**8. GSM-SEM**

- Semantic entity/relation edits: ~28% avg drop at max strictness; some models return the pre-edit answer.
- Use: third axis beyond rewrite and number remap.

## All items

| # | Paper | What failed | Type | Strength |
|---|---|---|---|---|
| 1 | [Simmer](https://arxiv.org/abs/2606.14574) | ≤17% error-free; up to 56% latent | Planning / latent | strong |
| 2 | [Arbor](https://arxiv.org/abs/2610.22717) | Long CoT / PlanBench infeasible steps | Planning / state | strong |
| 3 | [StateAct](https://arxiv.org/html/2410.02810v2) | Explicit state tracking (~88% claimed) | State tracking | medium |
| 4 | [PlanBench](https://arxiv.org/abs/2206.10498) | Classical planning / Mystery Blocksworld | Planning | strong |
| 5 | [GSM-Symbolic](https://arxiv.org/abs/2410.05229) | New numbers drop; NoOp clause up to −65% | Numbers / mem. | strong |
| 6 | [Earnest re-eval](https://arxiv.org/html/2605.28700v3) | Only 8/20 keep variant effect after controls | Numbers (caveat) | strong |
| 7 | [GSM-Ranges](https://arxiv.org/html/2502.08680) | Larger numbers: logical errors +14pp | Numbers | strong |
| 8 | [Numeric remapping](https://arxiv.org/html/2606.03606) | GSM8K −12.16 to −25.82pp | Numbers | strong |
| 9 | [MATH-Perturb](https://arxiv.org/html/2502.06453v2) | Hard perturb: o1-mini −16.49pp | Memorization | strong |
| 10 | [GSM-SEM](https://arxiv.org/html/2605.07053) | Semantic edits ~28% drop | Memorization | strong |
| 11 | [Illusion of Thinking](https://arxiv.org/abs/2506.06941) | Overthink easy; collapse hard | Overthinking | strong |
| 12 | [Illusion critique](https://arxiv.org/html/2506.09250v2) | Token limits + unsolvable items | Eval artifact | strong |
| 13 | [Does Thinking More Help?](https://arxiv.org/html/2506.04210v2) | Extra thinking: 87.3% → 70.3% | Overthinking | strong |
| 14 | [Lost in Context](https://arxiv.org/html/2607.21616) | Token anxiety; 24% misestimate | Overthinking | medium |

### Also skimmed (abstract only)

| Paper | Note |
|---|---|
| [When More is Less](https://arxiv.org/abs/2502.07266) | Inverted-U CoT length vs accuracy |
| [Between Under/Overthinking](https://arxiv.org/abs/2505.00127) | Overthink easy, underthink hard |
| [Overclocking reasoning](https://arxiv.org/abs/2506.07240) | Steer shorter paths via progress encoding |
| [Readout Shortcut](https://arxiv.org/html/2605.22870v1) | Small models copy positional numbers in CoT |

**Strength:** strong = specific + numbers · medium = specific but thinner · weak = anecdote.

## Excluded

| Item | Reason |
|---|---|
| Older PlanBench follow-ups (2023-2024 only) | Prefer 2025-2026; keep PlanBench as foundation |
| Duplicate Illusion comment mirrors | Same as Lawsen critique |
| Surveys without new numbers | Out of scope |

## Still thin

- Clean **greedy / one-step myopic** planning failures with a public generator.
- Social "changed the numbers" anecdotes remain rare (literature is stronger).
- Head-to-head of **harness format × number remap × latent planning** on one model.

## Notes for the design

| Map to | Sources |
|---|---|
| Planning / state-tracking | Simmer, Arbor, PlanBench, StateAct |
| Surface dependence / misplaced retrieval | GSM-*, MATH-Perturb, remapping |
| Overthinking / self-correction | Illusion, length papers, anxiety |
| Famous vs twin | GSM-SEM memorization filter |

Before freezing generators: (1) match number magnitude in twins, (2) include hard structure-changing edits, (3) mark latent vs immediate plan failures, (4) hold edit format fixed when measuring model process.

Full paper notes still needed in `research-vault/papers/` via `NOTE.md`.
