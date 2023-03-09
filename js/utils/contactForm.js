// Déclaration des constantes
const body = document.getElementsByTagName("body")[0];
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
  const focusableElements = modal.querySelectorAll(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", function (e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } /* tab */ else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
  modalCloseBtn.focus();
};

/**
 * Ferme la fenêtre modale de contact.
 * @function
 */
const closeModal = () => {
  modalId.style.display = "none";
  main.removeAttribute("aria-hidden");
  body.classList.remove("no-scroll");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  document.removeEventListener("keyup", onKeyUp);
  let openModalButton;
  //focus sur le bouton qui ouvre la modal si on la ferme
  if (!sectionPhotographHeader.innerHTML) {
    openModalButton = document.getElementsByClassName("contact-open_button")[0];
    openModalButton.focus();
  }
  
};

/**
 *
 * @param {KeyboardEvent}  Ferme la fenêtre modale avec la touche esc
 */
const onKeyUp = (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal();
  }
  // Fermer la modale si esc est pressée dans un champ
  inputs.forEach((input) => {
    input.addEventListener("keyup", (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        // Fermer la modale
        closeModal();
      }
    });
  });
};
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
