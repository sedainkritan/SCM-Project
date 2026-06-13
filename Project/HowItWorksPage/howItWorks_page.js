document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    step.style.opacity = 0;
    step.style.transform = "translateY(20px)";
    setTimeout(() => {
      step.style.transition = "all 0.6s ease";
      step.style.opacity = 1;
      step.style.transform = "translateY(0)";
    }, 200 * index);
  });
});