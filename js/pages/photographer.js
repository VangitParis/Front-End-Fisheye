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
//* ID  */
async function getPhotographersId(id) {
  const { photographers, medias } = await getPhotographers();

  const photographerFindProfil = photographers.find(
    (photographer) => photographer.id === id
  );

  const photographerMedias = medias.filter(
    (media) => media.photographerId === id
  );
  // TODO
  const likesFromArray = photographerMedias.map((media) => media.likes);


  return [photographerFindProfil, photographerMedias];
}
//ajout d'une div dans le main pour l'encart contenant le prix et les likes
let main = document.getElementById("main");
let divInsertLikesAndPriceIntoMain = document.createElement("div");
divInsertLikesAndPriceIntoMain.className = "main_likes-price";
main.appendChild(divInsertLikesAndPriceIntoMain);

function displayPhotographerHeader(data) {
  // header main 
  const photographerModel = photographerFactory(data);
  let headerUser = photographerModel.getHeaderUserDOM();
  // encart Price
  let insertPrice = photographerModel.getPrice();
  divInsertLikesAndPriceIntoMain.appendChild(insertPrice);
  //contact modal name
  let namePhotographerModal = photographerModel.getNameInContactModal();

}

//*MEDIAS ET LIKE dans l'encart */
async function displayPhotographerMedia(medias) {
  //encart likes
  const insertMediaLikes = mediaFactory(medias);
  let insertLikes = insertMediaLikes.getLikes();
  divInsertLikesAndPriceIntoMain.appendChild(insertLikes);

  //section media 
  let mediaSection = document.querySelector(".photograph-media");
  medias.forEach((media) => {
    let mediaModel = mediaFactory(media);
    let mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

//* LIKES DES ARTICLES MEDIAS*/

async function addLike() {
  //TODO


  
}

//** Appel des fonctions du script */
async function run() {
  const params = new URLSearchParams(location.search);
  const photographerId = parseInt(params.get("id"));
  const [photographerFindProfil, photographerMedias] = await getPhotographersId(
    photographerId
  );
  displayPhotographerHeader(photographerFindProfil);
  displayPhotographerMedia(photographerMedias);
  //addLike();
}

run();
