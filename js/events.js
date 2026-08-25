/* ============================================================
   Veranstaltungen — HIER TERMINE PFLEGEN
   ------------------------------------------------------------
   Einfach Einträge hinzufügen, ändern oder löschen.
   Format:
     date:  "JJJJ-MM-TT"
     time:  Uhrzeit als Text
     title: Name der Veranstaltung
     place: Ort
     desc:  Kurzbeschreibung
     badge: optionales Label, z.B. "Wenige Plätze" oder "Neu"
   ACHTUNG: Alle Termine unten sind PLATZHALTER / Beispiele!
   ============================================================ */

const EVENTS = [
  {
    date: "2026-08-08",
    time: "10:00–17:00",
    title: "TaKeTiNa-Tagesworkshop: Im Rhythmus ankommen",
    place: "Studio Wien-West, 1140 Wien",
    desc: "Ein Tag zum Eintauchen: Schritte, Klatschen und Stimme verweben sich zu einem gemeinsamen rhythmischen Prozess. Keine Vorkenntnisse nötig.",
    badge: "Wenige Plätze"
  },
  {
    date: "2026-08-21",
    time: "18:30–21:00",
    title: "Rhythmik-Abend: Puls & Körper",
    place: "Musikraum Penzing, 1140 Wien",
    desc: "Offener Abend für Erwachsene — Bewegung, Bodypercussion und Groove in entspannter Atmosphäre.",
    badge: ""
  },
  {
    date: "2026-09-05",
    time: "10:00–13:00",
    title: "Gitarren-Matinee: Fingerstyle für Einsteiger:innen",
    place: "Studio Wien-West, 1140 Wien",
    desc: "Kompakter Workshop rund um Zupftechnik, Klang und einfache Arrangements — Gitarre mitbringen!",
    badge: "Neu"
  },
  {
    date: "2026-09-19",
    time: "14:00–18:00",
    title: "TaKeTiNa & Stimme: Rhythmus, der singt",
    place: "Seminarraum Klangraum, 1070 Wien",
    desc: "TaKeTiNa-Prozess mit Fokus auf Stimme und Call-and-Response-Gesängen. Für alle offen.",
    badge: ""
  },
  {
    date: "2026-10-10",
    time: "10:00–17:00",
    title: "Wochenend-Seminar: Rhythmus & Bewegung im Unterricht",
    place: "Musikraum Penzing, 1140 Wien",
    desc: "Fortbildung für Pädagog:innen: rhythmisch-musikalische Übungen für Gruppen, sofort einsetzbar.",
    badge: "Fortbildung"
  },
  {
    date: "2026-10-24",
    time: "19:00",
    title: "Konzertabend: Saiten & Trommeln",
    place: "Kultursaal Penzing, 1140 Wien",
    desc: "Maximilian Resch & Gäste live — ein Abend zwischen Gitarre, Percussion und gemeinsamen Rhythmen zum Mitmachen.",
    badge: ""
  }
];
