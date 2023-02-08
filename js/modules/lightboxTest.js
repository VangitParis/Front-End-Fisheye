export default class LightboxTest {
    constructor() {
        this.index = 0;
       
    }

    getLightbox() {
        /*
         * je vais afficher la lightbox au click sur un media avec display flex ===> OK!
         * je vais boucler sur les medias pour qu'ils renvoient le media sélectionné ===>OK!
         * je vais créer la section lightbox contenant une navigation avec les boutons ==>OK!
         * qui sont des flèches icônes droit-gauche et l'image ou la video ===> OK!
         * je crée un bouton de fermeture ==> OK!
        */

        // je récupère la section lightbox
        const lightbox = document.getElementById("lightbox");
        //je récupère le tableau des medias pour boucler dessus
        const medias = Array.from(document.getElementsByClassName("card_img"));
        //console.log(medias);
        //boucle sur les medias avec forEach
        medias.forEach((media) => {
            media.addEventListener("click", (e) => {
                const isAnImage = e.target.tagName.toLowerCase() === "img";
                lightbox.style.display = "flex";
                const lightboxSection = `
                <button class="lightbox-close-button">
                    <img src="assets/icons/close-lightbox.svg">
                </button>
                <nav>
                    <button data-controls="prev" class="lightbox-prev" aria-label="Voir l'élément précédent" >
                         <img src="assets/icons/arrow-left.svg"></img>
                    </button>
                    <div class="media-container">
                    ${ isAnImage
                        ? `<img class="lightbox-media" src="${ e.target.src }" alt="${ e.target.alt }">`
                        : `<video class="lightbox-media" src="${ e.target.src }" alt="${ e.target.alt }">`
                    }
                    </div>
                    <button data-controls="next" class="lightbox-next" aria-label="Voir l'élément suivant">
                        <img src="assets/icons/arrow-right.svg"></img>
                    </button>
                </nav>
              `
                lightbox.innerHTML = lightboxSection;
                let currentIndex = this.index;
                
                handleControlClick(currentIndex);
                
                closeLightbox();

                
            });
        });
    }
}
    function handleControlClick(currentIndex) {
        /* je vais ajouter des eventListener aux cliques sur les boutons 
        pour afficher le media précédent ou suivant*/
        const medias = Array.from(document.getElementsByClassName("card_img"));
      console.log(medias);
        const buttonLightboxPrev = document.querySelector(".lightbox-prev");
        const buttonLightboxNext = document.querySelector(".lightbox-next");
        
        if (buttonLightboxPrev) {
          buttonLightboxPrev.addEventListener("click", (e) => {
            currentIndex = (currentIndex - 1 + medias.length) % medias.length;
          });
        }
        if (buttonLightboxNext) {
            buttonLightboxNext.addEventListener("click", (e) => {
                currentIndex = (currentIndex + 1) % medias.length;
               
            });
          }


        
    }

function closeLightbox() {
    const lightboxSection = document.getElementById("lightbox");
        const buttonCloseLightbox = document.querySelector(".lightbox-close-button");
        console.log(buttonCloseLightbox);
        if (buttonCloseLightbox) {
          buttonCloseLightbox.addEventListener("click", (e) => {
            lightboxSection.style.display = "none";
          });
        }
        
    }


function startEvent() {
    handleControlClick();
    closeLightbox();

}
startEvent();