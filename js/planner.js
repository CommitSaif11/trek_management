/* TrekAI - AI Trek Planner (simulated, deterministic local logic) */

(function () {
  "use strict";

  const { $, $$, toast, hydrateIcons, runSequence, svgIcon } = window.TrekUI;

  const STEPS = [
    "Understanding preferences...",
    "Analyzing trek routes...",
    "Evaluating difficulty...",
    "Checking safety factors...",
    "Generating personalized plan..."
  ];

  const LEVELS = { Easy: 1, Moderate: 2, Difficult: 3 };
  const REGION_MAP = { "Bengaluru Region": "Near Bengaluru", "Western Ghats": "Western Ghats", "Kerala Highlands": "Kerala" };

  function fillSelect(sel, options) {
    const el = $(sel);
    el.innerHTML = options.map((o) => `<option${o === "Any" || o === "Anywhere" ? ' value="' + o + '"' : ""}>${o}</option>`).join("");
  }

  function readForm() {
    return {
      location: $("#pLocation").value,
      difficulty: $("#pDifficulty").value,
      duration: $("#pDuration").value,
      fitness: $("#pFitness").value,
      group: $("#pGroup").value,
      preference: $("#pPreference").value
    };
  }

  /* deterministic scoring against the local catalogue */
  function recommend(input) {
    const fitAllowed = {
      Beginner: ["Easy"],
      Intermediate: ["Easy", "Moderate"],
      Advanced: ["Easy", "Moderate", "Difficult"]
    }[input.fitness];

    const groupCap = { "1-5": 5, "6-15": 15, "16-30": 30, "30+": 40 }[input.group];

    const scored = TREKS.map((t, idx) => {
      let score = 0;
      const why = [];

      if (input.difficulty === "Any") {
        score += 12;
      } else if (t.difficulty === input.difficulty) {
        score += 34;
        why.push("Exact " + input.difficulty + " difficulty match");
      } else if (Math.abs(LEVELS[t.difficulty] - LEVELS[input.difficulty]) === 1) {
        score += 12;
      } else {
        score -= 6;
      }

      if (fitAllowed.includes(t.difficulty)) {
        score += 18;
        if (input.fitness !== "Advanced" && t.difficulty !== "Difficult") {
          why.push("Comfortable for your " + input.fitness.toLowerCase() + " fitness level");
        }
      } else {
        score -= 14;
      }

      if (input.duration === "Any") {
        score += 8;
      } else if (t.durationLabel === input.duration) {
        score += 22;
        why.push("Fits your " + input.duration + " time window");
      }

      if (input.location === "Anywhere") {
        score += 8;
      } else if (REGION_MAP[t.region] === input.location) {
        score += 22;
        why.push("Located in your " + input.location + " zone");
      }

      if (input.preference === "Any") {
        score += 6;
      } else if (t.prefs.includes(input.preference)) {
        score += 26;
        why.push("Known for " + input.preference.toLowerCase() + " experiences");
      }

      if (groupCap >= 30 && t.difficulty === "Easy") score += 8;
      if (groupCap <= 5 && t.difficulty === "Difficult") score += 4;

      score += Math.round((t.rating - 4) * 8);

      return { trek: t, score: score, why: why, idx: idx };
    });

    scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
    const best = scored[0];

    const suitability = Math.max(62, Math.min(98, Math.round(58 + best.score * 0.62)));

    const why = best.why.slice(0, 4);
    why.push("Rated " + best.trek.rating + "★ by " + best.trek.reviews + " trekkers");
    why.push("Recommended season " + best.trek.season);

    return { trek: best.trek, suitability: suitability, why: why };
  }

  function safetyFor(t) {
    return t.safetyTips.slice(0, 3).concat(t.analysis.precautions.slice(0, 2));
  }

  function renderResult(res) {
    const t = res.trek;
    const el = $("#plannerResult");

    el.innerHTML = `
      <div class="plan-hero">
        <div class="plan-thumb thumb-${t.thumb}">${svgIcon("mountain", 26)}</div>
        <div class="plan-hero-text">
          <span class="chip chip-soft">Recommended for you</span>
          <h2>${t.name}</h2>
          <p class="muted">${svgIcon("pin", 13)} ${t.location} · ${t.difficulty} · ${t.durationLabel} · ${t.distance} · ${t.elevation}</p>
        </div>
        <div class="suit-ring" style="--pct:${res.suitability}">
          <strong>${res.suitability}%</strong>
          <span>Suitability</span>
        </div>
      </div>

      <section class="plan-block">
        <h3>${svgIcon("spark", 16)} Why this trek was selected</h3>
        <ul class="why-list">
          ${res.why.map((w) => `<li>${svgIcon("check", 14)} <span>${w}</span></li>`).join("")}
        </ul>
      </section>

      <section class="plan-block">
        <h3>${svgIcon("calendar", 16)} Day-by-day itinerary</h3>
        <div class="plan-days">
          ${t.itinerary
            .map(
              (s) => `
            <div class="day-card">
              <div class="day-card-head"><strong>${s.day}</strong><span>${s.time}</span></div>
              <p class="day-card-title">${s.title}</p>
              <p class="day-card-desc">${s.desc}</p>
            </div>`
            )
            .join("")}
        </div>
      </section>

      <div class="plan-2col">
        <section class="plan-block">
          <h3>${svgIcon("shield", 16)} Safety recommendations</h3>
          <ul class="safety-list">
            ${safetyFor(t).map((s) => `<li>${svgIcon("alert", 14)} <span>${s}</span></li>`).join("")}
          </ul>
        </section>

        <section class="plan-block">
          <h3>${svgIcon("backpack", 16)} Required equipment</h3>
          <div class="equip-grid">
            ${t.equipment.map((e) => `<span class="equip">${svgIcon("check", 13)} ${e}</span>`).join("")}
          </div>
        </section>
      </div>

      <div class="plan-foot">
        <span class="muted">Generated locally from ${TREKS.length} treks · confidence ${res.suitability}%</span>
        <div class="modal-foot-actions">
          <button class="btn btn-ghost btn-sm" type="button" id="planAgain">Plan another</button>
          <button class="btn btn-outline btn-sm" type="button" id="planBrief">Open full trek brief</button>
          <button class="btn btn-primary btn-sm" type="button" id="planSafety">${svgIcon("shield", 15)} Run safety analysis</button>
        </div>
      </div>`;

    $("#planAgain").addEventListener("click", () => {
      el.hidden = true;
      $("#plannerIdle").hidden = false;
    });
    $("#planBrief").addEventListener("click", () => window.TrekExplore.openTrek(t.id));
    $("#planSafety").addEventListener("click", () => {
      const sel = $("#saTrek");
      if (sel) sel.value = t.id;
      window.TrekUI.switchPage("safety");
      setTimeout(() => {
        const btn = $("#analyzeBtn");
        if (btn) btn.click();
      }, 260);
    });
  }

  function generate(e) {
    if (e) e.preventDefault();

    const input = readForm();
    const res = recommend(input);

    $("#plannerIdle").hidden = true;
    $("#plannerResult").hidden = true;
    $("#plannerProcess").hidden = false;

    runSequence({
      steps: STEPS,
      list: $("#processSteps"),
      bar: $("#processBar"),
      status: $("#processStatus"),
      stepMs: 480,
      onDone: () => {
        setTimeout(() => {
          $("#plannerProcess").hidden = true;
          renderResult(res);
          $("#plannerResult").hidden = false;
          toast("Plan generated for " + res.trek.name + " (" + res.suitability + "% match).");
        }, 320);
      }
    });
  }

  function init() {
    fillSelect("#pLocation", PLANNER_OPTIONS.location);
    fillSelect("#pDifficulty", PLANNER_OPTIONS.difficulty);
    fillSelect("#pDuration", PLANNER_OPTIONS.duration);
    fillSelect("#pFitness", PLANNER_OPTIONS.fitness);
    fillSelect("#pGroup", PLANNER_OPTIONS.group);
    fillSelect("#pPreference", PLANNER_OPTIONS.preference);

    $("#pFitness").value = "Intermediate";
    $("#pGroup").value = "6-15";
    $("#pLocation").value = "Near Bengaluru";
    $("#pDuration").value = "1 day";
    $("#pPreference").value = "Sunrise";

    $("#plannerForm").addEventListener("submit", generate);
    hydrateIcons($("#page-planner"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
