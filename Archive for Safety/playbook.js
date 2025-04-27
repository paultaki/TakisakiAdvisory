// Leadership Playbook Category Expansion
// This script handles the in-place expansion of categories and framework items

document.addEventListener("DOMContentLoaded", function () {
  // Get all category headers
  const categoryHeaders = document.querySelectorAll(".category-header");

  // Add click event listeners to each category header
  categoryHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      // Find the parent category card
      const categoryCard = this.closest(".category-card");

      // Find the category items container within this card
      const categoryItems = categoryCard.querySelector(".category-items");

      // Toggle the 'active' class on the items container
      categoryItems.classList.toggle("active");

      // Also toggle an 'expanded' class on the card itself for styling
      categoryCard.classList.toggle("expanded");
    });
  });

  // Get all framework items
  const frameworkItems = document.querySelectorAll(".framework-item");

  // Add click event listeners to each framework item
  frameworkItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Prevent clicks on buttons within the item from triggering this
      if (e.target.closest(".framework-button")) {
        return;
      }

      // Toggle the 'active' class on this framework item
      this.classList.toggle("active");

      // Find the description within this item
      const description = this.querySelector(".framework-description");

      // Toggle visibility of the description
      if (description) {
        // If description is already visible, hide it
        if (description.style.display === "block") {
          description.style.display = "none";
        } else {
          // Hide all other descriptions first
          document
            .querySelectorAll(".framework-description")
            .forEach((desc) => {
              desc.style.display = "none";
            });

          // Then show this description
          description.style.display = "block";
        }
      }
    });
  });

  // Handle premium content button clicks
  const premiumButtons = document.querySelectorAll(".framework-button");

  premiumButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent the framework item click from triggering
      // Show premium content modal here
      const premiumModal = document.getElementById("premium-modal");
      if (premiumModal) {
        premiumModal.style.display = "flex";
      }
    });
  });

  // Close buttons for modals
  const closeButtons = document.querySelectorAll(".modal-close");

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Find the parent modal
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close modals when clicking outside content
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
});
