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

async function getPhotographersId(id) {
  const { photographers, medias } = await getPhotographers();

  const photographerFindProfil = photographers.find(
    (photographer) => photographer.id === id
  );

  const photographerMedias = medias.filter(
    (media) => media.photographerId === id
  );

  const likesArray = photographerMedias.map((media) => media.likes);
  const sumOfLikes = likesArray.reduce((a, b) => a + b, 0);

  return [photographerFindProfil, photographerMedias, sumOfLikes];
}
//ajout d'une div dans le main pour l'encart contenant le prix et les likes
const main = document.getElementById("main");
const divInsertLikesAndPriceIntoMain = document.createElement("div");
divInsertLikesAndPriceIntoMain.className = "main_likes-price";
main.appendChild(divInsertLikesAndPriceIntoMain);

function displayPhotographerHeader(data) {
  // header main 
  const photographerModel = photographerFactory(data);
  const headerUser = photographerModel.getHeaderUserDOM();
  // encart Price
  const insertPrice = photographerModel.getPrice();
  divInsertLikesAndPriceIntoMain.appendChild(insertPrice);
}

async function displayPhotographerMedia(medias) {
  //encart likes
  const insertMediaLikes = mediaFactory(medias);
  const insertLikes = insertMediaLikes.getLikes();
  divInsertLikesAndPriceIntoMain.appendChild(insertLikes);

  //section media 
  const mediaSection = document.querySelector(".photograph-media");
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

//Appel des fonctions du script
async function run() {
  const params = new URLSearchParams(location.search);
  const photographerId = parseInt(params.get("id"));
  const [photographerFindProfil, photographerMedias] = await getPhotographersId(
    photographerId
  );
  displayPhotographerHeader(photographerFindProfil);
  displayPhotographerMedia(photographerMedias);
  //addLike();
  // sortMedias(photographerMedias);
  // globalLightboxListeners();
}

run();
