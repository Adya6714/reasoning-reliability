# Research roadmap

## Phase 0 — construct, screen, and preregister

Score the candidate test menu using the six-question rubric in `docs/research_design.md`. Screen the top 5–6 candidates on two models with roughly 50 independent items per candidate where feasible; use this only to assess feasibility, clean scoring, difficulty range, redundancy, and stability. The initial deep-study pair is state tracking/updating and planning/inhibition, but revise it if screening evidence and the rubric warrant it. Then define observable indicators for the selected constructs. Create exact generators and independent verifiers; audit answer-preserving and answer-changing pairs; choose decoding protocol; freeze contrasts, exclusions, item-generation seed policy, score and psychometric skill-profile baselines, and the held-out family split. Treat any dimension without a valid independent measure as exploratory. Gate: G0.

## Phase 1 — measurement and prediction

After the broad screen, run a focused instrument pilot on 40 items per selected task family, then run the confirmatory panel on the pre-run power target. The broad screen and focused instrument pilot serve different purposes; do not pool their items into confirmatory evidence. Measure repeatability and construct validity before interpreting profiles. Compare a canonical-score/difficulty baseline, a fine-grained psychometric skill-profile baseline, and the process-diagnostic model on development families; evaluate incremental predictive value on untouched items and at least one task family held out from probe development. Keep Probe 2 plan/execution and Probe 4 state injection as distinct indicators/experiments, not interchangeable measures of one latent “reasoning” score. Gate: G1 requires the instruments to work and the held-out predictive comparison to be reported whether positive or null, with parsing, floor/ceiling, and stack noise assessed.

## Phase 2 — controlled exposure and mechanism

Use a small open model to train controlled arms with known exposure. Establish whether Source indicators track randomized membership and transfer before using retrieval/computation labels. Only then collect token-likelihood and activation measures on an eligible model and intervene on the same behavior-linked contrast.

For mechanistic interpretation, compare the native neuron basis with at least one feature-method baseline (SAE/transcoder or ICA) on the same checkpoint and target when resources permit. Include random/neighbouring-unit controls, dose response, side-effect measures, and reversal/rescue where feasible. Treat recent neuron-first and “clean network” claims as motivating hypotheses; they do not make SAE, transcoder, or residual-stream analyses obsolete. Freeze the model recipe and record known training details because model family and training setup can affect the conclusions. Gates: G2 and G3.

## Phase 3 — robustness interventions

Compare canonical-only vs surface-diverse supervised fine-tuning, and optionally verifiable-reward training, with equal training steps, data volume, and compute. Evaluate private held-out instances and transformations; match canonical accuracy or report the tradeoff curve. This tests whether reliability can be trained rather than merely measured.

## Phase 4 — development and intelligent systems

Track available open training checkpoints to see when invariance appears relative to accuracy. Then evaluate model and harness as separate factors: same model under different prompts/tools/memory/retry policies, and different models under one frozen harness. Test retrieval, calculator/code, planning, and verifier tools under tool failure, stale evidence, and adversarial state changes. Measure end-task reliability, calibration, recovery, latency, and cost. For subjective outcomes, use offline scoring as a filter, calibrated human review for the quality criterion, and production monitoring only when a real deployment is explicitly part of the study. This connects model behavior to reliable systems built around LLMs.

Do not advance phases because a result is exciting. Each gate requires the preceding construct to be measurable and reproducible.
