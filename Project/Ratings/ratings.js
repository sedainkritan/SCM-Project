// Demo reviews
const demoReviews = [
  {name:"Alice", rating:5, text:"Amazing experience!", date:"2026-05-20"},
  {name:"Bob", rating:4, text:"Pretty good overall.", date:"2026-05-21"},
  {name:"Clara", rating:3, text:"Average, could be better.", date:"2026-05-22"},
  {name:"David", rating:5, text:"Loved it!", date:"2026-05-23"},
  {name:"Eva", rating:2, text:"Not satisfied.", date:"2026-05-24"}
];

let reviews = JSON.parse(localStorage.getItem("reviews")) || demoReviews;
let selectedRating = 0;

// Elements
const reviewsList = document.getElementById("reviewsList");
const avgRatingEl = document.getElementById("avgRating");
const totalReviewsEl = document.getElementById("totalReviews");
const ratingBarsEl = document.getElementById("ratingBars");
const avgStarsEl = document.getElementById("avgStars");
const emptyStateEl = document.getElementById("emptyState");
const starSelector = document.getElementById("starSelector");
const charCountEl = document.getElementById("charCount");
const searchInput = document.getElementById("searchInput");

// Initialize star selector
function initStarSelector() {
  starSelector.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement("span");
    span.textContent = "★";
    span.addEventListener("click", () => {
      selectedRating = i;
      updateStarSelector();
    });
    span.addEventListener("mouseover", () => {
      highlightStars(i);
    });
    span.addEventListener("mouseout", updateStarSelector);
    starSelector.appendChild(span);
  }
}
function updateStarSelector() {
  [...starSelector.children].forEach((star, idx) => {
    star.classList.toggle("active", idx < selectedRating);
  });
}
function highlightStars(count) {
  [...starSelector.children].forEach((star, idx) => {
    star.classList.toggle("active", idx < count);
  });
}

// Render reviews
function renderReviews(filter="all") {
  reviewsList.innerHTML = "";
  let filtered = [...reviews];
  if (filter === "latest") {
    filtered.sort((a,b)=> new Date(b.date) - new Date(a.date));
  } else if (filter === "popular") {
    filtered.sort((a,b)=> b.rating - a.rating);
  } else if (filter === "my") {
    const myName = document.getElementById("username").value.trim();
    filtered = reviews.filter(r => r.name.toLowerCase() === myName.toLowerCase());
  }

  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(r => r.name.toLowerCase().includes(searchTerm));
  }

  if (filtered.length === 0) {
    emptyStateEl.style.display = "block";
    return;
  } else {
    emptyStateEl.style.display = "none";
  }

  filtered.forEach(r => {
    const card = document.createElement("div");
    card.className = "review-card";

    const avatar = document.createElement("div");
    avatar.className = "review-avatar";
    avatar.textContent = r.name.charAt(0).toUpperCase();

    const content = document.createElement("div");
    content.className = "review-content";

    const header = document.createElement("div");
    header.className = "review-header";

    const nameEl = document.createElement("strong");
    nameEl.textContent = r.name;

    const stars = document.createElement("div");
    stars.className = "review-stars";
    stars.innerHTML = "★".repeat(r.rating) + "☆".repeat(5-r.rating);

    header.appendChild(nameEl);
    header.appendChild(stars);

    const text = document.createElement("p");
    text.textContent = r.text;

    const date = document.createElement("small");
    date.textContent = r.date;

    const actions = document.createElement("div");
    actions.className = "review-actions";
    const helpfulBtn = document.createElement("button");
    helpfulBtn.textContent = "Helpful";
    const notHelpfulBtn = document.createElement("button");
    notHelpfulBtn.textContent = "Not Helpful";
    actions.appendChild(helpfulBtn);
    actions.appendChild(notHelpfulBtn);

    content.appendChild(header);
    content.appendChild(text);
    content.appendChild(date);
    content.appendChild(actions);

    card.appendChild(avatar);
    card.appendChild(content);
    reviewsList.appendChild(card);
  });
}

// Update summary
function updateSummary() {
  const total = reviews.length;
  const avg = (reviews.reduce((sum,r)=> sum+r.rating,0)/total).toFixed(1);
  avgRatingEl.textContent = avg;
  totalReviewsEl.textContent = `${total} reviews`;

  avgStarsEl.innerHTML = "";
  for (let i=1;i<=5;i++) {
    const span = document.createElement("span");
    span.textContent = i <= Math.round(avg) ? "★" : "☆";
    avgStarsEl.appendChild(span);
  }

  ratingBarsEl.innerHTML = "";
  for (let i=5;i>=1;i--) {
    const count = reviews.filter(r=>r.rating===i).length;
    const percent = total ? (count/total)*100 : 0;
    const bar = document.createElement("div");
    bar.className = "rating-bar";
    bar.innerHTML = `<span>${i}★</span>
      <div class="progress"><div style="width:${percent}%"></div></div>`;
    ratingBarsEl.appendChild(bar);
  }
}

// Form submission
document.getElementById("reviewForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("username").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  if (!name || !text || selectedRating===0) {
    alert("Please fill all fields and select a rating.");
    return;
  }
  const newReview = {
    name,
    rating: selectedRating,
    text,
    date: new Date().toISOString().split("T")[0]
  };
  reviews.unshift(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderReviews();
  updateSummary();
  e.target.reset();
  selectedRating=0;
  updateStarSelector();
  charCountEl.textContent="0";
});

// Character counter
document.getElementById("reviewText").addEventListener("input", e=>{
  charCountEl.textContent = e.target.value.length;
});

// Tabs
document.querySelectorAll(".tab").forEach(tab=>{
  tab.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    renderReviews(tab.dataset.tab);
  });
});

// Search
searchInput.addEventListener("input", ()=> {
  const activeTab = document.querySelector(".tab.active").dataset.tab;
  renderReviews(activeTab);
});

// Init
initStarSelector();
renderReviews();
updateSummary();
