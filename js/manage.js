/* TrekAI - Trek Management: batches, rosters, check-in */

(function () {
  "use strict";

  const { $, $$, toast, hydrateIcons, svgIcon } = window.TrekUI;

  const STATUS_CLASS = { Open: "chip-success", "Almost Full": "chip-warning", Full: "chip-danger" };
  const TSTATUS_CLASS = { Confirmed: "chip-success", Waitlist: "chip-soft", "Pending medical": "chip-warning" };

  let activeId = BATCHES[0].id;
  let rosters = {};

  function cloneRosters() {
    BATCHES.forEach((b) => {
      rosters[b.id] = b.participants.map((p) => Object.assign({}, p));
    });
  }

  function activeBatch() {
    return BATCHES.find((b) => b.id === activeId);
  }

  function renderStats() {
    const enrolled = BATCHES.reduce((n, b) => n + b.joined, 0);
    const checked = BATCHES.reduce((n, b) => n + rosters[b.id].filter((p) => p.checked).length, 0);
    const guides = new Set(BATCHES.map((b) => b.guide)).size;

    const cards = [
      { label: "Upcoming Batches", value: BATCHES.length, note: "next 60 days", icon: "calendar", tone: "up" },
      { label: "Trekkers Enrolled", value: enrolled, note: "across all batches", icon: "users", tone: "up" },
      { label: "Checked In", value: checked, note: "sample rosters", icon: "check", tone: "flat" },
      { label: "Guides Assigned", value: guides, note: "certified leads", icon: "shield", tone: "up" }
    ];

    $("#manageStats").innerHTML = cards
      .map(
        (c) => `
      <article class="stat-card">
        <div class="stat-top">
          <span class="stat-ico tone-${c.tone}">${svgIcon(c.icon, 20)}</span>
        </div>
        <p class="stat-value">${c.value}</p>
        <p class="stat-label">${c.label}</p>
        <p class="stat-note">${c.note}</p>
      </article>`
      )
      .join("");
  }

  function renderTable() {
    $("#batchTable tbody").innerHTML = BATCHES.map((b) => {
      const pct = Math.round((b.joined / b.max) * 100);
      return `
      <tr class="${b.id === activeId ? "row-active" : ""}" data-batch="${b.id}" tabindex="0">
        <td>
          <div class="cell-trek">
            <span class="trek-thumb sm thumb-${b.img}">${svgIcon("mountain", 15)}</span>
            <div><strong>${b.trek}</strong><small>${b.id}</small></div>
          </div>
        </td>
        <td>${b.date}</td>
        <td>${b.guide}</td>
        <td>
          <div class="cell-cap">
            <span>${b.joined} / ${b.max}</span>
            <div class="progress tiny"><span style="width:${pct}%"></span></div>
          </div>
        </td>
        <td><span class="chip chip-soft">${b.difficulty}</span></td>
        <td><span class="chip ${STATUS_CLASS[b.status]}">${b.status}</span></td>
      </tr>`;
    }).join("");

    $$("#batchTable tbody tr").forEach((r) => {
      r.addEventListener("click", () => selectBatch(r.dataset.batch));
      r.addEventListener("keydown", (e) => { if (e.key === "Enter") selectBatch(r.dataset.batch); });
    });

    $("#manageSummary").textContent = BATCHES.length + " upcoming batches";
  }

  function selectBatch(id) {
    activeId = id;
    renderTable();
    renderRoster();
  }

  function renderRoster() {
    const b = activeBatch();
    const list = rosters[b.id];
    const checked = list.filter((p) => p.checked).length;

    $("#rosterTitle").textContent = b.trek;
    $("#rosterSub").innerHTML = `${b.date} · guide ${b.guide} · sample roster (first ${list.length} of ${b.joined} enrolled)`;
    $("#checkinCount").textContent = checked + " / " + list.length + " checked in";
    $("#checkInAll").disabled = checked === list.length;

    $("#participantList").innerHTML = list
      .map(
        (p, i) => `
      <li class="participant ${p.checked ? "is-checked" : ""}">
        <span class="p-avatar">${p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
        <div class="p-info">
          <strong>${p.name}</strong>
          <small>${svgIcon("firstaid", 12)} Emergency: ${p.contact}</small>
        </div>
        <span class="chip ${TSTATUS_CLASS[p.trekStatus]}">${p.trekStatus}</span>
        <span class="p-state">${p.checked ? '<i class="dot ok"></i> Checked in' : '<i class="dot"></i> Not arrived'}</span>
        <button class="btn ${p.checked ? "btn-ghost" : "btn-outline"} btn-sm p-btn" type="button" data-i="${i}">
          ${p.checked ? "Undo" : "Check In"}
        </button>
      </li>`
      )
      .join("");

    $$("#participantList .p-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = list[Number(btn.dataset.i)];
        p.checked = !p.checked;
        toast(p.name + (p.checked ? " checked in." : " check-in reversed."));
        renderRoster();
        renderStats();
      });
    });
  }

  function checkInAll() {
    const list = rosters[activeId];
    list.forEach((p) => (p.checked = true));
    toast("All " + list.length + " rostered trekkers checked in.");
    renderRoster();
    renderStats();
  }

  function init() {
    cloneRosters();
    renderStats();
    renderTable();
    renderRoster();
    $("#checkInAll").addEventListener("click", checkInAll);
    hydrateIcons($("#page-manage"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
