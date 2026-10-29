---
title: "arXiv gap fill: planning, number changes, overthinking, memorization (2025–2026)"
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

# arXiv gap fill: planning, number changes, overthinking, memorization (2025–2026)

> Follow-up to the X / LessWrong / GitHub sweeps. Those were thin on (1) greedy / no-planning failures, (2) “changed the numbers and it failed”, (3) overthinking, and (4) memorization vs reasoning. Searched arXiv / HTML abstracts for 2025–2026 papers in those four buckets. Numbers below are from abstracts and skimmed sections, not full replications.

## 1. Takeaways

- **Planning failures are measurable and mostly latent.** Simmer (2606.14574) finds at most 17% error-free plans and up to 56% latent failures; explicit state / foresight cuts latent failures ~72%. Arbor (2610.22717) attributes long-CoT failures via a reasoning-state tree, including PlanBench trajectories.
- **Number changes are a real robustness failure, with a caveat.** GSM-Symbolic, GSM-Ranges, MATH-Perturb, and numeric-remapping attacks all show large drops when numbers or hard structure change. A 2026 re-evaluation (2605.28700) warns that GSM-Symbolic’s number distribution is shifted larger, so some “surface fragility” is partly arithmetic difficulty.
- **Overthinking is established, but eval design can fake collapse.** Shojaee et al. (Illusion of Thinking, 2506.06941) document early correct solutions then wasted exploration, plus collapse at high complexity. Critiques (Lawsen 2506.09250; Rethinking 2507.01231) show token limits and unsolvable River Crossing items inflate failure. Separate work finds inverted-U length–accuracy curves and “context anxiety”.
- **Memorization vs reasoning needs hard perturbations, not only paraphrases.** MATH-Perturb’s hard set drops o1-mini ~16.5pp; GSM-SEM’s semantic variants drop ~28% under strict settings; models sometimes keep the old answer after numbers change.
- **Design implication:** keep generators that (a) rematch numbers under a fixed schema, (b) change answer-relevant structure, and (c) hold harness / output format fixed — aider’s 20%→61% laziness result shows format alone can dwarf these effects.

## 2. Counts by failure type

| Failure type | Items | Strong items |
|---|---:|---:|
| Planning / latent plan failure / state tracking | 4 | 3 |
| Incorrect numbers / numeric remapping | 5 | 4 |
| Overthinking / length collapse | 5 | 3 |
| Memorization / contamination / surface vs hard perturb | 4 | 3 |
| **Total kept** | **14** | **10** |

## 3. Must-read (verify these first)

| # | Item | Why it matters for the project | Verified? |
|---|---|---|---|
| 1 | [Simmer](https://arxiv.org/abs/2606.14574) | Latent planning failures + foresight fix; maps to state-tracking dimension | abstract+html skim |
| 2 | [Arbor](https://arxiv.org/abs/2610.22717) | Failure attribution via reasoning-state trees; covers PlanBench | abstract+html skim |
| 3 | [GSM-Symbolic](https://arxiv.org/abs/2410.05229) | Template number/name changes; core famous-vs-twin design precedent | abstract skim |
| 4 | [Statistically Earnest re-eval](https://arxiv.org/html/2605.28700v3) | Corrects GSM-Symbolic: large-number confound | abstract+html skim |
| 5 | [MATH-Perturb](https://arxiv.org/html/2502.06453v2) | Hard vs simple perturbations; “apply remembered skill blindly” | abstract+html skim |
| 6 | [Illusion of Thinking](https://arxiv.org/abs/2506.06941) + [critique](https://arxiv.org/html/2506.09250v2) | Overthinking + why some collapse results are artifacts | abstracts skim |
| 7 | [Numeric-remapping attacks](https://arxiv.org/html/2606.03606) | Automatic schema-preserving number changes; GSM8K −12 to −26pp | abstract+html skim |
| 8 | [GSM-SEM](https://arxiv.org/html/2605.07053) | Semantic variants beyond name/number swaps; memorization filter notes | abstract+html skim |

## 4. All items

| # | Item (link) | What failed (one line) | Failure type | Domain | Model | Model or harness? | Evidence | Strength | Verified? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | [Simmer](https://arxiv.org/abs/2606.14574) | Plans look executable but hide latent / irreversible failures; ≤17% error-free | Planning / latent | agents / kitchen | 6 LLMs | model (+ world-model harness) | measured | strong | skim |
| 2 | [Arbor](https://arxiv.org/abs/2610.22717) | Long CoT failures attributed via state tree; PlanBench chains accumulate infeasible steps | Planning / state | logic / planning | reasoning models | model | measured | strong | skim |
| 3 | [StateAct](https://arxiv.org/html/2410.02810v2) | Explicit state tracking corrects predicted-state errors (~88% claimed) | State tracking | agents | LLMs | harness | measured | medium | abstract |
| 4 | [PlanBench](https://arxiv.org/abs/2206.10498) | Classical planning / Mystery Blocksworld still hard; baseline for planning suite | Planning | planning | GPT-4 era | model | measured | strong | known prior |
| 5 | [GSM-Symbolic](https://arxiv.org/abs/2410.05229) | Same template, new numbers → accuracy drop; irrelevant clause → up to −65% | Numbers / memorization | maths | many SOTA | model | measured | strong | skim |
| 6 | [Earnest re-eval](https://arxiv.org/html/2605.28700v3) | Only 8/20 models keep significant variant effect after stats + large-number control | Numbers (caveat) | maths | 20 open models | model | measured | strong | skim |
| 7 | [GSM-Ranges](https://arxiv.org/html/2502.08680) | Larger numbers → logical errors up to +14pp; arithmetic OK standalone, fails in word problems | Numbers | maths | various | model | measured | strong | skim |
| 8 | [Numeric remapping](https://arxiv.org/html/2606.03606) | Schema-preserving remaps: GSM8K −12.16 to −25.82pp; MAWPS/MultiArith near-stable | Numbers | maths | R1-70B, Gemma4-31B, GPT-OSS-120B | model | measured | strong | skim |
| 9 | [MATH-Perturb](https://arxiv.org/html/2502.06453v2) | Hard perturbations change solution structure: o1-mini −16.49%, Gemini-flash-thinking −12.9% | Memorization / structure | maths | frontier | model | measured | strong | skim |
| 10 | [GSM-SEM](https://arxiv.org/html/2605.07053) | Semantic entity/relation edits; ~28% avg drop at max strictness; some keep old answers | Memorization / surface | maths | 14 LLMs | model | measured | strong | skim |
| 11 | [Illusion of Thinking](https://arxiv.org/abs/2506.06941) | Easy: correct early then overthink; hard: collapse and fixate on early wrong paths | Overthinking | puzzles | LRMs | model | measured | strong | skim |
| 12 | [Illusion critique](https://arxiv.org/html/2506.09250v2) | Token limits + unsolvable River Crossing items mislabeled as reasoning collapse | Eval artifact | puzzles | several | both | measured | strong | skim |
| 13 | [Does Thinking More Help?](https://arxiv.org/html/2506.04210v2) | Extra “Wait” thinking: accuracy rises then falls (e.g. 87.3%→70.3%); parallel thinking better | Overthinking | maths | reasoning models | model | measured | strong | skim |
| 14 | [Lost in Context / anxiety](https://arxiv.org/html/2607.21616) | Models abandon with “token anxiety”; 24% usage misestimate; SFT cuts anxiety >50% | Overthinking / budget | puzzles | frontier | model | measured | medium | skim |
| — | [When More is Less](https://arxiv.org/abs/2502.07266) | Inverted-U CoT length vs accuracy; optimal length ↑ with difficulty, ↓ with capability | Overthinking | general | various | model | measured | medium | abstract |
| — | [Between Under/Overthinking](https://arxiv.org/abs/2505.00127) | Overthink easy, underthink hard; length preference can shrink tokens with ok accuracy | Overthinking | general | LLMs | model | measured | medium | abstract |
| — | [Overclocking reasoning](https://arxiv.org/abs/2506.07240) | Internal progress encoding; steering shortens paths and can raise accuracy | Overthinking | general | LLMs | model | measured | medium | abstract |
| — | [Readout Shortcut](https://arxiv.org/html/2605.22870v1) | Small models copy positional numbers in CoT readout; replicates on GSM-Symbolic | Numbers / mechanism | maths | small LMs | model | measured | medium | abstract |

Strength: **strong** = specific, reproducible, with example or numbers · **medium** = specific but thin · **weak** = anecdote or no example.

## 5. Must-read item notes

### #1. Simmer — latent planning failures
- **Link:** https://arxiv.org/abs/2606.14574
- **What failed:** Executable-looking kitchen plans still hide latent and irreversible failures; frontier models ≤17% error-free; up to 56% of plans have latent failures.
- **Setup:** Symbolic world model (77 actions, 262 objects); state-machine executor.
- **Evidence:** Six-LLM eval; foresight / counterfactual state reasoning cuts latent failures up to 72%, irreversible up to 75%.
- **Why it matters:** Supports a planning family with **latent** (not only immediate) failure labels, and a harness fix (explicit foresight) to test in fix-first.

### #2. Arbor — reasoning-state failure attribution
- **Link:** https://arxiv.org/abs/2610.22717
- **What failed:** Overthinking / underthinking / unsupported steps refined into subtypes tied to tree operations (create, verify, prune, revisit).
- **Setup:** Trajectories as trees of reasoning states; ZebraLogic, 24 Game, PlanBench.
- **Evidence:** Failure steps separable from at-risk non-failure steps by pre-step tree state; PlanBench fails by accumulating infeasible steps that pass local checks.
- **Why it matters:** Method for labeling *which step* broke planning/state — useful for process measures and mech-interp targets.

### #3–4. GSM-Symbolic and its re-evaluation
- **Links:** https://arxiv.org/abs/2410.05229 · https://arxiv.org/html/2605.28700v3
- **What failed / caveat:** Number changes hurt; but Earnest finds only 8/20 open models keep a significant variant effect, and large-number shift (K-S D=0.12) explains half of remaining cases.
- **Why it matters:** Famous-vs-twin design is still right, but **match number magnitude** in twins or you confound memorization with arithmetic hardness.

### #5. MATH-Perturb
- **Link:** https://arxiv.org/html/2502.06453v2
- **What failed:** Hard perturbations (solution pattern no longer applies) drop o1-mini 16.49pp, Gemini-2.0-flash-thinking 12.9pp; models apply remembered skills without checking fit.
- **Why it matters:** Separates answer-preserving rewrites from answer-changing / structure-changing edits in our variant plan.

### #6–7. Illusion of Thinking (+ critique) and numeric remapping
- **Overthinking:** Early correct solution then continued wrong exploration; collapse at high complexity; critiques show token-limit and unsolvable-item artifacts.
- **Numeric remapping:** Automatic schema-preserving remaps still drop GSM8K 12–26pp on strong open models.
- **Why it matters:** Overthinking tests need solvable instances and length controls; number tests should hold schema fixed and recompute gold.

### #8. GSM-SEM
- **Link:** https://arxiv.org/html/2605.07053
- **What failed:** Semantic entity/relation edits cause larger drops than name/number swaps alone (~28% avg at max strictness); some models return the pre-edit answer after numbers change.
- **Why it matters:** Third axis beyond rewrite and number remap: **fact-changing semantic variants** with regenerated answers.

## 6. Excluded and duplicates

| Item | Reason |
|---|---|
| Older PlanBench follow-ups (2023–2024 only) | Prefer 2025–2026 for gap fill; PlanBench kept as foundation |
| Duplicate Illusion-of-Thinking comment mirrors | Same as Lawsen critique |
| Pure survey / opinion pieces without new numbers | Out of scope |

## 7. Thin areas (searched, little found)

- Clean **greedy / one-step myopic** planning failures with a public generator (beyond classical PDDL “invalid action” rates).
- Social-media-style “changed the numbers” anecdotes remain rare; literature is stronger than X here.
- Direct head-to-head of **harness format** × **number remap** × **planning latent failure** on one model (needed for our study).

## 8. My notes

- Map into A3 / dimensions: Simmer+Arbor → planning & state-tracking; GSM-* / MATH-Perturb / remapping → surface dependence & misplaced retrieval; Illusion + length papers → overthinking / self-correction; GSM-SEM memorization filter → famous vs twin design.
- Before freezing generators: (1) match number magnitude in twins, (2) include hard structure-changing edits, (3) mark latent vs immediate plan failures, (4) hold edit format fixed when measuring model process.
- Full paper notes still needed for overlap-scored `papers/` entries (use `NOTE.md`).
)
