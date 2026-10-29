# Initial research references

Discovery is not verification. Read each primary paper before relying on detailed claims; create a vault note from `research-vault/templates/NOTE.md` and record the exact version and pages used.

- Rank et al. (2026), [POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?](https://www.alphaxiv.org/abs/2603.08640). Defines bounded-compute agent post-training; useful as context for the broader ambition, not as the project's behavioral benchmark.
- Jiang & Zhai (2026), [Competence-Based Evaluation of Logical Reasoning in Large Language Models](https://www.alphaxiv.org/abs/2610.22894). A family-based, paired-presentation evaluation; supports the design principle that aggregate accuracy alone misses invariant correctness. It also explicitly cautions that behavioral failures do not localize internal causes.
- Qwen Team, [Qwen3-8B model card](https://huggingface.co/Qwen/Qwen3-8B). Provisional tractable mechanistic checkpoint; pin exact revision and serving stack.
- Qwen Team, [Qwen3.5-27B model card](https://huggingface.co/Qwen/Qwen3.5-27B). Current behavioral-panel candidate; hybrid architecture is a caveat for first mechanism work.
- Google DeepMind, [Gemma 4 model cards](https://huggingface.co/google/gemma-4-31B-it). Current open-weight family candidate; verify exact terms for the selected checkpoint.
- Meta, [Llama 4 model cards](https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct). Current MoE behavioral-family candidate; gated license and total parameter count affect access/compute.
- Goodfire, [Accelerating Interpretability: A Human Genome Project for AI](https://www.goodfire.com/blog/accelerating-interpretability), and Nick Cammarata, [Neural Networks Are Already Clean](https://already-clean.goodfire.com/). Treat the former as a research-program announcement and the latter as a research essay / hypothesis, not evidence that frontier models are comprehensively understood.
- [ICA Lens](https://arxiv.org/abs/2606.11722) and its [implementation](https://pypi.org/project/icalens/): a candidate activation-analysis baseline to compare against learned sparse features on a matched target.
- Shabalin & Piotrowski, [Comparing Sparsified MLPs and Transcoders: Many Transcoder Features Are Neurons in Disguise](https://arxiv.org/abs/2610.24521): direct prior work for comparing native units with learned feature dictionaries; this narrows novelty claims based on that comparison alone.
- [A Sense of Proprioception in Language Models](https://arxiv.org/abs/2610.17495): optional route to internal-state measures with externally verifiable labels; do not generalize it to arbitrary chain-of-thought self-report.
- [How Causality Bridges the Semantic Gap](https://arxiv.org/abs/2610.02594): adjacent work on assigning semantics through causal structure, not a direct reasoning benchmark.
- [Subspace Tuning](https://arxiv.org/abs/2610.22293): possible targeted-training intervention for a later phase, after behavioral diagnosis is validated.
- [Qwen3.5-4B model card](https://huggingface.co/Qwen/Qwen3.5-4B) and [neuron-explorer](https://github.com/lyramakesmusic/neuron-explorer): small checkpoint/tool combination for testing mechanistic feasibility; not a representative behavioral panel by itself.
- [Subjective Evals: A Roadmap](https://cameronrwolfe.substack.com/p/subjective-evals): practitioner guidance for rubrics, rater calibration, and evaluation operations; use primary measurements and human audits for scientific claims.
