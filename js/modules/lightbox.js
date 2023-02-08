export default class Lightbox {
  constructor(data) {
    this.index = 0;
    this.data = data;
  }
  getLightbox() {
    //Déclaration des constantes globales
    const main = document.getElementById("main");
    const lightboxSection = document.getElementById("lightbox");
    main.appendChild(lightboxSection);

    const medias = Array.from(document.querySelectorAll(".card_img"));
    // Boucle sur les médias afin de trouver les images ou videos correspondantes
      let mediaToAdd = ''
    medias.forEach((media) => {
      media.addEventListener("click", (e) => {
        // define whether we have an image or a video
        const isAnImage = e.target.tagName.toLowerCase() === "img";
        console.log(e.target.tagName, isAnImage);
        /*
          mediaToAdd = `
          ${ isAnImage ? '<img class=".lightbox-media">' : '<video class=".lightbox-media">'}
        `
        */
        /*
          const test = `    <section>
      <div>
        <nav class="${isAnImage ? 'class1' :'class2' }"></nav>
      </div>
    </section>`*/

        let mediaVideo;
        let mediaImage = document.querySelector(".lightbox-media");
        //Section lightbox en display = flex pour l'afficher
        lightboxSection.style.display = "flex";
        lightboxSection.setAttribute(
          "aria-label",
          "Carousel d'images, closeup view"
        );
        lightboxSection.setAttribute("aria-hidden", true);
        lightboxSection.setAttribute("role", "dialog");

        const mediaContainer = document.createElement("div");
        mediaContainer.className = "media-container";

        // Création élément nav pour les boutons et images
        const navCarousel = document.createElement("nav");

        if (!mediaImage && !mediaVideo) {
          console.log(e.target.localName);
          if (e.target.tagName === "VIDEO") {
            mediaVideo = document.createElement("video");
            mediaVideo.src = e.target.src;
            mediaVideo.alt = e.target.alt;
            mediaVideo.classList.add("lightbox-media-video");
            mediaVideo.controls = true;
            mediaContainer.appendChild(mediaVideo);
          } else {
            mediaImage = document.createElement("img");
            mediaImage.src = e.target.src;
            mediaImage.alt = e.target.alt;
            mediaImage.classList.add("lightbox-media");
            mediaContainer.appendChild(mediaImage);
          }

          lightboxSection.appendChild(mediaContainer);
          lightboxSection.appendChild(navCarousel);

          // Création des boutons de navigation entre les medias
          const buttonPrev = document.createElement("button");
          buttonPrev.setAttribute("data-controls", "prev");
          buttonPrev.className = "lightbox-prev";
          buttonPrev.setAttribute("aria-label", "Voir l'élément précédent");
          // Flèche du bouton précédent
          const arrowPrev = document.createElement("img");
          arrowPrev.src = "assets/icons/arrow-left.svg";
          buttonPrev.appendChild(arrowPrev);
          //Écoute au click du bouton précédent
          buttonPrev.addEventListener("click", (e) => {
            e.preventDefault();
            this.index = (this.index - 1 + medias.length) % medias.length;
            if (e.target.localName[this.index] === "video") {
              mediaVideo.src = medias[this.index].src;
              mediaVideo.alt = medias[this.index].alt;
              mediaVideo.controls = true;
              mediaContainer.appendChild(mediaVideo);
            } else {
              mediaImage.src = medias[this.index].src;
              mediaImage.alt = medias[this.index].alt;
              mediaImage.controls = false;
              mediaContainer.appendChild(mediaImage);
            }
          });

          const buttonNext = document.createElement("button");
          buttonNext.setAttribute("data-controls", "next");
          buttonNext.className = "lightbox-next";
          buttonNext.setAttribute("aria-label", "Voir l'élément suivant");
          // Flèche du bouton suivant
          const arrowNext = document.createElement("img");
          arrowNext.src = "assets/icons/arrow-right.svg";
          buttonNext.appendChild(arrowNext);
          //Écoute au click bu bouton suivant
          buttonNext.addEventListener("click", (e) => {
            e.preventDefault();
            this.index = (this.index + 1) % medias.length;
            if (e.target.localName[this.index] === "video") {
              mediaVideo.src = medias[this.index].src;
              mediaVideo.alt = medias[this.index].alt;
              mediaVideo.controls = true;
              mediaContainer.appendChild(mediaVideo);
            } else {
              mediaImage.src = medias[this.index].src;
              mediaImage.alt = medias[this.index].alt;
              mediaImage.controls = false;
              mediaContainer.appendChild(mediaImage);
            }
          });

          navCarousel.appendChild(buttonPrev);
          navCarousel.appendChild(mediaContainer);
          navCarousel.appendChild(buttonNext);
          //mediaContainer.appendChild(mediaImage || mediaVideo);
        } //Affiche le média si l'utilisateur a déjà cliqué sur un média
        else {
          if (e.target.localName === "video") {
            mediaVideo.controls = true;
            mediaVideo.src = e.target.src;
            mediaVideo.alt = e.target.alt;
            mediaContainer.appendChild(mediaVideo);
          } else {
            mediaImage.src = e.target.src;
            mediaImage.alt = e.target.alt;
            mediaContainer.appendChild(mediaImage);
          }
        }
      });
    });

      // jesaispaquoi.innerHtml = mediaToAdd
  }

  closeLightbox() {
    const buttonCloseLightbox = document.querySelector(
      ".lightbox-close-button"
    );
    const lightboxSection = document.getElementById("lightbox");

    buttonCloseLightbox.addEventListener("click", () => {
      lightboxSection.style.display = "none";
    });
  }
}
