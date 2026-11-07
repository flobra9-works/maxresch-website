# Website Maximilian Resch — Musik · Rhythmus · Bewegung

Statische Website (HTML/CSS/JavaScript, kein Framework, kein Build-Schritt).
Zum Ansehen genügt ein Doppelklick auf `index.html` — oder ein beliebiger Webspace/Gratis-Hoster.
Live: **https://maxresch.eu** (Hosting: GitHub Pages, Repo `flobra9-works/maxresch-website`)

## Domain & Hosting (seit 06.11.2026)

- **Hauptdomain `maxresch.eu`** (Strato) zeigt per DNS auf GitHub Pages. Die Datei `CNAME`
  im Repo und die Custom-Domain-Einstellung bei GitHub müssen dazu passen.
- **Strato-DNS** (Domainverwaltung → DNS): `A` = `185.199.108.153`, `AAAA` =
  `2606:50c0:8000::153`, CNAME `www` = `flobra9-works.github.io`. **MX, SPF und DMARC
  gehören zur Mail und dürfen nicht verändert werden.**
- **`maxresch.net` und `maxresch.org`** leiten bei Strato per 301 auf `https://maxresch.eu`
  weiter (GitHub Pages liefert nur eine Domain aus).
- **Alter Stand zum Zurückdrehen:** `A` = `81.169.145.152`, `AAAA` =
  `2a01:238:20a:202:1152::`, `www` = CNAME auf `maxresch.eu`. Das alte WordPress im
  Strato-Paket („WordPress Hosting Starter“) ist unverändert vorhanden, aber nicht mehr
  über die Domain erreichbar. Das Paket nicht kündigen, ohne vorher zu prüfen, ob die
  Mailboxen daran hängen.
- Deployment: `git push` auf `main` genügt, nach 1–2 Minuten ist es live.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Vorstellung, sechs Angebots-Cards, Zitat, CTA |
| `ueber-mich.html` | Biografie, „Mein Ansatz“, Ausbildung & Wirken (Lebenslauf) |
| `angebote.html` | TaKeTiNa, Bodypercussion, Rhythmik, Gitarrenunterricht, Seminare/Teamevents |
| `veranstaltungen.html` | Interaktiver Kalender + Terminliste |
| `kontakt.html` | Kontakt: Anfrage-Formular (früher `buchung.html`, siehe Technik-Notizen) |
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

## Bekannte Einschränkungen (bewusst so belassen, Stand 07.11.2026)

- **`https://www.maxresch.eu` zeigt eine Zertifikatswarnung.** GitHub nimmt `www` nicht ins
  Zertifikat auf, obwohl der DNS-Eintrag stimmt; ein kurzer Reset der Custom Domain brachte
  nichts, auch nach über 14 Stunden nicht. Die `http://`-Variante leitet sauber auf
  `https://maxresch.eu` um. Möglicher Ausweg: Custom Domain bei GitHub entfernen, 10–15
  Minuten warten, neu setzen (die Seite ist dabei kurz nicht erreichbar, Erfolg unsicher).
- **`https://maxresch.net` und `.org` haben keine HTTPS-Verbindung.** Die Strato-
  Weiterleitung hat dort kein Zertifikat, und weitere Zertifikate kosten extra. Mit
  `http://` oder ohne Präfix klappt die 301-Weiterleitung auf `https://maxresch.eu`.
  Kostenlose Alternative, falls gewünscht: je ein kleines GitHub-Pages-Repo mit
  Weiterleitungsseite und DNS-Umstellung dieser Domains.
- **Kontaktformular:** Der Dienst Web3Forms sperrt IP-Adressen kurzzeitig, wenn von
  dort viele Anfragen in kurzer Zeit kommen (beim Testen vorgekommen). Nicht mehrfach
  hintereinander testen. Bei Fehlern zeigt die Seite einen E-Mail-Link als Ausweg.
  Am 07.11.2026 getestet, läuft.

## Erledigt (Stand 07.11.2026)

- **Postfach `info@maxresch.eu`** ist eingerichtet.
- **UID** `ATU77398914` ist von Max bestätigt (im Fragebogen stand „AUT…“, österreichische
  UIDs beginnen mit ATU).
- **Einverständnis** der erkennbaren Personen auf dem Workshop-Foto
  (`max-berimbau-workshop.jpg`) liegt vor.
- **Termine-Sheet:** Die Website liest weiter Florians Sheet („Termine – Maximilian
  Resch“, ID in `js/events.js` bei `SHEET_ID`); Max trägt dort als Mit-Autor ein. Das
  bleibt vorerst so. Die Freigabe muss „Jeder mit dem Link: Betrachter“ bleiben, sonst
  zeigt die Website keine Termine mehr. Vergangene Termine blendet die Terminliste
  automatisch aus, im Kalender bleiben sie markiert. Bekäme Max später ein eigenes
  Sheet: `SHEET_ID` austauschen, gleiche Spaltenüberschriften verwenden.
- **Kontaktformular (Web3Forms)** ist getestet und läuft. Der Key steht in `js/main.js`
  (`WEB3FORMS_KEY`), die Empfänger-Adresse hängt am Key; ein anderer Empfänger braucht
  einen neuen Key. Alternativ ginge Formspree über `FORMSPREE_ENDPOINT`.
- **Fotografin** Anna Kriete ist in Fußzeile und Impressum genannt.
- **Telefonnummer im Impressum** ist nicht nötig (§ 5 ECG verlangt nur eine rasche
  elektronische Kontaktmöglichkeit, die E-Mail genügt), bei Bedarf in `impressum.html`
  ergänzen.
- **Einschulung:** Max pflegt Termine direkt in der Tabelle, ohne Code anzufassen.

## Offene Punkte (Stand: 07.11.2026)

1. **Instagram-Link** — im Footer aller Seiten steht ein Platzhalter
   (`https://www.instagram.com/`). Echten Profil-Link eintragen, oder den Eintrag
   entfernen, falls Max keinen Account möchte.
2. **SPF bei Strato** — dort steht die SPF-Regel auf „Keine STRATO SPF-Regel“, was die
   Zustellung eigener Mails von `info@maxresch.eu` verschlechtern kann. Mit Max klären,
   ob „Standard STRATO Mailserver“ gesetzt werden soll.
3. **Echte Stimmen** — die Testimonial-Sektion auf der Startseite zeigt drei
   **erfundene** Beispiel-Zitate (mit Hinweis „Platzhalter“ im Lead-Text). Auf Wunsch
   bleiben sie vorerst öffentlich stehen. Sobald echte Rückmeldungen da sind: in
   `index.html` Texte, Namen und Avatar-Buchstaben austauschen und den
   Platzhalter-Satz im Lead-Text entfernen.
4. **TaKeTiNa-Logo** — Max schickt es; danach auf der Angebote-Seite beim
   TaKeTiNa-Abschnitt einbinden und auf taketina.com verlinken.
5. **Mehr Fotos** — neun echte Fotos von Max liegen in `img/` (Metadaten entfernt,
   max. 1800 px). Startseite und Angebote (TaKeTiNa, Bodypercussion, Rhythmik,
   Seminare) sowie „Über mich“ nutzen sie. Auf Wunsch bleiben die **Stockfotos bei
   „Gitarrenunterricht“ und „Konzerte & Live-Musik“** (Unsplash), ebenso in den
   Zitatbändern auf den Unterseiten, bis Max passende Aufnahmen hat (Gitarre, Konzert).
   Da nur neun Fotos vorliegen, wiederholen sich Motive.
6. **Preise** — noch offen, ob feste Preisliste oder Preise bei den Terminen. Auf dem
   Flyer stehen 60 € pro Termin für die TaKeTiNa Sessions; bisher fix ist nur die
   „Schnupperstunde zum halben Preis“ beim Gitarrenunterricht. Preise könnten in die
   Spalte „Beschreibung“ des Termine-Sheets.
7. **Auftragsverarbeitung Web3Forms** — klären, ob für den Formulardienst eine
   Auftragsverarbeitungs-Vereinbarung nötig ist (die Datenschutzerklärung im Impressum
   nennt den Dienst bereits).
8. **Echte Online-Buchung** — Max fragte, wie das später aussieht, wenn Dinge direkt
   buchbar sind (Zahlung, Bestätigungsmail). Dafür ist ein eigenes Gespräch geplant;
   `mountCalEmbed()` in `js/main.js` ist als Startpunkt vorbereitet, aber nicht aktiv.

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
- Die Kontaktseite hieß früher `buchung.html` und heißt jetzt `kontakt.html`. Die alte
  Adresse `buchung.html` bleibt als kleine Weiterleitungsseite bestehen, damit
  bestehende Links (z. B. in Mails oder auf Flyern) weiter funktionieren.
- Durchgängige **Du-Ansprache** auf der ganzen Website.
- `.floating-contact` (css/style.css) ist ein fix positionierter Kontakt-Button unten
  rechts, der beim Scrollen sichtbar bleibt — unabhängig vom Menüpunkt „Kontakt“.
- Termine kommen live per CSV-Export aus einem Google Sheet (`js/events.js`,
  Konstante `SHEET_ID`). Die Freigabe des Sheets muss auf „Jeder mit dem Link:
  Betrachter“ stehen bleiben. Bei Netzwerkfehlern oder falscher Freigabe fällt die
  Seite sauber auf die „keine Termine online“-Meldung zurück, statt zu brechen.
