# Research review checklist

Questions to answer before the design is frozen and testing starts. Each item: the question, why it matters, how to answer it, and what "done" looks like. Log every answer in `docs/decisions.md`.

Order: A (real problems) feeds B (benchmarks), which feeds C (item counts). D (dimensions) and E (tests) are decided together. F, G, H are planned now but can be revised after the pilot.

---

## A. What problems do people actually run into?

Benchmarks should be good proxies for failures engineers and researchers hit today. Collect evidence before picking.

### A1. Gather pain points from public sources (1 week)

- [ ] **X / Twitter:** search phrases like "agent lost track", "model ignored the constraint", "works on benchmark but", "hallucinated tool output", "long context forgot", "reasoning model overthinks", "eval contamination". Save each useful post to `research-vault/clips/`.
- [ ] **LessWrong / Alignment Forum:** tags on evaluations, interpretability, chain of thought, capabilities. Look for posts reporting a specific, reproducible failure.
- [ ] **GitHub issues** of agent frameworks and harnesses (OpenHands, SWE-agent, LangGraph, DSPy, aider): issues labelled bug where the cause is model reasoning, not code.
- [ ] **Hacker News and r/LocalLLaMA:** threads about models failing in real use.
- [ ] **Published failure taxonomies:** Cemri et al. 2025 (MAST, why multi-agent systems fail), METR long-task reports, tau-bench (pass^k reliability), SWE-bench failure analyses.

### A2. Ask your research community (Google Form)

- [ ] Send the form below to your lab, Slack groups and contacts. Aim for 30 to 50 responses.
- [ ] Note the bias: your community leans research and agents; weigh public sources too.

**Form questions**

1. What is your role? (ML researcher / ML engineer / building agents or products / student / other)
2. Which models do you use most? (open-weight / closed API / both)
3. Describe the last time an LLM failed at a reasoning task you cared about. What was the task and what went wrong?
4. How often do you hit each of these? (never / sometimes / often, for each)
   - Loses track of state over many steps
   - Ignores or forgets a constraint
   - Takes the obvious first step that turns out wrong (greedy mistake)
   - Correct on familiar wording, wrong when reworded
   - Gives a remembered answer to a problem that only looks familiar
   - Confident but wrong; cannot tell when it is unsure
   - Cannot fix its own mistake, or "fixes" a correct answer when pushed
   - Misreads or over-trusts tool output
   - Shown reasoning does not match what it actually did
5. Which one costs you the most time or money? Why?
6. What workaround do you use today? (retries, majority vote, verifier, tools, human review, prompt tricks, fine-tuning, nothing)
7. Does the workaround fully fix it? (yes / partly / no)
8. Can you share an example prompt or task (anonymised is fine)?
9. Which benchmarks do you trust, and which do you think are saturated or contaminated?
10. Would you use an open eval that tests these failures on fresh problems? What would make it useful to you?
11. Can I follow up with you? (email, optional)

### A3. Code the evidence

- [ ] Put every pain point in one table: source, failure type, task domain, severity (1 to 3), frequency (1 to 3), checkable by program (yes/no), workaround and whether it works.
- [ ] Map each failure type to a candidate dimension (Section D).
- [ ] Rank failure types by frequency x severity, only among the checkable ones.

**Done when:** a ranked list of 6 to 10 real failure types, each with at least 3 independent sources, stored in `research-vault/09_Test_Menu_and_Selection.md`.

---

## B. Which benchmarks and task families?

Benchmarks become our eval suite, so this step gets the most care.

### B1. Candidate scoring rubric (score every candidate 0 to 2)

| Criterion         | Question                                                                        | How to check                                                                   |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Real-problem fit  | Does it test a failure type ranked in A3?                                       | Map to the A3 table                                                            |
| Contamination     | Fresh after model cutoffs, or can we generate unlimited fresh items?            | Release date vs model cutoff; generator exists; infini-gram spot check         |
| Not crowded       | Is it not saturated or used by everyone?                                        | Count papers using it in the last 12 months; frontier accuracy below about 90% |
| Checkable         | Can a program verify the answer exactly?                                        | Solver or validator exists                                                     |
| Generator + knobs | Can we make fresh items at controlled difficulty?                               | Generator with parameters                                                      |
| Famous pole       | Does a well-known public version exist (for famous vs twin pairs)?              | Public set exists                                                              |
| Edit-friendly     | Can surface change with structure fixed, and can answer-changing edits be made? | Try 5 by hand                                                                  |
| Dimension fit     | Does it clearly load one candidate dimension?                                   | Map to Section D                                                               |
| Licence           | Can we use and release derived items?                                           | Licence check                                                                  |

- [ ] Score every candidate family. Keep only those scoring at least 1 on every row and 2 on real-problem fit, contamination and checkable.

### B2. Candidate families to score

| Family                       | Sources to check                                            | Real problem it proxies                                  |
| ---------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| Classical planning           | PlanBench, Mystery Blocksworld, Fast Downward domains       | Agents planning multi-step actions under constraints     |
| Algorithms with greedy traps | CLRS-Text, own generators (coin change, routes, scheduling) | Optimisation and scheduling in tools and workflows       |
| Logic puzzles                | Reasoning Gym, ZebraLogic                                   | Constraint satisfaction, structured decisions            |
| Code output prediction       | CRUXEval-style, own program generator                       | Debugging, tracing what code will do                     |
| Maths word problems          | GSM-Symbolic templates, GSM-Infinite                        | Business arithmetic, finance and spreadsheet logic       |
| Long state tracking          | Own generator (inventory, ledgers, multi-step edits)        | Agents losing track over long tasks                      |
| Fresh natural problems       | MathArena post-cutoff contests                              | Contamination-free check on hard problems                |
| Tool-use environments        | Small checkable environment, tau-bench-style tasks          | Over-trusting tool outputs, multi-turn agent reliability |
| Dynamic generators           | DyVal, NPHardEval                                           | Controlled difficulty, refreshed items                   |

- [ ] Run the generator audit on every kept family (gold vs independent solver on 200 samples; smooth difficulty; identical wrapper; freshness spot-check; trap and answer-changing versions possible; maintained).
- [ ] Choose the hidden family. It should be a real-problem proxy, different in surface from the others, but loading the same dimensions.

**Done when:** at least 5 profiling families plus 1 hidden family are chosen, each with its rubric score, audit result and the A3 pain points it covers.

---

## C. How many items, and how are they divided?

Starting proposal to review. Final numbers come from a power simulation on pilot data.

### C1. Per family (structural items)

| Part                               | Items   | Purpose                                                               |
| ---------------------------------- | ------- | --------------------------------------------------------------------- |
| Famous originals                   | 50      | Memorization pole (public versions)                                   |
| Fresh twins of those               | 50      | Same structure, new surface and new answer; paired with the originals |
| Fresh generated, across difficulty | 200     | Main population sample, spread over 3 to 4 difficulty levels          |
| **Total**                          | **300** |                                                                       |

### C2. Variants per item

- Canonical, 2 to 3 answer-preserving rewrites, 1 answer-changing edit. About 5 versions per item.

### C3. Splits

| Split         | Share                        | Use                                              |
| ------------- | ---------------------------- | ------------------------------------------------ |
| Development   | 40% of each profiling family | Build profiles, tune tests                       |
| Confirmation  | 60% of each profiling family | Pre-registered tests                             |
| Hidden family | 100% of one family           | Final prediction test only, never touched before |

### C4. Repeats

- All items: k=3 (start at k=5 in the pilot to measure variance).
- Per-problem subset: 60 items per family at k=20.

### C5. Pilots

| Pilot     | Size                                             |
| --------- | ------------------------------------------------ |
| Screening | Top 5 to 6 tests x about 50 items x pilot roster |
| Fix-first | Pilot failures x 4 generic fixes                 |

### C6. Compute check (review this carefully)

- Rough count per model condition: 6 families x 300 items x 5 versions x k=3 = 27,000 generations, plus the k=20 subset (60 x 6 x 5 x 17 extra) = about 30,600. Total about 57,000 per model condition.
- With about 8 model conditions, that is about 450,000 generations. At about 2,000 output tokens for thinking models, near 1 billion tokens.
- [ ] Estimate GPU hours on JarvisLabs from pilot throughput before committing.
- [ ] If too large, cut in this order: fewer rewrites per item, smaller k=20 subset, fewer model conditions. Never cut independent items first.

**Done when:** counts, splits and repeats are frozen in `configs/study.yaml`, with the power simulation and compute estimate attached.

---

## D. Dimensions

The dimension list, theory and the three tests are in `docs/research_design.md` Section 3. The six-question test scoring table is in `research-vault/09_Test_Menu_and_Selection.md`.

### D1. For each candidate dimension, answer

- [ ] **Theory:** which theory or paper supports it? (at least one)
- [ ] **Real problem:** which A3 failure types does it explain?
- [ ] **Two tests:** which two different tests measure it? Are both checkable by program?
- [ ] **Separation:** how will we show it is not general skill? (correlation with overall accuracy; does it add to B2?)
- [ ] **Fix:** which fix does it point to?
- [ ] **Inside:** could we look for it inside the model?

### D2. Decide

- [ ] Drop any candidate with no theory, no real-problem link, or fewer than two tests.
- [ ] Keep 5 to 6 for the screening pilot.
- [ ] After the pilot, choose 2 for the deep study.

**Done when:** each kept dimension has a filled D1 entry in `docs/research_design.md`.

---

## E. Behavioural tests

Tests follow from the chosen dimensions. Candidate menu (15) and scoring are in `docs/research_design.md` Section 11.

- [ ] Score each test 0 to 2 on: hurts real users (use the A3 table); clean control; known fix; less studied; cheap; inspectable inside.
- [ ] Map each test to the dimension(s) it measures. Every kept dimension needs two tests.
- [ ] For each kept test, write: what changes between conditions, what stays fixed, the exact outcome measure, and the QA test that guarantees only the intended change.
- [ ] Confirm the five confidence signals are logged for every test.
- [ ] Define the fix-first pilot fixes and how "repaired" is measured.

**Done when:** a table of 5 to 6 tests, each with dimension, manipulation, control, outcome, QA check and score.

---

## F. Mechanistic interpretability plan

Purpose: turn "what fails" into "why it fails", so the fix can target the cause. Works on open models only (OLMo 3, Gemma 3 with Gemma Scope 2, small Qwen).

| Activity                         | Question it answers                                   | Why we do it                                                                           | Decide now                                                          |
| -------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Linear probes on hidden states   | Is "this will fail" already inside, before answering? | Cheapest test that there is a signal to find; also a reliability monitor               | Which layers, which positions (question end vs mid-reasoning)       |
| Logit lens / tuned lens          | When does the answer form across layers?              | Shows whether the answer is recalled early or computed late (retrieval vs computation) | Which models                                                        |
| Activation patching              | Which layers and positions cause the failure?         | Localises the cause before looking at parts                                            | Clean vs corrupted pairs: use famous vs twin and pass vs fail pairs |
| Attribution patching             | Same, faster at scale                                 | Screens many items before full patching                                                | Threshold for follow-up                                             |
| Neurons vs SAE/transcoder vs ICA | What are the parts that carry it?                     | Compare lenses on one target; which one predicts and causes failures                   | Model and target failure                                            |
| Steering and ablation            | Does pushing the signal change behaviour?             | Causal proof; random-direction controls rule out "just broke the model"                | Control sizes, dose levels, side-effect checks                      |
| Crosscoders across OLMo stages   | Which training stage creates the feature?             | Links mechanism to origin (RQ4)                                                        | Which stage pairs                                                   |
| Attribution graph                | How do parts connect for one example?                 | One clean case study for the paper                                                     | Only if tooling supports the model                                  |

- [ ] Pick the target failure for Stage 3 (from the deep dimensions).
- [ ] Pick the model (likely Gemma 3 for tools, OLMo 3 for stages).
- [ ] Write the stop rule: if probes find nothing above controls, do not continue down the ladder.

---

## G. Fixes and systems plan

| Fix                                       | What it is                                                                                                                                                                                         | What we test                                                                | Decide now                                                                      |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Prompt and protocol                       | Fixed instruction changes (e.g. "write state after each step")                                                                                                                                     | Cheapest baseline fix                                                       | Which prompts                                                                   |
| Harness: written state                    | Model must keep an explicit state log                                                                                                                                                              | State-tracking failures                                                     | Format                                                                          |
| Harness: verifier                         | Solver or checker in the loop                                                                                                                                                                      | Checkable families                                                          | When to call it                                                                 |
| Harness: tools                            | Route to code or calculator                                                                                                                                                                        | Computation failures                                                        | Routing rule                                                                    |
| Harness: confidence layer                 | Rule-based score from our records flags "check this"                                                                                                                                               | Uncertainty failures                                                        | Features and threshold                                                          |
| **Small model between user and main LLM** | A small trained model or probe that sits in front of or beside the main LLM: normalises the problem to a canonical form, routes to the right fix, or monitors activations and flags likely failure | Whether a cheap middle layer improves reliability more than generic retries | Which job: normaliser, router, or monitor; Jev vs a small open model vs a probe |
| SFT: rewrite-diverse                      | Train on many rewrites of the same problems                                                                                                                                                        | Surface dependence                                                          | Data size, matched compute                                                      |
| RL environments                           | Our generators with verifier rewards                                                                                                                                                               | Planning and traps                                                          | Algorithm, reward, budget                                                       |
| LLM-JEPA                                  | Make a problem and its rewrites share representations                                                                                                                                              | Surface dependence, mechanism                                               | Model size, compute (about 3x)                                                  |
| ReFT / steering fix                       | Edit the internal signal found in Stage 3                                                                                                                                                          | Whether the mechanism is the lever                                          | Only if Stage 3 finds a causal signal                                           |

- [ ] For every fix: what counts as success, matched-compute generic baseline, what it might break (other families, latency, cost).
- [ ] Decide which fixes go in the fix-first pilot (cheap ones) and which wait for Stage 4.

---

## H. Papers: read, analyse, file

- [ ] Read the closest papers first: Golsefid 2026, Missing Primitive 2026, CogArena 2026, Beyond Scores 2026, ADeLe (Zhou et al. 2025). They decide whether the gap is real.
- [ ] For benchmark decisions: GSM-Symbolic, DyVal, Reasoning Gym, PlanBench, CRUXEval, MathArena, GSM-Infinite, Signal and Noise.
- [ ] For pain points: MAST (Cemri et al.), tau-bench, METR long tasks, AI Agents That Matter.
- [ ] For dimensions: Burnell et al. 2023, Ruan et al. 2024, Bean et al. 2025 (construct validity), Kotovsky, Hayes and Simon 1985.
- [ ] For mechanism: No Answer Needed, Orgad et al. 2024, Nikankin et al. 2024, Heimersheim and Nanda 2024, AxBench.
- [ ] For fixes: Yue et al. 2025, Chu et al. 2025, LLM-JEPA, Reasoning Gym.
- [ ] Each paper gets a note in `research-vault/papers/` using `NOTE.md`, with `overlap` scored and the "Closeness to my project" section filled.
- [ ] After each batch, update `docs/research_design.md` Section 12 (novelty) and log any change in `docs/decisions.md`.

---

## I. Repo housekeeping before freezing

- [ ] Delete `docs/benchmark_policy.md`, `docs/novelty_and_reliability.md`, `docs/references.md` (content now in `research_design.md` and `reading_list.md`).
- [ ] Decide whether the vault stays public (hidden-family details must never be public).
- [ ] v1: "under revision" note, erratum, archive (`docs/v1_audit.md`).
- [ ] Pre-registration folder `prereg/` created with the frozen main test.

## Freeze criteria

The design is frozen when A to E are done, F and G have a first plan, the closest papers are read, and `configs/study.yaml` matches every decision.
