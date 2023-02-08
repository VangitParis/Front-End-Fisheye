export class PictureFactory {
  constructor(media) {
    this.photographerMedia = media;
    //console.log( this.photographerMedia.title );
    this.image = {
      src: `assets/images/${this.photographerMedia.image}`,
      title: `${this.photographerMedia.title}`,
    };
  }

  createMedia() {
    const image = `<img class="card_img" src= ${this.image.src}
            alt= "${this.image.title}" controls ="false"</img>`;
    //console.log(image);
    return image;
  }
}
