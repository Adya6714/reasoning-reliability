# Runner requirements

The current runner in `src/reasoning_reliability/` is a placeholder. It will be rebuilt in Block C, after the design is frozen. Before any GPU run, the runner must meet every rule below. Each rule needs a test in `tests/`.

## What to save on every row

- Model ID, revision hash, tokenizer revision, chat template.
- Engine and version, precision, batch-invariant flag, GPU type.
- Temperature, top-p, max tokens, seed (always, even at temperature 0), sample index.
- Thinking on or off.
- Full prompt and its hash (including system prompt and template).
- Raw final answer and, separately, the thinking text if the server returns it.
- Finish reason (stop, length, error).
- Gold-answer log-probability (optional, open models).
- Timestamp (UTC), usage (tokens), latency.

## Behaviour rules

- **Truncation:** flag any row whose finish reason is "length". Never score it silently as wrong.
- **Max tokens:** set per model. Thinking models need far more than 512.
- **Errors:** failed calls become error rows, with retries and backoff. A failure must never crash the run or mix silently into results.
- **Validation:** every row is checked against `ResponseRecord` before writing.
- **Append-only:** never edit or delete rows. Corrections are new derived files.
- **Resume:** a stopped run continues from the last finished (item, variant, sample).
- **QA gate:** `rr run` refuses to start unless the QA suite passes (identical instruction text across rewrites, gold re-solved, length band, difficulty matched, whole-word renames).
- **Pinned settings:** decoding settings come from config files only, never from defaults in code.

## Tests to write

- A fake model server, so the runner can be tested without a GPU.
- A 10-item dummy run produces valid, complete rows.
- A forced error produces an error row, not a crash.
- A forced "length" finish is flagged.
- A stopped run resumes without duplicating rows.
