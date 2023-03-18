import { PictureFactory } from "../factories/pictureFactory.js";
import { VideoFactory } from "../factories/videoFactory.js";
/**
 * @property {HTMLElement} lightbox
 * @property {string[]} medias chemins des images ou videos de la lightbox
 */
export default class Lightbox {
  /**
   *
   * @param {string} url
   *
   */
  constructor(url, pathName) {
    this.currentIndex = 0;
    this.path = pathName;
    this.gallery = url;
    this.id = url[this.currentIndex].id;
    this.photographerId = url[this.currentIndex].photographerId;
    this.title = url[this.currentIndex].title;
    this.currentLink = null;
    this.lightbox = this.createLightboxDOM();
    this.onKeyUp = this.onKeyUp.bind(this);
    this.init();
  }

  /**
   * new Lightbox
   */
  init() {
    const linksOfGallery = Array.from(
      document.querySelectorAll("figure > a[href]")
    );
    // récupérer l'identifiant du media de la lightbox à partir de l'URL actuelle
    const urlParams = new URLSearchParams(window.location.search);
    const lightboxImageId = urlParams.get("lightbox.html?id");
    // si un identifiant d'image est présent dans l'URL, supprimer les paramètres de requête pour la lightbox quand on rafraîchit la page
    if (lightboxImageId !== null) {
      const originalUrl = "photographer.html?id=" + this.photographerId;
      window.history.replaceState(null, null, originalUrl);
    }

    linksOfGallery.forEach((elementLink, index) => {
      elementLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.currentIndex = index;
        this.id = this.gallery[index].id;
        this.title = this.gallery[index].title;
        this.photographerId = this.gallery[index].photographerId;
        this.currentLink = elementLink;
        window.history.replaceState(null, null, this.currentLink);
        this.showMedias();
        this.open();
      });
    });
  }

  /**
   * Ouvre la lightbox et cache le contenu principal du document pour des raisons d'accessibilité
   */
  open() {
    this.lightbox.style.display = "block";
    // masquer les éléments du main pour rester focus sur la lightbox
    const main = document.getElementById("main");
    main.appendChild(this.lightbox);
    this.lightbox.addEventListener("keyup", this.onKeyUp);
    main.classList.add("no-scroll");
    main.setAttribute("aria-hidden", "false");
    // Fonction qui donne le focus au premier élément de la modal
    const lightboxContent =
      document.getElementsByClassName("lightbox-content")[0];
    lightboxContent.focus();
    //empêcher de perdre le focus
    const focusableElements = lightboxContent.querySelectorAll(
      "button, a[href], input, select, textarea [tabindex]:not([tabindex=\"-1\"])"
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    lightboxContent.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } /* tab */ else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
  /**
   * Création de l'élément HTML pour une image
   * @returns {HTMLImageElement}
   */
  createImageElement() {
    const path = this.path;
    const imageFactory = new PictureFactory(
      this.gallery[this.currentIndex],
      path
    );
    const image = imageFactory.createImageElement();
    return image;
  }

  /**
   * Création de l'élément HTML pour une vidéo
   * @returns {HTMLVideoElement}
   */
  createVideoElement() {
    const path = this.path;
    const videoFactory = new VideoFactory(
      this.gallery[this.currentIndex],
      path
    );
    const video = videoFactory.createVideoElement();
    return video;
  }

  /**
   * Affiche les médias dans la lightbox en fonction de l'index courant de la galerie
   */
  showMedias() {
    const path = this.path;
    const container = this.lightbox.getElementsByClassName(
      "lightbox-media-container"
    )[0];
    container.innerHTML = "";
    const video = this.createVideoElement(path);
    const image = this.createImageElement(path);

    if (this.gallery[this.currentIndex].image) {
      container.innerHTML = `${image}`.replace(
        "<",
        "<img tabindex=\"0\" class=\"lightbox-media\""
      );
    } else {
      container.innerHTML = `${video}`.replace(
        "<",
        "<video controls tabindex=\"0\" class=\"lightbox-media\" aria-label=\"Vous pouvez lire cette video\"" 
      );
    }
    //Affiche le titre du média
    if (this.gallery[this.currentIndex].title) {
      const title = document.createElement("h1");
      title.textContent = this.title;
      title.className = "lightbox-title";
      container.appendChild(title);
    }
  }

  /**
   * Création du squelette HTML de la lightbox
   * @returns {HTMLElement} élément HTML représentant la lightbox
   */
  createLightboxDOM() {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
    <div class="lightbox-content" tabindex="0" role="dialog" aria-labelledby="lightbox-title" aria-modal="true" aria-hidden="false">
    <h2 id="lightbox-title" class="sr-only">Galerie d'images</h2>
    <div class="lightbox-header">
        <button class="lightbox-close" tabindex="0" aria-labelledby="image-icon-title">
            <img class="icon-img-close" src="assets/icons/close-lightbox.svg" alt="">
            <span id="image-icon-title" class="sr-only">Fermer la galerie d'images</span>
        </button>
    </div>
    <div class="lightbox-body">
        <div class="lightbox-controls">
            <button class="lightbox-prev" tabindex="0" aria-labelledby="image-icon-prev">
                <img class="icon-img-arrow" src="assets/icons/arrow-left.svg" alt="">
                <span id="image-icon-prev" class="sr-only">Image précédente</span>
            </button>
            <div class="lightbox-media-container"></div>
            <button class="lightbox-next" tabindex="0" aria-labelledby="image-icon-next">
                <img class="icon-img-arrow" src="assets/icons/arrow-right.svg" alt="">
                <span id="image-icon-next" class="sr-only">Image suivante</span>
            </button>
        </div>
    </div>
</div>
`;

    lightbox
      .querySelector(".lightbox-close")
      .addEventListener("click", this.close.bind(this));
    lightbox
      .querySelector(".lightbox-prev")
      .addEventListener("click", this.prev.bind(this));
    lightbox
      .querySelector(".lightbox-next")
      .addEventListener("click", this.next.bind(this));
    return lightbox;
  }

  /**
   *
   * @param {MouseEvent/KeyboardEvent} e Ferme la lightbox par l’événement clic ou touche du clavier
   */
  close(e) {
    e.preventDefault();
    e.stopPropagation();
    this.lightbox.style.display = "none";
    const originalUrl = "photographer.html?id=" + this.photographerId;
    window.history.replaceState(null, null, originalUrl);
    this.lightbox.ariaHidden = "true";
    const main = document.getElementById("main");
    main.removeAttribute("aria-hidden");
    main.classList.remove("no-scroll");
    // ajouter le focus au dernier media consulté avant ouverture de la lightbox
    if (this.currentLink) {
      this.currentLink.focus();
    }
    document.removeEventListener("keyup", this.onKeyUp);
  }
  /**
   * Passe au media suivant
   * @param {MouseEvent}e
   */
  next(e) {
    e.preventDefault();
    e.stopPropagation();
    const gallery = this.gallery;
    this.currentIndex = (this.currentIndex + 1) % gallery.length;
    this.title = gallery[this.currentIndex].title;
    // met a jour l'url du media
    this.newUrl =
      "photographer.html?id=" +
      this.photographerId +
      "&lightbox.html?id=" +
      gallery[this.currentIndex].id;
    window.history.replaceState(null, null, this.newUrl);
    this.showMedias(this.currentIndex);
  }

  /**
   * Reviens au média précédent
   * @param {MouseEvent}e
   */
  prev(e) {
    e.preventDefault();
    e.stopPropagation();
    const gallery = this.gallery;
    this.currentIndex =
      (this.currentIndex - 1 + gallery.length) % gallery.length;
    this.title = gallery[this.currentIndex].title;
    this.newUrl =
      "photographer.html?id=" +
      this.photographerId +
      "&lightbox.html?id=" +
      gallery[this.currentIndex].id;
    window.history.replaceState(null, null, this.newUrl);
    this.showMedias(this.currentIndex);
  }
  /**
   * Lecture de l'élément vidéo.
   *
   * @param {Event} e - L'événement de clic ou de touche qui a déclenché la lecture.
   * @returns {undefined} ne renvoi rien : met en lecture l'élément video
   */
  play(e) {
    e.preventDefault();
    this.createVideoElement.play();
  }

  /**
   * Ferme la lightbox et navigue entre les medias au clavier
   * @param {KeyboardEvent} e L'événement clavier qui a été déclenché.
   */
  onKeyUp(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "Space") {
      this.play(e);
    }
  }
}
