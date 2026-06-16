async function loadComponent(id, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;

  // ✅ Run active link logic only for the header
  if (id === "header") {
    highlightActiveLink();
    toggleAuthButtons(); // <-- add this
  }
}

function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop(); // e.g. home_page.html
  const links = document.querySelectorAll("#header nav a");

  links.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ✅ New function to show/hide login/signup
function toggleAuthButtons() {
  const currentPage = window.location.pathname.split("/").pop(); // e.g. home_page.html
  const authButtons = document.getElementById("auth-buttons");

  if (authButtons) {
    if (currentPage === "home_page.html") {
      authButtons.style.display = "flex";   // visible only on homepage
    } else {
      authButtons.style.display = "none";   // hidden elsewhere
    }
  }
}

console.log("Header is loading");
loadComponent("header", "../Header/header.html");
loadComponent("footer", "../Header/footer.html");
