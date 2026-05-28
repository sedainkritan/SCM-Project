document.getElementById("loginBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill in both fields.");
    } else if (username === "admin" && password === "12345") {
        alert("Login successful! Welcome to Swap & Share.");
        // Redirect to another page (example)
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials. Try again.");
    }
});
