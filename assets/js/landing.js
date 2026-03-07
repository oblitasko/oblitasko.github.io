/**
 * Landing Día de la Mujer — Scroll-triggered animations
 * Añade .visible cuando cada sección entra en viewport para disparar las animaciones CSS.
 */
(function () {
  function init() {
    if (typeof document === 'undefined' || !document.querySelector) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var sections = document.querySelectorAll('.section--animate');
    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.05
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
