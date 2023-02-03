export class MediaFactory {
  constructor(media) {
    this.photographerMedia = media;

    this.picture = `assets/images/${this.photographerMedia.image}`;
    this.video = `assets/images/${this.photographerMedia.video}`;
    this.totalLikes = `${this.photographerMedia.likes}`;
  }

  // gestion du cas où c'est une video ou une image
  isVideo() {
    let img;
    this.photographerMedia.video
      ? ((img = document.createElement("video")),
        img.setAttribute("src", this.video))
      : ((img = document.createElement("img")),
        img.setAttribute("src", this.picture));

    img.classList.add("card_img");
    img.alt = `${this.photographerMedia.title}`;

    return { img };
  }

  // Création des articles medias
  getMediaCardDOM() {
    this.isVideo();
    const result = this.isVideo();
    const myImg = result.img;

    const mediaSection = document.querySelector(".photograph-media");
    const article = document.createElement("article");
    article.className = "card_article"
    article.title = `${this.photographerMedia.title}`;

    const figure = document.createElement("figure");

    const imgLink = document.createElement("a");
    imgLink.href = "#";
    imgLink.ariaLabel = `${this.photographerMedia.title}, closeup view`;
    imgLink.tabIndex = 0;
    imgLink.role = "link";

    const titleArticle = document.createElement("h2");
    titleArticle.className = "card_title"
    titleArticle.textContent = this.photographerMedia.title;

    const figcaption = document.createElement("figcaption");

    const textFigcaptionArticle = document.createElement("div");
    textFigcaptionArticle.className = "figcaption-likes-icon";

    const numberOfLikes = document.createElement("p");
    const likes = `${this.photographerMedia.likes}`;
    numberOfLikes.className = "likes";
    numberOfLikes.textContent= likes;
    

    const buttonLike = document.createElement("button");
    buttonLike.className = "button-like";
    buttonLike.ariaLabel =
      "pressez sur le bouton pour liker ou enlever le like";
    buttonLike.ariaPressed = false;
    buttonLike.tabIndex = 0;

    const iconLike = document.createElement("i");
    iconLike.className = "fa-solid fa-heart";
    iconLike.ariaHidden = "true";
    iconLike.ariaLabel = "likes";

    // Insertion des éléments
    mediaSection.appendChild(article);
    article.appendChild(figure);
    figure.appendChild(imgLink);
    figure.appendChild(figcaption);
    imgLink.appendChild(myImg);
    figcaption.appendChild(titleArticle);
    figcaption.appendChild(textFigcaptionArticle);
    buttonLike.appendChild(numberOfLikes);
    textFigcaptionArticle.appendChild(buttonLike);
    buttonLike.appendChild(iconLike);

    return article;
  }
  // Création du LIKE dans l'encart de la page photographer.html
  getLikes(iconLike) {
    const insertTotalLikes = document.createElement("p");
    insertTotalLikes.id = "total_likes";

    return insertTotalLikes;
  }
}
