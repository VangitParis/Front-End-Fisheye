import { PictureFactory } from "./pictureFactory.js";
import { VideoFactory } from "./videoFactory.js";

export class MediaFactory {
  constructor(media) {
    this.photographerMedia = media;
    let videoFactory = new VideoFactory(media);
    this.video = videoFactory.createMedia();
    let imageFactory = new PictureFactory(media);
    this.image = imageFactory.createMedia();
    this.totalLikes = `${this.photographerMedia.likes}`;
  }

  isVideo() {
    if (this.photographerMedia.video) {
      return this.video;
    } else {
      return this.image;
    }
  }

  getMediaCardDOM() {
    const media = this.isVideo();
    //console.log(media);
    const article = `
    <article class="card_article" title="${this.photographerMedia.title}">
      <figure>
      <a href="#lightbox" aria-label="image closeup view" tabindex="0" role="link">
      ${media}
   </a>
        <figcaption>
          <h2 class="card_title">${this.photographerMedia.title}</h2>
          <div class="figcaption-likes-icon">
            <button class="button-like" aria-label="press the button to like or unlike" aria-pressed="false" tabindex="0">
              <p class="likes">${this.photographerMedia.likes}</p>
              <i class="fa fa-heart" aria-hidden="true" aria-label="likes">
              </path>
              </i>
            </button>
          </div>
        </figcaption>
      </figure>
    </article>`;

    const mediaSection = document.querySelector(".photograph-media");
    mediaSection.innerHTML += article;
  }

  // Création du LIKE dans l'encart de la page photographer.html
  getLikes() {
    const insertTotalLikes = document.createElement("p");
    insertTotalLikes.id = "total_likes";

    return insertTotalLikes;
  }
}
