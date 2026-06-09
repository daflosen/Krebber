# Bilder

Hier kommen die Fotos der Website rein. Empfehlung: **WebP** (klein) oder JPG, lokal gehostet (DSGVO – nicht von fremden Servern einbinden).

## Benötigt / vorgesehen

| Datei (Vorschlag) | Wofür | Hinweise |
|---|---|---|
| `hero.jpg` / `hero.webp` | Hero-Durchleucht-Effekt | EIN Foto genügt: Basis = Graustufe, Reveal = dasselbe Bild grün getönt (per CSS). Quer, mind. ~2000px breit, Motiv eher rechts/mittig (links liegt der Text). Motiv-Idee: ruhig → in Bewegung. |
| `portrait.jpg` | „Über mich" (Martin Krebber) | Warm/authentisch, hochkant. |
| `praxis-*.jpg` | spätere vollflächige Sektionen | |

## Einbau
Dateien hier ablegen und in `index.html` referenzieren, z. B. `assets/images/hero.jpg`.
Für den Hero-Effekt tauscht das echte Foto die aktuellen Platzhalter-Farbverläufe (`.hero-base` / `.hero-reveal` in `assets/styles.css`).

Sag Bescheid, sobald ein Bild hier liegt – dann binde ich es ein und tone die Reveal-Ebene markenfarbig.
