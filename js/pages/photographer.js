import { MediaFactory } from "../factories/mediaFactory.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import Lightbox from "../modules/lightbox.js";
import Likes from "../modules/likes.js";
import SortMedias from "../modules/sort.js";

/**
 * Récupère les données des photographes et des médias à partir d'un fichier JSON
 * @returns {Promise<Object>} Une promesse contenant un objet avec les propriétés "photographers" et "medias"
 */
async function getPhotographers() {
  try {
    const response = await fetch(
      "data/photographers.json" 
    );
    const data = await response.json();

    return { photographers: data.photographers, medias: data.media };
  } catch (error) {
    console.error("Error:", error);
  }
}
/**
 * Récupère les informations d'un photographe en fonction de son ID
 * @param {number} id - L'ID du photographe à récupérer
 * @returns {Promise<Array>} Une promesse contenant un tableau avec les données du photographe, ses médias et le total de likes de ses médias
 */
async function getPhotographersId(id) {
  const { photographers, medias } = await getPhotographers();

  const photographerFindProfil = photographers.find(
    (photographer) => photographer.id === id
  );

  const photographerMedias = medias.filter(
    (media) => media.photographerId === id
  );

  const totalLikesArray = photographerMedias.map((media) => media.likes);
  const totalLikes = totalLikesArray.reduce((a, b) => a + b, 0);

  return [photographerFindProfil, photographerMedias, totalLikes];
}
/**
 * Affiche le header du photographe.
 * @param {Object} data - Les données du photographe.
 * @function
 */
function displayPhotographerHeader(data) {
  // Instancie le modèle du photographe
  const photographerModel = new PhotographerFactory(data);
  // Récupère le DOM du header utilisateur
  photographerModel.getHeaderUserDOM();
  // Récupère le nom du photographe dans le modal de contact
  photographerModel.getNameInContactModal();
}

/**
 * Affiche les médias du photographe
 * @param {Object} photographer - Les données du photographe
 * @param {Array} medias - Les médias du photographe
 * @function
 */
async function displayPhotographerMedia(photographer, medias) {
  const namePhotographer = photographer.name;
  const name = namePhotographer.replace(/-/g, " ");
  const formattedName = name.split(" ");
  const firstName = formattedName[0];
  const composedFirstName = formattedName[1];
  const photographerName =
    formattedName.length > 2
      ? `${firstName} ${composedFirstName}`
      : `${firstName}`;

  // Crée les cartes pour chaque média
  medias.forEach((media) => {
    const imagesPath = `assets/images/${photographerName}`;
    const mediaModel = new MediaFactory(media, imagesPath);
    mediaModel.createMediaCard(media, imagesPath);
  });
}

//Creation DOM Encart Like et Tarif photographer
const main = document.getElementById("main");
const asideInsertLikesAndPriceIntoMain = document.createElement("aside");
asideInsertLikesAndPriceIntoMain.className = "main_likes-price";
main.appendChild(asideInsertLikesAndPriceIntoMain);

/**
 * Affiche le bloc "Likes" et "Tarif" du photographe
 * @param {Object} data - Les données du photographe
 * @param {Array} medias - Les médias du photographe
 * @param {number} totalLikes - Le nombre total de likes des médias du photographe
 */
function displayInsert(data, medias, totalLikes) {
  // Bloc "Likes"
  const mediaModel = new MediaFactory(medias, totalLikes);
  const insertLikes = mediaModel.createTotalLikesElement(totalLikes);
  asideInsertLikesAndPriceIntoMain.innerHTML += insertLikes;
   // Bloc "Tarif"
   const photographerModel = new PhotographerFactory(data);
   const insertPrice = photographerModel.getPrice();
   asideInsertLikesAndPriceIntoMain.appendChild(insertPrice);
}

/**
 * Ajoute un objet Likes pour chaque média pour lequel l'utilisateur clique sur le bouton "j'aime"
 * @async
 * @function addLike
 * @returns {Promise<void>}
 */
async function addLike() {
  new Likes();
}

/**
 * Trie les médias en fonction du tri sélectionné par l'utilisateur
 * @async
 * @function sort
 * @param {Array<Object>} medias - Un tableau d'objets contenant des informations sur les médias
 * @returns {Promise<void>}
 */
async function sort(medias) {
  new SortMedias(medias);
}

/**
 * Affiche la fenêtre modale de la lightbox pour un média spécifique
 * @async
 * @function displayLightbox
 * @param {Object} media - L'objet contenant des informations sur le média sélectionné
 * @param {Object} photographers - L'objet contenant des informations sur le photographe correspondant
 * @returns {Promise<void>}
 */
async function displayLightbox(media, photographers) {
  const namePhotographer = photographers.name;
  const name = namePhotographer.replace(/-/g, " ");
  const formattedName = name.split(" ");
  const firstName = formattedName[0];
  const composedFirstName = formattedName[1];
  const photographerName =
    formattedName.length > 2
      ? `${firstName} ${composedFirstName}`
      : `${firstName}`;
  const pathName = `assets/images/${photographerName}`;
  const lightboxModel = new Lightbox(media, pathName);
  lightboxModel.createLightboxDOM();
}

/**
 * Fonction principale qui appelle toutes les autres fonctions du script pour afficher la page d'un photographe
 * @async
 * @function run
 * @returns {Promise<void>}
 */
async function run() {
  const params = new URLSearchParams(location.search);
  const photographerId = parseInt(params.get("id"));
  const [photographerFindProfil, photographerMedias,totalLikes] =
    await getPhotographersId(photographerId);
  displayPhotographerHeader(photographerFindProfil);
  displayPhotographerMedia(photographerFindProfil, photographerMedias);
  displayInsert(photographerFindProfil, photographerMedias, totalLikes);
  addLike();
  sort(photographerMedias);
  displayLightbox(photographerMedias, photographerFindProfil);
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

run();
