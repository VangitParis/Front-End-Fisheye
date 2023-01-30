function mediaFactory(media) {
  let photographerMedia = media;

  const picture = `assets/images/${photographerMedia.image}`;
  const video = `assets/images/${photographerMedia.video}`;
  const TotalLikes = photographerMedia.likes;
 

  // gestion du cas où c'est une video ou une image
  function isVideo() {
    let img;
    photographerMedia.video
      ? ((img = document.createElement("video")),
        img.setAttribute("src", video))
      : ((img = document.createElement("img")),
        img.setAttribute("src", picture));

    img.classList.add("card_img");
    img.setAttribute("alt", `${photographerMedia.title}`);
    img.setAttribute("tabindex", 0);

    return { img };
  }

  return {
    /* Création du LIKE du photographe dans l'encart fixe de la page photographer.html */
    getLikes: function () {
      const main = document.getElementById("main");
      const insertLikes = document.createElement("div");
      insertLikes.className = "insert-likes";
      const TotalLikes = document.getElementById("total_likes")
      insertLikes.textContent = `${photographerMedia.likes}`;
      main.appendChild(insertLikes);

      return insertLikes;
    },
    /* Création des articles medias  */
    getMediaCardDOM: function () {
      isVideo();
      const result = isVideo();
      const myImg = result.img;

      const mediaSection = document.querySelector(".photograph-media");
      const article = document.createElement("article");

      const figure = document.createElement("figure");

      const imgLink = document.createElement("a");
      imgLink.setAttribute("href", "#lightbox");

      const titleArticle = document.createElement("h2");
      titleArticle.textContent = photographerMedia.title;

      const figcaption = document.createElement("figcaption");

      const textFigcaptionArticle = document.createElement("div");

      const text = document.createElement("p");
      text.textContent = photographerMedia.likes;

      const icon = document.createElement("fa");
      icon.setAttribute("src", "/assets/icons/icon-heart.svg");

      /*Insertion des éléments */
      mediaSection.appendChild(article);
      article.appendChild(figure);
      figure.appendChild(imgLink);
      figure.appendChild(figcaption);
      imgLink.appendChild(myImg);
      figcaption.appendChild(titleArticle);
      figcaption.appendChild(textFigcaptionArticle);
      textFigcaptionArticle.appendChild(text);
      textFigcaptionArticle.appendChild(icon);

      return article;
    },
  };
}
