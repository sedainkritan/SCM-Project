// Active menu effect

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", function () {

    navLinks.forEach(item => {
      item.classList.remove("active");
    });

    this.classList.add("active");

  });
});