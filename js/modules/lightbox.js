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
    this.lightbox = this.createLightboxDOM();
    this.onKeyUp = this.onKeyUp.bind(this);
    const main = document.getElementById("main");
    main.appendChild(this.lightbox);
    main.addEventListener("keyup", this.onKeyUp);
    this.init();
    this.showMedias();
  }

  /**
   * new Lightbox
   */
  init() {
    const linksOfGallery = Array.from(
      document.querySelectorAll("figure > a[href]")
    );
    linksOfGallery.forEach((elementLink, index) => {
      elementLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.currentIndex = index;
        this.showMedias();
        this.id;
        this.open();
        
      });
    });
  }

  /**
   * Ouvre la lightbox
   */
  open() {
    this.lightbox.style.display = "flex";
   
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
   * Affiche les médias dans la lightbox
   */
  showMedias() {
    const path = this.path;
    const container = this.lightbox.querySelector(".lightbox-media-container");
    container.innerHTML = "";
    const video = this.createVideoElement(path);
    const image = this.createImageElement(path);

    if (this.gallery[this.currentIndex].image) {
      container.innerHTML = `${image}`.replace(
        "<",
        "<img class=\"lightbox-media\""
      );
    } else {
      container.innerHTML = `${video}`.replace(
        "<",
        "<video class=\"lightbox-media\""
      );
    }
  }

  /**
   * Création du squelette HTML de la lightbox
   * @returns {HTMLElement} la lightbox
   */
  createLightboxDOM() {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">
                <img src="assets/icons/close-lightbox.svg"/>
            </button>
            <div>
                <button class="lightbox-next">
                    <img src="assets/icons/arrow-right.svg"/>
                </button>
                <div class="lightbox-media-container"></div>

                <button class="lightbox-prev">
                    <img src="assets/icons/arrow-left.svg"/>
                </button>
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
   * @param {KeyboardEvent} e Ferme la lightbox et navigue entre les images au clavier
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
  /**
   *
   * @param {MouseEvent/KeyboardEvent} e Ferme la lightbox
   */
  close(e) {
    e.preventDefault();
    this.lightbox.style.display = "none";
    document.removeEventListener("keyup", this.onKeyUp);
  }
  /**
   * Passe au media suivant
   * @param {MouseEvent}e
   */
  next(e) {
    e.preventDefault();
    const gallery = this.gallery;
    this.currentIndex = (this.currentIndex + 1) % gallery.length;
    this.showMedias(this.currentIndex);
  }
  /**
   * Reviens au média précédent
   * @param {MouseEvent}e
   */
  prev(e) {
    e.preventDefault();
    const gallery = this.gallery;
    console.log(this.currentIndex);
    this.currentIndex =
      (this.currentIndex - 1 + gallery.length) % gallery.length;
    this.showMedias(this.currentIndex);
  }
}
