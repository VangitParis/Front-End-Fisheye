import { MediaFactory } from "../factories/mediaFactory.js";
import { PhotographerFactory } from "../factories/PhotographerFactory.js";

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
async function displayPhotographerMedia(medias) {
  //section media
  const mediaSection = document.querySelector(".photograph-media");
  medias.forEach((media) => {
    const mediaModel = new MediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
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
  const insertLikes = mediaModel.getLikes();
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
 
  const buttonLike = document.querySelectorAll(".button-like");

  for (let i = 0; i < buttonLike.length; i++) {
    let liked = false;
    buttonLike[i].addEventListener("click", (e) => {
      e.preventDefault();
      
      const parent = e.target.closest(".figcaption-likes-icon");
      const element = parent.querySelector(".likes");
      const likes = parseInt(element.innerHTML);

      let totalLikes = parseInt(document.getElementById("total_likes").innerHTML);

      console.log(totalLikes);
     
      if (!liked) {
        //console.log("test incrémentation");
        alert("1 like")
        const likedByUser = likes + 1;
        element.innerHTML = likedByUser;
        
        document.getElementById("total_likes").innerText = `${ totalLikes + 1 }`;
 
        return liked = true;
      }
      else if (liked) {
        //console.log(liked);
        alert("1 dislike")
        const dislikedByUser = likes;
        element.innerHTML = dislikedByUser - 1;
      
        document.getElementById("total_likes").innerText = `${ totalLikes - 1 }`;
        return liked = false
      }
    })
  }
}


// Appel des fonctions du script
async function run() {
  const params = new URLSearchParams(location.search);
  const photographerId = parseInt(params.get("id"));
  const [photographerFindProfil, photographerMedias, totalLikes] =
    await getPhotographersId(photographerId);
  displayPhotographerHeader(photographerFindProfil);
  displayPhotographerMedia(photographerMedias);
  displayInsert(photographerFindProfil, photographerMedias, totalLikes);
  addLike();
}

run();
