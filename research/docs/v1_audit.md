# v1 audit

v1 repo: https://github.com/Adya6714/retrieval-vs-computation · site: https://adya6714.github.io/retrieval-vs-computation/

v1 used 219 problems (GSM 44, Blocksworld 65, ALGO 110), six rewrites (W1 to W6) and three probes (rewrite survival, plan vs execution, corpus familiarity) on Claude Sonnet 4, GPT-4o, Gemini 2.5 Flash, o4-mini, Llama 3.1 8B. Its headline findings rest on three confounds, so v1 is archived and every problem bank is regenerated.

## Critical confounds

- **GSM instruction drift.** "Give just the final answer" was in 19/44 W3 and W4 prompts but 0/44 canonical. Gemini on those items: canonical .89, W3 with the instruction .16, without it .80. So the headline drop (.909 to .523) mostly measures suppressed working, not the story swap.
- **ALGO opposite mismatch.** Canonical says "No explanation" in 110/110; W2 and W4 in only 10/110.
- **Blocksworld reversal is easier.** 22/65 reversed items became "unstack everything", where almost any order works. Same plan length, different search difficulty.
- **n=1.** One sample per (problem, variant, model). Per-problem verdicts impossible.

## Serious gaps

- No temperature, seed, provider, timestamp or finish reason logged; truncation not ruled out.
- The rewrite model was also an evaluated model; LLM rewriting of whole prompts caused the drift.
- Config drift and underpowered comparisons (44 paired items gives about 21% power for a 10-point drop).
- Some findings appear only when families are pooled; o4-mini injection results are weak (hidden reasoning).

## Keep

Raw-logs-as-truth, pre-registration and gates, gold-in-gold-out verifier checks, planner-verified Blocksworld gold, plan/execute split, injection idea, Kendall W, IRT, variance decomposition.

## Port (with tests)

verify.py, verify_algo.py, Fast Downward plumbing, Blocksworld action parser, cluster_inference.py, infini-gram client, Kendall W and IRT scripts.

## To do

- [ ] "Under revision" note on the v1 site
- [ ] Erratum describing the confounds and the QA test that catches them
- [ ] Archive the v1 repo
