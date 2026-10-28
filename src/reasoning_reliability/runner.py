"""Run a frozen JSONL task bank against an OpenAI-compatible chat endpoint."""

from __future__ import annotations

import hashlib
import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .client import ChatCompletionClient
from .records import TaskItem


def _jsonl(path: Path):
    with path.open(encoding="utf-8") as handle:
        for line_number, line in enumerate(handle, start=1):
            if line.strip():
                try:
                    yield json.loads(line)
                except json.JSONDecodeError as exc:
                    raise ValueError(f"Invalid JSON at {path}:{line_number}") from exc


def run_bank(
    *,
    task_path: Path,
    output_path: Path,
    base_url: str,
    model_id: str,
    model_revision: str,
    backend: str,
    precision: str,
    api_key_env: str | None,
    temperature: float,
    top_p: float | None,
    max_new_tokens: int,
    replicates: int,
    seed_base: int,
) -> str:
    run_id = str(uuid.uuid4())
    output_path.parent.mkdir(parents=True, exist_ok=True)
    client = ChatCompletionClient(base_url=base_url, api_key_env=api_key_env)
    with output_path.open("a", encoding="utf-8") as output:
        for raw in _jsonl(task_path):
            item = TaskItem.model_validate(raw)
            for replicate in range(replicates):
                seed = seed_base + replicate
                completion = client.complete(
                    model=model_id,
                    prompt=item.prompt,
                    temperature=temperature,
                    top_p=top_p,
                    max_new_tokens=max_new_tokens,
                    seed=seed if temperature > 0 else None,
                )
                response_text = completion["choices"][0]["message"]["content"]
                record: dict[str, Any] = {
                    "run_id": run_id,
                    "item_id": item.item_id,
                    "model_id": model_id,
                    "model_revision": model_revision,
                    "surface_id": item.surface_id,
                    "replicate": replicate,
                    "decoding_seed": seed if temperature > 0 else None,
                    "temperature": temperature,
                    "top_p": top_p,
                    "max_new_tokens": max_new_tokens,
                    "inference_backend": backend,
                    "precision": precision,
                    "prompt_hash": hashlib.sha256(item.prompt.encode()).hexdigest(),
                    "prompt": item.prompt,
                    "response": response_text,
                    "parsed_answer": None,
                    "parse_valid": False,
                    "correct": None,
                    "verifier_version": "unassigned",
                    "usage": completion.get("usage"),
                    "timestamp_utc": datetime.now(timezone.utc).isoformat(),
                    "provider_response_id": completion.get("id"),
                    "system_fingerprint": completion.get("system_fingerprint"),
                }
                output.write(json.dumps(record, ensure_ascii=False) + "\n")
                output.flush()
    return run_id
