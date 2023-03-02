export class VideoFactory {
  constructor(media, path) {
    this.path = path;
    this.photographerMedia = media;
    this.mediaId = media.id;
    this.src = this.path + "/" + this.photographerMedia.video;
    this.video = {
      src: this.src,
      title: `${this.photographerMedia.title}`,
     
    };
   
  }

  /**
   * @returns {HTMLVideoElement} video
   */
  createVideoElement() {
    const video = `<id=${this.mediaId} aria-label="${this.video.title}"
      tabindex="0"><source src="${this.video.src}"
    alt="${this.video.title}" type="video/mp4" aria-label="${this.video.title}"/>`;
    return video;
  }
}
