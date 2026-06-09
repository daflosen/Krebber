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

  // Signature: Scroll-Durchleuchten im Hero – diagonaler clip-path-Keil + mitwandernde Kante
  const heroReveal = document.querySelector('.hero-reveal');
  if (heroReveal) {
    const edge = document.querySelector('.hero .xray-edge');
    const eSolid = document.querySelector('.hero .edge-solid');
    const eDash = document.querySelector('.hero .edge-dash');
    if (edge) edge.style.display = 'block';
    const midTop = 65, midBot = 50;
    const setWedge = p => {
      const hT = p * 26, hB = p * 42;
      const x1 = midTop - hT, x2 = midTop + hT, x3 = midBot + hB, x4 = midBot - hB;
      heroReveal.style.clipPath = `polygon(${x1}% 0%, ${x2}% 0%, ${x3}% 100%, ${x4}% 100%)`;
      if (eSolid) { eSolid.setAttribute('x1', x2); eSolid.setAttribute('x2', x3); }
      if (eDash) { eDash.setAttribute('x1', x2 - 1.6); eDash.setAttribute('x2', x3 - 1.6); }
    };
    setWedge(0.14); // schmaler grüner Keil schon beim Laden
    // KEIN Pin: Effekt spielt im ersten Stück Scroll (Grün wächst, Hero noch sichtbar),
    // danach scrollt der Hero normal weg und die nächste Sektion folgt sauber – ohne Überlappung/Band.
    ScrollTrigger.create({
      trigger: '.hero', start: 'top top', end: '+=45%', scrub: true,
      onUpdate: self => setWedge(0.14 + self.progress * 0.86)
    });
  }
} else {
  // Kein GSAP oder reduzierte Bewegung: Inhalte ohne Animation zeigen
  revealAll();
  // Falls Lenis aktiv ist, aber GSAP fehlt: eigener RAF-Loop
  if (lenis) {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}
