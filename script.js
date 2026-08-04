// ============================================================
// PROJECT BIODRONE — shared interactivity
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- nav: scrolled state + mobile toggle ---------- */
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    }));
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- timeline: dot activation + progress fill ---------- */
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const fill = timeline.querySelector('.tl-fill');
    const items = timeline.querySelectorAll('.tl-item');

    if ('IntersectionObserver' in window) {
      const tio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      }, { threshold: 0.4 });
      items.forEach(item => tio.observe(item));
    } else {
      items.forEach(item => item.classList.add('in'));
    }

    const updateFill = () => {
      if (!fill) return;
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const visible = Math.min(Math.max(vh * 0.65 - rect.top, 0), total);
      const pct = total > 0 ? (visible / total) * 100 : 0;
      fill.style.height = pct + '%';
    };
    updateFill();
    window.addEventListener('scroll', updateFill, { passive: true });
    window.addEventListener('resize', updateFill);
  }

  /* ---------- risk accordion ---------- */
  document.querySelectorAll('.acc-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.acc-item');
      const panel = item.querySelector('.acc-panel');
      const isOpen = item.classList.contains('open');

      // close siblings
      item.parentElement.querySelectorAll('.acc-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.acc-panel').style.maxHeight = null;
        }
      });

      item.classList.toggle('open', !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
    });
  });

  /* ---------- drop height simulator ---------- */
  const sim = document.querySelector('.sim');
  if (sim) {
    const buttons = sim.querySelectorAll('.height-btn');
    const drone = sim.querySelector('.sim-drone');
    const seed = sim.querySelector('.sim-seed');
    const spread = sim.querySelector('.sim-spread');
    const readoutHeight = sim.querySelector('.readout-height');
    const readoutSpread = sim.querySelector('.readout-spread');

    // Illustrative model only — grounded in the hypothesis that longer fall
    // time increases lateral drift, not measured lab results.
    const model = {
      2:  { dronePct: 10, spreadPx: 46,  spreadLabel: '~0.3–0.5 m (illustrative)' },
      5:  { dronePct: 24, spreadPx: 74,  spreadLabel: '~0.6–0.9 m (illustrative)' },
      10: { dronePct: 40, spreadPx: 110, spreadLabel: '~1.0–1.4 m (illustrative)' },
      20: { dronePct: 58, spreadPx: 160, spreadLabel: '~1.6–2.2 m (illustrative)' },
    };

    const setHeight = (h) => {
      const cfg = model[h];
      if (!cfg) return;
      drone.style.top = cfg.dronePct + '%';
      seed.style.top = cfg.dronePct + '%';
      spread.style.width = cfg.spreadPx + 'px';
      spread.style.height = cfg.spreadPx + 'px';
      if (readoutHeight) readoutHeight.textContent = h + ' m';
      if (readoutSpread) readoutSpread.textContent = cfg.spreadLabel;
      buttons.forEach(b => b.classList.toggle('active', b.dataset.height === String(h)));
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => setHeight(btn.dataset.height));
    });

    setHeight(5);
  }

});
