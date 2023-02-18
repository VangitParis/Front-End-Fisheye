/**
 *  @property {string} id Identifiant du media
 *  @property {string} photographerMedia Tableau des medias
 *  @param {string} path chemin de l'image
 *  @param {string[]} media Tableau des medias du fichier json
 */
export class PictureFactory {
  constructor(media, path) {
    this.path = path;
    console.log(this.path);
    this.photographerMedia = media;
    this.mediaId = media.id;
    this.image = {
      id: `${this.photographerMedia.id}`,
      src: this.path + "/" + this.photographerMedia.image,
      title: `${this.photographerMedia.title}`,
    };
  }
  /**
   *
   * @returns {HTMLImageElement} image
   */
  createImageElement() {
    const image = `<id=${this.mediaId} src="${this.image.src}"
    alt="${this.image.title}" />`;
    return image;
  }
}
