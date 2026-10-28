"""Small command-line entry point for the research scaffold."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from .runner import run_bank


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="rr", description="Reasoning Reliability research tools")
    subparsers = parser.add_subparsers(dest="command")

    validate = subparsers.add_parser("validate-records", help="validate a JSONL response log")
    validate.add_argument("path", type=Path)

    run = subparsers.add_parser("run", help="run a task bank against a chat-completions endpoint")
    run.add_argument("--tasks", type=Path, required=True)
    run.add_argument("--output", type=Path, required=True)
    run.add_argument("--base-url", required=True, help="Endpoint root, e.g. http://localhost:8000/v1")
    run.add_argument("--model", required=True)
    run.add_argument("--revision", required=True)
    run.add_argument("--backend", required=True)
    run.add_argument("--precision", required=True)
    run.add_argument("--api-key-env")
    run.add_argument("--temperature", type=float, default=0.0)
    run.add_argument("--top-p", type=float)
    run.add_argument("--max-new-tokens", type=int, default=512)
    run.add_argument("--replicates", type=int, default=1)
    run.add_argument("--seed-base", type=int, default=4100)
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    if args.command == "validate-records":
        count = 0
        with args.path.open(encoding="utf-8") as handle:
            for line_no, line in enumerate(handle, start=1):
                record = json.loads(line)
                required = {"run_id", "item_id", "model_id", "surface_id", "replicate", "response"}
                missing = required - record.keys()
                if missing:
                    parser.error(f"{args.path}:{line_no}: missing fields: {sorted(missing)}")
                count += 1
        print(f"Validated {count} records in {args.path}")
        return
    if args.command == "run":
        run_id = run_bank(
            task_path=args.tasks,
            output_path=args.output,
            base_url=args.base_url,
            model_id=args.model,
            model_revision=args.revision,
            backend=args.backend,
            precision=args.precision,
            api_key_env=args.api_key_env,
            temperature=args.temperature,
            top_p=args.top_p,
            max_new_tokens=args.max_new_tokens,
            replicates=args.replicates,
            seed_base=args.seed_base,
        )
        print(f"run_id={run_id}")
        return
    parser.print_help()


if __name__ == "__main__":
    main()
