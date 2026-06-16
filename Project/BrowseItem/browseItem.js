function loadItems(category) {
  let items = JSON.parse(localStorage.getItem("swapItems")) || [];
  let container = document.getElementById("itemsContainer");
  container.innerHTML = "";

  items.filter(i => i.category === category).forEach(i => {
    let card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <img src="${i.image}" alt="${i.name}">
      <h3>${i.name}</h3>
      <p>${i.description}</p>
      <button class="exchange-btn">Exchange</button>
      <button class="shop-btn">Buy</button>
    `;
    container.appendChild(card);
  });
}
