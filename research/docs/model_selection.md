# Model selection

Detail in `research/docs/research_design.md`. Roster in `configs/models.yaml`.

## Rule

Every model must create a contrast. Leaderboard rank alone is never a reason.

## Why open models are the core

| Need | Open | Closed (API) |
|---|---|---|
| Same exact model every time | Yes, pin by hash | No, can change silently |
| Control temperature, seed, precision | Yes | Partly or not at all |
| See full thinking | Yes | Often hidden |
| Gold-answer log-probability | Yes | Rarely |
| Look inside | Yes | No |
| Fine-tune (controlled exposure) | Yes | No |
| Know training data | Yes for OLMo 3 | No |

## Why a closed / frontier panel too

- **Stage 0:** confirm current frontier models still break on L1 to L3 ladders.
- Checks that behavioural findings hold in models people actually use.
- Panel examples (Nov 4): Opus, Fable, Astra-class, Gemini; exact strings and count still open (about 3 to 4 API models are affordable).
- Behaviour and frontier check only. Never used for exposure, mechanism, or anything needing thinking text.

## Open frontier

- GLM is open-weight and counts as frontier by performance (local or API).
- DeepSeek and Kimi are API candidates.
- Target about 3 to 4 from this list for Stage 0 and behavioural checks.

## Why Jev

- Picks from fixed options with a probability; writes no reasoning.
- Recognition baseline: Jev right means the item may be solvable by pattern alone.
- Later: cheap router in the front-end / Stage 5 system.
- Not a judge, not for interpretability, not for untrusted text. Fixed options only; distractors come from the generator. Pin the version.

## Roster summary

| Slot | Model | Contrast |
|---|---|---|
| Exposure + training stages | OLMo 3 7B (Base, SFT, DPO, Instruct, Think) | Which stage creates fragility; full pipeline |
| Thinking on vs off | Qwen3.6-27B + small Qwen3.5 | Thinking as a clean factor |
| Interp tools | Gemma 3 (4B or 12B) + Gemma Scope 2 | Ready-made SAEs and transcoders |
| Reasoning-trained | gpt-oss-20b | Different training recipe |
| Bridge to v1 | Llama 3.1 8B Instruct | Links to old data |
| Open frontier | GLM-5.x, DeepSeek, Kimi | Scale; Stage 0 |
| Closed panel | Opus, Fable, Astra-class, Gemini (exact TBD) | Stage 0 + deployment relevance |
| Non-LLM baseline | Jev | Recognition baseline + later router |

- Pilot roster: Qwen 27B (thinking on and off), OLMo 3 7B Instruct, Jev.
- Dropped: Llama 4 Scout (109B total weights), Gemma 4 31B (no matching interp tools).

## Q1 roster (draft, 13 Nov 2026)

Detail: `research/protocols/state_loss/plan.md` and `research/protocols/state_loss/E1_behaviour.md`.

| Slot | Model | Role |
|---|---|---|
| Main mechanism | Qwen3.5-27B (64 layers: 48 GatedDeltaNet + 16 full; Qwen-Scope 27B SAEs) | E1–E5 |
| Replication | Gemma 3 27B-it (Gemma Scope 2, CC BY 4.0) | E1–E5 |
| Code / pilot | Qwen3.5-2B / 9B | Instrument and E1 pilot |
| Behaviour only | Frontier + GLM / Kimi / DeepSeek | E1 only |

## Astra / weight-edit note

Discussion cites MIT CSAIL editing a tiny fraction of a small Qwen's weights to reduce looping, with large reported benchmark jumps. Treat as inspiration for the looping fix path (failure type 4). Numbers are not independently verified for this project.

## Selection record (every run)

Hugging Face commit hash, tokenizer revision, chat template, licence snapshot, engine and version, precision, generation config. Display names are not stable identifiers. Freeze versions on run day.
