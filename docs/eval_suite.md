# Eval suite

## Purpose

- One set of generators with exact solvers, used five times: test bank (behaviour), hidden family (prediction), controlled training data (causes), labelled examples (mechanism), RL environments and SFT data (fixes).
- The suite is a named contribution of Paper 1.

## Selection rules (every family must pass all six)

1. A program can check the answer.
2. A generator makes fresh versions with a difficulty knob.
3. A famous published version exists (memorization pole).
4. Surface can change with structure fixed; answer-changing edits are also possible.
5. Models land at 30 to 80% accuracy (difficulty tuned per model).
6. Clearly tests at least one root ability (see `docs/root_abilities.md`); licence and access are fine.

- Contamination is a variable, not the enemy: pair famous items with fresh twins of identical structure and solver-verified gold.

## Families (5 profiling + 1 hidden)

| Family | Score (of 18) | Main root abilities | Sources |
|---|---:|---|---|
| A Planning and greedy traps | 17 | R4, R1 | PlanBench Blocksworld/Mystery, own greedy-trap generators, Fast Downward |
| B Long state tracking and compound goals | 17 | R1, R2 | own generator |
| C Code execution (output prediction) | 17 | R1, R8 | CRUXEval-style, own program generator that runs for gold |
| D Maths word problems with twins | 15 | R5, R8 | own templates on GSM8K (MIT) |
| E Logic and rule worlds | 15 | R3, R5 | Reasoning Gym wrappers, own changed-rule worlds |
| F HIDDEN: deterministic tool-use sandbox | 15 | same abilities, different surface | own sandbox; seeds in `data/private/` |

- Headline test: do profiles from cheap puzzle, code and maths families predict failures in the agent sandbox?

## Item plan

- About 300 structural items per family: 50 famous, 50 twins, 200 fresh.
- About 5 surface versions per item.
- 40/60 split: development vs confirmation. Confirmation set is not opened until the design is frozen.
- 60 items per family run at k=20 for per-problem claims.

## Benchmark review findings

| Benchmark | Finding | Decision |
|---|---|---|
| Reasoning Gym | Apache-2.0, but now common RL training data | Use; record exposure as a variable |
| PlanBench | o1 97.8% Blocksworld, 52.8% Mystery, 23.6% on 20 to 40 step plans | Use long plans and Mystery-style variants |
| CRUXEval | MIT; about 99% for frontier models; perturbed inputs drop 20 to 24% | Use only own generated programs and perturbations |
| GSM-Symbolic | Data is CC-BY-NC-ND 4.0 (no derivatives) | Do NOT derive from it; build own templates on GSM8K (MIT) |
| MathArena | AIME 2026 at 100% for top models | Small memorization check only |
| tau2 | Near-saturated; LLM user simulator adds judge noise | Not used; own deterministic sandbox instead |
| IFEval / IFBench | IFEval saturated; IFBench top about 81% | Rule tests built into own families |
| SWE-bench | Results dominated by harness | Not used |

- Licences still to verify: PlanBench, tau2/tau3, Lost in Conversation, Math-Perturb, Simmer, DyVal, GSM-Infinite, NPHardEval.

## Build rules for every generator

- A null agent (empty or random answer) must score zero.
- Attack validators with deliberately wrong solutions before trusting them.
- Iterate until each item has exactly one valid outcome.
- Twins match number magnitude.
- Include structure-changing edits, not only surface edits.
- Check puzzle solvability against token limits.
- Hold harness and answer format fixed across variants.
- Report pass^k at k = 1, 4, 8.
- Fix sampler settings per model card.
- Generator audit before use: gold vs an independent solver on 200 samples; difficulty changes accuracy smoothly; identical prompt wrapper; freshness spot-check; maintained and licensed.
