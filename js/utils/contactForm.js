// Déclaration des constantes
const body = document.getElementById("body");
const submitForm = document.getElementById("contact-submit_button");
const sectionPhotographHeader = document.getElementById("photograph-header");
const modalId = document.getElementById("contact_modal");
const main = document.getElementById("main");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const inputs = modal.querySelectorAll("input, textarea");
/**
 * Affiche la fenêtre modale de contact.
 * @function
 */
const displayModal = () => {
  modalId.style.display = "block";
  main.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  modalId.style.background = "rgba(0,0,0,0.4)";
  modalId.style.backgroundSize = "cover";
  body.classList.add("no-scroll");
  modal.style.display = "flex";
  modalCloseBtn.focus();
};

/**
 * Ferme la fenêtre modale de contact.
 * @function
 */
const closeModal = () => {
  modalId.style.display = "none";
  main.setAttribute("aria-hidden", "false");
  body.classList.remove("no-scroll");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  let openModalButton;
  //focus sur le bouton qui ouvre la modal si on la ferme
  if (sectionPhotographHeader.innerHTML) {
    openModalButton = document.getElementsByClassName("contact-open_button")[0];
    openModalButton.focus();
  }
  document.removeEventListener("keyup", onKeyUp);
};

/**
 *
 * @param {KeyboardEvent}  Ferme la fenêtre modale avec la touche esc
 */
const onKeyUp = (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal();
  }
};
// Fermer la modale si esc est pressée dans un champ
inputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      // Fermer la modale
      closeModal();
    }
  });
});

// Écoute les événements pour ouvrir et fermer la fenêtre modale de contact.
submitForm.addEventListener("click", displayModal);
modalCloseBtn.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("keyup", onKeyUp);

// Afficher le contenu des trois champs dans les logs de la console
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;

  console.log(`Prénom : ${firstname}`);
  console.log(`Nom : ${lastname}`);
  console.log(`Email : ${email}`);

  form.reset();
  closeModal();
});
