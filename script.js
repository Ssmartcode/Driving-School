const navbar = document.querySelector("nav");
const showcase = document.querySelector(".showcase");
const navbarMenu = document.querySelector(".navbar-menu");

window.addEventListener("scroll", () => {
  console.log(window.scrollY > navbar.offsetHeight);
  if (window.scrollY > navbar.offsetHeight) {
    navbar.classList.add("sticky");
    showcase.style.top = "0";
  } else navbar.classList.remove("sticky");
});

// BURGER MENU
document.querySelector(".burger-menu").addEventListener("click", function () {
  this.classList.toggle("change");
  navbarMenu.classList.toggle("display");
  document.body.classList.toggle("overflow");
});
