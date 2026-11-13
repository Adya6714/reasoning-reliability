# E4 Shared or separate? (C3, RQ1)

**Question.** Is there one cause behind stale, neighbour and prior errors, or three?

## Definition (pre-registered)
A component set S is a SHARED cause of conditions X and Y if intervening on S (patch from success,
or ablate) flips >= 40% of failures in BOTH X and Y, flips < 10% of control items (no competitor),
and beats 95 of 100 random equal-size layer-matched sets, with a dose-response
(effect grows with intervention strength).

## Procedure
1. Take each condition's top set from E3 (6 sets: 3 competitors x 2 modes).
2. Apply each set to every condition and the control. Fill a 6 x 7 flip matrix.
3. Random-set null for every cell.
4. Second intervention type (steering along the E2 direction) to check the matrix is not tool-specific.

## Outputs
Flip matrix with CIs, per model. Verdict per pair: shared / separate / inconclusive.

## Predictions (written before data)
- Stale and neighbour share query-key components in read mode (both are wrong-address lookups).
- Prior is separate (a parametric pathway, as in Ortu et al.).
- Computed-mode stale errors do not share read-mode stale components.
