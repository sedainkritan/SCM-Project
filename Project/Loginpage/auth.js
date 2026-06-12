// Demo accounts (only created once)
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([
    { fullname: "Demo User", username: "demo", email: "demo@mail.com", password: "demo123" }
  ]));
}

// Toast notification
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast show";
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---------------- SIGNUP ----------------
function signup(e) {
  e.preventDefault();
  let fullname = document.getElementById("fullname").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm = document.getElementById("confirm").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === username || u.email === email)) {
    showToast("Username or Email already exists!");
    return;
  }
  if (password !== confirm) {
    showToast("Passwords do not match!");
    return;
  }

  users.push({ fullname, username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showToast("Signup successful!");

  // ✅ Redirect to login page after signup
  setTimeout(() => window.location = "login_page.html", 1500);
}

// ---------------- LOGIN ----------------
function login(e) {
  e.preventDefault();
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  let remember = document.getElementById("remember").checked;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => (u.email === email || u.username === email) && u.password === password);

  if (user) {
    if (remember) {
      localStorage.setItem("sessionUser", JSON.stringify(user));
    } else {
      sessionStorage.setItem("sessionUser", JSON.stringify(user));
    }
    showToast("Login successful!");
    // ✅ Redirect to homepage
    setTimeout(() => window.location = "../Homepage/home_page.html", 1500);
  } else {
    showToast("Invalid credentials!");
  }
}

// ---------------- RESET PASSWORD ----------------
function resetPassword(e) {
  e.preventDefault();
  let email = document.getElementById("resetEmail").value;
  let newPass = document.getElementById("newPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email);

  if (user) {
    user.password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Password reset successful!");
    setTimeout(() => window.location = "login_page.html", 1500);
  } else {
    showToast("Email not found!");
  }
}

// ---------------- HOMEPAGE ----------------
function loadHomepage() {
  let user = JSON.parse(localStorage.getItem("sessionUser")) || JSON.parse(sessionStorage.getItem("sessionUser"));

  if (user) {
    document.getElementById("auth-buttons").style.display = "none";
    document.getElementById("profile-block").style.display = "flex";

    // Update profile info
    document.getElementById("profileName").innerText = user.username;
    document.getElementById("profileEmail").innerText = user.email;

    // Optional greeting
    let welcome = document.getElementById("welcome");
    if (welcome) welcome.innerText = `Welcome back, ${user.username}`;
  } else {
    document.getElementById("auth-buttons").style.display = "flex";
    document.getElementById("profile-block").style.display = "none";
  }
}

// ---------------- LOGOUT ----------------
function logout() {
  localStorage.removeItem("sessionUser");
  sessionStorage.removeItem("sessionUser");
  if (confirm("Are you sure you want to logout?")) {
    window.location = "login_page.html"; // ✅ Redirect back to login
  }
}

// ---------------- AUTO-REDIRECT ----------------
(function preventAuthPagesAccess() {
  let user = JSON.parse(localStorage.getItem("sessionUser")) || JSON.parse(sessionStorage.getItem("sessionUser"));
  let currentPage = window.location.pathname;

  if (user) {
    if (currentPage.includes("login_page.html") || currentPage.includes("sign-uppage.html")) {
      window.location = "../Homepage/home_page.html";
    }
  }
})();

// Example: after a successful exchange
let user = JSON.parse(localStorage.getItem("sessionUser"));
user.exchanges = (user.exchanges || 0) + 1;
localStorage.setItem("sessionUser", JSON.stringify(user));
