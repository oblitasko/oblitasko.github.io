(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav-menu");

    function setMenu(open) {
      if (!toggle || !nav) return;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      nav.classList.toggle("is-open", open);
    }

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        setMenu(toggle.getAttribute("aria-expanded") !== "true");
      });

      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          setMenu(false);
        });
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") setMenu(false);
      });
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sections = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window) || !sections.length) {
      sections.forEach(function (section) {
        section.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  });
})();
