import { PhotographerFactory } from "../factories/photographerFactory.js";
/**
 * Obtient les données des photographes via une requête fetch.
 * @returns {Promise<Object>} - Un objet contenant les photographes.
 */
async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
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
  const photographersSection = document.getElementById("photographer_section");
  const newSection = document.createElement("section");

  // Copie des attributs de l'élément existant dans le nouvel élément
  newSection.id = photographersSection.id;
  newSection.className = photographersSection.className;
  newSection.innerHTML = photographersSection.innerHTML;

  // Remplacement de l'élément existant par le nouvel élément
  photographersSection.replaceWith(newSection);

  photographers.forEach((data) => {
    const photographerModel = new PhotographerFactory(data);
    let userCardDOM = photographerModel.getCardUserDOM();
    newSection.appendChild(userCardDOM);
  });
}
/**
 * Initialise l'application.
 */
async function init() {
 
  const { photographers } = await getPhotographers();
  displayData(photographers);
  // fonction loader spinner
  const loaderContainer = document.querySelector(".loader-container");
  setTimeout(function () {
    loaderContainer.classList.add("done");
    setTimeout(function() {
      loaderContainer.classList.add("hidden");
      document.body.classList.remove("loading"); // restaure le contenu de la page
    }, 300); // laissez un petit délai pour que la transition CSS s'effectue avant de cacher complètement le loader
  }, 1500);
  
}
// Appel la fonction d'initialisation
init();
