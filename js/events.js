document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-chip");
  const eventCards = document.querySelectorAll(".event-card");
  const searchInput = document.getElementById("eventSearch");

  function applyFilters() {
    const currentCategory = document.querySelector(".filter-chip.active")?.dataset.category || "all";
    const searchTerm = (searchInput?.value || "").trim().toLowerCase();

    eventCards.forEach(function (card) {
      const cardCategory = card.dataset.category;
      const cardText = card.textContent.toLowerCase();
      const matchesCategory = currentCategory === "all" || cardCategory === currentCategory;
      const matchesSearch = !searchTerm || cardText.includes(searchTerm);
      card.style.display = matchesCategory && matchesSearch ? "block" : "none";
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
});
