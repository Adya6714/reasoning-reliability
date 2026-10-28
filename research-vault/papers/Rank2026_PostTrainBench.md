---
title: "POSTTRAINBENCH: Can LLM Agents Automate LLM Post-Training?"
authors: ["Ben Rank", "Hardik Bhatnagar", "Ameya Prabhu", "Shira Eisenberg", "Karina Nguyen", "Matthias Bethge", "Maksym Andriushchenko"]
year: 2026
venue: "arXiv preprint"
arxiv: "2603.08640"
url: "https://www.alphaxiv.org/abs/2603.08640"
zotero_uri: ""
status: full-text-read
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
