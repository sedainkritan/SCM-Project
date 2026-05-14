async function loadComponent() {
    const response = await fetch(file);
    const data = await response.text();
    document.getElementById("component").innerHTML = data;
}

loadComponent("header","./header.html");
loadComponent("footer","./footer.html");