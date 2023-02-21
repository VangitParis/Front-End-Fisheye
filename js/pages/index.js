import { PhotographerFactory } from "../factories/photographerFactory.js";
/**
 * Obtient les données des photographes via une requête fetch.
 * @returns {Promise<Object>} - Un objet contenant les photographes.
 */
async function getPhotographers() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5500/data/photographers.json"
    );
    const data = await response.json();
    return { photographers: data.photographers };
  } catch (error) {
    console.error("Error:", error);
  }
}
/**
 * Affiche les données des photographes dans le DOM.
 * @param {Array<Object>} photographers - Un tableau contenant les données des photographes.
 */
async function displayData(photographers) {
  let photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((data) => {
    const photographerModel = new PhotographerFactory(data);
    let userCardDOM = photographerModel.getCardUserDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
/**
 * Initialise l'application.
 */
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}
// Appel la fonction d'initialisation
init();


