/* TrekAI - Safety Center: route monitoring, SOS drill, AI safety analyzer */

(function () {
  "use strict";

  const { $, $$, toast, hydrateIcons, runSequence, svgIcon } = window.TrekUI;

  const ANALYZE_STEPS = [
    "Reading terrain profile...",
    "Cross-checking elevation data...",
    "Evaluating trail accessibility...",
    "Scoring emergency response window...",
    "Compiling safety report..."
  ];

  const TONE_CLASS = { success: "chip-success", warning: "chip-warning", danger: "chip-danger" };
  const STATUS_LABEL = { ontrack: "On track", sos: "SOS" };

  let sos = null;
  let groups = SAFETY_CENTER.groups.map((g) => Object.assign({}, g));

  /* ---------- KPI strip ---------- */
  function renderStats() {
    const active = groups.reduce((n, g) => n + g.members, 0);
    const furthest = groups.reduce((a, b) => (b.checkpoint > a.checkpoint ? b : a));
    const cards = [
      { label: "Active Trekkers", value: active, note: "on trail right now", icon: "users", tone: "up" },
      { label: "Checked-in Trekkers", value: SAFETY_CENTER.checkedIn, note: "base camp register", icon: "check", tone: "flat" },
      { label: "Trek Groups", value: groups.length, note: "all with a guide", icon: "mountain", tone: "up" },
      { label: "Current Checkpoint", value: CHECKPOINTS[furthest.checkpoint].name, note: "furthest group", icon: "pin", tone: "up", small: true },
      { label: "Safety Status", value: sos ? "SOS Active" : "All Clear", note: sos ? "response team engaged" : "no incidents today", icon: sos ? "alert" : "shield", tone: sos ? "warning" : "up", small: true, danger: !!sos }
    ];

    $("#safetyStats").innerHTML = cards
      .map(
        (c) => `
      <article class="kpi ${c.danger ? "kpi-danger" : ""}">
        <span class="stat-ico tone-${c.tone}">${svgIcon(c.icon, 18)}</span>
        <div>
          <strong class="${c.small ? "kpi-sm" : ""}">${c.value}</strong>
          <span class="kpi-label">${c.label}</span>
          <small>${c.note}</small>
        </div>
      </article>`
      )
      .join("");
  }

  /* ---------- route visualization ---------- */
  function renderRoute() {
    const pts = CHECKPOINTS;
    const path = "M" + pts.map((p) => p.x + "," + p.y).join(" L");

    const nodes = pts
      .map((p) => {
        const isSos = sos && sos.affected.id === p.id;
        const done = sos ? p.id <= sos.group.checkpoint : p.id <= 1;
        const fill = isSos ? "#e5484d" : done ? "#0e8c77" : "#ffffff";
        const stroke = isSos ? "#e5484d" : done ? "#0e8c77" : "#c7cfdb";
        return `
        ${isSos ? `<circle cx="${p.x}" cy="${p.y}" r="20" fill="rgba(229,72,77,.18)"><animate attributeName="r" values="16;26;16" dur="1.6s" repeatCount="indefinite"/></circle>` : ""}
        <circle cx="${p.x}" cy="${p.y}" r="11" fill="${fill}" stroke="${stroke}" stroke-width="4" class="cp-node"/>
        <text x="${p.x}" y="${p.y + 34}" text-anchor="middle" class="cp-name">${p.name}</text>
        <text x="${p.x}" y="${p.y + 50}" text-anchor="middle" class="cp-note">${p.note}</text>`;
      })
      .join("");

    const pills = groups
      .map((g) => {
        const p = CHECKPOINTS[g.checkpoint];
        const isSos = g.status === "sos";
        const bg = isSos ? "#e5484d" : "#10222a";
        return `
        <g class="group-pill" transform="translate(${p.x}, ${p.y - 30})">
          <rect x="-42" y="-16" width="84" height="22" rx="11" fill="${bg}"/>
          <circle cx="-30" cy="-5" r="4" fill="${isSos ? "#fff" : "#3ddc97"}"/>
          <text x="4" y="-1.5" text-anchor="middle" fill="#fff" class="pill-text">${g.id}${isSos ? " SOS" : ""}</text>
        </g>`;
      })
      .join("");

    $("#routeWrap").innerHTML = `
      <svg viewBox="0 0 800 250" class="route-svg" role="img" aria-label="Stylized trek route with five checkpoints">
        <defs>
          <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#0e8c77"/><stop offset="60%" stop-color="#14a68e"/><stop offset="100%" stop-color="#94a3b8"/>
          </linearGradient>
        </defs>
        <path d="${path}" fill="none" stroke="#e6e9f0" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${path}" fill="none" stroke="url(#trailGrad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 9" class="trail"/>
        ${nodes}
        ${pills}
      </svg>
      <div class="route-legend">
        <span><i class="lg-dot done"></i> Reached</span>
        <span><i class="lg-dot pending"></i> Pending</span>
        <span><i class="lg-dot sos"></i> SOS position</span>
        <span class="muted">Illustrative path — not a geographic map</span>
      </div>`;
  }

  /* ---------- group list ---------- */
  function renderGroups() {
    $("#groupList").innerHTML = groups
      .map((g) => {
        const cp = CHECKPOINTS[g.checkpoint];
        const isSos = g.status === "sos";
        return `
      <li class="group-row ${isSos ? "is-sos" : ""}">
        <span class="g-avatar ${isSos ? "sos" : ""}">${svgIcon(isSos ? "alert" : "mountain", 16)}</span>
        <div class="g-info">
          <strong>${g.name}</strong>
          <small>${g.id} · ${g.members} trekkers · guide ${g.guide}</small>
        </div>
        <div class="g-check">
          <small>Last checkpoint</small>
          <strong>${cp.name}</strong>
        </div>
        <span class="chip ${isSos ? "chip-danger" : "chip-success"}">${STATUS_LABEL[g.status]}</span>
      </li>`;
      })
      .join("");
  }

  /* ---------- SOS ---------- */
  function renderSosBanner() {
    const banner = $("#sosBanner");
    $("#safetyNavDot").hidden = !sos;
    $("#sosReset").hidden = !sos;

    const chip = $("#safetyStateChip");
    chip.className = "chip " + (sos ? "chip-danger" : "chip-success");
    chip.textContent = sos ? "SOS active" : "All clear";

    if (!sos) {
      banner.hidden = true;
      banner.innerHTML = "";
      return;
    }

    banner.hidden = false;
    banner.innerHTML = `
      <div class="sos-head">
        <span class="sos-pulse">${svgIcon("alert", 20)}</span>
        <div>
          <h3>SOS Alert — ${sos.group.name}</h3>
          <p>Triggered ${sos.time} · guide ${sos.group.guide} · ${sos.group.members} trekkers affected</p>
        </div>
        <span class="chip chip-danger">Priority 1</span>
      </div>

      <div class="sos-grid">
        <div><small>Affected checkpoint</small><strong>${sos.affected.name}</strong></div>
        <div><small>Last known checkpoint</small><strong>${sos.last.name}</strong></div>
        <div><small>Group ID</small><strong>${sos.group.id}</strong></div>
        <div><small>Trekkers affected</small><strong>${sos.group.members}</strong></div>
      </div>

      <div class="sos-actions">
        <h4>Emergency response actions</h4>
        <ul>
          ${SAFETY_CENTER.response
            .map(
              (r) => `<li><span class="dot ${r.status === "Done" ? "ok" : r.status === "In progress" || r.status === "Active" ? "run" : "wait"}"></span>${r.action}<em>${r.status}</em></li>`
            )
            .join("")}
        </ul>
      </div>`;
    hydrateIcons(banner);
  }

  function triggerSOS() {
    const g = groups.reduce((a, b) => (b.checkpoint > a.checkpoint ? b : a));
    groups.forEach((x) => { if (x.status !== "sos") x.status = "ontrack"; });
    g.status = "sos";
    sos = {
      group: g,
      affected: CHECKPOINTS[g.checkpoint],
      last: CHECKPOINTS[Math.max(0, g.checkpoint - 1)],
      time: "07:42 IST"
    };
    renderAll();
    toast("SOS simulated for " + g.id + " at " + sos.affected.name + ".");
  }

  function resetSOS() {
    groups.forEach((x) => (x.status = "ontrack"));
    sos = null;
    renderAll();
    toast("SOS drill reset — all groups back to normal.");
  }

  /* ---------- AI safety analyzer ---------- */
  let analyzing = false;

  function analyze() {
    if (analyzing) return;
    const t = TREKS.find((x) => x.id === $("#saTrek").value) || TREKS[0];
    analyzing = true;

    $("#saIdle").hidden = true;
    $("#saResult").hidden = true;
    $("#saProcess").hidden = false;

    runSequence({
      steps: ANALYZE_STEPS,
      list: $("#saSteps"),
      bar: $("#saBar"),
      status: $("#saStatus"),
      stepMs: 440,
      onDone: () => {
        setTimeout(() => {
          $("#saProcess").hidden = true;
          renderAnalysis(t);
          $("#saResult").hidden = false;
          analyzing = false;
          toast("Safety analysis ready for " + t.name + ".");
        }, 280);
      }
    });
  }

  function renderAnalysis(t) {
    const a = t.analysis;
    const riskClass = a.risk === "Low" ? "chip-success" : a.risk === "Moderate" ? "chip-warning" : "chip-danger";

    $("#saResult").innerHTML = `
      <div class="sa-head">
        <div class="sa-score ${a.risk === "High" ? "high" : a.risk === "Moderate" ? "mid" : "low"}">
          <strong>${a.score}</strong><span>/ 100</span>
        </div>
        <div class="sa-title">
          <h3>${t.name} — Safety Profile</h3>
          <p class="muted">${t.location} · ${t.difficulty} · ${t.elevation} · ${t.durationLabel}</p>
        </div>
        <div class="sa-risk">
          <span class="chip ${riskClass}">Risk level: ${a.risk}</span>
          <span class="chip chip-soft">Predefined local result</span>
        </div>
      </div>

      <div class="factor-grid">
        ${a.factors
          .map(
            (f) => `
          <div class="factor">
            <div class="factor-top"><span>${f.label}</span><span class="chip ${TONE_CLASS[f.tone]}">${f.rating}</span></div>
            <p>${f.note}</p>
            <div class="factor-bar"><i class="${f.tone}" style="width:${f.tone === "success" ? 88 : f.tone === "warning" ? 62 : 38}%"></i></div>
          </div>`
          )
          .join("")}
      </div>

      <div class="precaution">
        <h4>${svgIcon("shield", 15)} Recommended precautions</h4>
        <ul>
          ${a.precautions.map((p) => `<li>${svgIcon("check", 14)} ${p}</li>`).join("")}
        </ul>
      </div>`;
  }

  /* ---------- wiring ---------- */
  function renderAll() {
    renderStats();
    renderRoute();
    renderGroups();
    renderSosBanner();
  }

  function init() {
    $("#saTrek").innerHTML = TREKS.map((t) => `<option value="${t.id}">${t.name} · ${t.difficulty}</option>`).join("");
    $("#analyzeBtn").addEventListener("click", analyze);
    $("#sosBtn").addEventListener("click", triggerSOS);
    $("#sosReset").addEventListener("click", resetSOS);

    renderAll();
    hydrateIcons($("#page-safety"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
