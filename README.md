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

## Offene Punkte (Stand: 07.11.2026)

1. **E-Mail-Postfach `info@maxresch.eu`** — die Adresse steht überall auf der Seite
   (Footer, Impressum, `js/main.js` → `CONTACT_EMAIL`). Der MX-Eintrag zeigt auf Strato,
   ob das Postfach existiert, ist per Testmail zu bestätigen. Außerdem steht bei Strato
   die SPF-Regel auf „Keine STRATO SPF-Regel“, was die Zustellung eigener Mails
   verschlechtern kann; mit Max klären.
2. **Instagram-Link** — im Footer aller Seiten steht ein Platzhalter
   (`https://www.instagram.com/`). Echten Profil-Link eintragen. Weiterhin offen.
3. **UID-Nummer prüfen** — im Fragebogen stand „AUT77398914“. Österreichische UIDs
   beginnen mit **ATU**, daher als `ATU77398914` in `impressum.html` eingetragen.
   Von Max bestätigen lassen.
4. **Telefonnummer im Impressum** — Max fragte, ob eine nötig ist. Kurz: nein.
   § 5 ECG verlangt „Angaben, die eine rasche elektronische Kontaktaufnahme
   ermöglichen, einschließlich E-Mail-Adresse“ — eine E-Mail-Adresse genügt.
   Eine Telefonnummer ist freiwillig; wenn gewünscht, in `impressum.html` ergänzen.
5. **Echte Stimmen** — die Testimonial-Sektion auf der Startseite zeigt drei
   **erfundene** Beispiel-Zitate (mit Hinweis „Platzhalter“ im Lead-Text). Auf Wunsch
   bleiben sie vorerst öffentlich stehen. Max holt echte Rückmeldungen ein. Sobald die
   da sind: in `index.html` Texte, Namen und Avatar-Buchstaben austauschen und den
   Platzhalter-Satz im Lead-Text entfernen.
6. **Termine-Sheet gehört Florian** — das eingebundene Google Sheet („Termine –
   Maximilian Resch“) enthält die echten TaKeTiNa-Sessions (04.10., 24.10., 08.11.2026,
   AMAR DAS Yogastudio), gehört aber Florian, nicht Max. **Zu klären:** Soll Max eine
   eigene Kopie in seinem Google-Konto anlegen (Datei → Kopie erstellen)? Dann tauschen
   wir die Sheet-ID in `js/events.js` (Konstante `SHEET_ID`) gegen seine aus — eine
   Zeile Code. Wichtig dabei: Die Freigabe muss „Jeder mit dem Link: Betrachter“
   bleiben, sonst zeigt die Website keine Termine mehr an. Vergangene Termine blendet
   die Terminliste automatisch aus, im Kalender bleiben sie markiert.
7. **TaKeTiNa-Logo** — Max schickt es; danach auf der Angebote-Seite beim
   TaKeTiNa-Abschnitt einbinden und auf taketina.com verlinken.
8. **Eigene Fotos** — neun echte Fotos von Max liegen in `img/` (Metadaten entfernt,
   max. 1800 px). Auf der **Startseite** (Hero, „Warum Musik & Bewegung?“, Karten
   TaKeTiNa, Bodypercussion und Rhythmik, Zitatband, Abschluss-Banner) und auf der
   Seite **Angebote** (TaKeTiNa, Bodypercussion, Rhythmik, Seminare) stehen Max' Fotos;
   die Angebote-Seite verwendet dieselben Fotos wie die passenden Startseiten-Karten.
   Auf Wunsch bleiben die **Stockfotos bei „Gitarrenunterricht“ und „Konzerte & Live-
   Musik“** (Unsplash), bis Max passende Aufnahmen hat (Gitarre, Konzert). „Über mich“
   zeigt das Workshop-Foto. Übrige Unterseiten nutzen Stockfotos in Zitatbändern.
   Da nur neun Fotos vorliegen, wiederholen sich Motive; mehr Abwechslung
   (Workshop-Szenen, Konzert) wäre hilfreich. Die Fotografin Anna Kriete ist im
   Bildnachweis im Impressum genannt. Noch zu klären: Einverständnis der erkennbaren
   Personen auf dem Workshop-Foto (`max-berimbau-workshop.jpg`).
   **Offen:** (a) Fotograf:in für den Bildnachweis im Impressum (Kommentar in
   `impressum.html`), (b) Einverständnis der erkennbaren Teilnehmer:innen auf
   `max-berimbau-workshop.jpg`, (c) TaKeTiNa-Logo steht weiter aus.
9. **Preise** — noch offen, ob feste Preisliste oder Flyer bei den Terminen.
   Fix ist bisher nur „Schnupperstunde zum halben Preis“ beim Gitarrenunterricht.
10. **Echte Online-Buchung** — Max fragte, wie das später aussieht, wenn Dinge direkt
    buchbar sind (Zahlung, Bestätigungsmail). Dafür ist ein eigenes Gespräch geplant;
    `mountCalEmbed()` in `js/main.js` ist als Startpunkt vorbereitet, aber nicht aktiv.
11. **Einschulung** — durch die Google-Sheet-Lösung (siehe Punkt 6) erledigt sich das
    größtenteils von selbst: Max trägt Termine direkt in der Tabelle ein, ganz ohne
    Code. Übrig bleibt höchstens eine kurze Erklärung, wie man in Google Sheets eine
    Zeile hinzufügt/löscht — falls gewünscht.
12. **Formular-Direktversand (Web3Forms) ist eingebaut** — `WEB3FORMS_KEY` in
    `js/main.js` ist gesetzt, das Formular verschickt direkt statt das
    E-Mail-Programm zu öffnen. Die Empfänger-Adresse hängt am Key (bei
    https://web3forms.com festgelegt); ein anderer Empfänger braucht einen neuen
    Key. Die Datenschutzerklärung im Impressum nennt den Dienst. **Noch zu
    klären:** ob für Web3Forms eine Auftragsverarbeitungs-Vereinbarung nötig ist,
    und per Testanfrage bestätigen, dass die Mails ankommen (auch im Spam-Ordner
    schauen). Formspree ginge alternativ über `FORMSPREE_ENDPOINT`.

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
