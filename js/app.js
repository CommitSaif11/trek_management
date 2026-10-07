/* TrekAI - app shell: routing, shared UI helpers, dashboard rendering */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  const PAGE_TITLES = {
    dashboard: "Dashboard",
    explore: "Explore Treks",
    planner: "AI Trek Planner",
    manage: "Trek Management",
    safety: "Safety Center"
  };

  /* ---------- icons ---------- */
  function hydrateIcons(root) {
    $$("[data-icon]", root || document).forEach((el) => {
      if (el.dataset.hydrated) return;
      el.innerHTML = svgIcon(el.dataset.icon, Number(el.dataset.size) || 18);
      el.dataset.hydrated = "1";
    });
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    $("#toastMsg").textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
  }

  /* ---------- routing ---------- */
  function switchPage(page, opts) {
    if (!PAGE_TITLES[page]) page = "dashboard";

    $$(".page").forEach((p) => p.classList.toggle("active", p.id === "page-" + page));
    $$(".nav-item").forEach((n) => n.classList.toggle("active", n.dataset.page === page && !n.dataset.scroll));

    document.title = "TrekAI — " + PAGE_TITLES[page];

    if (!(opts && opts.keepScroll)) window.scrollTo({ top: 0, behavior: "smooth" });
    if (history.replaceState) history.replaceState(null, "", "#" + page);

    if (window.innerWidth < 992) closeSidebar();
    document.dispatchEvent(new CustomEvent("trekai:page", { detail: { page: page } }));
  }

  /* ---------- sidebar ---------- */
  function openSidebar() {
    $("#sidebar").classList.add("open");
    $("#overlay").classList.add("show");
  }
  function closeSidebar() {
    $("#sidebar").classList.remove("open");
    $("#overlay").classList.remove("show");
  }

  /* ---------- stat cards ---------- */
  function renderStats() {
    $("#statsGrid").innerHTML = TREK_DATA.stats
      .map(
        (s) => `
      <article class="stat-card">
        <div class="stat-top">
          <span class="stat-ico tone-${s.trend}">${svgIcon(s.icon, 20)}</span>
          <span class="delta ${s.trend}">${s.trend === "up" ? "▲" : "■"} ${s.delta}</span>
        </div>
        <p class="stat-value">${s.value.toLocaleString("en-IN")}${s.suffix}</p>
        <p class="stat-label">${s.label}</p>
        <p class="stat-note">${s.note}</p>
      </article>`
      )
      .join("");
  }

  /* ---------- upcoming treks ---------- */
  const STATUS_CLASS = { Open: "chip-success", "Almost Full": "chip-warning", Full: "chip-danger" };

  function renderTreks() {
    $("#trekList").innerHTML = TREK_DATA.upcomingTreks
      .map((t) => {
        const pct = Math.round((t.filled / t.spots) * 100);
        return `
      <div class="trek-item" data-trek-jump="${t.img}">
        <div class="trek-thumb thumb-${t.img}">${svgIcon("mountain", 20)}</div>
        <div class="trek-info">
          <p class="trek-name">${t.name}</p>
          <p class="trek-meta">${svgIcon("pin", 13)} ${t.region} · ${t.date} · ${t.level}</p>
          <div class="progress"><span style="width:${pct}%"></span></div>
        </div>
        <div class="trek-side">
          <span class="chip ${STATUS_CLASS[t.status]}">${t.status}</span>
          <span class="trek-seats">${t.filled}/${t.spots}</span>
        </div>
      </div>`;
      })
      .join("");
  }

  /* ---------- recent activity ---------- */
  const ACT_ICON = { join: "users", safety: "shield", ai: "spark", gear: "backpack", member: "check", medical: "firstaid" };

  function renderActivity() {
    $("#activityList").innerHTML = TREK_DATA.activity
      .map(
        (a) => `
      <li class="activity-item">
        <span class="activity-ico act-${a.type}">${svgIcon(ACT_ICON[a.type] || "info", 16)}</span>
        <div class="activity-body">
          <p>${a.text}</p>
          <small>${a.actor} · ${a.time}</small>
        </div>
      </li>`
      )
      .join("");
  }

  /* ---------- participation ---------- */
  function renderParticipation() {
    const max = Math.max(...TREK_DATA.participation.map((p) => p.registered));

    $("#participationBars").innerHTML = TREK_DATA.participation
      .map((p) => {
        const confW = (p.confirmed / max) * 100;
        const waitW = (p.waitlist / max) * 100;
        return `
      <div class="bar-row">
        <span class="bar-label">${p.trek}</span>
        <div class="bar-track">
          <span class="bar-seg primary" style="width:${confW}%" title="Confirmed: ${p.confirmed}"></span>
          <span class="bar-seg accent" style="width:${waitW}%" title="Waitlist: ${p.waitlist}"></span>
        </div>
        <span class="bar-value">${p.registered}</span>
      </div>`;
      })
      .join("");

    $("#participationSummary").innerHTML = TREK_DATA.participationSummary
      .map(
        (s) => `
      <div class="mini-stat">
        <span class="mini-dot ${s.color}"></span>
        <div><strong>${typeof s.value === "number" ? s.value.toLocaleString("en-IN") : s.value}</strong><small>${s.label}</small></div>
      </div>`
      )
      .join("");
  }

  /* ---------- safety (dashboard) ---------- */
  function renderSafety() {
    const s = TREK_DATA.safety;
    const c = 2 * Math.PI * 50;
    const gauge = $("#safetyGauge");
    gauge.style.setProperty("--dash", c);
    gauge.style.setProperty("--offset", c * (1 - s.score / 100));
    $("strong", gauge).textContent = s.score;

    $("#safetyMetrics").innerHTML = s.metrics
      .map(
        (m) => `
      <div class="safety-metric">
        <span class="sm-ico tone-${m.tone}">${svgIcon(m.icon, 16)}</span>
        <div><strong>${m.value}</strong><small>${m.label}</small></div>
      </div>`
      )
      .join("");

    $("#safetyAlerts").innerHTML = s.alerts
      .map(
        (a) => `
      <div class="alert alert-${a.level}">
        <span>${svgIcon(a.level === "low" ? "info" : "alert", 15)}</span>
        <p>${a.text}</p>
      </div>`
      )
      .join("");
  }

  /* ---------- AI insights ---------- */
  let insightOffset = 0;

  function renderInsights() {
    const pool = TREK_DATA.aiInsights.concat(TREK_DATA.insightPool);
    const picks = [0, 1, 2].map((i) => pool[(insightOffset + i) % pool.length]);

    $("#insightGrid").innerHTML = picks
      .map(
        (p) => `
      <article class="insight">
        <div class="insight-head">
          <span class="insight-ico">${svgIcon(p.icon, 18)}</span>
          <span class="chip chip-soft">${p.tag}</span>
          <span class="conf">${p.confidence}% conf.</span>
        </div>
        <h4>${p.title}</h4>
        <p>${p.body}</p>
        <div class="conf-bar"><span style="width:${p.confidence}%"></span></div>
        <div class="insight-actions">
          <button class="btn btn-ghost btn-sm" type="button" data-act="dismiss">Dismiss</button>
          <button class="btn btn-outline btn-sm" type="button" data-act="apply">Apply suggestion</button>
        </div>
      </article>`
      )
      .join("");

    $$("#insightGrid [data-act]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toast(btn.dataset.act === "apply" ? "Demo mode — no changes were saved." : "Insight dismissed (demo only).");
      });
    });
  }

  /* ---------- shared: run an animated step sequence ---------- */
  function runSequence(opts) {
    const steps = opts.steps;
    const list = opts.list;
    const bar = opts.bar;
    const status = opts.status;
    const stepMs = opts.stepMs || 500;

    list.innerHTML = steps
      .map((s, i) => `<li class="step" data-i="${i}"><span class="step-dot">${i + 1}</span><span class="step-text">${s}</span></li>`)
      .join("");
    bar.style.transition = "none";
    bar.style.width = "0%";
    status.textContent = steps[0];

    let i = 0;
    const tick = () => {
      const items = $$(".step", list);
      if (i > 0) {
        items[i - 1].classList.remove("active");
        items[i - 1].classList.add("done");
        items[i - 1].querySelector(".step-dot").innerHTML = "✓";
      }
      if (i < items.length) {
        items[i].classList.add("active");
        status.textContent = steps[i];
        bar.style.transition = "width .45s ease";
        bar.style.width = Math.round(((i + 1) / items.length) * 100) + "%";
        i++;
        setTimeout(tick, stepMs);
      } else if (opts.onDone) {
        opts.onDone();
      }
    };
    tick();
  }

  /* ---------- bindings ---------- */
  function bindNav() {
    $$(".nav-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        if (page === "settings") {
          toast("Settings — planned for a later module.");
          return;
        }
        switchPage(page);
        if (item.dataset.scroll) {
          setTimeout(() => {
            const target = document.getElementById(item.dataset.scroll);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 120);
        }
      });
    });

    document.addEventListener("click", (e) => {
      const goto = e.target.closest("[data-goto]");
      if (goto) {
        e.preventDefault();
        switchPage(goto.dataset.goto);
      }
      const t = e.target.closest("[data-toast]");
      if (t) toast(t.dataset.toast);
      const jump = e.target.closest("[data-trek-jump]");
      if (jump && window.TrekExplore) {
        const trek = TREKS.find((x) => x.thumb === jump.dataset.trekJump);
        if (trek) window.TrekExplore.openTrek(trek.id);
      }
    });
  }

  function bindUI() {
    $("#menuBtn").addEventListener("click", openSidebar);
    $("#sidebarClose").addEventListener("click", closeSidebar);
    $("#overlay").addEventListener("click", closeSidebar);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) closeSidebar();
    });

    $$("#rangeSwitch .seg").forEach((seg) => {
      seg.addEventListener("click", () => {
        $$("#rangeSwitch .seg").forEach((s) => s.classList.remove("active"));
        seg.classList.add("active");
        toast("Range set to " + seg.textContent + " (sample data).");
      });
    });

    $("#refreshInsights").addEventListener("click", () => {
      insightOffset = (insightOffset + 3) % (TREK_DATA.aiInsights.length + TREK_DATA.insightPool.length);
      renderInsights();
      toast("New insights generated locally.");
    });

    $("#copilotBtn").addEventListener("click", () => toast("TrekAI Copilot is a simulated feature (demo)."));
    $("#newTrekBtn").addEventListener("click", () => switchPage("manage"));
    $("#notifBtn").addEventListener("click", () => toast("3 unread: 2 safety alerts · 1 gear update"));

    const gs = $("#globalSearch");
    gs.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && gs.value.trim()) {
        switchPage("explore");
        const box = $("#trekSearch");
        box.value = gs.value.trim();
        box.dispatchEvent(new Event("input"));
        gs.value = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeSidebar();
        if (window.TrekExplore) window.TrekExplore.closeModal();
      }
    });
  }

  /* ---------- init ---------- */
  function init() {
    renderStats();
    renderTreks();
    renderActivity();
    renderParticipation();
    renderSafety();
    renderInsights();
    hydrateIcons();
    bindNav();
    bindUI();

    const hash = (location.hash || "").replace("#", "");
    switchPage(PAGE_TITLES[hash] ? hash : "dashboard", { keepScroll: true });
  }

  /* shared API for other modules */
  window.TrekUI = { $, $$, toast, hydrateIcons, switchPage, runSequence, svgIcon: svgIcon };

  document.addEventListener("DOMContentLoaded", init);
})();
