"""Minimal OpenAI-compatible transport for hosted providers and local vLLM servers."""

from __future__ import annotations

import os
from typing import Any

import httpx


class ChatCompletionClient:
    def __init__(self, base_url: str, api_key_env: str | None = None, timeout: float = 180.0):
        self.base_url = base_url.rstrip("/")
        self.api_key = os.environ.get(api_key_env, "") if api_key_env else ""
        self.timeout = timeout

    def complete(
        self,
        *,
        model: str,
        prompt: str,
        temperature: float,
        top_p: float | None,
        max_new_tokens: int,
        seed: int | None,
    ) -> dict[str, Any]:
        payload: dict[str, Any] = {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": temperature,
            "max_tokens": max_new_tokens,
        }
        if top_p is not None:
            payload["top_p"] = top_p
        if seed is not None:
            payload["seed"] = seed
        headers = {"Authorization": f"Bearer {self.api_key}"} if self.api_key else {}
        response = httpx.post(
            f"{self.base_url}/chat/completions",
            json=payload,
            headers=headers,
            timeout=self.timeout,
        )
        response.raise_for_status()
        return response.json()
