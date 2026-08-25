/* ============================================================
   Veranstaltungen — Termine kommen aus einem Google Sheet
   ------------------------------------------------------------
   Max pflegt seine Termine in einer normalen Google-Tabelle.
   Diese Datei holt sie bei jedem Seitenaufruf automatisch ab.
   Kalender und Terminliste (js/main.js) bauen sich daraus selbst auf.

   TERMINE PFLEGEN: einfach im Sheet eine Zeile hinzufügen/ändern/löschen.
   Spalten (erste Zeile = Überschriften, Reihenfolge egal, Groß-/
   Kleinschreibung egal):
     Datum        JJJJ-MM-TT, z.B. 2026-09-05
     Uhrzeit      Freitext, z.B. "18:00" oder "10:00–17:00"
     Titel        Name der Veranstaltung
     Ort          Adresse oder Ortsangabe
     Beschreibung Kurzbeschreibung
     Badge        optional, z.B. "Workshop", "Neu", "Wenige Plätze" — kann leer sein

   WICHTIG, DAMIT ES WEITER FUNKTIONIERT:
   - Die Freigabe des Sheets muss auf "Jeder mit dem Link: Betrachter"
     stehen (Freigeben-Button oben rechts im Sheet). Wird das geändert,
     bekommt die Website keine Termine mehr und zeigt "Derzeit sind
     keine Termine online" an.
   - Ein neues Sheet anlegen (z.B. wenn Max ein eigenes bekommt)?
     Einfach die Google-Sheet-ID unten bei SHEET_ID eintauschen — das
     ist der lange Code aus der Adresszeile zwischen "/d/" und "/edit".
   ============================================================ */

const SHEET_ID = "1ngZ28_YahHgDDIbXYvo4thkWkp8Xpubf7poe1hRDIIc";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

/* Kleiner CSV-Parser: kommt mit Kommas und Anführungszeichen INNERHALB
   von Zellen klar (z.B. "Musikschule Farbenschein, Wien"), wie sie
   Google Sheets beim CSV-Export korrekt erzeugt. */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      rows.push(row); row = [];
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function rowsToEvents(rows) {
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = {
    date: header.indexOf("datum"),
    time: header.indexOf("uhrzeit"),
    title: header.indexOf("titel"),
    place: header.indexOf("ort"),
    desc: header.indexOf("beschreibung"),
    badge: header.indexOf("badge")
  };

  return rows
    .slice(1)
    .filter((r) => (r[idx.date] || "").trim())
    .map((r) => ({
      date: (r[idx.date] || "").trim(),
      time: (r[idx.time] || "").trim(),
      title: (r[idx.title] || "").trim(),
      place: (r[idx.place] || "").trim(),
      desc: (r[idx.desc] || "").trim(),
      badge: idx.badge > -1 ? (r[idx.badge] || "").trim() : ""
    }));
}

/* Holt die Termine aus dem Sheet. Gibt bei Netzwerkfehlern oder falscher
   Freigabe eine leere Liste zurück, statt die Seite kaputtzumachen —
   Kalender/Terminliste zeigen dann einfach "keine Termine online" an. */
function loadEvents() {
  return fetch(SHEET_CSV_URL)
    .then((res) => {
      if (!res.ok) throw new Error("Sheet nicht erreichbar: " + res.status);
      return res.text();
    })
    .then((text) => rowsToEvents(parseCSV(text)))
    .catch((err) => {
      console.warn("Termine konnten nicht geladen werden:", err);
      return [];
    });
}
