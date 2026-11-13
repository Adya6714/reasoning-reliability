# E5 Fix head to head (C4, RQ3)

## Fixes
| # | Fix | Type | Needs inside access |
|---|---|---|---|
| 1 | Restate the question at the end | prompt | no |
| 2 | Thinking mode on | inference setting | no |
| 3 | Written-state scaffold: write all values after each update | prompt/harness | no |
| 4 | Attention redirection (Guo et al. 2026), read mode only | activation | yes |
| 5 | Probe-triggered re-ask: re-ask with fix 3 only when a probe predicts failure | detector + harness | yes |
| 6 | Steering along the E2 correct-minus-competitor direction at the E3 layer | activation | yes |
| 7 | LoRA on UpdateLedger train items, limited to E3 components | training | yes |

Every generic fix (1-3) is tuned on the dev split with the same budget as the targeted ones.

## Test sets
Held-out templates of UpdateLedger (never used in E0-E4), PI-LLM core, and 300 items from an
unrelated suite (e.g. a sample of IFEval and a maths set) for side effects.

## Measures
Accuracy; failure-specific accuracy; correct answers broken; side-effect drop on the unrelated
suite; output tokens, latency and extra calls per item; cost per correct answer.

## Output
Payoff chart: accuracy vs cost per fix, per mode, per model.

## Pass mark (C4)
The fix matched to the failure's cause beats the best generic fix by >= 10 points at <= 1.5x its
cost, and breaks < 3% of correct answers. If a generic fix wins, report that and stop the steering line.
