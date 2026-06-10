const searchInput = document.getElementById('searchInput');
const itemCards = document.querySelectorAll('.item-card');
const message = document.getElementById('message');

function filterItems() {
  const searchText = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

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

// Search as you type (no button needed)
searchInput.addEventListener('input', filterItems);

// Button click
function searchItems() {
  filterItems();
}

// Enter key
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') filterItems();
});