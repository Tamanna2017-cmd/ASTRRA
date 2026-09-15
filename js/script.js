const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });

function toggleMenu() {
  const open = mobileMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", open);

  const lines = menuToggle.querySelectorAll("span");
  lines[0].style.transform = open ? "translateY(3px) rotate(45deg)" : "";
  lines[1].style.transform = open ? "translateY(-3px) rotate(-45deg)" : "";
}

menuToggle.addEventListener("click", toggleMenu);

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) toggleMenu();
  });
});

// Premium cursor
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

window.addEventListener("mousemove", (e) => {
  if (!dot || !ring) return;
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
  ring.style.left = `${e.clientX}px`;
  ring.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button, .service-list div").forEach(el => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// Small magnetic effect for premium CTAs
document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});
