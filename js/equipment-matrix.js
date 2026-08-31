/* =========================================================
   FSB EQUIPMENT MATRIX INTERACTIONS
========================================================= */

(() => {
  const cards = [...document.querySelectorAll(".equipment-card")];

  const buttons = [...document.querySelectorAll(".filter-btn")];

  const count = document.getElementById("equipmentCount");

  const modal = document.getElementById("equipmentModal");

  const modalImage = document.getElementById("modalImage");

  const modalCategory = document.getElementById("modalCategory");

  const modalTitle = document.getElementById("modalTitle");

  const modalDescription = document.getElementById("modalDescription");

  /* =====================================================
       UPDATE EQUIPMENT COUNT
    ====================================================== */

  function updateCount() {
    const visible = cards.filter(
      (card) => !card.classList.contains("is-hidden"),
    ).length;

    count.textContent = `${visible} equipment ${
      visible === 1 ? "item" : "items"
    }`;
  }

  /* =====================================================
       FILTER EQUIPMENT
    ====================================================== */

  function filterEquipment(filter) {
    cards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;

      card.classList.toggle("is-hidden", !matches);
    });

    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === filter);
    });

    updateCount();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      filterEquipment(button.dataset.filter);
    });
  });

  /* =====================================================
       OPEN MODAL
    ====================================================== */

  function openModal(card) {
    const image = card.querySelector("img");

    const category = card.querySelector(".equipment-category");

    const title = card.querySelector("h3");

    const description = card.querySelector(".equipment-card-body p");

    const note = card.querySelector(".equipment-note");

    modalImage.src = image.src;

    modalImage.alt = image.alt;

    modalCategory.textContent = category.textContent;

    modalTitle.textContent = title.textContent;

    modalDescription.textContent = note
      ? `${description.textContent} — ${note.textContent}.`
      : description.textContent;

    modal.classList.add("open");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }

  /* =====================================================
       CLOSE MODAL
    ====================================================== */

  function closeModal() {
    modal.classList.remove("open");

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    modalImage.src = "";
  }

  /* =====================================================
       CARD BUTTONS
    ====================================================== */

  cards.forEach((card) => {
    const button = card.querySelector(".view-equipment");

    button.addEventListener("click", () => {
      openModal(card);
    });
  });

  /* =====================================================
       MODAL CLOSE BUTTON / BACKDROP
    ====================================================== */

  modal.querySelectorAll("[data-modal-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  /* =====================================================
       ESC KEY
    ====================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  /* =====================================================
       INITIAL COUNT
    ====================================================== */

  updateCount();
})();

