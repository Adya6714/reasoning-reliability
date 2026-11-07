/* Mermaid flowchart browser — diagrams mirror docs/flowcharts.md */
(function () {
  const CHARTS = [
    {
      id: "idea",
      label: "01 Idea",
      title: "Central research idea",
      note: "Why accuracy is not enough, and what the programme aims to build.",
      src: `flowchart TD
  P[Problem: aggregate accuracy hides failure modes]
  P --> A[Two models can share accuracy]
  A --> B[But have different weaknesses]
  B --> C[A single score cannot predict where each will fail]
  C --> Q[Research question]
  Q --> Q1[Measure where a model breaks]
  Q --> Q2[Find internal signals]
  Q --> Q3[Intervene on the mechanism]
  Q --> Q4[Beat generic fixes]
  Q --> Q5[Generalize to new models]
  Q1 --> R[Repeatable model-specific diagnosis]
  Q2 --> R
  Q3 --> R
  Q4 --> R
  Q5 --> R
  R --> F[Reliability front-end]
  F --> F1[Query rewriting]
  F --> F2[Runtime monitoring]
  F --> F3[Adaptive compute]`,
    },
    {
      id: "arch",
      label: "02 Architecture",
      title: "Complete research architecture",
      note: "Failures to abilities to generators to profiles to prediction to localize to fix to front-end.",
      src: `flowchart TD
  F17[17 failure types] --> R8[8 root abilities]
  R8 --> G[Generators]
  G --> L[Ladders L1 to L4]
  L --> TR[Behavioural traces]
  TR --> PROF[Model profile]
  PROF --> B1[B1 general]
  PROF --> B2[B2 + ADeLe skills]
  PROF --> B3[B3 + process]
  B1 --> HID[Hidden sandbox]
  B2 --> HID
  B3 --> HID
  HID --> CMP{B3 > B2?}
  CMP -->|Yes| SEL[Select failure]
  CMP -->|No| REC[Reconsider profiling]
  SEL --> MI[Localize]
  MI --> FIX[Targeted fix]
  FIX --> VER[Verify vs baselines]
  VER --> GEN[Generalize]
  GEN --> FE[Front-end]`,
    },
    {
      id: "v123",
      label: "03 V1→V3",
      title: "Evolution of the research",
      note: "From surface sensitivity to ability profiling to diagnose-localize-fix.",
      src: `flowchart LR
  V1[V1 surface sensitivity] --> V1b[Drift / confounds / n=1]
  V1b --> V2[V2 ability profiling]
  V2 --> V2b[Predict on unseen tasks]
  V2b --> V3[V3 mechanism and intervention]
  V3 --> M[Measure]
  M --> L[Localize]
  L --> F[Fix]
  F --> V[Verify]
  V --> G[Generalize]`,
    },
    {
      id: "tax",
      label: "04 Taxonomies",
      title: "17 failures → 8 abilities",
      note: "Draft mapping. Not proven causal links.",
      src: `flowchart LR
  F1[1 State loss] --> R1[R1 State]
  F4[4 Looping] --> R2[R2 Goal]
  F5[5 Early stop] --> R2
  F9[9 Weak check] --> R2
  F3[3 Rule break] --> R3[R3 Rules]
  F15[15 Distraction] --> R3
  F10[10 Poor plan] --> R4[R4 Plan]
  F7[7 Surface] --> R5[R5 Structure]
  F8[8 Misplaced] --> R5
  F6[6 Overthink] --> R6[R6 Meta]
  F17[17 Confident wrong] --> R6
  F2[2 Says vs does] --> R7[R7 Faith]
  F14[14 Tool hall.] --> R7
  F16[16 Composition] --> R8[R8 Compose]
  F11[11 Wrong over data] --> R8`,
    },
    {
      id: "ladder",
      label: "05 Ladders",
      title: "L1–L4 difficulty ladders",
      note: "Breaking point ≈ difficulty at 50% accuracy.",
      src: `flowchart TD
  A[Select ability] --> L1[L1 atomic]
  L1 --> L2[L2 scaled]
  L2 --> L3[L3 mixed]
  L3 --> L4[L4 real world]
  L4 --> T[4 to 6 templates / 2+ families]
  T --> C[Accuracy vs difficulty]
  C --> B[50% threshold]
  B --> P[Behavioural profile]`,
    },
    {
      id: "bench",
      label: "06 Benchmarks",
      title: "Profiling vs hidden evaluation",
      note: "Family G is proposed. F is never used for profiling.",
      src: `flowchart TD
  A[A Planning] --> PROF[Profiles]
  B[B State] --> PROF
  C[C Code] --> PROF
  D[D Maths] --> PROF
  E[E Logic] --> PROF
  G[G Long-horizon proposed] --> PROF
  PROF --> F[F Hidden tool-use sandbox]
  F --> PRED[Predict unseen failures]
  PRED --> RW[Real-world traces]`,
    },
    {
      id: "gen",
      label: "07 Generators",
      title: "Item generation and five uses",
      note: "About 300 structural items per family; confirmation set stays closed.",
      src: `flowchart TD
  SRC[Source material] --> FAM[50 famous]
  SRC --> TWIN[50 twins]
  SRC --> FRESH[200 fresh]
  FAM --> SURF[About 5 surfaces]
  TWIN --> SURF
  FRESH --> SURF
  SURF --> SOL[Exact solver]
  SOL --> VER[Verifier + attack tests]
  VER -->|pass| QA[Human QA]
  QA -->|pass| FRZ[Freeze 40/60 split]
  FRZ --> U1[Behaviour]
  FRZ --> U2[Hidden predict]
  FRZ --> U3[Exposure]
  FRZ --> U4[Interp labels]
  FRZ --> U5[SFT / RL]`,
    },
    {
      id: "stats",
      label: "08 Statistics",
      title: "Noise, Kendall W, bifactor, B1–B3",
      note: "Prediction is a checkpoint. Stages after measure gate on RQ1.",
      src: `flowchart TD
  K5[Start k=5] --> CI{CI crosses threshold?}
  CI -->|Yes| ADD[Adaptive samples]
  CI -->|No| KEEP[Keep estimate]
  ADD --> KEEP
  KEEP --> W[Kendall W across templates]
  KEEP --> BI[Bifactor vs 2PL]
  BI --> B1[B1]
  BI --> B2[B2 ADeLe]
  BI --> B3[B3 process]
  B1 --> HID[Hidden sandbox]
  B2 --> HID
  B3 --> HID
  HID --> WIN{B3 > B2?}
  WIN -->|Yes| CLAIM[Profile claim]
  WIN -->|No| NULL[Report null]`,
    },
    {
      id: "interp",
      label: "09 Localize",
      title: "Interpretability funnel",
      note: "Pre-registered pass bars: +0.05 AUROC, 50% patch gap, >95th pct random steering.",
      src: `flowchart TD
  LAB[Labelled pass/fail] --> P1[1 Probes]
  P1 --> P2[2 Patching]
  P2 --> P3[3 Lens compare]
  P3 --> P4[4 Steer / ablate]
  P4 --> P5[5 Attribution graph]
  P1 -.-> INFO[Predictive]
  P2 -.-> CAUS[Causal]
  P4 -.-> CAUS`,
    },
    {
      id: "fix",
      label: "10 Fix",
      title: "Intervention and verification",
      note: "Targeted must beat matched, strong generic, and mismatch controls.",
      src: `flowchart TD
  D[Diagnosis] --> I[Intervention]
  I --> H[Harness]
  I --> S[Steer / edit]
  I --> T[SFT / RL]
  H --> V[Verify]
  S --> V
  T --> V
  V --> M[Matched]
  V --> G[Strong generic]
  V --> X[Mismatch]
  V --> C[Cost + side effects]
  C --> DEC{Targeted wins?}
  DEC -->|Yes| KEEP[Keep]
  DEC -->|No| PIV[Pivot]`,
    },
    {
      id: "frontend",
      label: "11 Front-end",
      title: "Reliability front-end",
      note: "Demand tagger is still an open engineering piece.",
      src: `flowchart TD
  U[User task] --> D[Demand tagger]
  D --> CMP[Compare to profile]
  CMP --> R{Risk}
  R -->|Low| LO[Lower compute]
  R -->|High| HI[More tokens / verify]
  LO --> LLM[Main LLM]
  HI --> LLM
  LLM --> MON{About to fail?}
  MON -->|No| ANS[Answer]
  MON -->|Yes| INT[Rewrite / restore / steer]
  INT --> LLM`,
    },
    {
      id: "demo",
      label: "12 First demo",
      title: "State loss + looping",
      note: "Proposed first end-to-end failures, not frozen.",
      src: `flowchart TD
  subgraph State
    S1[Scale updates] --> S2[False-state injection]
    S2 --> S3[Probe]
    S3 --> S4[Patch / steer]
    S4 --> S5[Vs written-state baseline]
  end
  subgraph Loop
    L1[Fail-action env] --> L2[Detect repeats]
    L2 --> L3[Internal signal]
    L3 --> L4[Steer / edit]
    L4 --> L5[Vs harness limits]
  end
  State --> G[Generalize to second family]
  Loop --> G`,
    },
    {
      id: "road",
      label: "13 Roadmap",
      title: "Execution roadmap",
      note: "Stage 0 first. Later stages gate on RQ1.",
      src: `flowchart TD
  S0[0 Frontier check] -->|break| S1[1 Instrument]
  S0 -->|no break| EXT[Extend ladders]
  EXT --> S0
  S1 --> S2[2 Measure]
  S2 --> S3[3 Predict]
  S2 --> S4[4 Localize]
  S4 --> S5[5 Fix and verify]
  S5 --> S6[6 Generalize]
  S6 --> S7[7 Front-end]`,
    },
  ];

  let index = 0;
  let mermaidReady = false;

  function theme() {
    const dark = matchMedia("(prefers-color-scheme: dark)").matches;
    return dark ? "dark" : "neutral";
  }

  function initMermaid() {
    if (typeof mermaid === "undefined") return false;
    mermaid.initialize({
      startOnLoad: false,
      theme: theme(),
      securityLevel: "strict",
      flowchart: { curve: "basis", htmlLabels: false },
    });
    mermaidReady = true;
    return true;
  }

  async function render() {
    const chart = CHARTS[index];
    const title = document.getElementById("chart-title");
    const note = document.getElementById("chart-note");
    const frame = document.getElementById("chart-frame");
    const tabs = document.getElementById("chart-tabs");
    if (!title || !frame) return;
    title.textContent = chart.title;
    note.textContent = chart.note;
    [...tabs.querySelectorAll(".flow-chip")].forEach((b, i) =>
      b.classList.toggle("active", i === index),
    );
    if (!mermaidReady && !initMermaid()) {
      frame.innerHTML = "<p class='demo-note'>Mermaid failed to load.</p>";
      return;
    }
    const id = "mmd-" + chart.id + "-" + Date.now();
    frame.innerHTML = `<pre class="mermaid" id="${id}">${chart.src}</pre>`;
    try {
      await mermaid.run({ nodes: [document.getElementById(id)] });
    } catch (err) {
      frame.innerHTML = `<p class="demo-note">Render error: ${String(err)}</p>`;
    }
  }

  function boot() {
    const tabs = document.getElementById("chart-tabs");
    if (!tabs) return;
    CHARTS.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "flow-chip" + (i === 0 ? " active" : "");
      b.textContent = c.label;
      b.addEventListener("click", () => {
        index = i;
        render();
      });
      tabs.appendChild(b);
    });
    document.getElementById("chart-prev")?.addEventListener("click", () => {
      index = (index - 1 + CHARTS.length) % CHARTS.length;
      render();
    });
    document.getElementById("chart-next")?.addEventListener("click", () => {
      index = (index + 1) % CHARTS.length;
      render();
    });
    initMermaid();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
