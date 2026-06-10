# Projekt-Briefing: Onepager Physiotherapie (Sport & Reha)

> Dieses Dokument ist die Übergabe an Claude Code. Es fasst zusammen, was geplant ist, was schon existiert und was als Nächstes zu tun ist. Bitte zuerst vollständig lesen, dann mit dem Abschnitt „Erste Aufgabe" beginnen.

## 1. Worum es geht
Einseitige Website (Onepager) für eine Physiotherapie-Praxis mit Schwerpunkt **Sport & Reha**. Ziel: schlicht, aber wertig – etwas, auf das der Praxisinhaber stolz sein kann. Kein überladenes Design. Wichtigste Funktion der Seite: **Vertrauen aufbauen** und es Interessenten leicht machen, Kontakt aufzunehmen.

Es ist eine Website für einen Freund (Physiotherapeut), nicht der eigene Auftrag – Tonfall und Inhalte mit ihm abstimmen.

## 2. Vorhandene Assets
- **Praxisname:** Physiotherapie Martin Krebber – Privatpraxis
- **Logo** (Datei: `horizontal_privat_f_1.pdf`, Vektor/outlined – Bildmarke aus drei Tropfen-/Dreiecksformen + Schriftzug)
- **Corporate Identity** vorhanden: Farbschema + Hausschrift (siehe 5a)
- **Adresse** der Praxis (vom Auftraggeber erfragen/einsetzen)
- **Domain** (registriert)
- Noch **nicht** vorhanden: fertige Texte, Fotos (Therapeut/Praxis), konkrete Kontaktdaten/Öffnungszeiten

## 3. Bereits getroffene Entscheidungen
- **Schwerpunkt:** Sport & Reha
- **Terminbuchung:** nur Telefon/E-Mail – **keine** Online-Buchung. Also keine Buchungs-/Kalender-Integration einbauen, sondern klare „Anrufen" / „E-Mail schreiben"-CTAs.
- **Umfang:** ein Onepager (Anchor-Navigation), keine Unterseiten außer den rechtlichen Pflichtseiten (Impressum, Datenschutz).

## 4. Seitenstruktur (von oben nach unten)
1. **Header** – Logo + Navigation (Anchor-Links) + „Termin anfragen"-Button, sticky
2. **Hero** – Logo/Name, ein klarer Satz zum Angebot, sofort sichtbarer Kontakt-CTA, Foto
3. **Über mich** – Foto + kurze, persönliche Vorstellung, Qualifikationen als Tags
4. **Leistungen** – Behandlungsformen als Karten (Sportphysio, Reha nach OP, Manuelle Therapie, KG am Gerät, Lymphdrainage, + Platz für weitere)
5. **Ablauf** – 3 Schritte „So läuft's", nimmt Erstbesuchern die Unsicherheit
6. **Kontakt** – Telefon, E-Mail, Adresse, Öffnungszeiten + Karte
7. **Footer** – Impressum, Datenschutz, Kontakt

## 5. Designvarianten (liegen als HTML im selben Ordner)
Es gibt drei fertige Roh-Entwürfe mit identischer Struktur, aber unterschiedlicher Optik. Alle nutzen Platzhalter in `[eckigen Klammern]` und sind **nicht im Browser getestet**.

- `variante-A-ruhig.html` – **Ruhig & vertrauensvoll:** warmes Cremeweiß, Salbeigrün + Terrakotta, Serif-Überschriften (Fraunces), runde Formen, siezt. Warm/persönlich.
- `variante-B-sportlich.html` – **Sportlich & dynamisch:** dunkler Hintergrund, Lime-Akzent, fette Versalien (Bricolage Grotesque), duzt, zupackender Ton. Mutig, für junge/aktive Zielgruppe; kann ältere Reha-Patienten abschrecken.
- `variante-C-clean.html` – **Klinisch & clean:** helles Weiß-Blau, aufgeräumtes Raster, Sans-Schriften (Schibsted Grotesk), sachlich, siezt. Medizinisch-seriös.

**Design-Entscheidung getroffen:** Die optische Richtung orientiert sich an **medwest.plus** (siehe Abschnitt 5b), mit einzelnen Elementen aus anderen Seiten. Die drei Varianten-HTML-Dateien dienen nur noch als Struktur-/Code-Grundlage (Sektionsaufbau, Platzhalter), **nicht** mehr als optische Vorlage. Bei stilistischen Konflikten gilt der Style-Guide in 5b.

## 5a. Corporate Identity (VERBINDLICH)
Diese Vorgaben kommen aus den gelieferten CD-Dateien und haben Vorrang vor allen Referenz-Seiten. medwest.plus (5b) dient nur noch als **Layout-/Motion-Anmutung** – Farben und Schrift kommen ausschließlich von hier.

**Farben (mit CSS-Variablen-Vorschlag):**
- `--green:  #0f6e59` – Primärfarbe (Buttons, Akzente, Bildmarke). Dunkles, leicht smaragdfarbenes Grün.
- `--sand:   #c2ab8f` – Sekundär-/Akzentfarbe (z. B. für „Privatpraxis"-artige Subtitel, dezente Flächen, Hover).
- `--cream:  #eee9e5` – Haupt-Hintergrund (Off-White, warm).
- `--ink:    #333333` – Textfarbe (kein reines Schwarz).
- Reduziert einsetzen: cremefarbener Grund, dunkelgrauer Text, Grün als Akzent, Sand sparsam für Wärme.

**Hausschrift: Figtree** (Google Font, SIL Open Font License – kostenlos, kommerziell nutzbar).
- Im CD-Dokument als `Figtree-Light` eingebettet → Figtree ist die Hausschrift. (Die Logo-Wortmarke ist outlined, daher nicht per Tool verifizierbar, wirkt aber konsistent. Falls der Auftraggeber eine abweichende Schrift bestätigt, diese verwenden.)
- Vorschlag Gewichte: Headlines in **Figtree SemiBold/Bold**, Fließtext in **Figtree Regular**, feine Sublabels in **Figtree Light** (ggf. mit `letter-spacing` für den gesperrten „PRIVATPRAXIS"-Look aus dem Logo).
- **DSGVO:** Figtree lokal hosten (woff2 selbst ausliefern), NICHT vom Google-CDN laden.

**Logo:**
- Bildmarke: drei abgerundete Dreieck-/Tropfenformen (zwei in Grün #0f6e59, eine in Sand #c2ab8f), vertikal/gestaffelt angeordnet.
- Wortmarke: „PHYSIOTHERAPIE" (Versalien, dunkelgrau), darunter „MARTIN KREBBER", darunter „PRIVATPRAXIS" gesperrt in Sand.
- Logo liegt einbaufertig als **`logo-krebber.svg`** bei (aus dem PDF konvertiert, Vektor, transparenter Hintergrund, korrekte CD-Farben). In Header/Footer einbinden – ersetzt das Platzhalter-„P"-Kästchen.

## 5b. Layout- & Motion-Anmutung (Referenz: medwest.plus)
> Hinweis: Diese Punkte stammen aus der Analyse von medwest.plus (Quelltext + Indizien). Sie betreffen **nur Layout, Anmutung und Motion**. Farben und Schrift kommen aus 5a (CD), nicht von medwest.

**Farben:** siehe 5a. (medwests reines Schwarz/Weiß/Grün wird durch die wärmere CD-Palette ersetzt: Creme-Grund, Grün-Akzent, Sand für Wärme.)

**Typografie (Schrift = Figtree, siehe 5a):**
- Große, **Versalien-Headlines in Figtree SemiBold/Bold**, mehrzeilig gestapelt als Statement (Beispiel-Stil: „PRAXIS FÜR / THERAPIE / TRAINING UND / MASSAGE"). Headline ist das Hauptgestaltungsmittel.
- Kurze, ruhige Section-Claims (z. B. „Bleiben Sie in Bewegung.").
- Fließtext in Figtree Regular; feine gesperrte Sublabels in Figtree Light (Logo-Look „PRIVATPRAXIS").
- Großzügige Größenkontraste (sehr groß vs. klein), viel Weißraum.

**Layout:**
- Großflächig, ruhig, viel Raum. Vollflächige Bilder mit Text-Overlay als Sektions-Anker.
- Sektionen von medwest auf den Onepager übertragen als Scroll-Abschnitte: Hero → Leistungen (Physio/Sport-Reha) → Praxis/Über → Team bzw. „Wer behandelt" → Kontakt.

**Motion / Interaktion (abgeleitet – zurückhaltend umsetzen):**
- **Draggable Hero-Element** („Klicken & Ziehen"): zieh-/swipebare Bildgalerie im Kopfbereich. Optional und aufwendiger – nur einbauen, wenn Zeit/Nutzen passen; sonst statisches Hero-Bild.
- **Nav-/Link-Hover-Roll:** beim Hover rollt eine zweite Textzeile durch (Text im Markup doppelt, per Maske animiert).
- **Smooth Scrolling** + **scroll-getriggerte Reveals** (vgl. Abschnitt 9).
- Optional dezenter Custom-Cursor – eher weglassen, wenn es Aufwand/Barrierefreiheit verschlechtert.

**Tonalität:**
- Deutsch, **Sie-Form**, ruhig-professionell mit leicht emotionalem Einschlag („Ganzheitliche Heilung beginnt hier."). Passt zur Sport/Reha-Ausrichtung, ohne marktschreierisch zu sein.

**Was bewusst anders als medwest:**
- **Onepager statt Mehrseiter** – medwests Unterseiten werden zu Abschnitten einer Seite.
- Kein WordPress nötig – Look in statischem HTML/CSS nachbauen.
- **Farbe & Schrift aus der eigenen CD** (5a), nicht medwests Palette: wärmer durch Creme + Sand, Hausschrift Figtree.

## 6. Offene To-dos
- [x] Design-Richtung gewählt: medwest.plus-Anmutung (5b) + eigene CD (5a)
- [x] Farbpalette steht (CD, 5a): #0f6e59 / #c2ab8f / #eee9e5 / #333333
- [x] Hausschrift identifiziert: Figtree
- [ ] CD-Farben als CSS-Variablen anlegen (5a) und konsequent verwenden
- [ ] Figtree lokal einbinden (woff2 selbst hosten, nicht per Google-CDN) – Gewichte Light/Regular/SemiBold/Bold
- [x] Logo als SVG vorhanden (`logo-krebber.svg`) – nur noch in Header/Footer einbinden
- [ ] Echte Texte einsetzen (Hero-Satz, „Über mich", Leistungsbeschreibungen, Ablauf)
- [ ] Echtes Foto/echte Fotos einbinden (warm/authentisch statt Stockfoto – das ist bei Physio ein wichtiger Vertrauensfaktor)
- [ ] Kontaktdaten: Telefon, E-Mail, Adresse, Öffnungszeiten einsetzen
- [ ] Kennzahlen im Hero füllen oder entfernen (Jahre Erfahrung, Patient:innen etc.)
- [ ] **Impressum** anlegen (in DE Pflicht: Name, Anschrift, Kontakt, ggf. Berufsbezeichnung + zuständige Kammer/Aufsichtsbehörde, USt-IdNr. falls vorhanden)
- [ ] **Datenschutzerklärung** anlegen (DSGVO-konform)
- [ ] Google-Maps-Karte mit **Klick-Freigabe** (Consent) einbinden – nicht direkt einbetten, sonst lädt Google-Inhalt ohne Einwilligung
- [ ] Favicon, `<title>` und Meta-Description je Seite setzen
- [ ] Im Browser testen (Desktop + Mobil), Lighthouse prüfen

## 7. Technische & rechtliche Hinweise
- **Stack:** Aktuell pures HTML/CSS/JS in einer Datei. Wenn der Auftraggeber die Seite selbst pflegen können soll, ggf. ein einfaches CMS (z. B. WordPress) oder einen Static-Site-Ansatz erwägen – mit ihm klären. Für eine reine Onepager reicht statisches HTML.
- **Hosting/Domain:** Domain ist vorhanden, Hosting-Anbieter klären.
- **DSGVO ist hier wichtig** (Gesundheitskontext): keine Tracker/Analytics ohne Consent, Schriftarten lokal hosten statt von Google-CDN laden (sonst werden IP-Adressen an Google übertragen – in DE ein bekanntes Abmahnthema). Aktuell laden die Entwürfe Google Fonts per CDN → für die Live-Seite auf lokales Hosting der Fonts umstellen.
- **Barrierefreiheit:** ausreichende Kontraste (v. a. Variante B prüfen), Alt-Texte für Bilder, sinnvolle Heading-Hierarchie.
- Keine medizinischen Heilversprechen in den Texten.

## 8. Stil-Leitplanken (was die Seite vermitteln soll)
- Vertrauen, Kompetenz, Nahbarkeit
- Klar und ehrlich statt Marketing-Floskeln
- Kontaktaufnahme jederzeit leicht (Telefonnummer immer griffbereit)
- Mobil zuerst denken (Großteil der Gesundheits-Suchen läuft mobil)

## 9. Motion / Animation (gewünschte Richtung)
Als Referenz für das gewünschte „Gefühl" dient demophorius.com (Awwwards Site of the Day, gebaut mit GSAP, Lenis, Three.js). Das Prinzip dort: reduziertes, ruhiges Design plus wenige, präzise durchgezogene Bewegungs-Ideen – die Motion ist der Star, nicht die Deko.

**Diese Elemente übernehmen (dezent, performant):**
- **Smooth Scrolling** via Lenis – sanftes, gleitendes Scrollen statt Browser-Standard. Größter Effekt fürs „wertige" Gefühl.
- **Scroll-getriggerte Reveals** via GSAP + ScrollTrigger – Inhalte beim Reinscrollen versetzt einblenden/leicht verschieben. (Die Entwürfe haben das aktuell nur als einfachen IntersectionObserver – darf darauf aufbauen oder ersetzt werden.)
- **Dezente Microinteractions** auf Hover/Klick (Buttons, Links, Karten).
- **Optional:** leichter Parallax-Effekt am Hero-Bild.

**Signature-Effekt (EIN Highlight-Moment): „Unscharf → scharf"-Scroll-Reveal**
Idee aus der Pathologien-Seite von medwest.plus abgeleitet, aber bewusst vereinfacht. Beim Durchscrollen einer Bildsektion wird in einem diagonalen, wachsenden `clip-path`-Keil von **unscharf auf scharf** gestellt; an der führenden Kante eine Linie in Petrol (#0f6e59), die mitwandert. Metapher: Fokus / Klarheit / „wir gehen den Beschwerden auf den Grund".

*Warum diese Variante (statt des Röntgen-Originals):* Sie braucht nur **ein einziges Foto** – die Unschärfe macht CSS, kein anatomisch deckungsgleiches Zweitbild nötig (das exakte Foto↔Röntgen-Matching im Original ist Produktionsaufwand). Motivunabhängig und performant.

**Aufbau (genau):**
- Scroll-Bühne: hoher Wrapper (~`280vh`) mit innenliegender `position:sticky; top:0; height:100vh` Bühne → das Bild bleibt fixiert, während der Scroll-Fortschritt `p` (0→1) den Effekt steuert.
- Im Frame zwei Ebenen mit **demselben** Bild, als CSS-Variable referenziert (`--img:url(...)`), damit das Bild nur einmal geladen wird:
  - **Basis:** `filter: blur(11px) saturate(.9); transform: scale(1.08)` – das `scale` füllt die weichen Blur-Ränder, sonst entstehen durchscheinende Kanten.
  - **Scharf:** dasselbe Bild ohne Filter, mit `clip-path: polygon(...)` (der diagonale Keil).
- Fortschritt: `p = clamp(-rect.top / (rect.height - innerHeight), 0, 1)` mit `rect` = BoundingRect des Wrappers.
- Keil-Polygon, parametrisiert durch `p` (diagonales Band, das wächst); Startwerte aus der Demo, frei justierbar je Motiv:
  - `mt=62` (Bandmitte oben %), `mb=46` (Bandmitte unten %), `ht=p*30` (halbe Breite oben), `hb=p*42` (halbe Breite unten)
  - `polygon( (mt-ht)% 0, (mt+ht)% 0, (mb+hb)% 100%, (mb-hb)% 100% )`
- **Scan-Kante:** 2px-Element in Petrol mit leichtem `box-shadow`-Glow an der führenden (rechten) Keilkante; x-Position = Mittel der rechten Polygon-x-Werte; Opazität 0 an Anfang/Ende, 1 dazwischen. Optional zweite, gestrichelte Linie als `::before`.
- Update in einem per `requestAnimationFrame` gedrosselten `scroll`-Listener (passive) + auf `resize` + einmal initial.

**Pflicht / Performance:**
- `@media (prefers-reduced-motion: reduce)`: clip-path **statisch** auf den aufgedeckten Endzustand setzen, Scan-Kante ausblenden (keine scroll-gebundene Bewegung).
- Bild lokal als optimiertes webp/jpg (~1100px Breite) ausliefern. (In der beiliegenden Demo steckt das Bild als base64 – das ist nur fürs einfache Vorschauen, **nicht** für Produktion.)
- Auf **Mobil** testen; ggf. Keil-Geometrie ans Seitenverhältnis anpassen oder Effekt vereinfachen.
- **Genau einmal** auf der Seite einsetzen (z. B. Übergang in eine Bild-/Zitat- oder „Über mich"-Sektion). Nicht wiederholen.

**Empfehlung Umsetzung:** Statt des manuellen Scroll-Listeners in der echten Seite **GSAP ScrollTrigger mit `scrub: true`** verwenden (konsistent mit Abschnitt 9, smoother). Die clip-path-Werte über ein Proxy-Objekt tweenen und im `onUpdate` als Polygon schreiben.

**Optionale Verstärkung:** Zusätzlich zur Schärfe im Keil leichte Sättigungs-/Helligkeitssteigerung (Basis blass/entsättigt → Reveal kräftig) – macht den Vorher-Nachher-Sprung markanter, ohne die Schärfe-Idee zu verlassen.

**Referenz-Implementierung:** `effekt-unscharf-scharf.html` liegt bei (Vanilla-JS, Bild als base64 eingebettet; im Browser nicht getestet – als Mechanik-Vorlage gedacht).
**Bild:** wird separat geliefert.

**Bewusst NICHT übernehmen:**
- **Kein Three.js / WebGL.** Für eine kleine Praxis Overkill – schlecht für Ladezeit, Akku auf Mobil, Wartbarkeit. Nutzen für eine Physio-Seite gering.
- Motion zurückhaltend halten: wenige Effekte mit Präzision, nichts Blinkendes. Vertrauen/Klarheit geht vor Effekt.

**DSGVO/Technik:** Lenis und GSAP sind reine JS-Libraries ohne Tracking, also unkritisch – aber lokal bündeln statt über fremde CDNs laden. `prefers-reduced-motion` respektieren (Animationen für Nutzer mit aktivierter Reduktion abschalten).

## Erste Aufgabe
1. Lies die CD-Vorgaben (5a, verbindlich), die Layout-/Motion-Anmutung (5b) und die Motion-Vorgaben (9). Die drei Varianten-HTML-Dateien nur als Struktur-/Code-Grundlage heranziehen, nicht optisch.
2. Vorhanden sind bereits: Praxisname, Logo (PDF), CD-Farben, Hausschrift (Figtree). Frag den Nutzer nur noch nach den fehlenden Inhalten: Adresse, Telefon, E-Mail, Öffnungszeiten, Texte/Fotos – und ob das draggable Hero-Element gewünscht ist oder ein statisches Hero reicht.
3. Binde das mitgelieferte `logo-krebber.svg` in Header/Footer ein und Figtree lokal ein. Setze die CD-Farben als CSS-Variablen.
4. Baue ein neues, statisches HTML/CSS-Gerüst in der 5b-Anmutung (große Figtree-Versalien-Headlines, Creme-Grund, Grün-Akzent, Sand-Wärme, Scroll-Sektionen).
5. Smooth Scroll + Scroll-Reveals einbauen (Abschnitt 9), `prefers-reduced-motion` respektieren.

> Bitte keine Funktionsfähigkeit behaupten, die nicht im Browser getestet wurde, und keine Schritte als „fertig" markieren, bevor sie geprüft sind.
