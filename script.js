"use strict";

// ============================================================
// 1) KONFIGURATION
// ============================================================
// Google Sheets: Die ID steht in der URL des Sheets:
// https://docs.google.com/spreadsheets/d/<DIESE_ID_HIER>/edit
const SHEET_ID = "1n85p31XI20IxhgmjMfb41r1_DwiEJtwXV8PjZ-g6rqc";
// Name des Tabellenblatts (steht unten an den Tabs, Standard: "Tabellenblatt1")
const SHEET_NAME = "Tabellenblatt1";

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr"];
const DAY_FULL = { Mo: "Montag", Di: "Dienstag", Mi: "Mittwoch", Do: "Donnerstag", Fr: "Freitag" };
const DAY_COLORS = { Mo: "#e11d48", Di: "#d97706", Mi: "#059669", Do: "#2563eb", Fr: "#7c3aed" };

const DAY_START = 8 * 60;
const DAY_END = 19.5 * 60;
const PX_PER_MIN = 1.1;

// Spaltenzuordnung über die KOPFZEILE des Sheets (1. Zeile).
// Neue Spalten im Sheet ergänzen? Hier einen Eintrag hinzufügen –
// die Reihenfolge der Spalten im Sheet ist dabei egal.
const COLUMN_MAP = {
  studiengang:  "Studiengang",
  bereich:      "Bereich",
  modul:        "Modul",
  kuerzel:      "Modulkürzel",
  teilmodul:    "Teilmodul",
  vkuerzel:     "Veranstaltungskürzel",
  sws:          "SWS",
  tag:          "Tag / Termin",
  zeit:         "Zeit",
  name:         "Lehrveranstaltung",
  raum:         "Raum / Ort",
  dozent:       "Dozent:in",
  semester:     "Semester",
  hinweis:      "Hinweis",
  beschreibung: "Beschreibung",
};

// ECTS pro Modul – aus den Daten NICHT automatisch ableitbar!
// Die Tabelle enthält nur SWS (Präsenzstunden), keine ECTS (Workload).
// Schlüssel = Modulkürzel bzw. Veranstaltungskürzel.
const MODULE_ECTS = {
  "VIK": 5,
  // "GBK": 5,
};

// ============================================================
// 2) DATEN LADEN & PARSEN
// ============================================================
async function loadCourses() {
  const url = "https://docs.google.com/spreadsheets/d/" + SHEET_ID +
    "/gviz/tq?tqx=out:csv&sheet=" + encodeURIComponent(SHEET_NAME);
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP-Fehler " + res.status);
  return parseCsv(await res.text());
}

// CSV-Parser: beachtet Anführungszeichen (Kommas innerhalb von Zellen)
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } // "" -> escaped Anführungszeichen
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (ch !== "\r") field += ch;
  }
  row.push(field);
  if (row.length > 1 || field !== "") rows.push(row);
  return rows;
}

function parseCourses(rows) {
  if (!rows.length) throw new Error("Sheet ist leer");
  const header = rows[0].map(h => h.trim());
  const idx = {};
  for (const [key, colName] of Object.entries(COLUMN_MAP)) {
    idx[key] = header.indexOf(colName);
    if (idx[key] === -1) throw new Error('Spalte "' + colName + '" fehlt im Sheet (Kopfzeile prüfen)');
  }
  return rows.slice(1).map((c, i) => {
    const get = k => (c[idx[k]] || "").trim();
    const tag = get("tag");
    const zeit = get("zeit");
    const day = DAYS.find(d => tag.toLowerCase().startsWith(d.toLowerCase())) || null;
    const t = day ? parseTime(zeit) : null;
    // Stabiler Schlüssel für die Speicherung der Auswahl:
    // Kürzel + Tag + Zeit + Raum (bleibt über Semester hinweg sinnvoll)
    const key = [get("vkuerzel") || get("kuerzel") || get("name"), tag, zeit, get("raum")].join("|");
    return {
      id: i, key: key,
      studiengang: get("studiengang"), bereich: get("bereich"),
      modul: get("modul"), kuerzel: get("kuerzel"), teilmodul: get("teilmodul"),
      vkuerzel: get("vkuerzel"), sws: get("sws"), tag: tag, zeit: zeit,
      name: get("name"), raum: get("raum"), dozent: get("dozent"),
      semester: get("semester"), hinweis: get("hinweis"),
      beschreibung: get("beschreibung"),
      day: day, start: t ? t[0] : null, end: t ? t[1] : null,
    };
  });
}

function parseTime(s) {
  const m = s.match(/(\d{1,2}):.(?::\d{2})?\s*[–—-]+\s*(\d{1,2}):.(?::\d{2})?/);
  if (!m) return null;
  return [parseInt(m[1], 10) * 60 + parseInt(m[2], 10),
          parseInt(m[3], 10) * 60 + parseInt(m[4], 10)];
}

let COURSES = [];

// ============================================================
// 3) STATE (Auswahl wird über den stabilen Kurs-Schlüssel gespeichert)
// ============================================================
let selection = [];

function saveSelection() {
  try { localStorage.setItem("stundenplan-selection", JSON.stringify(selection)); } catch (e) {}
}

function restoreSelection() {
  try { selection = JSON.parse(localStorage.getItem("stundenplan-selection") || "[]"); }
  catch (e) { selection = []; }
  const valid = new Set(COURSES.map(c => c.key));
  selection = selection.filter(k => valid.has(k));
}

function toggle(key) {
  const i = selection.indexOf(key);
  if (i === -1) selection.push(key); else selection.splice(i, 1);
  saveSelection();
  render();
}

// ============================================================
// 4) RENDERING
// ============================================================
const fmt = m => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const selectedCourses = () => COURSES.filter(c => selection.includes(c.key));

function fillSelect(el, values, labelFn) {
  el.innerHTML = values.map(v => `<option value="${esc(v)}">${esc(labelFn(v))}</option>`).join("");
}

function initControls() {
  const bereiche = [...new Set(COURSES.map(c => c.bereich).filter(Boolean))].sort();
  const stgs = [...new Set(COURSES.map(c => c.studiengang).filter(Boolean))].sort();
  fillSelect(document.getElementById("selBereich"), ["ALLE", ...bereiche],
    v => v === "ALLE" ? "Bereich: Alle" : v);
  fillSelect(document.getElementById("selStudiengang"), ["ALLE", ...stgs],
    v => v === "ALLE" ? "Studiengang: Alle" : v);
  document.getElementById("search").addEventListener("input", render);
  document.getElementById("selBereich").addEventListener("change", render);
  document.getElementById("selStudiengang").addEventListener("change", render);
  document.getElementById("clearBtn").addEventListener("click", () => { selection = []; saveSelection(); render(); });
}

function filteredCourses() {
  const q = document.getElementById("search").value.trim().toLowerCase();
  const bereich = document.getElementById("selBereich").value;
  const stg = document.getElementById("selStudiengang").value;
  return COURSES.filter(c => {
    if (bereich !== "ALLE" && c.bereich !== bereich) return false;
    if (stg !== "ALLE" && c.studiengang !== stg) return false;
    if (!q) return true;
    return [c.name, c.modul, c.teilmodul, c.kuerzel, c.vkuerzel, c.dozent, c.raum, c.beschreibung]
      .join(" ").toLowerCase().includes(q);
  });
}

function renderList() {
  const list = filteredCourses();
  document.getElementById("resultCount").textContent =
    list.length + " Treffer · Auswahl bleibt im Browser gespeichert";
  const box = document.getElementById("courseList");
  if (!list.length) { box.innerHTML = '<p class="empty">Keine Treffer</p>'; return; }
  box.innerHTML = list.map(c => {
    const sel = selection.includes(c.key);
    const meta = [c.kuerzel || c.vkuerzel, c.day ? c.tag + " " + c.zeit : (c.tag || "Termin siehe Hinweis"), c.dozent]
      .filter(Boolean).join(" · ");
    const sub = [c.bereich, c.semester ? "Semester " + c.semester : "", c.hinweis]
      .filter(Boolean).join(" · ");
    return `<button class="course-item${sel ? " selected" : ""}" data-key="${esc(c.key)}">
      <span class="checkbox">${sel ? "✓" : ""}</span>
      <span>
        <span class="ci-name">${esc(c.name || c.modul)}</span><br/>
        <span class="ci-meta">${esc(meta)}</span><br/>
        <span class="ci-sub">${esc(sub)}</span>
        ${c.beschreibung ? `<span class="ci-sub">${esc(c.beschreibung)}</span>` : ""}
      </span>
    </button>`;
  }).join("");
  box.querySelectorAll(".course-item").forEach(btn =>
    btn.addEventListener("click", () => toggle(btn.dataset.key)));
}

function renderGrid() {
  const sel = selectedCourses();
  const height = (DAY_END - DAY_START) * PX_PER_MIN;

  let head = '<div class="grid-head"><div class="time-col"></div>' +
    DAYS.map(d => `<div class="day" style="color:${DAY_COLORS[d]}">${DAY_FULL[d]}</div>`).join("") + "</div>";

  let hours = "";
  for (let m = DAY_START; m <= DAY_END; m += 60)
    hours += `<div class="hour-label" style="top:${(m - DAY_START) * PX_PER_MIN}px">${fmt(m)}</div>`;

  let dayCols = "";
  for (const d of DAYS) {
    const list = sel.filter(c => c.day === d && c.start !== null && c.end !== null)
      .sort((a, b) => a.start - b.start || a.end - b.end);
    const placed = [];
    for (const c of list) {
      let lane = 0;
      while (placed.some(p => p.lane === lane && p.c.end > c.start && p.c.start < c.end)) lane++;
      placed.push({ c, lane });
    }
    const lanes = placed.length ? Math.max(...placed.map(p => p.lane)) + 1 : 1;
    let blocks = "";
    for (const { c, lane } of placed) {
      const top = (c.start - DAY_START) * PX_PER_MIN + 1;
      const h = Math.max((c.end - c.start) * PX_PER_MIN - 3, 22);
      blocks += `<div class="block" style="top:${top}px;height:${h}px;left:${(lane / lanes) * 100}%;width:${(1 / lanes) * 100 - 0.6}%">
        <div class="block-inner" style="background:${DAY_COLORS[d]}" title="${esc(c.name)} – ${esc(c.dozent)} – ${esc(c.raum)}${c.beschreibung ? "\n\n" + esc(c.beschreibung) : ""}\nKlick entfernt das Fach." data-key="${esc(c.key)}">
          <div class="b-name">${esc(c.name)}</div>
          <div class="b-meta"><b>${fmt(c.start)}–${fmt(c.end)}</b>${c.dozent ? "<br/>" + esc(c.dozent) : ""}${c.raum ? "<br/>" + esc(c.raum) : ""}</div>
        </div>
      </div>`;
    }
    let lines = "";
    for (let m = DAY_START; m <= DAY_END; m += 30)
      lines += `<div class="hour-line${m % 60 !== 0 ? " half" : ""}" style="top:${(m - DAY_START) * PX_PER_MIN}px"></div>`;
    dayCols += `<div class="day-col">${lines}${blocks}</div>`;
  }

  document.getElementById("grid").innerHTML =
    head + `<div class="grid-body" style="height:${height}px"><div class="time-col">${hours}</div>${dayCols}</div>`;
  document.querySelectorAll(".block-inner").forEach(el =>
    el.addEventListener("click", () => toggle(el.dataset.key)));
}

function renderSpecial() {
  const special = selectedCourses().filter(c => !c.day || c.start === null || c.end === null);
  const box = document.getElementById("specialBox");
  const tags = document.getElementById("specialTags");
  box.hidden = special.length === 0;
  tags.innerHTML = special.map(c => {
    const meta = [c.tag || c.zeit, c.raum, c.dozent].filter(Boolean).join(" · ");
    return `<button class="special-tag" data-key="${esc(c.key)}" title="Klick entfernt das Fach">
      <b>${esc(c.name)}</b><br/>${esc(meta)}</button>`;
  }).join("");
  tags.querySelectorAll(".special-tag").forEach(el =>
    el.addEventListener("click", () => toggle(el.dataset.key)));
}

function renderStats() {
  const sel = selectedCourses();
  const sws = sel.reduce((s, c) => s + (parseFloat(c.sws) || 0), 0);
  const counted = new Set();
  let ects = 0;
  let missing = new Set();
  for (const c of sel) {
    const key = c.kuerzel || c.vkuerzel || c.name;
    if (counted.has(key)) continue;
    counted.add(key);
    if (MODULE_ECTS[key] !== undefined) ects += MODULE_ECTS[key];
    else missing.add(key);
  }
  document.getElementById("countPill").textContent = sel.length + " Veranstaltungen";
  document.getElementById("swsPill").textContent = sws + " SWS";
  const ectsEl = document.getElementById("ectsPill");
  ectsEl.textContent = ects + " ECTS";
  if (missing.size > 0) ectsEl.textContent += " (" + missing.size + " Module ohne Angabe)";
  document.getElementById("clearBtn").hidden = sel.length === 0;
  document.getElementById("placeholder").style.display = sel.length === 0 ? "block" : "none";
}

function render() {
  renderList();
  renderGrid();
  renderSpecial();
  renderStats();
}

// ============================================================
// 5) START
// ============================================================
async function init() {
  try {
    COURSES = parseCourses(await loadCourses());
  } catch (e) {
    document.getElementById("resultCount").textContent =
      "Fehler beim Laden der Daten: " + e.message +
      " — SHEET_ID/SHEET_NAME prüfen. Hinweis: Die Seite muss über einen Server laufen (z. B. Live Server), nicht per Doppelklick.";
    return;
  }
  restoreSelection();
  initControls();
  render();
}

init();
