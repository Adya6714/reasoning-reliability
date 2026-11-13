# Reasoning Reliability: Programme Architecture, Next Steps and Budget

Nov 13, 2026 · @Adya

## Where things stand

There are three tracks, and they need fixed names because "v1" and "v2" have meant different things in different chats. This doc uses:

| Name | Repo | What it is | State on 13 Nov 2026 |
| --- | --- | --- | --- |
| **RvC v1.1** | [retrieval-vs-computation](https://github.com/Adya6714/retrieval-vs-computation) | Corrected rerun of the CAISc paper on current models | Stage 0 done: bank 1,379 usable items, 18/18 QA gates, 163 old tests pass, dry run clean, [PR #1](https://github.com/Adya6714/retrieval-vs-computation/pull/1) open. No real model called yet |
| **RR-Failures** (your "V1") | [reasoning-reliability](https://github.com/Adya6714/reasoning-reliability) | Measure one failure, find its internal cause, test fixes. First question Q1: read versus computed state | Q1 specs committed in `research/protocols/state_loss/` (commit dcc485a). Plan not signed off; no code |
| **RR-Layer** (your "V2") | reasoning-reliability, later | A model that restructures inputs before a downstream LLM answers | Idea stage. This doc decides whether and how to pursue it |

The argument of this doc in one line: RR-Layer is only worth building if RR-Failures first shows that a failure has a diagnosable cause that a generic fix misses. So RR-Layer is the programme's destination, and Q1 is its first evidence.

## Is the problem real?

Yes for the failures; not yet for the layer. Models fail on long, stateful tasks in ways a single score hides. Whether a separate input-restructuring model beats what frontier labs already ship (thinking modes, tool use, harnesses) is unproven and is the riskiest part of the programme.

**Advocate.**

- Agent failures are measured and large: the vault's pain-point table ranks state loss first (grade A, 17 sources). MAST-style traces show step repetition in 15.7% and missed termination in 12.4% of failures.
- Open models carry a large share of tokens at a small share of spend (Menlo, Nov 2026: 19% of tokens, 4% of spend). Companies that self-host cannot buy a frontier model's reliability, but they can add a layer.
- Thinking mode is a generic fix with a real cost. If a cheap, targeted transformation recovers most of its gain, that is money saved on every call.
- Interpretability can now read failures (Basu: probe AUROC 98%; Guo: the current value is decodable in 82 to 85% of stale errors). Turning that into a fix is the open step.

**Devil's advocate.**

- Prompt restructuring is old. [System 2 Attention](https://arxiv.org/abs/2311.11829) rewrites context to drop irrelevant text, [Rephrase and Respond](https://arxiv.org/abs/2311.04205) rewrites the question, [PRewrite](https://arxiv.org/abs/2401.08189) trains a rewriter with RL, [GEPA](https://arxiv.org/abs/2507.19457) evolves prompts from diagnosed failures, and [RouteLLM](https://arxiv.org/abs/2406.18665) routes per query. A "reliability layer" with no mechanism behind it is a re-run of these.
- Frontier models with thinking on may simply not fail on short tasks. Then the problem lives only in open models without thinking, and the market argument narrows to cost.
- Interpretability may diagnose without enabling a fix: four 2026 papers show decodable errors that steering cannot correct.
- Each lab's next model may remove the failure, and a layer tuned to one model's weakness may not transfer.

**Alternative formulations.**

| Formulation | Strength | Weakness | Verdict |
| --- | --- | --- | --- |
| A. Generic reliability layer: rewrite any prompt better | Big product story | Crowded (S2A, RaR, PRewrite, GEPA); no science of why | Reject as the research question |
| B. Diagnosis-conditioned transformation: the transformation is chosen by the measured cause of the failure | Ties interpretability to an action; testable against generic rewriting | Needs a failure with a known cause first | **Recommend** |
| C. Pure mechanism study of failures | Clean science | No practical payoff; many papers already | Keep as the first half of B |
| D. Adaptive compute: decide when to think | Clear cost metric | Labs already ship it; little room to add | Fold into B as one action |

**What would kill the whole direction.**

1. Frontier and open models with thinking on fail under 10% at realistic task sizes on every candidate failure.
2. Generic transformations (rewrite, write state, think) match targeted ones on every failure at equal cost.
3. Diagnoses do not transfer: the cause found in one model or task does not predict the right fix in another.

## Research questions, hypotheses and claims

One primary question for the programme, answered failure by failure. Q1 (read versus computed state) is its first instance.

**Primary question.** Can the measured internal cause of an LLM failure choose an input transformation or intervention that beats generic fixes on reliability per unit of cost?

**Secondary questions.**

- **RQ1 Shared or separate.** Do different observable failures share internal causes?
- **RQ2 Recover or carry forward.** What decides whether a mid-task error is corrected?
- **RQ3 Targeted versus generic.** Do cause-matched fixes beat strong generic fixes?
- **RQ4 Transfer.** Does a diagnosis made on one model or task predict the right fix on another?
- **RQ5 The layer.** Can a small model learn to detect the cause from the input alone and apply the matching transformation?

| Hypothesis | Competing explanation | Evidence that separates them | Rejected if |
| --- | --- | --- | --- |
| H1 Failures have a few diagnosable causes, visible inside the model | Failures are diffuse: many weak causes, no small component set | Patching recovers most of the gap from a few components | No set of 3 or fewer components recovers 50% of the gap |
| H2 Different causes need different fixes | One generic fix (thinking, written state) covers all causes | Crossed design: fix A helps cause A only, fix B helps cause B only | One fix wins on every cause at equal cost |
| H3 The cause can be predicted from the input, without looking inside | Only internal signals reveal the cause | A small classifier on input features predicts the internal diagnosis above chance | Input-only AUROC under 0.7 |
| H4 Diagnoses transfer across models of similar architecture | Every model fails for its own reasons | The same component type and fix win in Qwen and Gemma | Winners differ in every pair |

**Claims the programme can make, in order of strength.**

1. Measurement: these failures happen in current models at realistic sizes, with named competitors (Q1 C1).
2. Mechanism: their causes differ in a way a generic account misses (Q1 C2, C3).
3. Intervention: a cause-matched fix beats generic fixes on cost (Q1 C4, RQ3).
4. Layer: a model can choose the fix from the input (RQ5). Only attempted after 1 to 3 hold for at least two failures.

Each claim is worth publishing alone, so the programme yields science even if the layer never ships.

## Which failure first

State loss in its computed form stays first. It is the only candidate that scores high on all four criteria, and its read-mode cousin gives a published mechanism and fix to beat. Premature "done" is second: the least studied inside models, but harder to measure without an LLM judge.

Scores: 3 high, 2 medium, 1 low. The taxonomy is not abandoned; it is the queue.

| Failure | Relevant to deployed models | Underexplored | Measurable by program | Tractable inside a 27B model | Total | Main reason |
| --- | --- | --- | --- | --- | --- | --- |
| **State loss, computed values** | 3 | 3 | 3 | 3 | **12** | Rank 1 in pain points; read mode studied, computed mode not; exact gold; short items |
| Premature "done" | 3 | 3 | 2 | 2 | 10 | No inside-model work; needs a world-state checker per task |
| Looping after failure | 3 | 2 | 3 | 2 | 10 | A copying account exists (Gumaan 2026, small models); needs multi-turn tool runs |
| Misplaced retrieval (RvC) | 2 | 1 | 3 | 3 | 9 | Many papers; v1.1 measures it already |
| Rule breaking | 3 | 1 | 2 | 2 | 8 | Benchmarks near saturation; crowded |
| Tool hallucination | 3 | 1 | 2 | 1 | 7 | Probe detection already published (Yeats 2026, 18 models) |

The scores are judgement calls from the vault's pain-point table and the 2026 papers read for Q1. A literature-agent pass (section 7) should check the two 3s under "underexplored" before E0 starts.

## Can we look inside GLM and Kimi?

GLM partly yes, Kimi practically no. GLM-5.3's weights are open and fit on one 8-GPU H200 node in 8-bit, so probes and steering are possible there. Kimi K3 needs a 64-accelerator cluster, which no single rented VM provides. Neither has public sparse autoencoders that we found, so full circuit work stays on Qwen and Gemma.

| Model | Weights | Size | Licence | Hardware to run | What we can do inside | What we cannot |
| --- | --- | --- | --- | --- | --- | --- |
| [GLM-5.3](https://aiunderstanding.org/news/hugging-face-lists-z-ai-s-glm-5-3-as-an-open-weight-753b-model) | Open, Hugging Face and ModelScope (29 Aug 2026) | 744B total, 40B active, MoE | GLM-5.3 License; organisations over $10B revenue need a Z.ai security review | About 750 GB in 8-bit: one 8x H200 node (1,128 GB). Precision of the release not confirmed | Cache residual streams at chosen layers; probes; steering; transfer tests of Qwen and Gemma findings | Full backward passes for attribution; SAEs (none public) |
| [Kimi K3](https://rits.shanghai.nyu.edu/ai/kimi-k3-open-weights-ship-2-8t-parameters-1-4-tb-to-run/) (K3.1 Pro specs not found) | Open (27 Jul 2026) | 2.8T total, 104B active, 896 experts | [Kimi K3 License](https://www.unite.ai/moonshot-opens-kimi-k3-weights-under-a-revenue-tiered-license/): research and internal use free; conditions above $20M revenue | About 1.4 TB in native MXFP4; Moonshot recommends 64 or more accelerators | Behaviour through the API only | Any inside access on rented single-node hardware |
| Qwen3.5-27B | Open | 27B dense; 48 linear-attention + 16 full-attention layers | Open (check exact licence on run day) | One A100 80GB | Everything: probes, patching, attribution, Qwen-Scope SAEs | Nothing material |
| Gemma 3 27B | Open | 27B dense | Gemma terms | One A100 80GB | Everything, plus Gemma Scope 2 SAEs and transcoders | Nothing material |
| OLMo 3 (7B, 32B) | Open, with training data and checkpoints | 7B and 32B | Apache 2.0 (check) | L4 or A100 | Training-stage questions: which stage creates a failure | No public SAEs |

**Recommendation.** Find causes on Qwen3.5-27B and Gemma 3 27B. Then run one transfer test on GLM-5.3: train the probe and steering direction on the small models' design, apply them to GLM activations, and report whether the same signal predicts and fixes the same errors. That is RQ4 at frontier-scale for about one node-day of compute. Kimi stays behaviour-only.

Sources for GLM and Kimi are news pages and blogs, not the model cards; the exact licence text, release precision and layer counts must be read from the Hugging Face cards before any GLM run.

## Literature: what is known

For state loss with values written in the text, the cause and a fix are established at 3B to 9B. Everything about computed values, and about choosing a transformation from a diagnosis, is open. The full Q1 review is in the [Q1 plan](https://claude.ai/artifact/4QCEGk2Qux7akPpFAmmXAS).

| Topic | Established (replicated or causal evidence) | Hypothesis or preliminary | Open |
| --- | --- | --- | --- |
| Behaviour | Accuracy on the latest value falls log-linearly with updates ([PI-LLM](https://arxiv.org/abs/2506.08184)); 39 models show proactive interference ([Chattaraj and Raj 2026](https://arxiv.org/abs/2603.00270)) | Frontier models with thinking still fail at agent-scale lengths | Computed-value updates; prior competitors |
| Mechanism | Stale errors come from query-key matching that favours old assignments in late layers; the current value stays decodable in 82 to 85% of errors ([Guo et al. 2026](https://arxiv.org/abs/2609.38866)) | Binding and rebinding circuits ([Prakash et al.](https://arxiv.org/abs/2505.14685), [Oh and Demberg](https://arxiv.org/abs/2606.08644)) generalise to updates; models aggregate state at the last token rather than step by step ([Tang et al.](https://arxiv.org/abs/2605.30233)) | Where a computed value lives; hybrid recurrent layers versus attention |
| Fixes | Attention redirection recovers most stale errors at 3B to 9B when current-value tokens exist ([Guo](https://arxiv.org/abs/2609.38866), [Chen and Yeh](https://zenodo.org/records/23153676)) | Steering often fails to turn decodable errors into correct output ([Basu et al.](https://arxiv.org/abs/2603.18353)) | Fixes when no current-value token exists; costed comparison with thinking |
| Input restructuring | Prompted rewriting helps on some tasks ([S2A](https://arxiv.org/abs/2311.11829), [RaR](https://arxiv.org/abs/2311.04205)); RL-trained rewriters improve a frozen model ([PRewrite](https://arxiv.org/abs/2401.08189)); reflective prompt evolution beats GRPO by 6% on average ([GEPA](https://arxiv.org/abs/2507.19457)) | Per-query routing halves cost ([RouteLLM](https://arxiv.org/abs/2406.18665)) | Rewrites chosen by a measured internal cause; per-query diagnosis |

**The precise gap.** We found no work that uses an internal diagnosis to choose the input transformation, and none on computed state. The literature agent must try to prove this wrong before we claim it. Our first paper fills the computed-state half; the layer papers fill the other half only if the first holds.

Not checked: PRewrite and the 2026 rewriter papers were found by search but not read in full this session. They go first into the literature agent's queue.

## Literature-review agent

One Cursor agent, one template, one note per paper, every note tagged with the questions it touches. The two files are in this chat's zip and committed locally on branch `programme-architecture`: `research/research-vault/templates/PAPER.md` and `research/docs/agents/LIT_AGENT_PROMPT.md`.

**What changes from your current vault.**

| Current | New | Why |
| --- | --- | --- |
| `NOTE.md` tags RQ1 to RQ6, H1 to H10 from an old design | `PAPER.md` tags RQ1 to RQ5, Q1-C1 to C4, H1 to H4 | Links every note to the questions we actually test |
| Free-text "dimensions" | Fixed lists for failure, layer and evidence level | Notes can be filtered and compared in Obsidian with Dataview |
| Overlap 0 to 3 only | Overlap plus an evidence level (behavioural, correlational, causal, intervention tested, replicated) | Stops a probe paper from counting as proof of a mechanism |
| No fix section | A fixes table: baselines, gain, correct answers broken, cost | RQ3 needs exactly these columns |
| 2 paper notes | A 23-paper seed list, read closest-competitor first | Guo et al. is a direct threat to Q1 and goes first |

**How the agent finds more papers.** Three routes, in this order:

1. One hop of citations each way from every note, using the Semantic Scholar API.
2. Twelve fixed search queries over the last 24 months: interference, in-context updates, entity tracking, variable binding, hybrid linear attention, prompt rewriting with RL, adaptive computation, steering baselines, error correction in hidden states.
3. A paper enters the queue only if it touches at least one question, and the reason is written beside it.

**Agent rules that matter most.** It reads full papers, never only abstracts (or it marks `abstract-only`). It writes "not reported" rather than guessing. Every number carries its table or page. Only you set `numbers_checked: true`. Any paper that already does part of Q1 is marked `THREAT:` and pinned to the top of `07_Paper_Landscape.md`.

**Landscape table format** (one row per paper): Paper, Year, Failure, Layer, Evidence, Models, Overlap, RQs, Use as.

## Research lifecycle

Nine stages per failure. A stage ends only when its decision rule is met; Q1 is at stage 3.

| Stage | Objective | Methods | Inputs | Outputs | Decision rule to move on |
| --- | --- | --- | --- | --- | --- |
| 1 Problem | Show the failure is real in deployed models | Pain-point evidence; a 50-item check on 2 frontier and 2 open models | Vault sweeps | Failure rates with intervals | At least 10% failure at realistic sizes in at least 2 strong models |
| 2 Literature and gap | Know what is established | Lit agent; THREAT review | Seed list | Notes, landscape table, gap paragraph | No paper already answers our question with causal tests |
| 3 Questions and hypotheses | Fix what we test | Claims with kill conditions | Gap | `docs/<failure>/prereg.md` draft | You sign off every claim |
| 4 Research design | Choose data, models, controls | Benchmark rules; power simulation | Prereg draft | Benchmark plan, model list, sample sizes | Each claim has a dataset, a control and a pass mark |
| 5 Implementation | Build and test everything offline | Generators, solvers, runner, fake models, QA gates | Design | Frozen, hashed item bank; passing tests | All QA gates pass with no API key |
| 6 Execution | Collect data | Pilot (exploratory), then confirmation runs | Bank, keys, GPUs | Append-only raw logs and activations | Pilot sets the grid; prereg tagged before confirmation runs |
| 7 Analysis | Test each claim | Pre-registered tests; cluster bootstrap; Holm correction | Raw logs | Scored tables, plots, verdict per claim | Every claim gets pass, fail or inconclusive |
| 8 Validation | Make sure the result is not an artefact | Second model family; held-out templates; null agents; hand audit of 30 failures | Results | Robustness report | Result survives every check, or the claim is narrowed |
| 9 Writing | Publish | Paper, code, data release | Everything above | Preprint plus repo tag | Internal review against the prereg; deviations listed |

Exploratory runs (pilots, the 9B model, anything before the prereg tag) are labelled as such in every table and never support a confirmatory claim.

## Benchmark and dataset strategy

No LLM writes a gold answer or scores a response anywhere in the programme. Every gold answer comes from a program (a solver or code execution) or from a published, independently checked dataset. Our own generator is used only where no public set can separate read from computed state, and it has two independent solvers.

**Four pools, never mixed.** An item lives in exactly one pool, split by underlying structure, not by wording.

| Pool | Purpose | Sources | Rule |
| --- | --- | --- | --- |
| A Behavioural evaluation | Measure failure rates and competitors (E1) | UpdateLedger confirm split; PI-LLM; CRUXEval-O | Frozen and hashed before the confirmation run |
| B Mechanistic | Probes, patching, SAE work (E2 to E4) | UpdateLedger minimal pairs from cells with 30 to 70% failure | Separate structures from pool A |
| C Intervention training | Train LoRA, fit steering directions, tune generic fixes (E5) | UpdateLedger train templates only | Never used to report a result |
| D Held-out generalisation | Final test of every fix and every transfer claim | Unseen UpdateLedger templates; PI-LLM; one agent benchmark later | Touched once, after all fixes are frozen |

**Datasets.**

| Dataset | What it measures | Source of truth | Licence | Limits and contamination | Supports |
| --- | --- | --- | --- | --- | --- |
| [PI-LLM](https://huggingface.co/datasets/giantfish-fly/pi-llm) | Retrieving the latest value of a key after many written updates | Generated by program; final value known | MIT | Read mode only; public since 2025, so may be in training data | C1 read mode; E5 held-out |
| CRUXEval-O (output prediction) | Predicting a Python function's output: a computed state | Running the code | Check before use | Near saturation for frontier models (noted in v2 pipeline); public since 2024 | C1 computed mode, open models |
| [Comp-mech](https://huggingface.co/datasets/francescortu/comp-mech) | Fact versus in-context counterfactual | Fixed fact lists | Not stated: check | Single facts, no updates | Prior competitor anchor |
| UpdateLedger (own) | Read versus computed updates with stale, neighbour and prior competitors | Two independent solvers; computed gold checked absent from the text | Ours | Synthetic surface; transfer to real tasks must be shown | All Q1 claims |
| v1.1 GSM false-state runs | Carried-forward arithmetic errors | Program-checked answers | Ours | Small; uses GSM-Symbolic templates (licence noted in v1 audit) | RQ2 cross-check |
| Agent traces (tau2-bench, AppWorld), later | State loss in real agent work | Environment state checks; tau2 also uses an LLM-played user | Check | User simulation is an LLM; failures mix causes | Transfer only, after Q1 |

**Generated-data rules.** Formal spec per item; two solvers that must agree; QA gates run with fake models (always-right 100%, always-stale 100% stale, empty 0%); a 200-item sample re-solved independently; split by structure; computed-mode gold never appears in the text.

## Mechanistic plan

For state loss we test four competing explanations, not one. Each tool answers a narrower question than it seems to, so every claim names the tool, what it shows, and the control it needs.

**Competing explanations for a wrong answer.**

| Explanation | Meaning | Predicts | Test that separates it |
| --- | --- | --- | --- |
| E-repr: never formed | The correct value is never computed internally | Not decodable at any layer or position | Probes at every layer and update position |
| E-select: formed but not selected | Computed, but attention or the recurrent state picks the competitor | Decodable at the answer position; competitor wins in late layers | Logit lens crossover; patching attention or GatedDeltaNet blocks |
| E-route: selected but not used | Present at the answer position, overwritten by an MLP or prior pathway | Decodable late; the gap flips at an MLP | Patching MLPs; SAE features for the prior |
| E-shortcut: heuristic | The model uses "last number mentioned" or "first value" | Errors match the heuristic even when no stale value is designed in | Items where the heuristic and each competitor give different answers |

**Tools.**

| Tool | Shows | Does not show | Required control |
| --- | --- | --- | --- |
| Linear probe | The information is present | That the model uses it | Shuffled-label probe; text-only probe on embeddings |
| Logit and tuned lens | When the answer emerges across layers | Which component caused it | Compare with a matched success run |
| Activation patching | A component matters for this contrast | That it is the whole story | 100 random components of equal size |
| Ablation | A component contributes | That it is the only cause | Mean ablation and random ablation |
| Steering | Behaviour can be moved along a direction | How the model works unaided | Random directions; side-effect suite |
| SAEs and transcoders | Readable features at a layer | Causality; must be tested by intervention | Feature ablation with random-feature control |
| Weight edit or LoRA | A lasting fix | Which mechanism it changed | Matched-compute generic LoRA; held-out templates |
| Runtime harness | A fix that works without inside access | Anything about mechanism | Same-cost generic harness |

**Comparing fixes.** Every targeted fix faces three baselines: matched (same model, same compute, no targeting), strong generic (thinking on, written state, restating), and mismatched (the fix for the other cause). Each is reported on accuracy, correct answers broken, side effects on an unrelated suite, output tokens, latency and dollar cost per correct answer.

## Repository architecture

Each failure gets the four folders you asked for, but they hold only failure-specific code and configs. Runners, clients, probes, patching and scoring live once in `src/rr/` and are imported, so a fix to the runner fixes every failure.

```text
reasoning-reliability/
  research/
    docs/                  programme docs (architecture, design, roadmap, …)
    protocols/<failure>/   prereg + experiment specs (state_loss = Q1)
    research-vault/        Obsidian notes + lit-agent PAPER notes
  src/rr/                  shared runners, clients, probes, scoring
  failures/<failure>/
    measurement/
    mechanistic_interpretability/
    interventions/
    output/
  configs/  data/  results/  tests/  site/
```

The arrow means "imports": failure folders call shared code and never copy it. Research documents carry no code; each failure's pre-registration in `research/protocols/` governs what its `output/` may claim.

**Rules that keep it reproducible.**

- One run equals one folder in `results/<run>/` with `calls.jsonl` (append-only), `manifest.json` (git commit, bank hash, model settings) and derived files that can be rebuilt from the log.
- A dataset is frozen with a sha256 before a confirmation run; a run refuses a bank whose hash differs from the one it started with (as v1.1 already does).
- Activations are cached under `results/<run>/acts/` with the model revision and layer list in the manifest, never re-computed silently.
- `tests/` holds fake-model tests for every experiment; nothing touches an API or GPU until they pass.
- Done (13 Nov 2026): `docs/` and `research-vault/` live under `research/`; former `docs/q1/` is `research/protocols/state_loss/`; shared package is `src/rr/`.

## Next steps for both repos

Run the two tracks in parallel: RvC needs API keys and little thinking, while RR needs sign-off and code. The first paid run is the RvC smoke test, about $20 to $60.

**RvC v1.1** ([retrieval-vs-computation](https://github.com/Adya6714/retrieval-vs-computation), PR #1 open)

- [ ] Stage 1 in Cursor: add `--samples`, `inspect` and `smoke` exactly as in the Cursor prompt from 13 Nov. Re-run `make v11-qa`, `make v11-test`, `make v11-dry`. Push to the same PR.
- [ ] Speed: `make v11-test` took 543 s and the old tests 1,123 s, mostly the QA self-test. Ask Cursor to mark the 6,540-call self-test as slow and skip it by default; not urgent.
- [ ] Stage 2: put the OpenRouter key in `.env`, run `make v11-models`, and pick one id per slot. Use Claude Opus 5.5, GLM 5.3, Qwen3.5-27B, DeepSeek V4.1 Flash, and one of OpenAI's flagship or Gemini 4 Carbon. Drop Kimi K3 here unless you want it: it costs about $770 in the middle case.
- [ ] Stage 3: `make v11-smoke1`, read `inspect` with me, then Stage 4 `make v11-smoke5`. Send me both reports before the full run.
- [ ] Stage 5: the full parallel run, then merge PR #1. Write the erratum for the CAISc paper once P1 and E1 are in.

**RR-Failures, Q1** ([reasoning-reliability](https://github.com/Adya6714/reasoning-reliability))

- [ ] Tick or change the 8 decisions at the end of the [Q1 plan](https://claude.ai/artifact/4QCEGk2Qux7akPpFAmmXAS). Nothing below starts before that.
- [x] Literature agent: add `PAPER.md` and `LIT_AGENT_PROMPT.md` under `research/`; run first 5 seed papers (notes in `research/research-vault/papers/`). **Adya: read the Guo et al. note** — if it shows a computed-state condition we missed, Q1 changes before any code.
- [x] Restructure the repo to `research/`, `src/rr/`, `failures/<name>/…` (this branch; no science changes).
- [ ] E0: build UpdateLedger, its two solvers and QA gates, offline. Port the v1.1 runner rather than writing a new one.
- [ ] E1 pilot on Qwen3.5-9B and 27B through OpenRouter (about $10). This sets the difficulty grid and the token lengths that tighten this budget.
- [ ] Freeze `research/protocols/state_loss/prereg.md` with a git tag, then run E1 confirmation on all models.
- [ ] Ask for JarvisLabs access now; E2 needs an A100 80GB about four weeks from today if E0 and E1 go to plan.

**RR-Layer:** nothing to build yet. Revisit after Q1's E5 result.

## Budget

The whole programme costs about **$17,000** (range $8,800 to $33,700) including a 20% contingency. The part to run now, the RvC rerun plus Q1, costs about **$9,000** (range $4,800 to $17,200). The reliability layer and the second failure are only spent if Q1 succeeds.

&#91;embedded content: Our estimate, 13 Nov 2026 · prices from Anthropic, Google, OpenRouter and JarvisLabs pages read that day\]

| Stage | Low | Middle | High |
| --- | --- | --- | --- |
| Run now: RvC rerun, Q1, storage | $4,028 | $7,482 | $14,336 |
| Later: second failure, reliability layer | $3,276 | $6,769 | $13,782 |
| Contingency, 20% | $1,461 | $2,850 | $5,624 |
| **Total** | **$8,765** | **$17,101** | **$33,742** |

**Prices used** (per million tokens, input / output, read 13 Nov 2026).

| Model or GPU | Price | Source |
| --- | --- | --- |
| Claude Opus 5.5 | $4 / $20; batch half price | [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing) |
| OpenAI flagship | Assumed $4 / $20 | Not found: the pricing page showed no API prices |
| Gemini 4 Carbon (alternative closed model) | $2 / $10 until 30 Nov, then $4 / $20 | [Google pricing](https://aistudio.google.com/docs/pricing) |
| Kimi K3 | $3 / $15 | [benchlm](https://benchlm.ai/blog/posts/kimi-k3-is-open-you-cannot-run-it) |
| GLM 5.3 | $0.07 / $1.40 | [OpenRouter](https://openrouter.ai/z-ai) |
| DeepSeek V4.1 Flash | $0.04 / $0.60 | [OpenRouter](https://openrouter.ai/deepseek) |
| Qwen3.5-27B | $0.195 / $1.56 | [OpenRouter](https://openrouter.ai/qwen) |
| JarvisLabs L4 / A100 80GB / H100 / H200, per GPU-hour | $0.44 / $1.49 / $3.49 / $4.59 | [JarvisLabs VMs](https://jarvislabs.ai/vm) |
| Storage | $0.00014 per GB-hour (about $0.10 per GB-month) | [JarvisLabs VMs](https://jarvislabs.ai/vm) |

**Assumptions that drive the range.**

- **Output length is the biggest lever.** Thinking-on answers are assumed to average 1,500 (low), 3,000 (middle) or 6,000 (high) tokens; thinking-off 300, 400 or 600. The pilot measures this; replace the range after it.
- **RvC rerun:** 14,303 thinking-on and 12,673 thinking-off calls per model across P1, E1, E2 and P2, on 6 API models, plus 5% for smoke runs. Opus and the OpenAI model are about two thirds of the cost; GLM, DeepSeek and Qwen together are about 6%.
- **Q1 E1:** 1,500 items, 5 samples, thinking on and off, 6 API models, plus 10% for the pilot. Gemma runs on our own GPU.
- **GPU hours, middle case:** 150 L4 hours for code development; 300 A100 hours for E1 to E5 on Qwen and Gemma; 90 H100 hours for 6 LoRA runs; 48 hours of an 8x H200 node for the GLM test. The 8x H200 rate assumes 8 times the single-GPU price; JarvisLabs does not list it.
- **Layer:** 100 hours of an 8x H100 node ($27.92 an hour) to train a rewriter with SFT and RL, plus $1,500 of downstream evaluation calls.

**Ways to cut it.** Batch APIs halve Claude and Gemini costs. Dropping Kimi K3 from the RvC rerun saves about $770 in the middle case. Spot GPUs (H100 from $1.54 an hour) cut GPU lines by up to half once the runner resumes cleanly. Testing on GLM-5.3 is optional and is the largest single GPU line.

**Not included:** your time, Cursor, conference registration and travel, and any human annotation.

## Sources

Pages opened on 13 Nov 2026 unless marked.

- Prices: [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing), [Google AI Studio pricing](https://aistudio.google.com/docs/pricing), OpenRouter pages for [Qwen](https://openrouter.ai/qwen), [DeepSeek](https://openrouter.ai/deepseek) and [Z.ai](https://openrouter.ai/z-ai), [JarvisLabs VMs](https://jarvislabs.ai/vm), [JarvisLabs H100 price](https://jarvislabs.ai/blog/h100-price), [JarvisLabs A100 price](https://jarvislabs.ai/blog/a100-price)
- Open-weight frontier models: [GLM-5.3 report](https://aiunderstanding.org/news/hugging-face-lists-z-ai-s-glm-5-3-as-an-open-weight-753b-model), [Kimi K3 specs](https://rits.shanghai.nyu.edu/ai/kimi-k3-open-weights-ship-2-8t-parameters-1-4-tb-to-run/), [Kimi K3 licence](https://www.unite.ai/moonshot-opens-kimi-k3-weights-under-a-revenue-tiered-license/), [Kimi K3 hardware and price](https://benchlm.ai/blog/posts/kimi-k3-is-open-you-cannot-run-it)
- Inspectable models: [Qwen3.5-27B config](https://huggingface.co/Qwen/Qwen3.5-27B/blob/main/config.json), [Qwen-Scope](https://huggingface.co/collections/Qwen/qwen-scope), [Gemma Scope 2](https://huggingface.co/google/gemma-scope-2)
- State loss: [PI-LLM](https://arxiv.org/abs/2506.08184) and [its data](https://huggingface.co/datasets/giantfish-fly/pi-llm), [Guo et al. 2026](https://arxiv.org/abs/2609.38866), [Chen and Yeh 2026](https://zenodo.org/records/23153676), [Qiao et al. 2026](https://arxiv.org/abs/2603.12271), [Chattaraj and Raj 2026](https://arxiv.org/abs/2603.00270), [Competition of Mechanisms](https://arxiv.org/abs/2402.11655), [Lookbacks](https://arxiv.org/abs/2505.14685), [Basu et al. 2026](https://arxiv.org/abs/2603.18353)
- Input restructuring: [System 2 Attention](https://arxiv.org/abs/2311.11829), [Rephrase and Respond](https://arxiv.org/abs/2311.04205), [GEPA](https://arxiv.org/abs/2507.19457), [RouteLLM](https://arxiv.org/abs/2406.18665); [PRewrite](https://arxiv.org/abs/2401.08189) found by search, not opened
- Our own: [Q1 plan](https://claude.ai/artifact/4QCEGk2Qux7akPpFAmmXAS), [retrieval-vs-computation PR #1](https://github.com/Adya6714/retrieval-vs-computation/pull/1), [reasoning-reliability](https://github.com/Adya6714/reasoning-reliability)
