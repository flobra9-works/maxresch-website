# Website Maximilian Resch — Musik · Rhythmus · Bewegung

Statische Website (HTML/CSS/JavaScript, kein Framework, kein Build-Schritt).
Zum Ansehen genügt ein Doppelklick auf `index.html` — oder ein beliebiger Webspace/Gratis-Hoster.
Live: https://flobra9-works.github.io/maxresch-website/

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Vorstellung, sechs Angebots-Cards, Zitat, Stimmen, CTA |
| `ueber-mich.html` | Biografie, Philosophie, Stationen |
| `angebote.html` | TaKeTiNa, Bodypercussion, Rhythmik, Gitarrenunterricht, Seminare/Teamevents |
| `veranstaltungen.html` | Interaktiver Kalender + Terminliste |
| `buchung.html` | Anfrage-Formular (Online-Buchung auf Kundenwunsch entfernt) |
| `impressum.html` | Impressum, Datenschutz, Bildnachweise |

## Inhalte pflegen

- **Termine:** in `js/events.js` — einfaches Listenformat, oben in der Datei erklärt.
  Kalender und Terminliste aktualisieren sich automatisch.
- **Texte:** direkt in den HTML-Dateien. Alle Stellen, die noch echte Daten brauchen,
  sind mit „Platzhalter“ markiert (Suche nach `Platzhalter`).
- **Bilder:** liegen in `img/`. Beim Austausch einfach gleiche Dateinamen verwenden.

## Offene Punkte (Stand: Feedback-Runde August 2026)

1. **E-Mail-Postfach `info@maxresch.eu` einrichten** — die Adresse steht bereits überall
   auf der Seite (Footer, Impressum, `js/main.js` → `CONTACT_EMAIL`). Solange das Postfach
   nicht existiert, laufen Anfragen ins Leere.
2. **Instagram-Link** — im Footer aller Seiten steht ein Platzhalter
   (`https://www.instagram.com/`). Echten Profil-Link eintragen.
3. **Kennzahl im Hero** — „? Menschen begleitet“ (`index.html`): Zahl von Maximilian ergänzen.
4. **Karte „Konzerte & Live-Musik“** (`index.html`) — Text ist ein Vorschlag und noch
   nicht freigegeben. Verlinkt auf den Veranstaltungskalender.
5. **Echte Stimmen** statt der Platzhalter-Testimonials auf der Startseite
   (Sternchen-Bewertungen wurden auf Kundenwunsch entfernt).
6. **Termine** — `js/events.js` enthält noch Beispieldaten; solange der Hinweis darauf
   in `veranstaltungen.html` stehen bleibt (kurz unter der Einleitung), ist das transparent.
7. **Preise** — noch offen, ob es eine Preisliste gibt oder Preise über die Flyer im
   Veranstaltungskalender laufen (Vorbild: https://taketina.com/workshops). Fix ist bisher
   nur „Schnupperstunde zum halben Preis“ beim Gitarrenunterricht.
   Storno-/Teilnahmebedingungen sollen im Buchungsprozess auftauchen.
8. **Impressum** ausfüllen (Adresse, Telefon, ggf. UID) — gesetzlich verpflichtend in AT.
9. **Echte Fotos** statt der Unsplash-Platzhalter.
10. **Formular-Versand ohne E-Mail-Programm** (optional, empfohlen):
    Gratis-Account auf https://formspree.io, Endpoint-URL in `js/main.js` bei
    `FORMSPREE_ENDPOINT` eintragen. Ohne Formspree öffnet das Formular das
    E-Mail-Programm der Besucher:in (funktioniert auch).

## Technik-Notizen

- Schriften (Fraunces, Inter) sind **lokal eingebunden** (`fonts/`) — DSGVO-freundlich,
  keine Verbindung zu Google beim Seitenaufruf.
- Keine Cookies, kein Tracking.
- Fotos: Unsplash-Lizenz (kommerzielle Nutzung erlaubt), Nachweise in `impressum.html`.
- Scroll-Animationen deaktivieren sich automatisch bei `prefers-reduced-motion`
  und haben einen Fallback, falls JavaScript nicht verfügbar ist.
- Die Angebots-Cards nutzen `.card-grid--3` (3 × 2 statt 4 + 2) — siehe `css/style.css`.
- `mountCalEmbed()` in `js/main.js` ist weiterhin vorbereitet, aber **nicht aktiv**:
  Die Online-Buchung wurde auf Kundenwunsch entfernt. Zum Reaktivieren einen Container
  `<div id="cal-embed">` in `buchung.html` einfügen und die Funktion aufrufen.
