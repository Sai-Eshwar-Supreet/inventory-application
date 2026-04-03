const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("nav-menu");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}