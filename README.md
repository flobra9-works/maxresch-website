# Website Maximilian Resch — Musik · Rhythmus · Bewegung

Statische Website (HTML/CSS/JavaScript, kein Framework, kein Build-Schritt).
Zum Ansehen genügt ein Doppelklick auf `index.html` — oder ein beliebiger Webspace/Gratis-Hoster.
Live: https://flobra9-works.github.io/maxresch-website/

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Vorstellung, sechs Angebots-Cards, Zitat, CTA |
| `ueber-mich.html` | Biografie, „Mein Ansatz“, Ausbildung & Wirken (Lebenslauf) |
| `angebote.html` | TaKeTiNa, Bodypercussion, Rhythmik, Gitarrenunterricht, Seminare/Teamevents |
| `veranstaltungen.html` | Interaktiver Kalender + Terminliste |
| `buchung.html` | Anfrage-Formular (im Menü heißt die Seite „Kontakt“) |
| `impressum.html` | Impressum, Datenschutz, Bildnachweise |

## Inhalte pflegen

- **Termine:** kommen live aus einem **Google Sheet** — `js/events.js` liest es bei jedem
  Seitenaufruf per CSV-Export aus (Details und Spaltenformat stehen als Kommentar oben
  in der Datei). Einfach eine Zeile in der Tabelle hinzufügen, ändern oder löschen —
  kein Code, kein erneutes Hochladen nötig. Kalender und Terminliste aktualisieren sich
  automatisch daraus.
- **Texte:** direkt in den HTML-Dateien. Alle Stellen, die noch echte Daten brauchen,
  sind mit „PLATZHALTER“ kommentiert (Suche nach `PLATZHALTER`).
- **Bilder:** liegen in `img/`. Beim Austausch einfach gleiche Dateinamen verwenden.

## Offene Punkte (Stand: 25.08.2026)

1. **E-Mail-Postfach `info@maxresch.eu` einrichten** — die Adresse steht überall auf der
   Seite (Footer, Impressum, `js/main.js` → `CONTACT_EMAIL`). Ohne Postfach laufen
   Anfragen ins Leere. Weiterhin offen.
2. **Instagram-Link** — im Footer aller Seiten steht ein Platzhalter
   (`https://www.instagram.com/`). Echten Profil-Link eintragen. Weiterhin offen.
3. **UID-Nummer prüfen** — im Fragebogen stand „AUT77398914“. Österreichische UIDs
   beginnen mit **ATU**, daher als `ATU77398914` in `impressum.html` eingetragen.
   Von Max bestätigen lassen.
4. **Telefonnummer im Impressum** — Max fragte, ob eine nötig ist. Kurz: nein.
   § 5 ECG verlangt „Angaben, die eine rasche elektronische Kontaktaufnahme
   ermöglichen, einschließlich E-Mail-Adresse“ — eine E-Mail-Adresse genügt.
   Eine Telefonnummer ist freiwillig; wenn gewünscht, in `impressum.html` ergänzen.
5. **Echte Stimmen** — die Testimonial-Sektion auf der Startseite zeigt aktuell wieder
   drei **erfundene** Beispiel-Zitate (mit Hinweis „Platzhalter“ im Lead-Text), damit
   der Abschnitt nicht leer wirkt. Max holt echte Rückmeldungen ein. Sobald die da
   sind: in `index.html` Texte, Namen und Avatar-Buchstaben austauschen und den
   Platzhalter-Satz im Lead-Text entfernen.
6. **Termine-Sheet ist noch ein Beispiel** — das aktuell eingebundene Google Sheet
   („Termine – Maximilian Resch (Beispiel)“) gehört Florian, nicht Max, und die
   Termine sind erfunden (wenn auch realistisch). **Zu klären:** Soll Max eine eigene
   Kopie in seinem Google-Konto anlegen (Datei → Kopie erstellen)? Dann tauschen wir
   die Sheet-ID in `js/events.js` (Konstante `SHEET_ID`) gegen seine aus — eine
   Zeile Code. Wichtig dabei: Die Freigabe muss „Jeder mit dem Link: Betrachter“
   bleiben, sonst zeigt die Website keine Termine mehr an. Solange das Beispiel-Sheet
   aktiv ist, bleibt der Hinweis „Beispiel-Platzhalter“ in `veranstaltungen.html` stehen.
7. **TaKeTiNa-Logo** — Max schickt es; danach auf der Angebote-Seite beim
   TaKeTiNa-Abschnitt einbinden und auf taketina.com verlinken.
8. **Eigene Fotos** — bisher nur Unsplash-Symbolbilder. Max hat bereits Bilder
   fürs TaKeTiNa, der Rest folgt.
9. **Preise** — noch offen, ob feste Preisliste oder Flyer bei den Terminen.
   Fix ist bisher nur „Schnupperstunde zum halben Preis“ beim Gitarrenunterricht.
10. **Echte Online-Buchung** — Max fragte, wie das später aussieht, wenn Dinge direkt
    buchbar sind (Zahlung, Bestätigungsmail). Dafür ist ein eigenes Gespräch geplant;
    `mountCalEmbed()` in `js/main.js` ist als Startpunkt vorbereitet, aber nicht aktiv.
11. **Einschulung** — durch die Google-Sheet-Lösung (siehe Punkt 6) erledigt sich das
    größtenteils von selbst: Max trägt Termine direkt in der Tabelle ein, ganz ohne
    Code. Übrig bleibt höchstens eine kurze Erklärung, wie man in Google Sheets eine
    Zeile hinzufügt/löscht — falls gewünscht.
12. **Formular-Versand ohne E-Mail-Programm** (optional, empfohlen):
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
- Die Stationen auf „Über mich“ nutzen `.cv-groups` / `.cv-item` — Jahresspalte links,
  auf Mobil untereinander.
- Die Seite `buchung.html` heißt in Navigation und Button **„Kontakt“**; der Dateiname
  bleibt `buchung.html`, damit bestehende Links weiter funktionieren.
- Durchgängige **Du-Ansprache** auf der ganzen Website.
- `.floating-contact` (css/style.css) ist ein fix positionierter Kontakt-Button unten
  rechts, der beim Scrollen sichtbar bleibt — unabhängig vom Menüpunkt „Kontakt“.
- Termine kommen live per CSV-Export aus einem Google Sheet (`js/events.js`,
  Konstante `SHEET_ID`). Die Freigabe des Sheets muss auf „Jeder mit dem Link:
  Betrachter“ stehen bleiben. Bei Netzwerkfehlern oder falscher Freigabe fällt die
  Seite sauber auf die „keine Termine online“-Meldung zurück, statt zu brechen.
