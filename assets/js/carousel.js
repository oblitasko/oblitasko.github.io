/**
 * Carrusel pantalla completa — Día de la Mujer
 * Navegación por flechas, dots y swipe (touch).
 */
(function () {
  var track = document.getElementById('carousel-track');
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  var dotsEl = document.getElementById('carousel-dots');
  var slides = document.querySelectorAll('.carousel__slide');
  var total = slides.length;
  var current = 0;

  if (!track || !slides.length) return;

  function goTo(index) {
    index = Math.max(0, Math.min(index, total - 1));
    if (index === current) return;
    current = index;
    track.style.transform = 'translateX(-' + current + '00vw)';

    slides.forEach(function (slide, i) {
      slide.classList.toggle('carousel__slide--active', i === current);
      var content = slide.querySelector('.slide-content--animate');
      var gallery = slide.querySelector('.gallery--carousel');
      if (i === current) {
        if (content) {
          requestAnimationFrame(function () {
            content.classList.add('visible');
          });
        }
        if (gallery) {
          requestAnimationFrame(function () {
            gallery.classList.add('visible');
          });
        }
      } else {
        if (content) content.classList.remove('visible');
        if (gallery) gallery.classList.remove('visible');
      }
    });

    updateDots();
  }

  function updateDots() {
    if (!dotsEl) return;
    var dots = dotsEl.querySelectorAll('.carousel__dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('carousel__dot--active', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }

  function createDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
      btn.setAttribute('aria-label', 'Ir a diapositiva ' + (i + 1));
      btn.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      (function (idx) {
        btn.addEventListener('click', function () { goTo(idx); });
      })(i);
      dotsEl.appendChild(btn);
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  createDots();

  var touchStartX = 0;
  var touchStartY = 0;
  var touchEndX = 0;
  var touchEndY = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    var diffX = touchStartX - touchEndX;
    var diffY = touchStartY - touchEndY;
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) goTo(current + 1);
      else goTo(current - 1);
    }
  }, { passive: true });

  goTo(0);
})();
