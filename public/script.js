let menu = document.querySelector("#tombol-menu");
let nav = document.querySelector(".header .flex .nav");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  nav.classList.toggle("active");
};
