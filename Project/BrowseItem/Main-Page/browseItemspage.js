const searchInput = document.querySelector('.search-bar input');
const categorySelect = document.querySelector('.search-bar select');
const findButton = document.querySelector('.search-bar button');
const discoverItems = document.querySelectorAll('.discover-item');

// Map category values to the href keywords in each link
const categoryMap = {
  'all': null,
  'books-media': 'books-media',
  'clothing': 'clothing',
  'outdoor-travel': 'outdoor-travel',
  'music': 'music',
  'furniture': 'furniture',
  'health': 'health',
  'children': 'children',
  'office': 'office',
  'pets': 'pets',
  'electronics-accessories': 'electronics',
  'arts': 'arts',
  'automotive': 'automotive',
  'notes': 'notes',
  'fitness': 'fitness',
  'sports': 'sports',
  'books': 'books',
  'media': 'media',
  'notes': 'notes'
};

function filterItems() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;

  discoverItems.forEach(item => {
    const itemName = item.querySelector('h3').textContent.toLowerCase();
    const itemHref = item.getAttribute('href').toLowerCase();

    // Check text match
    const matchesText = searchText === '' || itemName.includes(searchText);

    // Check category match
    const categoryKey = categoryMap[selectedCategory];
    const matchesCategory = selectedCategory === 'all' || itemHref.includes(categoryKey);

    // Show or hide
    if (matchesText && matchesCategory) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Trigger on button click
findButton.addEventListener('click', filterItems);

// Trigger on typing (live search)
searchInput.addEventListener('input', filterItems);

// Trigger on category change
categorySelect.addEventListener('change', filterItems);

// Trigger on Enter key
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') filterItems();
});