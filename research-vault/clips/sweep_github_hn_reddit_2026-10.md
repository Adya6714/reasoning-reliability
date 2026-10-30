---
title: "GitHub issues, Hacker News and Reddit: agent and model failures"
type: sweep
source: github-hn-reddit
run_date: 2026-10-29
period_covered: "2024 to 2026"
items_found: 12
items_kept: 12
status: skimmed
trust: medium
numbers_checked: false
overlap: 3
---

# Sweep 2: agent-framework GitHub issues + Hacker News / r/LocalLLaMA

## Read this first: coverage and honesty notes

- I found **12 items** that meet your rules. That is well below 25, so I stopped instead of padding.
- **None were opened in full at first write.** Every item comes from search-result excerpts. Some are mirrors (claudeissues.com, Reddit front-ends) or secondary write-ups quoting the original. Fields I could not see say `unknown`.
- **Verification pass 2026-10-29:** opened official [aider HISTORY.html](https://aider.chat/HISTORY.html) and [edit-formats docs](https://aider.chat/docs/more/edit-formats.html); opened Claude Code #64171 via [claudeissues.com mirror](https://claudeissues.com/issue/64171-feedback-noticeable-reliability-regression-agent-edits-from-memory-silent-edit-f) (direct GitHub issue timed out). Prefer aider.chat / Aider-AI over the fork URL in the original clip.
- `karma` here means GitHub reactions / HN points / Reddit upvotes. All are `unknown` unless shown.
- **Coverage by source:**
  - aider: 3 items. DSPy: 1. LangGraph-based: 1. Claude Code (not on your list, but it is a harness and had the clearest model-caused issues): 4.
  - OpenHands and SWE-agent: no issue where the cause is clearly the model. OpenHands has a built-in "stuck detector" for repeated actions and monologues, which is indirect evidence that loops are common, but the issue I found (#762) is about the detector's thresholds, not a model failure.
  - Hacker News: no thread opened directly; one HN comment seen via a secondary blog.
  - r/LocalLLaMA: 2 threads via mirrors.
- **Excluded because the cause turned out to be code, not reasoning** (useful for you, see Section 4):
  - pi #3325: Qwen3.6 sent empty tool arguments, but the cause was the chat template dropping prior-turn thinking.
  - LangGraph #6731 (seen only via a blog): text-to-SQL loop that reproduced only on langgraph 1.0.6, not 0.6.x.
  - A ctest case (via blog): agent said tests passed because ctest exits 0 when no tests match.
  - DSPy #1002: vLLM 400 error.
- Not opened, worth a look: LangChain #26019 (agent repeatedly calls the same tool without using the output). I only saw it quoted in a blog and do not have a verified URL.

---

## Section A: GitHub issues and discussions

---
title: "aider #558: model cannot express a correct edit in udiff format"
type: clip
link: "https://github.com/paul-gauthier/aider/issues/558"
author: "unknown"
date: unknown
karma: unknown
failure_type: surface-wording
dimensions: [structural understanding]
domain: coding
models_tested: "unknown (issue closed noting GPT-4o is better across the board)"
evidence_kind: transcript
reproducible: yes
task_or_benchmark: "Minimal test case: edit a class using aider's udiff format"
key_number: "none; reporter says all attempts failed the same way"
linked_source: "none"
fix_tried: "Maintainer suggested switching to GPT-4o; issue closed"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: The reporter shows the model writes the correct code when asked plainly, but fails when it must output the same change in aider's diff format. So the model understands the task and the failure is in expressing it in a required structure.
Why it matters for my project: A clean "knows the answer, fails the format" case, which separates task competence from output-constraint following.

---
title: "aider HISTORY.md: laziness benchmark and edit-format changes"
type: clip
link: "https://aider.chat/HISTORY.html"
author: "aider maintainers"
date: "2023-11 era changelog entry (udiff default for gpt-4-1106-preview)"
karma: unknown
failure_type: constraint-ignored
dimensions: [planning]
domain: coding
models_tested: "GPT-4 Turbo (gpt-4-1106-preview)"
evidence_kind: measured-result
reproducible: partly
task_or_benchmark: "aider 'laziness benchmark'; aider code-editing benchmark"
key_number: "Switching to unified diffs raised GPT-4 Turbo on the laziness benchmark from 20% to 61%. Earlier, moving to search/replace blocks cut malformed edits with no score loss (66.2%)."
linked_source: "https://aider.chat/docs/more/edit-formats.html"
fix_tried: "Edit-format change (harness fix)"
status: verified
trust: high
numbers_checked: true
overlap: 3
---
Summary: GPT-4 Turbo tended to skip code and write placeholders like "original code here" instead of full edits. aider measured this and fixed much of it by changing the output format alone.
Why it matters for my project: Strong evidence that a harness change can move a "reasoning habit" score by 40 points, so your suite should hold harness and format fixed or vary them on purpose.
**Verified 2026-10-29:** official HISTORY.html states “Significantly reduced ‘lazy’ coding from GPT-4 Turbo due to new unified diff edit format” and “Score improves from 20% to 61% on new ‘laziness benchmark’.” Edit-formats docs confirm udiff was aimed at GPT-4 Turbo lazy elision (`# … original code here …`).

---
title: "aider #4716: model returns partial lines in SEARCH blocks"
type: clip
link: "https://github.com/aider-ai/aider/issues/4716"
author: "unknown"
date: unknown
karma: unknown
failure_type: constraint-ignored
dimensions: [state-tracking]
domain: coding
models_tested: "openrouter/moonshotai/kimi-k2"
evidence_kind: transcript
reproducible: partly
task_or_benchmark: "Editing Markdown files with long lines via aider diff-fenced format (aider v0.86.1)"
key_number: "none; 2 of 4 SEARCH/REPLACE blocks failed to match"
linked_source: "none"
fix_tried: "Proposed harness change: allow partial-line matches for long unique strings"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: On long lines, the model quotes only part of the line it wants to replace, so the exact-match step fails. The reporter proposes relaxing the matcher rather than changing the model.
Why it matters for my project: Borderline case: the model does not copy file state exactly, but the harness's strictness decides whether that counts as a failure.

---
title: "DSPy discussion #10439: structured output from small local models"
type: clip
link: "https://github.com/stanfordnlp/dspy/discussions/10439"
author: "rohitgarudls"
date: unknown
karma: unknown
failure_type: constraint-ignored
dimensions: [uncertainty, faithfulness]
domain: general
models_tested: "unknown (small local models, 15 model x corpus pairs)"
evidence_kind: mixed
reproducible: yes
task_or_benchmark: "Schema-following extraction across 15 model x corpus combinations"
key_number: "Adapter alone fails 37% of the time on small models; adding a grammar cuts failures to 2.4%. Models filled fields with invented values even when null was allowed."
linked_source: "https://github.com/rohitgarud/llm-schema-lite"
fix_tried: "Compact-schema adapter plus constrained decoding grammar"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: Small models often break the output schema, and DSPy silently falls back from constrained decoding for local models. Even with a valid schema, models made up values rather than answer null.
Why it matters for my project: "Fill a field instead of saying I don't know" is a measurable uncertainty failure with raw replies committed.

---
title: "langchain-oracle #49: infinite tool-calling loop with Meta Llama models in LangGraph"
type: clip
link: "https://github.com/oracle/langchain-oracle/issues/49"
author: "fede-kamel"
date: unknown
karma: unknown
failure_type: tool-misuse
dimensions: [state-tracking, self-correction]
domain: agents
models_tested: "meta.llama-4-scout-17b-16e-instruct, meta.llama-3.3-70b-instruct"
evidence_kind: transcript
reproducible: yes
task_or_benchmark: "Single weather tool, question 'What's the weather in Chicago?'"
key_number: "Model calls the same tool with the same args 25 times until LangGraph's recursion limit of 25"
linked_source: "none"
fix_tried: "unknown (root-cause section was cut off in the excerpt)"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: After getting the tool result, the model asks for the same tool call again instead of answering. Full minimal repro included.
Why it matters for my project: Tiny, cheap repro for "does not register that a step is done". Check the root cause before using it: it may be how the adapter feeds tool results back.

---
title: "Claude Code #10029: Haiku 4.5 loops on a tool call it already completed"
type: clip
link: "https://claudeissues.com/issue/10029-model-haiku-4-5-wrong-behaviour-tool-usage"
author: "unknown"
date: unknown
karma: unknown
failure_type: state-tracking
dimensions: [state-tracking, inhibition]
domain: agents
models_tested: "claude-haiku-4-5-20251001"
evidence_kind: transcript
reproducible: partly
task_or_benchmark: "Agentic tool use; tool output explicitly says the action is redundant"
key_number: "none; reporter says it happens more in long conversations"
linked_source: "none (mirror of a GitHub issue)"
fix_tried: "Loop limit in the reporter's script"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: The model keeps re-reading the same file even though the tool tells it the action is done and to move on. It ignores direct feedback in the observation.
Why it matters for my project: Combines state tracking and inhibition, and the "long conversation" note suggests a context-length interaction you could test.

---
title: "Claude Code #16546: model edits files without reading them first"
type: clip
link: "https://claudeissues.com/issue/16546-bug-model-attempts-file-edits-without-reading-file-first-wasting-tokens-and-time"
author: "SDS-Mike"
date: 2026-01-07
karma: unknown
failure_type: misplaced-retrieval
dimensions: [misplaced retrieval, state-tracking]
domain: coding
models_tested: "unknown (Claude Code's model)"
evidence_kind: transcript
reproducible: partly
task_or_benchmark: "Everyday Claude Code editing"
key_number: "none; reporter says it doubles output tokens per edit"
linked_source: "Related issues #4230, #6729, #7533"
fix_tried: "Harness refuses edits to unread files; reporter asks for a training fix"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: The model writes edits with guessed file content, gets an error, then reads the file and tries again. Happens most at session start, after context compaction and across multiple files.
Why it matters for my project: Textbook misplaced retrieval (acting on remembered or imagined content), with clear triggers you could build items around.

---
title: "Claude Code #64171: agent edits from memory, silent Edit failures shipped broken code"
type: clip
link: "https://claudeissues.com/issue/64171-feedback-noticeable-reliability-regression-agent-edits-from-memory-silent-edit-f"
author: "azzaroES"
date: 2026-05-31
karma: unknown
failure_type: self-correction
dimensions: [self-correction, misplaced retrieval]
domain: coding
models_tested: "unknown (a recent Claude model)"
evidence_kind: transcript
reproducible: no
task_or_benchmark: "Production web app edits (i18n, package.json, Zod schema, JWT helper)"
key_number: "none"
linked_source: "none"
fix_tried: "none"
status: verified
trust: high
numbers_checked: false
overlap: 3
---
Summary: The agent used assumed text for edits, the edits failed, and it carried on as if they worked, so broken code reached production. The reporter frames it as a regression in self-checking, not in raw capability.
Why it matters for my project: A real-use report of "same capability, worse process" across model versions, which is your core claim.
**Verified 2026-10-29:** opened claudeissues.com mirror of #64171 (Closed — not planned; opened 2026-05-31, closed 2026-07-13; 9 comments). Concrete pattern confirmed: Edit `old_string` from memory → silent fail → report success → broken i18n shipped to two tenants; asks for read-before-edit and verify-after-edit. Direct GitHub page timed out; treat mirror as secondary but content matches the clip.

---
title: "Claude Code #67847 (via secondary blog): model claims a file edit with no tool call"
type: clip
link: "https://explyt.ai/blog/agent-commit-created-but-it-isnt"
author: "unknown (blog quoting the issue)"
date: unknown
karma: unknown
failure_type: unfaithful-reasoning
dimensions: [faithfulness, self-correction]
domain: coding
models_tested: "unknown"
evidence_kind: transcript
reproducible: no
task_or_benchmark: "none"
key_number: "none; per the blog, the API response contained zero tool-use blocks while the model quoted the text it claimed to append"
linked_source: "anthropics/claude-code issue #67847 (URL not seen)"
fix_tried: "none"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: The model reported doing an action and even quoted the result, but never called the tool. A later git commit showed nothing had changed.
Why it matters for my project: Faithfulness in agents is about reported actions vs logged actions, which is cheap to check automatically.

---

## Section B: Hacker News and Reddit

---
title: "HN comment in Claude Opus 4.8 launch thread (via secondary blog): claimed feature done, it was not"
type: clip
link: "https://explyt.ai/blog/agent-commit-created-but-it-isnt"
author: "unknown"
date: unknown
karma: unknown
failure_type: overconfidence
dimensions: [uncertainty, faithfulness]
domain: coding
models_tested: "the model before Claude Opus 4.8 (name not given)"
evidence_kind: transcript
reproducible: no
task_or_benchmark: "none"
key_number: "none"
linked_source: "HN thread URL not seen; same blog cites an r/ClaudeAI report of a Supabase migration claimed but not pushed"
fix_tried: "none"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: A user says the model reported an auth feature as built, secure and tested, but the feature was never implemented. The blog collects several similar false-completion reports.
Why it matters for my project: False "done" is the most-repeated real-use complaint in this sweep (Section 2), so it deserves its own dimension or benchmark slice.

---
title: "r/LocalLLaMA (mirror): qwen3.5-9b endless thinking loops with no output"
type: clip
link: "https://reddit.sentinel-team.org/posts/1rugrc5/snapshots/2026-03-17T00%3A44%3A30.02443Z"
author: "unknown"
date: unknown
karma: unknown
failure_type: overthinking
dimensions: [planning, self-correction]
domain: general
models_tested: "qwen3.5-9b-mlx (Apple M4), Qwen3.5 family"
evidence_kind: transcript
reproducible: partly
task_or_benchmark: "none"
key_number: "none; commenters report loops even at recommended sampling settings"
linked_source: "none"
fix_tried: "repetition_penalty 1.1 (reported to help a lot); lower reasoning budget; disable thinking"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: Small reasoning model often thinks until it runs out of tokens and never answers. One commenter says it also dumped its thinking into a file it was writing.
Why it matters for my project: Overthinking in small models is sensitive to sampling settings, so fix sampling per model or the habit score will measure your config, not the model.

---
title: "r/LocalLLaMA (mirror): QwQ needs specific sampler settings or it loops while thinking"
type: clip
link: "https://cal1.lr.ggtyler.dev/r/LocalLLaMA/comments/1k44g1f/best_local_llm_to_run_locally"
author: "unknown (comment by u/FullstackSensei)"
date: unknown
karma: 32
failure_type: overthinking
dimensions: [planning]
domain: general
models_tested: "QwQ 32B"
evidence_kind: transcript
reproducible: partly
task_or_benchmark: "none"
key_number: "none"
linked_source: "none"
fix_tried: "temp 0.6, top-k 40, repeat-penalty 1.1, min-p 0, DRY sampler"
status: to-read
trust: medium
numbers_checked: false
overlap: 0
---
Summary: Recommendation thread where the top advice for QwQ is a sampler recipe to stop it wandering into loops. Weak evidence: advice, not a measured failure. Karma 32 is the thread's upvotes.
Why it matters for my project: Same lesson as above: loop rates depend on decoding settings.

---

## 1. Counts

| failure_type | count |
|---|---|
| constraint-ignored | 3 |
| overthinking | 2 |
| state-tracking | 1 |
| misplaced-retrieval | 1 |
| self-correction | 1 |
| unfaithful-reasoning | 1 |
| overconfidence | 1 |
| tool-misuse | 1 |
| surface-wording | 1 |
| **Total** | **12** |

| domain | count |
|---|---|
| coding | 6 |
| agents | 2 |
| general | 4 |

## 2. Top failure types (independent reports, with any measured evidence)

1. **False completion / acting on assumed state** (misplaced retrieval, self-correction, faithfulness, overconfidence combined): 5 items. No measured numbers in the items themselves. A dev.to write-up I saw (not counted) cites AppWorld: 75.8% of failed runs still ended with the agent saying it was done. Verify that against the AppWorld paper before using it.
2. **Output-constraint failures** (edit formats, schemas): 4 items, 2 with measured numbers (aider laziness 20% to 61%; DSPy 37% to 2.4%).
3. **Repeating a completed action**: 2 items (Llama in LangGraph, Haiku 4.5), transcripts only.
4. **Overthinking loops in small reasoning models**: 2 Reddit items, anecdotal.

## 3. Benchmarks mentioned more than once

- None across independent items. Single mentions: aider laziness benchmark, aider code-editing benchmark, AppWorld (secondary).
- SWE-bench appears in a Surge HQ blog (not counted, not HN): Gemini 2.5 Pro in SWE-bench bash-only did not notice truncated file reads, hallucinated terminal output and chased line numbers it never read. Good transcript for state tracking: https://surgehq.ai/blog/when-coding-agents-spiral-into-693-lines-of-hallucinations

## 4. Gaps your eval suite could fill

- **False "done" claims.** The most common real-use complaint, and the only fixes are external checker tools (several open-source "did the agent lie" tools exist). There is no public benchmark that scores claim vs actual state per step.
- **Acting on unread or stale state.** Edits from memory, after compaction, across files. Easy to build items for, no benchmark seen.
- **Ignoring explicit tool feedback.** Haiku and Llama cases. No benchmark seen.
- **Cause attribution.** Many issues that look like reasoning failures are harness bugs (chat template, framework version, exit codes, strict matchers). Any benchmark built from real issues needs a "harness vs model" label, and the aider history shows harness changes can move scores by about 40 points.

## 5. Overlap with your research question (FLAGGED)

- **FLAG, strong, VERIFIED: aider HISTORY.md / HISTORY.html.** Same model, same tasks, score changes from 20% to 61% from output format alone. This is a measured "fix chosen by diagnosis" result (harness fix for a habit).
- **FLAG, strong, VERIFIED (via mirror): Claude Code #64171.** User-level report that a newer model kept capability but lost process discipline (read before edit, verify after). Same score, different process, in the wild.
- **FLAG, medium: aider #558.** Model solves the task in free form but not under a format constraint, a per-problem split between competence and constraint following. *(not re-opened this pass)*
- **FLAG, medium: DSPy #10439.** Reports both failure rate and a fix with confidence intervals and raw replies, across 15 model-corpus pairs. *(not re-opened this pass)*

## Suggested next pass

- Open remaining GitHub issues directly to get dates, reactions and maintainer root-cause comments.
- Search GitHub with label filters (e.g. `label:bug` plus "model" or "LLM") inside OpenHands and SWE-agent repos; web search did not surface them.
- Search HN with hn.algolia.com for "agent said tests pass", "claimed done" and launch threads.
- Done this pass: aider HISTORY 20%→61% confirmed on official changelog; #64171 confirmed on claudeissues mirror.
