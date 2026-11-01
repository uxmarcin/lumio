/* Lumio Agency — interakcje (lekkie, bez bibliotek) */
(() => {
  document.documentElement.classList.remove('no-js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nawigacja: obramowanie po scrollu + menu mobilne */
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('.nav__links a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open'); burger?.setAttribute('aria-expanded', 'false');
  }));

  /* Wejście elementów przy przewijaniu */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* Poświata za kursorem na kartach */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* Wąż w sekcji "Jak pracuję" rysuje się razem z przewijaniem */
  const procSnake = document.querySelector('.process__snake path');
  const proc = document.querySelector('.process');
  if (procSnake && proc && !reduce) {
    let ticking = false;
    const draw = () => {
      const r = proc.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * .75 - r.top) / (r.height)));
      procSnake.style.setProperty('--draw', (1 - p).toFixed(4));
      ticking = false;
    };
    draw();
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(draw); ticking = true; } }, { passive: true });
  }

  /* Mobilny przycisk CTA pojawia się po hero, chowa przy formularzu */
  const mcta = document.querySelector('.mobile-cta');
  const hero = document.querySelector('.hero');
  const form = document.querySelector('#audyt');
  if (mcta && hero && form) {
    let heroGone = false, formIn = false;
    const upd = () => mcta.classList.toggle('is-visible', heroGone && !formIn);
    new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting; upd(); }).observe(hero);
    new IntersectionObserver(([e]) => { formIn = e.isIntersecting; upd(); }, { threshold: .1 }).observe(form);
  }

  /* Formularz audytu: wysyłka przez fetch do audyt.php */
  const f = document.querySelector('.form');
  if (f) {
    const status = f.querySelector('.form__status');
    f.addEventListener('submit', async ev => {
      ev.preventDefault();
      if (!f.reportValidity()) return;
      const btn = f.querySelector('button[type=submit]');
      btn.disabled = true; status.className = 'form__status'; status.textContent = 'Wysyłam…';
      try {
        const res = await fetch(f.action, { method: 'POST', body: new FormData(f), headers: { 'Accept': 'application/json' } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.error || 'Błąd wysyłki');
        f.reset();
        status.classList.add('ok');
        status.textContent = 'Dzięki! Odezwę się w ciągu 1 dnia roboczego.';
      } catch (err) {
        status.classList.add('err');
        status.innerHTML = 'Nie udało się wysłać. Napisz bezpośrednio: <a href="mailto:anna@lumioagency.pl">anna@lumioagency.pl</a>';
      } finally { btn.disabled = false; }
    });
  }

  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
