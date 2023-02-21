/**
 * @property { string } id Identifiant du media
 * @property {string} photographerMedia Tableau des medias
 * @param {string} path chemin de la video
 * @param {string[]} media Tableau des medias du fichier json
 */

export class VideoFactory {
  constructor(media, path) {
    this.path = path;
    this.photographerMedia = media;
    this.mediaId = media.id;
    this.video = {
      src: this.path + "/" + this.photographerMedia.video,
      title: `${this.photographerMedia.title}`,
    };
  }
  /**
   *
   * @returns {HTMLVideoElement} video
   */
  createVideoElement() {
    const video = `<id=${this.mediaId} controls="true"/> <source src="${this.video.src}"
    alt="${this.video.title}"/>`;
    return video;
  }
}
