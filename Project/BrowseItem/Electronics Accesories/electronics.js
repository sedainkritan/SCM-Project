// electronics-accessories.js

function searchItems() {
  let input = document.getElementById("searchInput").value.toLowerCase().trim();
  let items = document.querySelectorAll(".item-card");
  let found = false;

  items.forEach(item => {
    // Get both the name (h3) and description (p) text
    let name = item.querySelector("h3") ? item.querySelector("h3").textContent.toLowerCase() : "";
    let desc = item.querySelector("p") ? item.querySelector("p").textContent.toLowerCase() : "";

    // Check if input matches any part of name or description
    if ((name.includes(input) || desc.includes(input)) && input !== "") {
      item.style.display = "block";
      found = true;
    } else {
      item.style.display = "none";
    }
  });

  let message = document.getElementById("message");
  if (!found && input !== "") {
    message.textContent = "Sorry, the item is not available currently.";
  } else {
    message.textContent = "";
  }

  // Reset view if search is empty
  if (input === "") {
    items.forEach(item => item.style.display = "block");
    message.textContent = "";
  }
}
