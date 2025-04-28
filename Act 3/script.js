// Fade-in animation
document.addEventListener("DOMContentLoaded", function () {
  const fadeElems = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElems.forEach((elem) => {
    observer.observe(elem);
  });

  // Buzzwords animation
  const buzzwords = [
    "Synergy",
    "Best Practices",
    "Alignment",
    "Thought Leadership",
    "Ownership",
    "Empower",
    "Agile",
    "Paradigm Shift",
    "Circle Back",
    "Deep Dive",
    "Leverage",
    "Value-Add",
    "Move The Needle",
    "ROI",
    "Disruptive",
    "Low-Hanging Fruit",
    "Optimize",
    "Streamline",
  ];

  const buzzwordsContainer = document.querySelector(".buzzwords-container");

  buzzwords.forEach((word, index) => {
    const buzzword = document.createElement("div");
    buzzword.classList.add("buzzword");
    buzzword.textContent = word;

    // Random position
    buzzword.style.left = `${Math.random() * 100}%`;
    buzzword.style.top = `${Math.random() * 100}%`;

    // Random delay for animation
    buzzword.style.animationDelay = `${Math.random() * 8}s`;

    buzzwordsContainer.appendChild(buzzword);
  });
});
