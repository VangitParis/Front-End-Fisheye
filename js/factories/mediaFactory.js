import { PictureFactory } from "./pictureFactory.js";
import { VideoFactory } from "./videoFactory.js";
/**
 * @property {string} totalLikes nombre total des likes
 * @property {string} id Identifiant du media
 * @property {string} photographerId Identifiant du photographe
 * @property {string} photographerMedia  un media du photographe
 * @param {string[]} media un media du photographe
 * @param {string} path chemin des images ou des videos
 */
export class MediaFactory {
  constructor(media, imagePath) {
    this.imagePath = imagePath;
    this.photographerMedia = media;
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.totalLikes = `${this.photographerMedia.likes}`;
  }

  /**
   *
   * @param {string[]} media
   * @returns {HTMLImageElement|HTMLVideoElement} image ou video
   */
  createImage(media) {
    const path = this.imagePath;
    if (this.photographerMedia.image) {
      return new PictureFactory(media, path).createImageElement();
      } else {
        return new VideoFactory(media, path).createVideoElement();
      }
    }
  
  /**
   *
   * @param {string[]} media
   */
  createMediaCard(media) {
    const element = this.createImage(media);
    const mediaElement = this.photographerMedia.image;
    // Ajouter la classe "card_media" à la string "element"
    const elementWithClass = `${element}`.replace(
      "<",
      `<${mediaElement ? "img" : "video" } class="card_media" `
    );

    const article = `
    <article class="card_article" title="${this.photographerMedia.title}">
      <figure>
        <a href="photographer.html?id=${this.photographerId}#lightbox&amp;lightbox.html?id=${this.id}" aria-label="image closeup view" tabindex="0" role="link">
        ${elementWithClass}
        </a>
        <figcaption>
          <h2 class="card_title">${this.photographerMedia.title}</h2>
          <div class="figcaption-likes-icon">
            <button class="button-like" aria-label="press the button to like or unlike" aria-pressed="false" tabindex="0">
              <p class="likes">${this.photographerMedia.likes}</p>
              <i class="fa fa-heart" aria-hidden="true" aria-label="likes">
              </i>
            </button>
          </div>
        </figcaption>
      </figure>
    </article>`;

    const mediaSection = document.getElementById("photograph-media");
    mediaSection.innerHTML += article;
  }

  /**
   *
   * @returns {HTMLParagraphElement} le total des likes dans l'encart en bas de page
   */
  createTotalLikesElement() {
    const insertTotalLikes = document.createElement("p");
    insertTotalLikes.id = "total_likes";

    return insertTotalLikes;
  }
}
