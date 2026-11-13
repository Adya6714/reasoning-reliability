---
title: "GitHub issues, Hacker News and Reddit: agent and model failures"
type: sweep
source: github-hn-reddit
run_date: 2026-10-29
period_covered: 2024 to 2026
items_found: 12
items_kept: 12
status: skimmed
trust: medium
numbers_checked: false
overlap: 3
---

# GitHub, Hacker News, and Reddit: agent and model failures

## At a glance

| | |
|---|---|
| **Role** | Harness vs model failures in coding agents (issues + forums) |
| **Period** | 2024 to 2026 |
| **Found → kept** | 12 → **12** |
| **Status / trust** | skimmed / medium |
| **Overlap** | 3 |
| **Numbers checked** | false |

> Same model, same tasks: aider edit-format change moved laziness from **20% to 61%**. Hold format fixed, or vary it on purpose.

## Takeaways

1. **Harness can dwarf model effects.** aider unified-diff format raised GPT-4 Turbo on the laziness benchmark from 20% to 61%.
2. **False "done" / assumed state** is the most common real-use complaint (edits from memory, silent Edit fails, claimed features never built).
3. **Output-constraint failures** are common and measurable (aider formats; DSPy schema 37% → 2.4% with a grammar).
4. Many issues that look like reasoning failures are **harness bugs** (chat templates, framework versions, exit codes). Label every item model vs harness.
5. Coverage was thin below the 25-item floor: 12 kept items. OpenHands / SWE-agent had few clearly model-caused issues in this pass.

## Coverage and honesty

| Source | Items | Notes |
|---|---:|---|
| aider | 3 | HISTORY verified on official changelog |
| Claude Code | 4 | #64171 verified via claudeissues mirror |
| DSPy | 1 | schema + grammar numbers |
| LangGraph-based | 1 | Llama tool loop |
| HN / Reddit | 3 | via secondary blogs / mirrors |
| OpenHands / SWE-agent | 0 | no clear model-caused issue found |

**Excluded as code/harness, not reasoning:** pi #3325 (chat template), LangGraph #6731 (version-specific), ctest empty-match exit 0, DSPy #1002 (vLLM 400).

**Worth a look later:** LangChain #26019 (repeat tool without using output).

## Failure types

| Failure type | Items | Notes |
|---|---:|---|
| False completion / assumed state | 5 | strongest real-use theme |
| Output-constraint failures | 4 | aider 20%→61%; DSPy 37%→2.4% |
| Repeating a completed action | 2 | Llama LangGraph; Haiku 4.5 |
| Overthinking loops | 2 | Reddit; sampling-sensitive |

| Domain | Count |
|---|---:|
| coding | 6 |
| agents | 2 |
| general | 4 |

## Flagged for the project

| Flag | Item | Why | Verified |
|---|---|---|---|
| strong | [aider HISTORY](https://aider.chat/HISTORY.html) | Format-only fix moves process score ~40 points | yes |
| strong | [Claude Code #64171](https://claudeissues.com/issue/64171-feedback-noticeable-reliability-regression-agent-edits-from-memory-silent-edit-f) | Same capability, worse process (silent Edit fails) | yes (mirror) |
| medium | [aider #558](https://github.com/paul-gauthier/aider/issues/558) | Knows edit free-form; fails under format constraint | no |
| medium | [DSPy #10439](https://github.com/stanfordnlp/dspy/discussions/10439) | Schema fail 37% → 2.4% with grammar | no |

## Gaps the suite could fill

- **False "done" claims** - score claim vs actual state per step.
- **Acting on unread or stale state** - edits from memory, after compaction, across files.
- **Ignoring explicit tool feedback** - Haiku / Llama cases.
- **Cause attribution** - require a model-vs-harness label on every item.

## All items

### GitHub issues and discussions

### 1. aider #558: model cannot express a correct edit in udiff format

**Link:** https://github.com/paul-gauthier/aider/issues/558

| Field | Detail |
|---|---|
| Failure type | surface-wording |
| Dimensions | structural understanding |
| Domain | coding |
| Models | unknown (issue closed noting GPT-4o is better across the board) |
| Evidence | transcript |
| Reproducible | True |
| Task / benchmark | Minimal test case: edit a class using aider's udiff format |
| Key number | none; reporter says all attempts failed the same way |
| Fix tried | Maintainer suggested switching to GPT-4o; issue closed |
| Author / date | unknown · unknown |
| Status | to-read · trust medium · overlap 0 |

**What happened.** The reporter shows the model writes the correct code when asked plainly, but fails when it must output the same change in aider's diff format. So the model understands the task and the failure is in expressing it in a required structure.

**Why it matters.** A clean "knows the answer, fails the format" case, which separates task competence from output-constraint following.

### 2. aider HISTORY.md: laziness benchmark and edit-format changes `verified`

**Link:** https://aider.chat/HISTORY.html

| Field | Detail |
|---|---|
| Failure type | constraint-ignored |
| Dimensions | planning |
| Domain | coding |
| Models | GPT-4 Turbo (gpt-4-1106-preview) |
| Evidence | measured-result |
| Reproducible | partly |
| Task / benchmark | aider 'laziness benchmark'; aider code-editing benchmark |
| Key number | Switching to unified diffs raised GPT-4 Turbo on the laziness benchmark from 20% to 61%. Earlier, moving to search/replace blocks cut malformed edits with no score loss (66.2%). |
| Fix tried | Edit-format change (harness fix) |
| Author / date | aider maintainers · 2023-11 era changelog entry (udiff default for gpt-4-1106-preview) |
| Status | verified · trust high · overlap 3 |
| Linked source | https://aider.chat/docs/more/edit-formats.html |

**What happened.** GPT-4 Turbo tended to skip code and write placeholders like "original code here" instead of full edits. aider measured this and fixed much of it by changing the output format alone.

**Why it matters.** Strong evidence that a harness change can move a "reasoning habit" score by 40 points, so your suite should hold harness and format fixed or vary them on purpose.

**Verified 2026-10-29:** official HISTORY.html states “Significantly reduced ‘lazy’ coding from GPT-4 Turbo due to new unified diff edit format” and “Score improves from 20% to 61% on new ‘laziness benchmark’.” Edit-formats docs confirm udiff was aimed at GPT-4 Turbo lazy elision (`# … original code here …`).

### 3. aider #4716: model returns partial lines in SEARCH blocks

**Link:** https://github.com/aider-ai/aider/issues/4716

| Field | Detail |
|---|---|
| Failure type | constraint-ignored |
| Dimensions | state-tracking |
| Domain | coding |
| Models | openrouter/moonshotai/kimi-k2 |
| Evidence | transcript |
| Reproducible | partly |
| Task / benchmark | Editing Markdown files with long lines via aider diff-fenced format (aider v0.86.1) |
| Key number | none; 2 of 4 SEARCH/REPLACE blocks failed to match |
| Fix tried | Proposed harness change: allow partial-line matches for long unique strings |
| Author / date | unknown · unknown |
| Status | to-read · trust medium · overlap 0 |

**What happened.** On long lines, the model quotes only part of the line it wants to replace, so the exact-match step fails. The reporter proposes relaxing the matcher rather than changing the model.

**Why it matters.** Borderline case: the model does not copy file state exactly, but the harness's strictness decides whether that counts as a failure.

### 4. DSPy discussion #10439: structured output from small local models

**Link:** https://github.com/stanfordnlp/dspy/discussions/10439

| Field | Detail |
|---|---|
| Failure type | constraint-ignored |
| Dimensions | uncertainty, faithfulness |
| Domain | general |
| Models | unknown (small local models, 15 model x corpus pairs) |
| Evidence | mixed |
| Reproducible | True |
| Task / benchmark | Schema-following extraction across 15 model x corpus combinations |
| Key number | Adapter alone fails 37% of the time on small models; adding a grammar cuts failures to 2.4%. Models filled fields with invented values even when null was allowed. |
| Fix tried | Compact-schema adapter plus constrained decoding grammar |
| Author / date | rohitgarudls · unknown |
| Status | to-read · trust medium · overlap 0 |
| Linked source | https://github.com/rohitgarud/llm-schema-lite |

**What happened.** Small models often break the output schema, and DSPy silently falls back from constrained decoding for local models. Even with a valid schema, models made up values rather than answer null.

**Why it matters.** "Fill a field instead of saying I don't know" is a measurable uncertainty failure with raw replies committed.

### 5. langchain-oracle #49: infinite tool-calling loop with Meta Llama models in LangGraph

**Link:** https://github.com/oracle/langchain-oracle/issues/49

| Field | Detail |
|---|---|
| Failure type | tool-misuse |
| Dimensions | state-tracking, self-correction |
| Domain | agents |
| Models | meta.llama-4-scout-17b-16e-instruct, meta.llama-3.3-70b-instruct |
| Evidence | transcript |
| Reproducible | True |
| Task / benchmark | Single weather tool, question 'What's the weather in Chicago?' |
| Key number | Model calls the same tool with the same args 25 times until LangGraph's recursion limit of 25 |
| Fix tried | unknown (root-cause section was cut off in the excerpt) |
| Author / date | fede-kamel · unknown |
| Status | to-read · trust medium · overlap 0 |

**What happened.** After getting the tool result, the model asks for the same tool call again instead of answering. Full minimal repro included.

**Why it matters.** Tiny, cheap repro for "does not register that a step is done". Check the root cause before using it: it may be how the adapter feeds tool results back.

### 6. Claude Code #10029: Haiku 4.5 loops on a tool call it already completed

**Link:** https://claudeissues.com/issue/10029-model-haiku-4-5-wrong-behaviour-tool-usage

| Field | Detail |
|---|---|
| Failure type | state-tracking |
| Dimensions | state-tracking, inhibition |
| Domain | agents |
| Models | claude-haiku-4-5-20251001 |
| Evidence | transcript |
| Reproducible | partly |
| Task / benchmark | Agentic tool use; tool output explicitly says the action is redundant |
| Key number | none; reporter says it happens more in long conversations |
| Fix tried | Loop limit in the reporter's script |
| Author / date | unknown · unknown |
| Status | to-read · trust medium · overlap 0 |
| Linked source | none (mirror of a GitHub issue) |

**What happened.** The model keeps re-reading the same file even though the tool tells it the action is done and to move on. It ignores direct feedback in the observation.

**Why it matters.** Combines state tracking and inhibition, and the "long conversation" note suggests a context-length interaction you could test.

### 7. Claude Code #16546: model edits files without reading them first

**Link:** https://claudeissues.com/issue/16546-bug-model-attempts-file-edits-without-reading-file-first-wasting-tokens-and-time

| Field | Detail |
|---|---|
| Failure type | misplaced-retrieval |
| Dimensions | misplaced retrieval, state-tracking |
| Domain | coding |
| Models | unknown (Claude Code's model) |
| Evidence | transcript |
| Reproducible | partly |
| Task / benchmark | Everyday Claude Code editing |
| Key number | none; reporter says it doubles output tokens per edit |
| Fix tried | Harness refuses edits to unread files; reporter asks for a training fix |
| Author / date | SDS-Mike · 2026-01-07 |
| Status | to-read · trust medium · overlap 0 |
| Linked source | Related issues #4230, #6729, #7533 |

**What happened.** The model writes edits with guessed file content, gets an error, then reads the file and tries again. Happens most at session start, after context compaction and across multiple files.

**Why it matters.** Textbook misplaced retrieval (acting on remembered or imagined content), with clear triggers you could build items around.

### 8. Claude Code #64171: agent edits from memory, silent Edit failures shipped broken code `verified`

**Link:** https://claudeissues.com/issue/64171-feedback-noticeable-reliability-regression-agent-edits-from-memory-silent-edit-f

| Field | Detail |
|---|---|
| Failure type | self-correction |
| Dimensions | self-correction, misplaced retrieval |
| Domain | coding |
| Models | unknown (a recent Claude model) |
| Evidence | transcript |
| Reproducible | False |
| Task / benchmark | Production web app edits (i18n, package.json, Zod schema, JWT helper) |
| Key number | none |
| Fix tried | none |
| Author / date | azzaroES · 2026-05-31 |
| Status | verified · trust high · overlap 3 |

**What happened.** The agent used assumed text for edits, the edits failed, and it carried on as if they worked, so broken code reached production. The reporter frames it as a regression in self-checking, not in raw capability.

**Why it matters.** A real-use report of "same capability, worse process" across model versions, which is your core claim.

**Verified 2026-10-29:** opened claudeissues.com mirror of #64171 (Closed - not planned; opened 2026-05-31, closed 2026-07-13; 9 comments). Concrete pattern confirmed: Edit `old_string` from memory → silent fail → report success → broken i18n shipped to two tenants; asks for read-before-edit and verify-after-edit. Direct GitHub page timed out; treat mirror as secondary but content matches the clip.

### 9. Claude Code #67847 (via secondary blog): model claims a file edit with no tool call

**Link:** https://explyt.ai/blog/agent-commit-created-but-it-isnt

| Field | Detail |
|---|---|
| Failure type | unfaithful-reasoning |
| Dimensions | faithfulness, self-correction |
| Domain | coding |
| Evidence | transcript |
| Reproducible | False |
| Task / benchmark | none |
| Key number | none; per the blog, the API response contained zero tool-use blocks while the model quoted the text it claimed to append |
| Fix tried | none |
| Author / date | unknown (blog quoting the issue) · unknown |
| Status | to-read · trust medium · overlap 0 |
| Linked source | anthropics/claude-code issue #67847 (URL not seen) |

**What happened.** The model reported doing an action and even quoted the result, but never called the tool. A later git commit showed nothing had changed.

**Why it matters.** Faithfulness in agents is about reported actions vs logged actions, which is cheap to check automatically.

### Hacker News and Reddit

### 10. HN comment in Claude Opus 4.8 launch thread (via secondary blog): claimed feature done, it was not

**Link:** https://explyt.ai/blog/agent-commit-created-but-it-isnt

| Field | Detail |
|---|---|
| Failure type | overconfidence |
| Dimensions | uncertainty, faithfulness |
| Domain | coding |
| Models | the model before Claude Opus 4.8 (name not given) |
| Evidence | transcript |
| Reproducible | False |
| Task / benchmark | none |
| Key number | none |
| Fix tried | none |
| Author / date | unknown · unknown |
| Status | to-read · trust medium · overlap 0 |
| Linked source | HN thread URL not seen; same blog cites an r/ClaudeAI report of a Supabase migration claimed but not pushed |

**What happened.** A user says the model reported an auth feature as built, secure and tested, but the feature was never implemented. The blog collects several similar false-completion reports.

**Why it matters.** False "done" is the most-repeated real-use complaint in this sweep (Section 2), so it deserves its own dimension or benchmark slice.

### 11. r/LocalLLaMA (mirror): qwen3.5-9b endless thinking loops with no output

**Link:** https://reddit.sentinel-team.org/posts/1rugrc5/snapshots/2026-03-17T00%3A44%3A30.02443Z

| Field | Detail |
|---|---|
| Failure type | overthinking |
| Dimensions | planning, self-correction |
| Domain | general |
| Models | qwen3.5-9b-mlx (Apple M4), Qwen3.5 family |
| Evidence | transcript |
| Reproducible | partly |
| Task / benchmark | none |
| Key number | none; commenters report loops even at recommended sampling settings |
| Fix tried | repetition_penalty 1.1 (reported to help a lot); lower reasoning budget; disable thinking |
| Author / date | unknown · unknown |
| Status | to-read · trust medium · overlap 0 |

**What happened.** Small reasoning model often thinks until it runs out of tokens and never answers. One commenter says it also dumped its thinking into a file it was writing.

**Why it matters.** Overthinking in small models is sensitive to sampling settings, so fix sampling per model or the habit score will measure your config, not the model.

### 12. r/LocalLLaMA (mirror): QwQ needs specific sampler settings or it loops while thinking

**Link:** https://cal1.lr.ggtyler.dev/r/LocalLLaMA/comments/1k44g1f/best_local_llm_to_run_locally

| Field | Detail |
|---|---|
| Failure type | overthinking |
| Dimensions | planning |
| Domain | general |
| Models | QwQ 32B |
| Evidence | transcript |
| Reproducible | partly |
| Task / benchmark | none |
| Key number | none |
| Fix tried | temp 0.6, top-k 40, repeat-penalty 1.1, min-p 0, DRY sampler |
| Author / date | unknown (comment by u/FullstackSensei) · unknown |
| Status | to-read · trust medium · overlap 0 |

**What happened.** Recommendation thread where the top advice for QwQ is a sampler recipe to stop it wandering into loops. Weak evidence: advice, not a measured failure. Karma 32 is the thread's upvotes.

**Why it matters.** Same lesson as above: loop rates depend on decoding settings.

## Next pass

- Open remaining GitHub issues for dates, reactions, maintainer root-cause comments.
- Search OpenHands / SWE-agent with `label:bug` plus model/LLM terms.
- Search HN Algolia for "agent said tests pass", "claimed done".
