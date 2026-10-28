"""Versioned records used by generators, evaluators, and analyses."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class TaskItem(BaseModel):
    model_config = ConfigDict(extra="forbid")

    item_id: str
    family: str
    generator_version: str
    generator_seed: int
    difficulty: str
    surface_id: str
    prompt: str
    gold: str
    verifier: str
    metadata: dict[str, Any] = Field(default_factory=dict)


class ResponseRecord(BaseModel):
    model_config = ConfigDict(extra="forbid")

    run_id: str
    item_id: str
    model_id: str
    model_revision: str
    tokenizer_revision: str | None = None
    surface_id: str
    replicate: int
    decoding_seed: int | None = None
    temperature: float
    top_p: float | None = None
    max_new_tokens: int
    inference_backend: str
    precision: str
    prompt_hash: str
    response: str
    prompt: str
    usage: dict[str, Any] | None = None
    parsed_answer: str | None = None
    parse_valid: bool = False
    correct: bool | None = None
    verifier_version: str
    timestamp_utc: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    provider_response_id: str | None = None
    system_fingerprint: str | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)
