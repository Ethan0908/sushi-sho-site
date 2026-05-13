const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const revealItems = document.querySelectorAll(".reveal");

document.body.classList.add("js-ready");

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMenu() {
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("nav-lock");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
}

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-lock", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("scroll", updateHeaderState, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

updateHeaderState();
