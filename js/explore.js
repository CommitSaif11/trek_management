/* TrekAI - Explore Treks: search, filters and detail modal */

(function () {
  "use strict";

  const { $, $$, toast, hydrateIcons, switchPage, svgIcon } = window.TrekUI;

  const DIFF_CLASS = { Easy: "chip-success", Moderate: "chip-warning", Difficult: "chip-danger" };

  const state = { q: "", difficulty: "", location: "", duration: "" };

  function matches(t) {
    if (state.difficulty && t.difficulty !== state.difficulty) return false;
    if (state.duration && t.durationKey !== state.duration) return false;
    if (state.location) {
      if (state.location === "Near Bengaluru" && t.region !== "Bengaluru Region") return false;
      if (state.location === "Karnataka" && t.state !== "Karnataka") return false;
      if (state.location === "Kerala" && t.state !== "Kerala") return false;
    }
    if (state.q) {
      const hay = (t.name + " " + t.location + " " + t.summary + " " + t.prefs.join(" ")).toLowerCase();
      if (!hay.includes(state.q.toLowerCase())) return false;
    }
    return true;
  }

  function render() {
    const list = TREKS.filter(matches);
    const grid = $("#trekGrid");

    grid.innerHTML = list
      .map(
        (t) => `
      <article class="trek-card" data-id="${t.id}" tabindex="0">
        <div class="trek-card-img thumb-${t.thumb}">
          <span class="chip ${DIFF_CLASS[t.difficulty]}">${t.difficulty}</span>
          <span class="rating-badge">★ ${t.rating}</span>
          <span class="card-peak">${svgIcon("mountain", 34)}</span>
        </div>
        <div class="trek-card-body">
          <h4>${t.name}</h4>
          <p class="trek-loc">${svgIcon("pin", 13)} ${t.location}</p>
          <p class="trek-desc">${t.summary}</p>
          <div class="trek-facts">
            <span>${svgIcon("clock", 13)} ${t.durationLabel}</span>
            <span>${svgIcon("route", 13)} ${t.distance}</span>
            <span>${svgIcon("chart", 13)} ${t.elevation}</span>
          </div>
          <div class="trek-card-foot">
            <span class="price">${t.price}<small>/person</small></span>
            <button class="btn btn-outline btn-sm" type="button" data-open="${t.id}">View details</button>
          </div>
        </div>
      </article>`
      )
      .join("");

    $("#trekCount").textContent = list.length + (list.length === 1 ? " trek" : " treks");
    $("#trekEmpty").hidden = list.length > 0;
    grid.hidden = list.length === 0;

    $$("[data-open]", grid).forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      openTrek(b.dataset.open);
    }));
    $$(".trek-card", grid).forEach((c) => {
      c.addEventListener("click", () => openTrek(c.dataset.id));
      c.addEventListener("keydown", (e) => { if (e.key === "Enter") openTrek(c.dataset.id); });
    });
  }

  /* ---------- modal ---------- */
  function openTrek(id) {
    const t = TREKS.find((x) => x.id === id);
    if (!t) return;

    $("#modalBody").innerHTML = `
      <div class="modal-hero thumb-${t.thumb}">
        <span class="chip ${DIFF_CLASS[t.difficulty]}">${t.difficulty}</span>
        <h2>${t.name}</h2>
        <p>${svgIcon("pin", 14)} ${t.location} · ${t.durationNote}</p>
        <span class="rating-badge dark">★ ${t.rating} <small>(${t.reviews} reviews)</small></span>
      </div>

      <div class="modal-body">
        <div class="detail-stats">
          <div><small>Difficulty</small><strong>${t.difficulty}</strong></div>
          <div><small>Duration</small><strong>${t.durationLabel}</strong></div>
          <div><small>Distance</small><strong>${t.distance}</strong></div>
          <div><small>Elevation</small><strong>${t.elevation}</strong></div>
          <div><small>Gain</small><strong>${t.elevationGain}</strong></div>
          <div><small>Best season</small><strong>${t.season}</strong></div>
        </div>

        <section class="detail-block">
          <h3>About this trek</h3>
          <p class="detail-text">${t.summary}</p>
          <div class="highlight-row">
            ${t.highlights.map((h) => `<span class="highlight">${svgIcon("check", 14)} ${h}</span>`).join("")}
          </div>
        </section>

        <section class="detail-block">
          <h3>Itinerary</h3>
          <ul class="timeline">
            ${t.itinerary
              .map(
                (s) => `
              <li class="timeline-item">
                <span class="timeline-time">${s.time}</span>
                <div class="timeline-dot"></div>
                <div class="timeline-body">
                  <strong>${s.title}</strong>
                  <span class="timeline-tag">${s.day}</span>
                  <p>${s.desc}</p>
                </div>
              </li>`
              )
              .join("")}
          </ul>
        </section>

        <div class="detail-2col">
          <section class="detail-block">
            <h3>Recommended equipment</h3>
            <div class="equip-grid">
              ${t.equipment.map((e) => `<span class="equip">${svgIcon("backpack", 14)} ${e}</span>`).join("")}
            </div>
          </section>

          <section class="detail-block">
            <h3>Safety information</h3>
            <ul class="safety-list">
              ${t.safetyTips.map((s) => `<li>${svgIcon("shield", 14)} <span>${s}</span></li>`).join("")}
            </ul>
            <div class="safety-score-line">
              <span>AI safety score</span>
              <strong>${t.analysis.score}/100 · ${t.analysis.risk} risk</strong>
            </div>
          </section>
        </div>

        <div class="modal-foot">
          <span class="price big">${t.price}<small>/person · includes travel &amp; guide</small></span>
          <div class="modal-foot-actions">
            <button class="btn btn-ghost btn-sm" type="button" data-close>Close</button>
            <button class="btn btn-primary btn-sm" type="button" id="useInPlanner">
              ${svgIcon("spark", 15)} Plan this trek with AI
            </button>
          </div>
        </div>
      </div>`;

    const modal = $("#trekModal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    $("#useInPlanner").addEventListener("click", () => sendToPlanner(t));

    $$("#trekModal [data-close]").forEach((el) => el.addEventListener("click", closeModal));
  }

  function sendToPlanner(t) {
    const regionMap = { "Bengaluru Region": "Near Bengaluru", "Western Ghats": "Western Ghats", "Kerala Highlands": "Kerala" };
    const durMap = { half: "Half day", day: "1 day", multi: "2 days" };
    setSelect("#pLocation", regionMap[t.region]);
    setSelect("#pDifficulty", t.difficulty);
    setSelect("#pDuration", durMap[t.durationKey]);
    closeModal();
    switchPage("planner");
    toast(t.name + " loaded into the AI Trek Planner.");
  }

  function setSelect(sel, value) {
    const el = $(sel);
    if (!el) return;
    if ($$('option', el).some((o) => o.value === value || o.textContent === value)) el.value = value;
  }

  function closeModal() {
    const modal = $("#trekModal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function resetFilters() {
    state.q = state.difficulty = state.location = state.duration = "";
    $("#trekSearch").value = "";
    $("#fDifficulty").value = "";
    $("#fLocation").value = "";
    $("#fDuration").value = "";
    render();
  }

  function init() {
    $("#trekSearch").addEventListener("input", (e) => { state.q = e.target.value.trim(); render(); });
    $("#fDifficulty").addEventListener("change", (e) => { state.difficulty = e.target.value; render(); });
    $("#fLocation").addEventListener("change", (e) => { state.location = e.target.value; render(); });
    $("#fDuration").addEventListener("change", (e) => { state.duration = e.target.value; render(); });
    $("#clearFilters").addEventListener("click", resetFilters);
    $("#emptyReset").addEventListener("click", resetFilters);
    $("#trekModal").addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });

    render();
    hydrateIcons($("#page-explore"));
  }

  window.TrekExplore = { openTrek, closeModal };
  document.addEventListener("DOMContentLoaded", init);
})();
