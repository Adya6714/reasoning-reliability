# Pre-registration draft (freeze with `git tag q1-prereg` before E1 confirm runs)

## Definitions
- Failure: wrong FINAL ANSWER on a usable call (not error, not truncated).
- Competitor hit: the answer equals a designed competitor value.
- Decodable: the value probe's top-1 on a held-out failure equals gold.
- Recovered fraction (patching): (metric_patched - metric_fail) / (metric_success - metric_fail).
- Shared cause: see E4_shared.md.

## Units and splits
Unit = structure_id. Splits by structure and template. Cluster bootstrap over structures, 4,000 resamples.
Mechanism analyses only in cells with 30-70% failure.

## Pass marks
| Claim | Mark |
|---|---|
| C1 | >= 60% of errors on a designed competitor; strength slope 95% CI > 0 |
| C2 | read decodable share - computed share >= 15 pts, CI excludes 0; probe > text-only by 0.05 AUROC |
| C3 | <= 3 components recover >= 50% of gap in one mode, < 20% in the other |
| C3 shared | >= 40% flips in two conditions, < 10% control, beats 95/100 random sets |
| C4 | matched fix >= best generic + 10 pts at <= 1.5x cost; < 3% correct answers broken |

## Multiple comparisons
Holm within each claim's family of tests.

## What changes a mark
Only the E0 power simulation, before the tag. Any later change is reported as a deviation.
