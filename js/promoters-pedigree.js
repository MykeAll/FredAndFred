(() => {
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -45px 0px'});
  revealItems.forEach(el => observer.observe(el));

  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); modalImage.src=''; document.body.style.overflow=''; };
  document.querySelectorAll('.gallery-card[data-full]').forEach(card => card.addEventListener('click', () => {
    const img = card.querySelector('img');
    modalImage.src = card.dataset.full;
    modalImage.alt = img?.alt || 'Promoters pedigree project image';
    modalCaption.textContent = img?.alt || '';
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }));
  document.getElementById('modalClose')?.addEventListener('click', close);
  modal?.addEventListener('click', e => { if(e.target === modal) close(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });

  const backTop = document.getElementById('backTop');
  backTop?.addEventListener('click', e => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });

  // Gentle image depth effect on larger screens.
  const hero = document.querySelector('.ped-hero');
  if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 500);
      hero.style.backgroundPosition = `center ${y * .08}px`;
    }, {passive:true});
  }
})();
