# Program state

Updated: 2026-10-28

## Confirmed design choices

- Primary evidence comes from fresh generated instances with private test seeds and executable ground truth.
- Public datasets are secondary anchors because exposure is uncertain.
- PostTrainBench evaluates autonomous post-training agents; it is not the main behavioral benchmark.
- Use three open model families behaviorally and at least one accessible dense checkpoint mechanistically.
- Analyze independently generated items as the main sampling units; repeated decoding estimates within-item variability.
- Keep the first study behavioral and predictive. Treat neuron/SAE/transcoder/ICA analysis as a later explanatory phase, compared on the same checkpoint and behavior-linked target.
- Record training recipe, serving stack, and harness; do not attribute cross-model differences to scale alone.
- For subjective outcomes, use a defined rubric and human calibration/audit; reserve deterministic verifiers for objectively checkable answers.

## Open decisions before confirmatory collection

- GPU/API budget and what hardware is available.
- Exact GPU model and VRAM; “I have a GPU” is not enough to establish which checkpoints or activation-capture methods fit locally.
- Whether behavioral panel is hosted open-weight inference or local inference.
- The exact immutable model revisions, licenses, and reasoning modes.
- Pilot-based power simulation and final item counts.
- Which freshly authored human-verified items complement the three generated task families.

## Gates

- G0: generator/verifier/transform correctness and frozen run contract.
- G1: behavioral effects survive floor, parsing, multiple-test, and inference-stack checks.
- G2: exposure indicators validate against randomized known membership.
- G3: same-manipulation internal predictor plus controlled causal intervention.
- G4: post-training/developmental interventions reproduce on private held-out items.
