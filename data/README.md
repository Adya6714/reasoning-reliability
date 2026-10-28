# Data policy

- `banks/`: generated and frozen task JSONL; each bank has a manifest with generator commit, seed range, split, and verifier version.
- `private/`: held-out seed manifests, hidden test prompts, and answer keys; ignored by Git.
- `raw/`: append-only model response logs; ignored by Git if they may contain provider or user data.
- `derived/`: regenerable scores and analysis tables; never hand-edit.

Do not publish held-out seeds or private test prompts before evaluation. Public benchmark licenses and provider terms must be checked before copying their items into this repository.
