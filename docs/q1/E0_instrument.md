# E0 Instrument: UpdateLedger

**Goal.** A frozen, hashed item bank whose gold and competitor labels are provably right.

## Inputs
- Factor grid from `benchmarks.md`.
- Prior-default list: 40 quantities with familiar defaults ("a dozen eggs" = 12, "a week" = 7 days,
  "a deck" = 52 cards), each rated by 3 annotators for familiarity (or by default-answer rate of
  2 small models, as a second rating).

## Item schema (see item_example.json)
`structure_id, mode, competitor, strength, n_updates, distance, surface, entities, initial,
operations[], query, gold, competitors{stale:[..], neighbour:[..], prior:..}, solver_trace[],
token_spans{update_i, query, answer_pos}, rendered_text, split`

## Procedure
1. Sample a structure (entities, initial values, operation list) from a seeded RNG.
2. Solve with solver A (direct replay) and solver B (independent: builds a pandas ledger). Reject on disagreement.
3. Label competitors: every earlier value of the queried entity (stale), current value of every other
   entity (neighbour), the default (prior). Reject items where gold equals any competitor.
4. Render to text from templates per surface. Read mode writes the new value; computed mode writes the
   operation. Record token spans with the target tokenizer(s).
5. Minimal pairs for E3: for each failing-prone item, a twin differing in ONE update so gold changes
   and the competitor does not (and vice versa).
6. Split by structure_id: dev 20%, confirm 60%, held-out templates 20% (E5 only).

## QA gates (all must pass; run offline, no model)
- Solvers agree on 100% of items; solver B independently re-run on a 200-item sample.
- Computed mode: gold string never appears in the text (regex over all number formats).
- Each competitor value appears in the text as designed (stale/neighbour) or not (prior).
- Fake clients: always-gold 100%, always-stale = stale rate 100%, empty 0%, echo-last-number scores as designed.
- Token spans round-trip for Qwen3.5 and Gemma 3 tokenizers.
- Surfaces of one structure share gold; no surface leaks across splits.
- Item length under 2,000 tokens.

## Outputs
`data/q1/bank.jsonl` (+ sha256), `data/q1/splits.json`, `data/q1/qa_report.md`.

## Pass mark
All gates pass. Target size: 5 surfaces x ~1,500 structures, after the E1 pilot sets the grid.
