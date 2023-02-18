const body = document.getElementById("body");
const openModalBtn = document.querySelector(".contact_button");
const main = document.getElementById("main");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalCloseBtn = document.querySelector(".modal-close-btn");



function displayModal() {
    const modalId = document.getElementById("contact_modal");
    modalId.style.display = "block";
    main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    modalId.style.background = "rgba(0,0,0,0.4)";
    modalId.style.backgroundSize = "cover";
    body.classList.add("no-scroll");
    modal.style.display = "flex";
    modalCloseBtn.focus();
 }
    


function closeModal() {
    const modalId = document.getElementById("contact_modal");
    modalId.style.display = "none";
    main.setAttribute("aria-hidden", "false");
    body.classList.remove("no-scroll");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    openModalBtn.focus();
}




