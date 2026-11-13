# E1 Behaviour: breaking points and which competitor wins (C1)

**Question.** Where does each model break, and when it fails, which designed competitor does it output?

## Models
2 closed frontier, GLM, Kimi, DeepSeek (latest, ids confirmed on run day), Qwen3.5-27B,
Gemma 3 27B-it, Qwen3.5-9B (pilot). Thinking on and off where the model allows.

## Procedure
1. Pilot: Qwen3.5-9B and Qwen3.5-27B on the dev split, 1 sample. Pick the n_updates range so each
   mechanism model crosses 50% accuracy somewhere.
2. Main: confirm split, 5 samples, model-card sampling settings, fixed answer format
   ("FINAL ANSWER: <number>"), same runner rules as v1.1 (append-only log, errors never scored,
   truncation excluded and counted).
3. Label every wrong answer: stale / neighbour / prior / other numeric / format fail.

## Analysis
- Accuracy vs n_updates per model x mode x competitor; breaking point = 50% crossing (logistic fit,
  bootstrap CI over structures).
- Error attribution table: share of errors per label, against the chance rate for a random number in range.
- Dose-response: logistic regression of P(answer = competitor) on strength, per competitor and mode,
  structure random effect.
- Thinking on vs off: accuracy gap and token cost per correct answer.

## Outputs
`results/q1/e1/<run>/` calls.jsonl, scored.csv, analysis/REPORT.md; a list of (model, mode,
competitor, n_updates) cells with 30-70% failure for Qwen 27B and Gemma 27B (feeds E2).

## Gate to E2
At least one cell per mode where each mechanism model fails 30-70%. Else extend n_updates/strength and rerun the pilot.

## Pass mark (C1)
See prereg.md: >= 60% of errors on a designed competitor; strength slope 95% CI above 0.
