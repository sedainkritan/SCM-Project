let uploadedImageBase64 = "";

document.getElementById("image").addEventListener("change", function () {
  const preview = document.getElementById("preview");
  preview.innerHTML = "";
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImageBase64 = e.target.result; // ✅ store base64 globally
      const img = document.createElement("img");
      img.src = uploadedImageBase64;
      img.alt = "Preview";
      img.style.width = "150px";
      img.style.height = "150px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "6px";
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("swapForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const item = {
    name: document.getElementById("itemName").value.trim(),
    category: document.getElementById("category").value,
    description: document.getElementById("description").value.trim(),
    image: uploadedImageBase64, // ✅ use base64 string
  };

  let items = JSON.parse(localStorage.getItem("swapItems")) || [];
  items.push(item);
  localStorage.setItem("swapItems", JSON.stringify(items));

  alert("✅ Item published successfully!");

  const categoryPaths = {
    "books-media": "../Books And Media/books-media.html",
    "electronics-accessories":
      "../Electronics Accesories/electronics-accessories.html",
    clothing: "../Clothing/clothing.html",
    "outdoor-travel": "../Outdoor/outdoor-travel.html",
    music: "../Music/music.html",
    furniture: "../Furniture/furniture.html",
    health: "../Health/health.html",
    children: "../Children/children.html",
    office: "../Office/office.html",
    pets: "../Pets/pets.html",
    arts: "../Arts/arts.html",
    automotive: "../Automotive/automotive.html",
    notes: "../Notes/notes.html",
    fitness: "../Fitness/fitness.html",
    sports: "../Sports/sports.html",
  };

  const redirectPath = categoryPaths[item.category];
  if (redirectPath) {
    window.location.href = redirectPath;
  } else {
    alert("⚠️ Category path not found. Please check folder names.");
  }
});
