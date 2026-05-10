const root = document.documentElement;
const body = document.body;
const nav = document.querySelector("[data-nav]");
const menuButton = document.querySelector("[data-menu]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const themeToggle = document.querySelector("[data-theme-toggle]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const storedTheme = localStorage.getItem("theme");
const initialTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
root.dataset.theme = initialTheme;
setThemeLabel(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  setThemeLabel(nextTheme);
});

function setThemeLabel(theme) {
  themeToggle?.setAttribute("aria-label", theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환");
}

menuButton?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setActiveNav(event.target.getAttribute("href"));
    closeMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("hashchange", () => {
  setActiveNav(window.location.hash || "#top");
});

function closeMenu() {
  body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "메뉴 열기");
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    setActiveNav(`#${visible.target.id}`);
  },
  {
    rootMargin: "-35% 0px -56% 0px",
    threshold: [0.1, 0.34, 0.58],
  }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

requestAnimationFrame(() => {
  setActiveNav(window.location.hash || "#top");
});

function setActiveNav(href) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === href);
  });
}
