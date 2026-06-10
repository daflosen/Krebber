// JS aktiv: erlaubt das Verstecken der Reveal-Elemente (ohne JS bleibt alles sichtbar)
const root = document.documentElement;
root.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Jahr im Footer
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// Mobiles Menü
const hdr = document.querySelector('header');
const mt = document.querySelector('.menu-toggle');
if (hdr && mt) {
  mt.addEventListener('click', () => {
    const o = hdr.classList.toggle('open');
    mt.setAttribute('aria-expanded', o);
  });
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => hdr.classList.remove('open'))
  );
}

// Menü-Overlay (medwest-Stil, persistenter Menü-Button)
const hMenu = document.getElementById('hMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
if (hMenu && menuOverlay) {
  const openMenu = () => { menuOverlay.classList.add('open'); menuOverlay.setAttribute('aria-hidden', 'false'); hMenu.setAttribute('aria-expanded', 'true'); };
  const closeMenu = () => { menuOverlay.classList.remove('open'); menuOverlay.setAttribute('aria-hidden', 'true'); hMenu.setAttribute('aria-expanded', 'false'); };
  hMenu.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  menuOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// Google-Maps mit Klick-Freigabe (DSGVO): Karte lädt erst nach Klick
const mapLoad = document.getElementById('mapLoad');
if (mapLoad) {
  mapLoad.addEventListener('click', () => {
    const box = mapLoad.closest('.map-box');
    if (!box) return;
    const q = 'Deckerstra%C3%9Fe%2039%2C%2070372%20Stuttgart';
    box.innerHTML = '<iframe title="Standort Physiotherapie Martin Krebber, Deckerstraße 39, Stuttgart" src="https://maps.google.com/maps?q=' + q + '&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  });
}

function revealAll() {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

// --- Motion: Lenis (Smooth Scroll) + GSAP/ScrollTrigger (Reveals, Parallax) ---
let lenis = null;

if (!reduceMotion && window.Lenis) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });

  // Anker-Links sanft via Lenis ansteuern (Header-Höhe als Offset)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      a.addEventListener('click', e => {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -76 }); }
      });
    }
  });
}

if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Lenis und GSAP über denselben Ticker synchronisieren
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Versetzte Reveals beim Reinscrollen
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
    );
  });

  // Signature: Hero unscharf -> scharf (diagonaler clip-path-Keil, mitwandernde Petrol-Kante)
  const heroSharp = document.querySelector('.hero-sharp');
  if (heroSharp) {
    const scan = document.querySelector('.hero-scan');
    const mt = 62, mb = 46; // Bandmitte oben/unten in %
    const setWedge = p => {
      const ht = p * 30, hb = p * 42; // halbe Keilbreite oben/unten
      const x1 = mt - ht, x2 = mt + ht, x3 = mb + hb, x4 = mb - hb;
      heroSharp.style.clipPath = `polygon(${x1}% 0, ${x2}% 0, ${x3}% 100%, ${x4}% 100%)`;
      if (scan) { scan.style.left = ((x2 + x3) / 2) + '%'; scan.style.opacity = (p > 0.02 && p < 0.99) ? '1' : '0'; }
    };
    setWedge(0.16); // beim Laden schon ein scharfer Streifen sichtbar
    // Hero pinnen, während scharfgestellt wird; danach folgt direkt die nächste Sektion.
    ScrollTrigger.create({
      trigger: '.hero', start: 'top top', end: '+=120%',
      pin: true, pinSpacing: true, scrub: true,
      onUpdate: self => setWedge(0.16 + self.progress * 0.84)
    });
  }

  // "Ihr Weg zu mir": Logo-Steine bauen sich sanft pro Schritt auf (inkl. faintem Echo)
  gsap.utils.toArray('.step-stone-inner').forEach(inner => {
    gsap.fromTo(inner,
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: inner.closest('.step'), start: 'top 82%', once: true } }
    );
  });
} else {
  // Kein GSAP oder reduzierte Bewegung: Inhalte ohne Animation zeigen
  revealAll();
  // Falls Lenis aktiv ist, aber GSAP fehlt: eigener RAF-Loop
  if (lenis) {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}
