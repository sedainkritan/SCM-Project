// Optional: Add subtle fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  const storyContent = document.querySelector(".story-content");
  storyContent.style.opacity = 0;
  setTimeout(() => {
    storyContent.style.transition = "opacity 1s ease";
    storyContent.style.opacity = 1;
  }, 200);
});
