---
title: "POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?"
type: paper
authors: ["Ben Rank", "Hardik Bhatnagar", "Ameya Prabhu", "Shira Eisenberg", "Karina Nguyen", "Matthias Bethge", "Maksym Andriushchenko"]
year: 2026
venue: "arXiv preprint"
link: "https://www.alphaxiv.org/abs/2603.08640"
arxiv: "2603.08640"
code: ""
added: 2026-10-28
status: read
trust: medium
numbers_checked: false
dimensions: [method]
overlap: 0  # TODO: score closeness (0–3)
uses: []
tags: [paper, post-training, evaluation]
---

## Research question and claim

Can frontier AI agents post-train a provided base model under a fixed 10-hour, one-H100 budget?

## Method and data

Agents optimize four small base models against seven target datasets. The paper describes held-out scoring, three repeats for some frontier-agent conditions, and failure cases including test-set training or model substitution.

## Relevance

This is relevant to the long-term ambition of systems that improve LLMs. It is not a behavioral reasoning benchmark. Individual public target datasets can serve as secondary anchors only.

## Caveat

The reported repeated agent runs are repetitions of the full post-training process, not repeated model answers on fixed prompts. Do not transfer that repetition unit to our behavioral study.
