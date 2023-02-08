export class VideoFactory {
  constructor(media) {
    this.photographerMedia = media;
    this.video = {
      src: `assets/images/${this.photographerMedia.video}`,
      title: `${this.photographerMedia.title}`,
    };
  }

  createMedia() {
    const video = `<video class="card_img" src= ${this.video.src}
        alt= "${this.video.title}" controls ="true"</video>`;

    //console.log(video);
    return video;
  }
}
