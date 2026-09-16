import { animate, createTimeline, stagger } from "https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm";

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav-menu");

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

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) {
  document.documentElement.classList.add("is-reduced");
} else {
  playHero();
  observeSections();
}

function playHero() {
  const items = document.querySelectorAll(".hero .js-anim");
  if (!items.length) return;

  createTimeline({ defaults: { ease: "out(3)", duration: 560 } }).add(items, {
    opacity: [0, 1],
    y: [16, 0],
    delay: stagger(55),
  });
}

function observeSections() {
  const sections = document.querySelectorAll(".reveal");
  if (!sections.length || !("IntersectionObserver" in window)) {
    sections.forEach(revealSection);
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        revealSection(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function revealSection(section) {
  const heading = section.querySelectorAll(".eyebrow, h2, .prose, .contact__lead");
  const cards = Array.from(section.querySelectorAll(".skill-card, .timeline__item, .edu-card"));
  const actions = section.querySelectorAll(".hero__actions");
  const note = section.querySelectorAll(".edu-note");
  const stackChips = section.id === "stack" ? section.querySelectorAll(".chips li") : [];
  const tl = createTimeline({ defaults: { ease: "out(3)", duration: 620 } });
  let queued = false;

  if (heading.length) {
    tl.add(heading, {
      opacity: [0, 1],
      y: [16, 0],
      delay: stagger(60),
    });
    queued = true;
  }

  if (section.id === "experiencia" && cards.length) {
    cards.forEach(function (card, i) {
      const at = i === 0 && heading.length ? "-=380" : i === 0 ? 0 : "-=520";
      tl.add(card, { opacity: [0, 1], y: [16, 0] }, at);
      const chips = card.querySelectorAll(".chips li");
      if (chips.length) {
        tl.add(
          chips,
          {
            opacity: [0, 1],
            y: [8, 0],
            duration: 400,
            delay: stagger(40),
          },
          "-=360"
        );
      }
    });
    queued = true;
  } else if (cards.length) {
    tl.add(
      cards,
      {
        opacity: [0, 1],
        y: [16, 0],
        delay: stagger(70),
      },
      heading.length ? "-=380" : 0
    );
    queued = true;
  }

  if (stackChips.length) {
    tl.add(
      stackChips,
      {
        opacity: [0, 1],
        y: [8, 0],
        duration: 400,
        delay: stagger(40),
      },
      "-=320"
    );
    queued = true;
  }

  if (note.length) {
    tl.add(
      note,
      {
        opacity: [0, 1],
        y: [16, 0],
      },
      queued ? "-=400" : 0
    );
    queued = true;
  }

  if (actions.length) {
    tl.add(
      actions,
      {
        opacity: [0, 1],
        y: [12, 0],
      },
      queued ? "-=400" : 0
    );
    queued = true;
  }

  if (!queued) {
    animate(section, {
      opacity: [0, 1],
      y: [16, 0],
      duration: 620,
      ease: "out(3)",
    });
  }
}
