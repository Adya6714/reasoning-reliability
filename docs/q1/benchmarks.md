# Benchmarks for Q1

## Selection rules (a set is used only if it passes all seven)

1. Tests one failure: state loss.
2. A program gives the gold answer AND the answer each competitor predicts.
3. A difficulty knob moves one demand at a time.
4. Items fit in about 2,000 tokens (activation caching of a 27B model on one A100 80GB).
5. Answer position and update positions are known token by token.
6. Fresh items, or contamination checked.
7. Licence allows research use, and redistribution of anything we publish.

## Chosen

| Set | Role | Rules passed | Licence | Notes |
|---|---|---|---|---|
| UpdateLedger (own) | Primary, every experiment | 1-7 | ours | Only set with read AND computed modes and three labelled competitors |
| PI-LLM, huggingface.co/datasets/giantfish-fly/pi-llm | Read-mode anchor; held-out fix test | 1,2,5,6,7 | MIT | 580 core rows. Replicate the published interference curve first |
| comp-mech, huggingface.co/datasets/francescortu/comp-mech | Prior-competitor anchor | 1-5 | NOT STATED | Check licence before use; drop if unclear |
| v1.1 GSM false-state runs | Cross-check | 2,5 | ours | Carried-forward errors in arithmetic |

## Considered and rejected (for Q1)

| Set | Why not now |
|---|---|
| Kim & Schuster boxes (github.com/sebschu/entity-tracking-lms) | No licence file; data in a password-protected zip. Our neighbour condition copies the design, not the data |
| CICM (Guo et al. 2026) | Not released yet ("after review"). Re-check monthly; would be the best read-mode anchor |
| StateMemBench | Data link not found; LLM judge |
| BABILong, RULER | Long-context retrieval, not update interference; too long for activation caching |
| tau2-bench, AppWorld | LLM-played users or judges; failures mix causes. Use after Q1 for transfer |
| GSM8K and variants | Contaminated; not state tracking |

## UpdateLedger factors

| Factor | Levels | Held fixed |
|---|---|---|
| mode | read ("A is now 15"), computed ("A rises by 5") | entities, update count, template |
| competitor | stale, neighbour, prior, none (control) | mode, length |
| strength | stale: old value repeated 1/2/4 times; neighbour: name similarity (A1/A2 vs Alpha/Zed) and distance; prior: familiar default strength (rated list) | everything else |
| n_updates | 2, 4, 8, 16, 32 | entities |
| distance | last update to question: near / far (equal-length filler) | total tokens |
| surface | warehouse, bank, game, lab, file system | spec |

Number rules: values 2-99, no answer equals any other value in the item unless that value is the
designed competitor; computed mode never writes the gold value anywhere (checked by QA).

## Stale competitors differ by mode (design note)

- Read mode: every stale value is written in the text.
- Computed mode: the initial value is written; intermediate totals are not. An error equal to an
  unwritten intermediate means the model computed part of the chain and stopped (a different
  failure from returning the written initial value). Both are labelled separately:
  `stale_written` and `stale_unwritten_intermediate`.
- Strength in computed mode = how many times the written initial value is restated before the updates.
