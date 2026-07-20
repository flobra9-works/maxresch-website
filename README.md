# Website Max Resch — Musik · Rhythmus · Bewegung

Statische Website (HTML/CSS/JavaScript, kein Framework, kein Build-Schritt).
Zum Ansehen genügt ein Doppelklick auf `index.html` — oder ein beliebiger Webspace/Gratis-Hoster.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Vorstellung, Angebots-Cards, Zitat, Testimonials, CTA |
| `ueber-mich.html` | Biografie, Philosophie, Stationen |
| `angebote.html` | TaKeTiNa, Rhythmik/Bodypercussion, Gitarrenunterricht, Seminare/Teamevents |
| `veranstaltungen.html` | Interaktiver Kalender + Terminliste |
| `buchung.html` | Online-Buchung (Cal.com, vorbereitet) + Anfrage-Formular |
| `impressum.html` | Impressum, Datenschutz, Bildnachweise |

## Inhalte pflegen

- **Termine:** in `js/events.js` — einfaches Listenformat, oben in der Datei erklärt.
  Kalender und Terminliste aktualisieren sich automatisch.
- **Texte:** direkt in den HTML-Dateien. Alle Stellen, die noch echte Daten brauchen,
  sind mit „Platzhalter“ markiert (Suche nach `Platzhalter`).
- **Bilder:** liegen in `img/`. Beim Austausch einfach gleiche Dateinamen verwenden.

## TODO für den Livegang (Kunde / Max)

1. **Texte prüfen/ersetzen** — Bio, Stationen, Testimonials, Zahlen im Hero (15+/8/100+)
   sind Platzhalter (im Code mit „PLATZHALTER“ kommentiert).
2. **Kontakt-E-Mail** — `kontakt@maxresch.at` ist ein Platzhalter. Echte Adresse ändern in:
   `js/main.js` (Variable `CONTACT_EMAIL`) und in den Footern aller HTML-Seiten.
3. **Cal.com aktivieren** (Online-Buchung):
   - Gratis-Account auf https://cal.com anlegen, Event-Typ erstellen (z.B. „workshop“)
   - In `buchung.html` ganz unten eintragen: `const CAL_LINK = "benutzername/workshop";`
   - Der Buchungskalender erscheint dann automatisch. (Besucher:innen brauchen KEIN Konto.)
4. **Formular-Versand ohne E-Mail-Programm** (optional, empfohlen):
   - Gratis-Account auf https://formspree.io, Formular anlegen
   - Endpoint-URL in `js/main.js` bei `FORMSPREE_ENDPOINT` eintragen
   - Ohne Formspree öffnet das Formular das E-Mail-Programm der Besucher:in (funktioniert auch).
5. **Impressum** ausfüllen (Adresse, Telefon, ggf. UID) — gesetzlich verpflichtend in AT.
6. **Echte Fotos & Termine** einpflegen, Beispieltermine in `js/events.js` ersetzen.
7. **Veröffentlichen** — z.B. gratis via Netlify (Ordner per Drag & Drop auf
   https://app.netlify.com/drop ziehen) oder GitHub Pages. Eigene Domain (z.B. maxresch.at)
   kann dort verbunden werden.

## Technik-Notizen

- Schriften (Fraunces, Inter) sind **lokal eingebunden** (`fonts/`) — DSGVO-freundlich,
  keine Verbindung zu Google beim Seitenaufruf.
- Keine Cookies, kein Tracking.
- Fotos: Unsplash-Lizenz (kommerzielle Nutzung erlaubt), Nachweise in `impressum.html`.
- Scroll-Animationen deaktivieren sich automatisch bei `prefers-reduced-motion`
  und haben einen Fallback, falls JavaScript nicht verfügbar ist.
