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
   const video =` <video aria-label="${this.video.title}">
    <source src="${this.video.src }" alt="${ this.video.title}" type="video/mp4">
    <track kind="description" srclang="fr">
  </video>
  
    
`;
    return video;
  }
}
