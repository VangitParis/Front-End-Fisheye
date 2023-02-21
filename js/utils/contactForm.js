// Déclaration des constantes
const body = document.getElementById("body");
const openModalBtn = document.querySelector(".contact_button");
const main = document.getElementById("main");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const inputs = modal.querySelectorAll("input, textarea");
/**
 * Affiche la fenêtre modale de contact.
 * @function
 */
const displayModal = () => {
  const modalId = document.getElementById("contact_modal");
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
  const modalId = document.getElementById("contact_modal");
  modalId.style.display = "none";
  main.setAttribute("aria-hidden", "false");
  body.classList.remove("no-scroll");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  document.removeEventListener("keyup", onKeyUp);
  openModalBtn.focus();
};

/**
 *
 * @param {KeyboardEvent}  Ferme la fenêtre modale avec la touche esc
 */
const onKeyUp = (event) => {
  if (event.key === "Escape" || event.key ==="Esc") {
      closeModal();
  } 
};
// Fermer la modale si esc est pressée dans un champ
inputs.forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      // Fermer la modale
      closeModal();
    }
  });
});

// Écoute les événements pour ouvrir et fermer la fenêtre modale de contact.
openModalBtn.addEventListener("click", displayModal);
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
});
