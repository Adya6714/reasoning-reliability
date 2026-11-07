/* Reasoning Reliability site — interactions in the style of retrieval-vs-computation */
(function () {
  document.documentElement.classList.add("js");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PLAY_MS = reduceMotion ? 0 : 1600;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];

  /* ---------- rail ---------- */
  const sections = $$("section.panel");
  const rail = $("#rail");
  sections.forEach((s) => {
    const a = document.createElement("a");
    a.href = "#" + s.id;
    a.textContent = s.dataset.rail || s.id;
    a.dataset.target = s.id;
    rail.appendChild(a);
  });
  const railIo = new IntersectionObserver(
    (ents) => {
      ents.forEach((ent) => {
        if (!ent.isIntersecting) return;
        $$("#rail a").forEach((a) =>
          a.classList.toggle("active", a.dataset.target === ent.target.id),
        );
      });
    },
    { threshold: 0.4 },
  );
  sections.forEach((s) => railIo.observe(s));

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input,textarea,select,button,a")) return;
    const idx = sections.findIndex((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= innerHeight * 0.4 && r.bottom > innerHeight * 0.3;
    });
    if (e.key === "ArrowDown" || e.key === "j") {
      e.preventDefault();
      sections[Math.min(idx + 1, sections.length - 1)]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
    if (e.key === "ArrowUp" || e.key === "k") {
      e.preventDefault();
      sections[Math.max(idx - 1, 0)]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  });

  /* ---------- lattice (hero) ---------- */
  (function lattice() {
    if (typeof d3 === "undefined") return;
    const svg = d3.select("#lattice");
    if (svg.empty()) return;
    const nodes = [
      { id: "a", x: 0.2, y: 0.36, label: "state" },
      { id: "b", x: 0.38, y: 0.22, label: "plan" },
      { id: "c", x: 0.56, y: 0.3, label: "rule" },
      { id: "d", x: 0.42, y: 0.54, label: "probe" },
      { id: "e", x: 0.62, y: 0.58, label: "fix" },
      { id: "f", x: 0.78, y: 0.4, label: "verify" },
    ];
    const links = [
      ["a", "b"],
      ["b", "c"],
      ["c", "f"],
      ["a", "d"],
      ["d", "e"],
      ["e", "f"],
      ["c", "d"],
    ];
    let pulse = false;
    function render() {
      const w = svg.node().clientWidth || innerWidth;
      const h = svg.node().clientHeight || innerHeight;
      svg.attr("viewBox", `0 0 ${w} ${h}`);
      svg.selectAll("*").remove();
      const g = svg.append("g");
      links.forEach(([a, b]) => {
        const na = nodes.find((n) => n.id === a);
        const nb = nodes.find((n) => n.id === b);
        g.append("line")
          .attr("x1", na.x * w)
          .attr("y1", na.y * h)
          .attr("x2", nb.x * w)
          .attr("y2", nb.y * h)
          .attr("stroke", "currentColor")
          .attr("stroke-opacity", 0.18)
          .attr("stroke-width", 1);
      });
      const ng = g
        .selectAll("g.node")
        .data(nodes)
        .join("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.x * w},${d.y * h})`);
      ng.append("circle")
        .attr("r", pulse ? 19 : 17)
        .attr("fill", "var(--paper)")
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.28);
      ng.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("font-size", 10)
        .attr("fill", "currentColor")
        .text((d) => d.label);
    }
    render();
    addEventListener("resize", render);
    if (!reduceMotion) setInterval(() => {
      pulse = !pulse;
      render();
    }, 2600);
  })();

  /* ---------- profile play ---------- */
  (function profileDemo() {
    const profiles = {
      A: { state: 86, plan: 38, compose: 55 },
      B: { state: 34, plan: 88, compose: 60 },
    };
    const play = $("#profile-play");
    const sel = $("#profile-model");
    if (!play) return;
    function animateTo(target) {
      const keys = ["state", "plan", "compose"];
      const start = performance.now();
      function frame(now) {
        const t = Math.min(1, (now - start) / 1100);
        const e = 1 - Math.pow(1 - t, 3);
        keys.forEach((k) => {
          const v = Math.round(target[k] * e);
          $(`#bar-${k}`).style.width = v + "%";
          $(`#val-${k}`).textContent = v;
        });
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      $("#profile-caption").textContent =
        sel.value === "A"
          ? "Model A keeps state longer but fails greedy traps sooner. Same overall score, different risk."
          : "Model B plans further ahead but loses state earlier. Same overall score, different risk.";
    }
    play.addEventListener("click", () => animateTo(profiles[sel.value]));
    sel.addEventListener("change", () => animateTo(profiles[sel.value]));
  })();

  /* ---------- pipeline explorer ---------- */
  (function pipeline() {
    const STAGES = [
      {
        name: "Measure",
        blurb: "Raise difficulty on controlled ladders until the model breaks. Record the horizon.",
        beats: ["Generators + exact solvers", "L1 to L4 ladders", "Breaking-point profile"],
      },
      {
        name: "Localize",
        blurb: "Find an internal signal that fires before the failure shows in the output.",
        beats: ["Activation probes (+0.05 AUROC bar)", "Patching pass ↔ fail", "Steering with random controls"],
      },
      {
        name: "Fix",
        blurb: "Intervene with harness, steering, weight edit, SFT, or RL aimed at that weakness.",
        beats: ["Written state / verifiers", "Steering vectors", "Targeted post-training"],
      },
      {
        name: "Verify",
        blurb: "Beat matched, strong generic, and mismatch baselines on reliability per unit cost.",
        beats: ["Matched compute", "Check-your-work / pooled RL", "Wrong-fix control"],
      },
      {
        name: "Generalize",
        blurb: "Re-run the same pipeline on another open model family with minimal manual work.",
        beats: ["New family", "Same failure labels", "Mostly automatic"],
      },
      {
        name: "Front-end",
        blurb: "Eventually: rewrite, monitor, and allocate compute using the model's profile.",
        beats: ["Query rewrite", "Runtime monitor", "Adaptive compute"],
      },
    ];
    const COPY = {
      state: "Demo failure: state loss (type 1 / R1).",
      loop: "Demo failure: looping (type 4 / R2).",
    };
    let stage = 0;
    let fail = "state";
    let playing = false;
    let timer = null;
    const railEl = $("#pipe-rail");
    const canvas = $("#pipe-canvas");

    STAGES.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pipe-stage-btn" + (i === 0 ? " active" : "");
      b.innerHTML = `<span class="pipe-stage-id">${String(i + 1).padStart(2, "0")}</span><span>${s.name}</span>`;
      b.addEventListener("click", () => {
        stop();
        stage = i;
        paint();
      });
      railEl.appendChild(b);
    });

    function stop() {
      playing = false;
      clearTimeout(timer);
      $("#pipe-play").textContent = "Play";
    }

    function drawCanvas() {
      if (typeof d3 === "undefined" || !canvas) return;
      const svg = d3.select(canvas);
      svg.selectAll("*").remove();
      const n = STAGES.length;
      const pts = STAGES.map((_, i) => ({
        x: 40 + (i / (n - 1)) * 560,
        y: i % 2 === 0 ? 100 : 55,
      }));
      for (let i = 0; i < pts.length - 1; i++) {
        svg
          .append("line")
          .attr("x1", pts[i].x)
          .attr("y1", pts[i].y)
          .attr("x2", pts[i + 1].x)
          .attr("y2", pts[i + 1].y)
          .attr("stroke", i < stage ? "var(--accent)" : "var(--rule)")
          .attr("stroke-width", 2);
      }
      pts.forEach((p, i) => {
        svg
          .append("circle")
          .attr("cx", p.x)
          .attr("cy", p.y)
          .attr("r", i === stage ? 10 : 6)
          .attr("fill", i <= stage ? "var(--accent)" : "var(--paper)")
          .attr("stroke", "var(--ink)")
          .attr("stroke-opacity", 0.25);
        svg
          .append("text")
          .attr("x", p.x)
          .attr("y", p.y + 28)
          .attr("text-anchor", "middle")
          .attr("font-size", 10)
          .attr("fill", "var(--muted)")
          .text(STAGES[i].name);
      });
    }

    function paint() {
      const s = STAGES[stage];
      $("#pipe-kicker").textContent = COPY[fail] + " · Stage " + String(stage + 1).padStart(2, "0");
      $("#pipe-title").textContent = s.name;
      $("#pipe-blurb").textContent = s.blurb;
      $("#pipe-step").textContent = String(stage + 1);
      const ul = $("#pipe-beats");
      ul.innerHTML = s.beats.map((b) => `<li>${b}</li>`).join("");
      $$(".pipe-stage-btn", railEl).forEach((b, i) => b.classList.toggle("active", i === stage));
      drawCanvas();
    }

    function tick() {
      if (!playing) return;
      stage = (stage + 1) % STAGES.length;
      paint();
      timer = setTimeout(tick, PLAY_MS || 50);
    }

    $("#pipe-play").addEventListener("click", () => {
      if (playing) {
        stop();
        return;
      }
      playing = true;
      $("#pipe-play").textContent = "Pause";
      timer = setTimeout(tick, PLAY_MS || 50);
    });
    $("#pipe-prev").addEventListener("click", () => {
      stop();
      stage = (stage - 1 + STAGES.length) % STAGES.length;
      paint();
    });
    $("#pipe-next").addEventListener("click", () => {
      stop();
      stage = (stage + 1) % STAGES.length;
      paint();
    });
    $$(".pipe-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        $$(".pipe-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        fail = chip.dataset.fail;
        paint();
      });
    });

    const pipeSec = $("#pipeline");
    pipeSec?.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        $("#pipe-next").click();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        $("#pipe-prev").click();
      }
      if (e.key === " ") {
        e.preventDefault();
        $("#pipe-play").click();
      }
    });
    pipeSec?.setAttribute("tabindex", "0");
    paint();
  })();

  /* ---------- breaking point lab ---------- */
  (function lab() {
    const svgEl = $("#lab-svg");
    const tough = $("#lab-tough");
    const playBtn = $("#lab-play");
    if (!svgEl || typeof d3 === "undefined") return;
    let playing = !reduceMotion;
    let t0 = performance.now();
    let manual = 12;

    function sigmoid(x, mid) {
      return 1 / (1 + Math.exp((x - mid) / 3.4));
    }

    function difficulty(now) {
      if (!playing) return manual;
      const t = (now - t0) / 1000;
      return ((Math.sin(t * 0.85) + 1) / 2) * 28 + 2;
    }

    function draw(now) {
      const mid = Number(tough.value);
      const d = difficulty(now);
      const a = sigmoid(d, mid);
      const svg = d3.select(svgEl);
      svg.selectAll("*").remove();
      const pts = d3.range(0, 41).map((i) => {
        const x = 2 + (i / 40) * 28;
        return { x: 50 + (i / 40) * 540, y: 230 - sigmoid(x, mid) * 170 };
      });
      svg
        .append("line")
        .attr("x1", 50)
        .attr("x2", 590)
        .attr("y1", 230)
        .attr("y2", 230)
        .attr("stroke", "var(--rule)");
      svg
        .append("line")
        .attr("x1", 50)
        .attr("x2", 50)
        .attr("y1", 50)
        .attr("y2", 230)
        .attr("stroke", "var(--rule)");
      svg
        .append("line")
        .attr("x1", 50)
        .attr("x2", 590)
        .attr("y1", 230 - 0.5 * 170)
        .attr("y2", 230 - 0.5 * 170)
        .attr("stroke", "var(--amber)")
        .attr("stroke-dasharray", "4 4")
        .attr("opacity", 0.8);
      svg
        .append("path")
        .attr(
          "d",
          d3
            .line()
            .x((p) => p.x)
            .y((p) => p.y)(pts),
        )
        .attr("fill", "none")
        .attr("stroke", "var(--accent)")
        .attr("stroke-width", 2.5);
      svg
        .append("circle")
        .attr("cx", 50 + ((d - 2) / 28) * 540)
        .attr("cy", 230 - a * 170)
        .attr("r", 7)
        .attr("fill", a < 0.5 ? "var(--amber)" : "var(--teal)");
      $("#lab-readout").textContent = `diff ${d.toFixed(1)} · acc ${(a * 100).toFixed(0)}%${
        a < 0.5 ? " · break" : ""
      }`;
      if (playing) requestAnimationFrame(draw);
    }

    playBtn.addEventListener("click", () => {
      playing = !playing;
      playBtn.textContent = playing ? "Pause sweep" : "Play sweep";
      if (playing) {
        t0 = performance.now();
        requestAnimationFrame(draw);
      }
    });
    tough.addEventListener("input", () => {
      if (!playing) requestAnimationFrame(draw);
    });
    svgEl.addEventListener("click", (e) => {
      if (playing) return;
      const rect = svgEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 640;
      manual = Math.min(30, Math.max(2, 2 + ((x - 50) / 540) * 28));
      requestAnimationFrame(draw);
    });
    requestAnimationFrame(draw);
  })();

  /* ---------- cups ---------- */
  (function cups() {
    const root = $("#cups");
    if (!root) return;
    const SWAPS = [
      [0, 1],
      [1, 2],
      [0, 2],
      [0, 1],
      [1, 2],
      [0, 1],
    ];
    let cups = [
      { id: 1, label: "A" },
      { id: 2, label: "B" },
      { id: 3, label: "C" },
    ];
    let coin = 0;
    let step = 0;
    let playing = false;
    let guess = null;
    let reveal = false;

    function render() {
      root.innerHTML = "";
      cups.forEach((c, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "cup" + (guess === i ? " selected" : "") + (reveal ? " reveal" : "");
        b.innerHTML = `<span class="cup-label">${c.label}</span><span class="coin" style="${
          reveal && i === coin ? "" : "display:none"
        }"></span>`;
        if (reveal && i === coin) b.querySelector(".coin").style.display = "block";
        b.addEventListener("click", () => {
          if (playing || step === 0) return;
          guess = i;
          reveal = true;
          $("#cups-status").textContent =
            guess === coin
              ? `Correct · coin under ${cups[coin].label}`
              : `Missed · coin under ${cups[coin].label}`;
          render();
        });
        root.appendChild(b);
      });
    }

    function reset() {
      cups = [
        { id: 1, label: "A" },
        { id: 2, label: "B" },
        { id: 3, label: "C" },
      ];
      coin = 0;
      step = 0;
      playing = false;
      guess = null;
      reveal = false;
      $("#cups-status").textContent = "Coin starts under A";
      render();
    }

    function tick() {
      if (!playing) return;
      if (step >= SWAPS.length) {
        playing = false;
        reveal = true;
        $("#cups-status").textContent = `Done · coin under ${cups[coin].label}. Tap a cup to guess next time.`;
        render();
        return;
      }
      const [a, b] = SWAPS[step];
      const tmp = cups[a];
      cups[a] = cups[b];
      cups[b] = tmp;
      if (coin === a) coin = b;
      else if (coin === b) coin = a;
      step += 1;
      $("#cups-status").textContent = `Swap ${step} / ${SWAPS.length}`;
      render();
      setTimeout(tick, reduceMotion ? 0 : 850);
    }

    $("#cups-play").addEventListener("click", () => {
      reset();
      playing = true;
      setTimeout(tick, 80);
    });
    $("#cups-reset").addEventListener("click", reset);
    render();
  })();

  /* ---------- abilities ---------- */
  (function abilities() {
    const ABILITIES = [
      { id: "R1", name: "State tracking", measure: "State horizon", failures: "1", example: "Coin under cup 1. Swap 1 and 2. Where is it?", value: 20 },
      { id: "R2", name: "Goal completion", measure: "Completion check", failures: "5, 9, 4", example: "3-part goal: report which parts are met.", value: 0.62 },
      { id: "R3", name: "Rule retention", measure: "Rule horizon", failures: "3, 15", example: "One rule at the top, apply it 10 steps later.", value: 14 },
      { id: "R4", name: "Lookahead", measure: "Lookahead horizon", failures: "10", example: "2-step greedy trap.", value: 5 },
      { id: "R5", name: "Structural fit", measure: "Twin gap", failures: "7, 8, 12, 13", example: "Famous puzzle with one changed rule.", value: 0.18 },
      { id: "R6", name: "Metacognition", measure: "Brier + effort", failures: "6, 17", example: "Easy vs hard: tokens and confidence.", value: 0.71 },
      { id: "R7", name: "Faithfulness", measure: "Report mismatch", failures: "2, 14", example: "Run a tiny tool; report its exact output.", value: 0.11 },
      { id: "R8", name: "Composition", measure: "Hop horizon", failures: "16, 11", example: "2-hop fact chain.", value: 4 },
    ];
    let active = "R1";
    const grid = $("#ability-grid");
    if (!grid || typeof d3 === "undefined") return;

    function norm(a) {
      if (["R2", "R5", "R6", "R7"].includes(a.id)) return a.value;
      if (["R1", "R3"].includes(a.id)) return Math.min(1, a.value / 30);
      return Math.min(1, a.value / 10);
    }

    function paintDetail() {
      const a = ABILITIES.find((x) => x.id === active);
      $("#ability-measure").textContent = a.measure;
      $("#ability-detail").innerHTML = `<h3 style="margin:0 0 .35rem">${a.id} · ${a.name}</h3>
        <p style="margin:0 0 .55rem;color:var(--muted);max-width:none">${a.example}</p>
        <p class="demo-note">Failure types: ${a.failures}. Demo value ${a.value} (illustrative).</p>`;
      $$(".ability-btn", grid).forEach((b) => b.classList.toggle("active", b.dataset.id === active));
      drawRadar();
    }

    function drawRadar() {
      const svg = d3.select("#radar");
      svg.selectAll("*").remove();
      const cx = 160;
      const cy = 150;
      const r = 110;
      for (let ring = 1; ring <= 4; ring++) {
        svg
          .append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", (r * ring) / 4)
          .attr("fill", "none")
          .attr("stroke", "var(--rule)");
      }
      const verts = ABILITIES.map((a, i) => {
        const ang = -Math.PI / 2 + (i / ABILITIES.length) * Math.PI * 2;
        const n = norm(a);
        return {
          id: a.id,
          x: cx + Math.cos(ang) * r * n,
          y: cy + Math.sin(ang) * r * n,
          ox: cx + Math.cos(ang) * r,
          oy: cy + Math.sin(ang) * r,
        };
      });
      verts.forEach((v) => {
        svg
          .append("line")
          .attr("x1", cx)
          .attr("y1", cy)
          .attr("x2", v.ox)
          .attr("y2", v.oy)
          .attr("stroke", "var(--rule)");
      });
      svg
        .append("polygon")
        .attr("points", verts.map((v) => `${v.x},${v.y}`).join(" "))
        .attr("fill", "var(--accent-soft)")
        .attr("stroke", "var(--accent)")
        .attr("stroke-width", 2);
      verts.forEach((v) => {
        svg
          .append("circle")
          .attr("cx", v.x)
          .attr("cy", v.y)
          .attr("r", v.id === active ? 6 : 3.5)
          .attr("fill", v.id === active ? "var(--amber)" : "var(--accent)")
          .style("cursor", "pointer")
          .on("click", () => {
            active = v.id;
            paintDetail();
          });
        svg
          .append("text")
          .attr("x", v.ox)
          .attr("y", v.oy)
          .attr("dx", v.ox >= cx ? 8 : -8)
          .attr("dy", 4)
          .attr("text-anchor", v.ox >= cx ? "start" : "end")
          .attr("font-size", 11)
          .attr("fill", "var(--muted)")
          .text(v.id);
      });
    }

    ABILITIES.forEach((a) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ability-btn";
      b.dataset.id = a.id;
      b.innerHTML = `<span class="code">${a.id}</span><strong>${a.name}</strong>`;
      b.addEventListener("click", () => {
        active = a.id;
        paintDetail();
      });
      grid.appendChild(b);
    });

    $("#ability-play").addEventListener("click", () => {
      let i = 0;
      const id = setInterval(() => {
        active = ABILITIES[i % ABILITIES.length].id;
        paintDetail();
        i += 1;
        if (i > 16) clearInterval(id);
      }, reduceMotion ? 0 : 380);
    });
    paintDetail();
  })();

  /* ---------- baseline race ---------- */
  (function race() {
    const targets = [62, 71, 84];
    const fills = ["#race-b1", "#race-b2", "#race-b3"];
    const vals = ["#race-b1v", "#race-b2v", "#race-b3v"];
    $("#race-play")?.addEventListener("click", () => {
      $("#race-status").textContent = "Racing…";
      const start = performance.now();
      const durs = [1500, 1750, 2000];
      function frame(now) {
        let done = true;
        targets.forEach((target, i) => {
          const t = Math.min(1, (now - start) / durs[i]);
          const e = 1 - Math.pow(1 - t, 3);
          const v = Math.round(target * e);
          $(fills[i]).style.width = v + "%";
          $(vals[i]).textContent = String(v);
          if (t < 1) done = false;
        });
        if (!done) requestAnimationFrame(frame);
        else $("#race-status").textContent = "Illustrative: B3 leads · pre-register before real data";
      }
      requestAnimationFrame(frame);
    });
  })();

  /* ---------- front-end flow ---------- */
  (function flow() {
    const STEPS = [
      { title: "User task", detail: "Long agent job with ~40 state updates and a compound goal." },
      { title: "Demand tagger", detail: "Estimates updates, rules, lookahead, hops. Open engineering piece." },
      { title: "Compare to profile", detail: "Model state horizon ≈ 20. Task wants 40. Elevated risk." },
      { title: "Query rewrite", detail: "Diagnosis-guided: make state handoffs explicit for this model." },
      { title: "Runtime monitor", detail: "Probe watches for looping / state loss before it compounds." },
      { title: "Adaptive compute", detail: "More tokens and verification on high-risk steps; less on easy ones." },
      { title: "Answer", detail: "Same model, better reliability per unit cost when diagnosis is right." },
    ];
    let index = 0;
    let playing = !reduceMotion;
    const stepsEl = $("#flow-steps");
    if (!stepsEl) return;

    STEPS.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "flow-chip" + (i === 0 ? " active" : "");
      b.textContent = s.title;
      b.addEventListener("click", () => {
        playing = false;
        $("#flow-play").textContent = "Play flow";
        index = i;
        paint();
      });
      stepsEl.appendChild(b);
    });

    function paint() {
      const s = STEPS[index];
      $("#flow-status").textContent = `${index + 1} / ${STEPS.length}`;
      $("#flow-card").innerHTML = `<div class="fid">NODE ${String(index + 1).padStart(2, "0")}</div>
        <h3>${s.title}</h3><p>${s.detail}</p>`;
      $$(".flow-chip", stepsEl).forEach((c, i) => c.classList.toggle("active", i === index));
    }

    $("#flow-play").addEventListener("click", () => {
      playing = !playing;
      $("#flow-play").textContent = playing ? "Pause flow" : "Play flow";
    });
    $("#flow-step").addEventListener("click", () => {
      playing = false;
      $("#flow-play").textContent = "Play flow";
      index = (index + 1) % STEPS.length;
      paint();
    });
    setInterval(() => {
      if (!playing) return;
      index = (index + 1) % STEPS.length;
      paint();
    }, reduceMotion ? 999999 : 1600);
    paint();
  })();
})();
