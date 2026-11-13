# Flowcharts

Clean Mermaid diagrams for the v3 research design. Raw ChatGPT paste archived in [`archive/background.md`](archive/background.md) §E; use this file.

These describe the **proposed** programme, not completed experimental results. Family G is a candidate. Demo numbers elsewhere on the site remain illustrative.

## How to read

1. Central idea → full architecture → V1/V2/V3
2. Taxonomies and ladders → benchmarks and generators
3. Models and statistics → prediction race
4. Interpretability → fixes → front-end
5. First demo (state loss + looping) → roadmap → papers

---

## 1. The central research idea

```mermaid
flowchart TD
  P[Problem: aggregate accuracy hides failure modes]
  P --> A[Two models can share accuracy]
  A --> B[But have different weaknesses]
  B --> C[A single score cannot predict where each will fail]
  C --> Q[Research question]
  Q --> Q1[Measure where a model breaks]
  Q --> Q2[Find internal signals of that failure]
  Q --> Q3[Intervene on the mechanism]
  Q --> Q4[Beat generic fixes on reliability per cost]
  Q --> Q5[Generalize the procedure to new models]
  Q1 --> R[Contribution: repeatable model-specific diagnosis]
  Q2 --> R
  Q3 --> R
  Q4 --> R
  Q5 --> R
  R --> F[Eventual product: reliability front-end]
  F --> F1[Query rewriting]
  F --> F2[Runtime monitoring]
  F --> F3[Adaptive compute]
```

---

## 2. The complete research architecture

```mermaid
flowchart TD
  F17[17 observed failure types] --> R8[8 candidate root abilities]
  R8 --> G[Controlled task generators]
  G --> L[Difficulty ladders L1 to L4]
  L --> RUN[Run models]
  RUN --> TR[Behavioural traces]
  TR --> BP[Breaking points per ability]
  BP --> STAT[Noise checks / Kendall W / IRT bifactor]
  STAT --> PROF[Model profile]
  PROF --> B1[B1: general ability]
  PROF --> B2[B2: + difficulty + domain + ADeLe skill]
  PROF --> B3[B3: B2 + process profiles]
  B1 --> HID[Hidden tool-use sandbox]
  B2 --> HID
  B3 --> HID
  HID --> CMP{Does B3 outperform B2?}
  CMP -->|Yes| SEL[Select specific failure]
  CMP -->|No| REC[Reconsider profiling hypothesis]
  SEL --> MI[Mechanistic interpretability]
  MI --> MI1[Probes]
  MI --> MI2[Patching]
  MI --> MI3[SAE / neuron / transcoder]
  MI --> MI4[Steering / ablation]
  MI --> FIX[Targeted intervention]
  FIX --> FIX1[Harness]
  FIX --> FIX2[Steering / weight edits]
  FIX --> FIX3[SFT / RL]
  FIX --> VER[Verification]
  VER --> V1[Matched baseline]
  VER --> V2[Strong generic baseline]
  VER --> V3[Mismatch control]
  VER --> GEN[Generalize to new model family]
  GEN --> PIPE[Diagnose to localize to fix to verify]
  PIPE --> FE[Reliability front-end]
```

---

## 3. Evolution: V1 → V2 → V3

```mermaid
flowchart LR
  V1[V1: surface sensitivity] --> V1a[Rewording / reversal / plan-execute / false values]
  V1a --> V1b[Limits: instruction drift, difficulty confounds, n=1]
  V1b --> V2[V2: ability profiling]
  V2 --> V2a[Controlled benchmarks + breaking points]
  V2a --> V2b[Predict failures on unseen tasks]
  V2b --> V3[V3: mechanism and intervention]
  V3 --> V3a[Measure]
  V3a --> V3b[Localize]
  V3b --> V3c[Fix]
  V3c --> V3d[Verify]
  V3d --> V3e[Generalize]
```

---

## 4. Taxonomies: 17 failures → 8 abilities

Draft mapping. Not proven causal links. Some failures may involve several abilities.

```mermaid
flowchart LR
  subgraph Failures
    F1[1 State loss]
    F2[2 Says vs does]
    F3[3 Rule breaking]
    F4[4 Looping]
    F5[5 Premature stop]
    F6[6 Overthinking]
    F7[7 Surface fragility]
    F8[8 Misplaced retrieval]
    F9[9 Weak self-check]
    F10[10 Poor planning]
    F11[11 Wrong over data]
    F12[12 Unrevised assumption]
    F13[13 Misleading hints]
    F14[14 Tool hallucination]
    F15[15 Irrelevant distraction]
    F16[16 Composition failure]
    F17[17 Confidently wrong]
  end
  subgraph Abilities
    R1[R1 State tracking]
    R2[R2 Goal completion]
    R3[R3 Rule retention]
    R4[R4 Planning]
    R5[R5 Structural fit]
    R6[R6 Metacognition]
    R7[R7 Faithfulness]
    R8[R8 Composition]
  end
  F1 --> R1
  F5 --> R2
  F9 --> R2
  F4 --> R2
  F3 --> R3
  F15 --> R3
  F10 --> R4
  F7 --> R5
  F8 --> R5
  F12 --> R5
  F13 --> R5
  F6 --> R6
  F17 --> R6
  F2 --> R7
  F14 --> R7
  F16 --> R8
  F11 --> R8
```

---

## 5. L1–L4 ladders

```mermaid
flowchart TD
  A[Select root ability] --> L1[L1 atomic: one basic operation]
  L1 --> L2[L2 scaled: more operations]
  L2 --> L3[L3 mixed: distractors and interference]
  L3 --> L4[L4 real world: multi-step tasks]
  L4 --> T[4 to 6 templates across at least 2 families]
  T --> M[Measure accuracy and consistency]
  M --> C[Fit accuracy vs difficulty]
  C --> B[Estimate 50% threshold = breaking point]
  B --> P[Model behavioural profile]
```

### Ability → profile measure

```mermaid
flowchart LR
  R1[R1] --> M1[State horizon]
  R2[R2] --> M2[Completion accuracy]
  R3[R3] --> M3[Rule-retention horizon]
  R4[R4] --> M4[Lookahead horizon]
  R5[R5] --> M5[Twin gap]
  R6[R6] --> M6[Brier + effort slope]
  R7[R7] --> M7[Report-action mismatch]
  R8[R8] --> M8[Hop horizon]
```

---

## 6. Benchmark architecture

```mermaid
flowchart TD
  subgraph L1[Layer 1 profiling]
    A[A Planning traps]
    B[B Long state]
    C[C Code execution]
    D[D Maths twins]
    E[E Logic rules]
    G[G Long-horizon memory proposed]
  end
  L1 --> PROF[Model profiles]
  PROF --> L2[Layer 2: F hidden tool-use sandbox]
  L2 --> PRED[Does profile predict unseen failures?]
  PRED --> L3[Layer 3: real-world agent traces]
```

### Item generation pipeline

| Item type | Count per family |
|---|---:|
| Famous | 50 |
| Fresh twins | 50 |
| Fresh generated | 200 |
| Structural total | about 300 |
| Surface versions | about 5 each |

```mermaid
flowchart TD
  SEL[Select family] --> SRC[Source material]
  SRC --> FAM[50 famous]
  SRC --> TWIN[50 structure-matched twins]
  SRC --> FRESH[200 fresh generated]
  FAM --> SURF[About 5 surface versions]
  TWIN --> SURF
  FRESH --> SURF
  SURF --> SOL[Exact solver gold]
  SOL --> VER[Automated verifier + attack tests]
  VER -->|fail| FIX[Reject or repair]
  VER -->|pass| QA[Human QA]
  QA -->|fail| FIX
  QA -->|pass| FRZ[Freeze dataset]
  FRZ --> SPLIT[40% development / 60% confirmation closed]
```

### One generator, five uses

```mermaid
flowchart LR
  GEN[Formal task generator + exact solver] --> B[Behavioural eval]
  GEN --> H[Hidden prediction]
  GEN --> E[Controlled exposure]
  GEN --> I[Interp labels]
  GEN --> T[SFT / RL environments]
```

### Famous vs twin vs fresh

```mermaid
flowchart TD
  Q[Is the model reasoning or recognizing?] --> F[Famous published item]
  Q --> T[Fresh twin: change entities or structure; may change answer]
  Q --> G[Fresh generated: formal rules + solver]
  F --> C[Compare performance]
  T --> C
  G --> C
  C --> R[Familiarity vs generalization vs computation]
```

---

## 7. Model selection

```mermaid
flowchart TD
  PANEL[Model panel] --> OW[Open-weight: OLMo / Qwen / Gemma / gpt-oss / Llama]
  PANEL --> OF[Open frontier: DeepSeek / GLM / Kimi]
  PANEL --> CL[Closed frontier: Opus / GPT / Gemini class]
  PANEL --> J[Jev recognition baseline]
  OW --> U1[Behaviour + internals + edits + stages]
  OF --> U2[Behaviour + Stage 0]
  CL --> U3[Behaviour + Stage 0 + deployment relevance]
  J --> U4[Recognition vs computation]
  U1 --> CMP[Compare profiles]
  U2 --> CMP
  U3 --> CMP
  U4 --> CMP
```

---

## 8. Statistics

### Noise and adaptive k

```mermaid
flowchart TD
  I[Fixed evaluation items] --> K5[Start k = 5 samples]
  K5 --> CI{Interval crosses decision threshold?}
  CI -->|Yes| ADD[Add samples under pre-registered rule]
  CI -->|No| KEEP[Retain estimate]
  ADD --> KEEP
  KEEP --> K20[60 items per family at k = 20]
  KEEP --> NOISE[Rerun seeds and batch sizes]
  NOISE --> FLOOR[Noise floor]
  FLOOR --> OK{Effect above floor?}
  OK -->|No| UN[Unstable evidence]
  OK -->|Yes| USE[Use in analysis]
  USE --> PK[Report pass^k at 1, 4, 8]
```

### Kendall's W

```mermaid
flowchart TD
  A[One candidate ability] --> T[4 to 6 templates in 2+ families]
  T --> R[Rank models on each template]
  R --> W[Kendall's W across 3+ templates]
  W --> H{High agreement?}
  H -->|Yes| OK[Measurement consistency]
  H -->|No| INV[Check template effects / construct / noise]
```

### Bifactor and prediction race

```mermaid
flowchart TD
  DATA[Tagged items] --> B2PL[Baseline 2PL]
  DATA --> BI[Bifactor: general + specific per ability]
  BI --> SIM[Power and null simulations]
  PROF[Profiles] --> B1[B1 general]
  PROF --> B2[B2 + ADeLe skills]
  PROF --> B3[B3 + process]
  B1 --> HID[Hidden sandbox]
  B2 --> HID
  B3 --> HID
  HID --> WIN{B3 > B2?}
  WIN -->|Yes| CLAIM[Stronger profile claim]
  WIN -->|No| NULL[Report null; continue if RQ1 holds]
```

---

## 9. Mechanistic interpretability funnel

```mermaid
flowchart TD
  LAB[Labelled pass/fail with known failing step] --> P1[1 Probes: +0.05 AUROC bar]
  P1 --> P2[2 Activation patching: 50% gap from ≤3 layers]
  P2 --> P3[3 Compare lenses: neurons / SAE / transcoder / ICA]
  P3 --> P4[4 Steering / ablation vs random-direction controls]
  P4 --> P5[5 Attribution graph if tooling allows]
```

### Prediction vs causation

```mermaid
flowchart LR
  PR[Probe predicts failure] --> INFO[Predictive information]
  INT[Patch / steer / ablate changes failure rate] --> CAUS[Causal evidence]
  INFO -.->|not enough alone| CAUS
```

---

## 10. Fix and verify

```mermaid
flowchart TD
  D[Diagnosis] --> I[Intervention menu]
  I --> H[Harness]
  I --> S[Steering / weight edit]
  I --> T[SFT / RL]
  H --> V[Verify]
  S --> V
  T --> V
  V --> M[Matched baseline]
  V --> G[Strong generic baseline]
  V --> X[Mismatch control]
  V --> C[Reliability per unit cost]
  V --> B[What each fix breaks]
  C --> DEC{Targeted beats controls?}
  DEC -->|Yes| KEEP[Keep diagnosis-guided fix]
  DEC -->|No| PIV[Pivot or narrow claim]
```

---

## 11. Reliability front-end

```mermaid
flowchart TD
  U[User task] --> D[Demand tagger]
  D --> CMP[Compare to model profile]
  CMP --> R{Risk?}
  R -->|Low| LO[Lower compute]
  R -->|High| HI[More tokens / samples / verify]
  LO --> LLM[Main LLM]
  HI --> LLM
  LLM --> MON{Runtime monitor: about to fail?}
  MON -->|No| ANS[Return answer]
  MON -->|Yes| INT[Rewrite / restore state / steer / verify]
  INT --> LLM
```

```mermaid
flowchart LR
  FE[Front-end] --> Q[Query rewriting]
  FE --> M[Runtime monitoring]
  FE --> A[Adaptive compute]
```

---

## 12. First end-to-end demo

Proposed first failures: state loss and looping.

```mermaid
flowchart TD
  subgraph StateLoss
    S1[Scale state updates] --> S2[Inject false intermediate state]
    S2 --> S3[Find accept / propagate moment]
    S3 --> S4[Probe impending state loss]
    S4 --> S5[Patch or steer]
    S5 --> S6[Compare to written-state / verifier]
  end
  subgraph Looping
    L1[Deterministic fail-action env] --> L2[Measure repeated no-progress actions]
    L2 --> L3[Internal signal before repeat]
    L3 --> L4[Steer or weight-edit]
    L4 --> L5[Compare to retry limits / harness]
  end
  StateLoss --> G[Generalize pipeline to second open family]
  Looping --> G
```

---

## 13. Execution roadmap

```mermaid
flowchart TD
  S0[0 Frontier sanity check] -->|models break| S1[1 Build instrument]
  S0 -->|do not break| EXT[Extend ladders]
  EXT --> S0
  S1 --> S2[2 Measure profiles]
  S2 -->|RQ1 holds| S3[3 Predict on hidden family]
  S2 -->|no contrast| FIXM[Fix measurement]
  FIXM --> S2
  S3 --> S4[4 Localize]
  S4 --> S5[5 Fix and verify]
  S5 --> S6[6 Generalize]
  S6 --> S7[7 Reliability front-end]
```

---

## 14. Five scientific claims

```mermaid
flowchart TD
  C1[C1: Abilities measurable above noise] --> C2[C2: Distinct beyond general skill]
  C2 --> C3[C3: Profiles predict held-out failures]
  C3 --> C4[C4: Internal signal is causal for a failure]
  C4 --> C5[C5: Diagnosis-guided fix beats matched / strong / mismatch]
```

---

## 15. Paper split (proposed)

```mermaid
flowchart LR
  P1[Paper 1: measurement and prediction] --> P2[Paper 2: mechanism]
  P2 --> P3[Paper 3: intervention and reliability]
  INF[Shared generators and failure labels] --> P1
  INF --> P2
  INF --> P3
```

Final split (one long paper vs series) remains open.

---

## 16. Reading the architecture

```mermaid
flowchart TD
  A[Why accuracy is not enough] --> B[17 failures and 8 abilities]
  B --> C[Ladders and generators]
  C --> D[Models and statistics]
  D --> E[Prediction checkpoint]
  E --> F[Localize]
  F --> G[Fix and verify]
  G --> H[Front-end]
  H --> I[First demo: state loss + looping]
```
