/**
 * Intro tipo Heart Shooter — overlay con corazones flotantes y click para entrar
 */
(function () {
  var overlay = document.getElementById('intro-overlay');
  var heartsContainer = document.getElementById('hearts-container');
  if (!overlay || !heartsContainer) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heartSvg = '<svg viewBox="0 0 24 24" fill="#ff6b9d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

  function createHeart() {
    if (reduceMotion) return;
    var el = document.createElement('div');
    el.className = 'intro-overlay__heart';
    el.innerHTML = heartSvg;
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = (4 + Math.random() * 4) + 's';
    el.style.animationDelay = Math.random() * 2 + 's';
    el.style.fontSize = (14 + Math.random() * 20) + 'px';
    heartsContainer.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 10000);
  }

  function spawnHearts() {
    if (!overlay.classList.contains('intro-overlay--hidden')) {
      createHeart();
    }
  }

  setInterval(spawnHearts, 400);

  var audio = document.getElementById('intro-audio');
  var audioToggle = document.getElementById('audio-toggle');

  function hideOverlay() {
    overlay.classList.add('intro-overlay--hidden');
    overlay.setAttribute('aria-hidden', 'true');
    if (audio) {
      audio.play().catch(function () {});
    }
    if (audioToggle) {
      audioToggle.style.display = 'flex';
    }
  }

  overlay.addEventListener('click', hideOverlay);

  if (audioToggle && audio) {
    audioToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      audio.muted = !audio.muted;
      audioToggle.classList.toggle('is-muted', audio.muted);
      audioToggle.setAttribute('aria-label', audio.muted ? 'Activar música' : 'Silenciar música');
    });
  }
  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hideOverlay();
    }
  });
})();
