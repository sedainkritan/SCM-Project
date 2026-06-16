<input type="text" id="searchInput" placeholder="Search items...">
<p id="message"></p>

<div class="items-grid" id="itemsContainer"></div>

<script src="../shared/browseItems.js"></script>
<script>
  // Load items first
  loadItems("books");

  // Then set up search
  const searchInput = document.getElementById('searchInput');
  const message = document.getElementById('message');

  function filterItems() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    // Re‑query item cards each time (important for dynamic items)
    const itemCards = document.querySelectorAll('.item-card');

    itemCards.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();

      const matches = name.includes(searchText) || description.includes(searchText);

      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    // Show message if nothing found
    if (visibleCount === 0 && searchText !== '') {
      message.textContent = `No items found for "${searchInput.value}"`;
    } else {
      message.textContent = '';
    }
  }

  // Search as you type
  searchInput.addEventListener('input', filterItems);

  // Enter key
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') filterItems();
  });
</script>
