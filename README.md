# Physiotherapie Martin Krebber – Onepager

Statische Website (Onepager) für die **Privatpraxis Physiotherapie Martin Krebber** in Stuttgart-Bad Cannstatt.

## Stack
Reines **HTML/CSS/JS**, keine Build-Tools.

- `index.html` – Startseite (Hero mit Scroll-Durchleucht-Effekt, Über mich, Leistungen, Ablauf, Kontakt)
- `impressum.html`, `datenschutz.html` – rechtliche Pflichtseiten (Vorlagen, vor Live-Gang prüfen)
- `assets/`
  - `styles.css`, `main.js`
  - `fonts/` + `fonts.css` – **Figtree** (Hausschrift), lokal gehostet (DSGVO)
  - `icons/` – [Lucide](https://lucide.dev)-Icons (inline)
  - `vendor/` – GSAP, ScrollTrigger, Lenis (lokal gebündelt, kein CDN)
  - `images/` – Fotos
  - `logo.svg`, `logo-mark.svg`, Favicons
- `files/` – Briefing, Design-Varianten, Effekt-Demo (Referenzmaterial)

## Lokal ansehen
```bash
python -m http.server 8000 --bind 127.0.0.1
# dann http://localhost:8000/
```

## Designgrundlagen
- **Farben:** `#0f6e59` (Grün), `#c2ab8f` (Sand), `#eee9e5` (Creme), `#333333` (Anthrazit)
- **Schrift:** Figtree (Headlines als große Versalien)
- **Motion:** Lenis Smooth Scroll + GSAP/ScrollTrigger, `prefers-reduced-motion` wird respektiert
- **DSGVO:** keine Tracker, Schriften & Libraries lokal gehostet

## Noch offen
Echte Texte (Über-mich, Hero-Kennzahlen), echte Fotos (Hero + Portrait), Kontakt-Hausnummer, Google-Maps mit Klick-Consent, Pflichtangaben in Impressum/Datenschutz, Lighthouse-Check.
