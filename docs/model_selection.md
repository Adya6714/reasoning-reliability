# Model selection

Detail in `docs/research_design.md`. Roster in `configs/models.yaml`.

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

## Why a closed panel too

- Checks that behavioural findings hold in models people actually use.
- Behaviour only. Never used for exposure, mechanism, or anything needing thinking text.

## Why Jev

- Picks from fixed options with a probability; writes no reasoning.
- Recognition baseline: Jev right means the item may be solvable by pattern alone.
- Later: cheap router in the Stage 4 system.
- Not a judge, not for interpretability, not for untrusted text. Fixed options only; distractors come from the generator. Pin the version.

## Roster summary

| Slot | Model | Contrast |
|---|---|---|
| Exposure + training stages | OLMo 3 7B (Base, SFT, DPO, Instruct, Think) | Which stage creates fragility; real exposure |
| Thinking on vs off | Qwen3.6-27B + small Qwen3.5 | Thinking as a clean factor |
| Interp tools | Gemma 3 (4B or 12B) + Gemma Scope 2 | Ready-made SAEs and transcoders |
| Reasoning-trained | gpt-oss-20b | Different training recipe |
| Bridge to v1 | Llama 3.1 8B Instruct | Links to old data |
| Open frontier | One of DeepSeek, GLM, Kimi (API) | Scale |
| Closed panel | 2 models from 2 labs | Deployment relevance |
| Non-LLM baseline | Jev | Recognition baseline |

- Pilot roster: Qwen 27B (thinking on and off), OLMo 3 7B Instruct, Jev.
- Dropped: Llama 4 Scout (109B total weights), Gemma 4 31B (no matching interp tools).

## Selection record (every run)

Hugging Face commit hash, tokenizer revision, chat template, licence snapshot, engine and version, precision, generation config. Display names are not stable identifiers. Freeze versions on run day.
