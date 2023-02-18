
import { MediaFactory } from "../factories/mediaFactory.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import Lightbox from "../modules/lightbox.js";
import Likes from "../modules/likes.js";
import List from "../modules/sort.js";

async function getPhotographers() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5500/data/photographers.json"
    );
    const data = await response.json();

    return { photographers: data.photographers, medias: data.media };
  } catch (error) {
    console.error("Error:", error);
  }
}
// ID
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

function displayPhotographerHeader(data) {
  // header main
  const photographerModel = new PhotographerFactory(data);

  const headerUser = photographerModel.getHeaderUserDOM();

  // contact modal name
  const namePhotographerModal = photographerModel.getNameInContactModal();
}

// MEDIAS
async function displayPhotographerMedia(photographers, medias) {
  // récupère le nom du photographe des chemins absolus

  const namePhotographer = photographers.name;
  const name = namePhotographer.replace(/-/g, " ");
  const formattedName = name.split(" ");
  const firstName = formattedName[0];
  const composedFirstName = formattedName[1];
  console.log();
  let displayName;
  if (formattedName.length > 2) {
    displayName = `${firstName} ${composedFirstName}`;
  } else {
    displayName = `${firstName}`;
  }

  //section media
  const mediaSection = document.querySelector(".photograph-media");
  medias.forEach((media) => {
    const imagesPath = `assets/images/${displayName}`;
    const mediaModel = new MediaFactory(media, imagesPath);
    const mediaCardDOM = mediaModel.createMediaCard(media, imagesPath);
  });
}

//Creation Encart Like et Tarif photographer
const main = document.getElementById("main");
const divInsertLikesAndPriceIntoMain = document.createElement("div");
divInsertLikesAndPriceIntoMain.className = "main_likes-price";
main.appendChild(divInsertLikesAndPriceIntoMain);

// PRIX ET LIKE dans l'encart Medias
function displayInsert(data, medias, totalLikes) {
  // encart Price
  const photographerModel = new PhotographerFactory(data);
  const insertPrice = photographerModel.getPrice();

  divInsertLikesAndPriceIntoMain.appendChild(insertPrice);

  //encart Likes
  const mediaModel = new MediaFactory(medias);
  const insertLikes = mediaModel.createTotalLikesElement();
  insertLikes.innerHTML = totalLikes;

  const iconLike = document.createElement("i");
  iconLike.className = "fa-solid fa-heart";
  iconLike.ariaHidden = "true";
  iconLike.ariaLabel = "likes";

  divInsertLikesAndPriceIntoMain.appendChild(iconLike);
  divInsertLikesAndPriceIntoMain.appendChild(insertLikes);
}

// AJOUT LIKES UTILISATEUR DES ARTICLES MEDIAS
async function addLike() {
  const likes = new Likes();
}

//TRI DES MEDIAS
async function sort(medias) {
  const list = new List(medias);
}

// fenêtre de la lightbox
async function displayLightbox(media, photographers) {
  // récupère le nom du photographe des chemins absolus
  const namePhotographer = photographers.name;
  const name = namePhotographer.replace(/-/g, " ");
  const formattedName = name.split(" ");
  const firstName = formattedName[0];
  const composedFirstName = formattedName[1];
  console.log();
  let displayName;
  if (formattedName.length > 2) {
    displayName = `${firstName} ${composedFirstName}`;
  } else {
    displayName = `${firstName}`;
  }

  const pathName = `assets/images/${displayName}`;
  const lightboxModel = new Lightbox(media, pathName);
  const lightboxDOM = lightboxModel.createLightboxDOM();
}

// Appel des fonctions du script
async function run() {
  const params = new URLSearchParams(location.search);
  const photographerId = parseInt(params.get("id"));
  const [photographerFindProfil, photographerMedias, totalLikes] =
    await getPhotographersId(photographerId);
  displayPhotographerHeader(photographerFindProfil);
  displayPhotographerMedia(photographerFindProfil, photographerMedias);
  displayInsert(photographerFindProfil, photographerMedias, totalLikes);
  addLike();
  sort(photographerMedias);
  displayLightbox(photographerMedias, photographerFindProfil);
}

run();
