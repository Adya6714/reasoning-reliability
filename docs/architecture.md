# System architecture

```text
versioned task generator ──> immutable JSONL task bank ──> model runner
          │                           │                       │
          └──> exact solver/verifier  │                       └──> append-only raw JSONL
                                      │                                  │
                                      └──────────────────────┐           v
                                                             └── parser + verifier
                                                                        │
                                                               derived analysis
                                                                        │
                                                               report / paper

Obsidian research-vault: evidence, decisions, preregistration, and paper notes
Git history: code, configs, generator versions, and frozen analysis contracts
```

## Later systems layer

For agentic or tool-using studies, add a versioned harness layer between the model and task environment. Keep model, harness version, tool/memory/retry policy, environment, and task seed independently recorded. Use crossed comparisons where feasible (same model/different harness; different model/same harness) so a system-level gain is not attributed to the model alone.

## Components

- **Task bank:** each row contains stable item ID, family, generator version/seed, difficulty, surface, prompt, gold, verifier key, and task metadata.
- **Runner:** sends frozen prompts to a pinned local OpenAI-compatible server or provider endpoint; records model revision, generation settings, prompt hash, full prompt, raw response, backend, precision, usage, and UTC time.
- **Parser/verifier:** parser extracts the answer using a versioned family-specific rule; independent exact verifier judges correctness. Parsing and correctness are distinct fields.
- **Raw ledger:** append-only JSONL. Never edit a response in place; corrections are new rescored/derived outputs with provenance.
- **Analysis:** regenerates all aggregates, paired effects, confidence intervals, and figures from raw output and frozen banks.
- **Research vault:** Obsidian-compatible Markdown stores literature notes and decisions. Zotero manages bibliographic metadata and PDFs; the vault links to DOI/arXiv and Zotero rather than duplicating copyrighted files.

The initial runner is deliberately endpoint-neutral. It does not yet implement benchmark-specific prompts, answer parsing, verification, concurrency/retries, or analysis. Those components should be added behind frozen interfaces once the pilot task families are locked.
