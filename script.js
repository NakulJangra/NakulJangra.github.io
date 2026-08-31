// Scroll-spy: highlight the active section in the left index
const links = document.querySelectorAll(".index__link");
const sections = document.querySelectorAll(".section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

// One-time count-up on the hero ledger stats, on load
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const statEls = document.querySelectorAll("#ledger-strip dd[data-count]");

function animateCount(el) {
  const target = parseFloat(el.getAttribute("data-count"));
  const prefix = el.getAttribute("data-prefix") || "";
  const suffix = el.getAttribute("data-suffix") || "";
  const isDecimal = String(target).includes(".");
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    const display = isDecimal ? value.toFixed(1) : Math.round(value);
    el.textContent = `${prefix}${display}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if (statEls.length) {
  if (prefersReducedMotion) {
    statEls.forEach((el) => {
      const target = el.getAttribute("data-count");
      el.textContent = `${el.getAttribute("data-prefix") || ""}${target}${el.getAttribute("data-suffix") || ""}`;
    });
  } else {
    window.addEventListener("load", () => {
      statEls.forEach(animateCount);
    });
  }
}
