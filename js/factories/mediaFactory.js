function mediaFactory(media) {
  let photographerMedia = media;

  let picture = `assets/images/${photographerMedia.image}`;
  let video = `assets/images/${photographerMedia.video}`;
  let totalLikes = `${ photographerMedia.likes }`;
 

  // gestion du cas où c'est une video ou une image
  function isVideo() {
    let img;
    photographerMedia.video
      ? ((img = document.createElement("video")),
        img.setAttribute("src", video))
      : ((img = document.createElement("img")),
        img.setAttribute("src", picture));

    img.classList.add("card_img");
    img.alt = `${ photographerMedia.title }`;
 
    

    return { img };
  }

  return {
    /* Création du LIKE du photographe dans l'encart fixe de la page photographer.html */
    getLikes: function () {
      let main = document.getElementById("main");
      let insertLikes = document.createElement("div");
      insertLikes.className = "insert-likes";
      let totalOfLikes = document.getElementById("total_likes")
      insertLikes.textContent = `${ totalLikes }`;
      main.appendChild(insertLikes);

      return insertLikes;
    },
    /* Création des articles medias  */
    getMediaCardDOM: function () {
      isVideo();
      let result = isVideo();
      let myImg = result.img;

      let mediaSection = document.querySelector(".photograph-media");
      let article = document.createElement("article");
      article.title = `${ photographerMedia.title }`;
  

      let figure = document.createElement("figure");
     

      let imgLink = document.createElement("a");
      imgLink.href = "#";
      imgLink.ariaLabel = `${ photographerMedia.title }, closeup view`;
      imgLink.tabIndex = 0;
      imgLink.role = "link";
      
      let titleArticle = document.createElement("h2");
      titleArticle.textContent = photographerMedia.title;

      let figcaption = document.createElement("figcaption");

      let textFigcaptionArticle = document.createElement("div");
      textFigcaptionArticle.className = "figcaption-likes-icon";


      let text = document.createElement("p");
      text.textContent = photographerMedia.likes;

      let buttonLike = document.createElement("button");
      buttonLike.className = "button-like";
      buttonLike.ariaLabel = "pressez sur le bouton pour liker ou enlever le like";
      buttonLike.ariaPressed = false;
      buttonLike.tabIndex = 0;

      let iconLike = document.createElement("i");
      iconLike.className = "fa-solid fa-heart";
      iconLike.ariaHidden = "true"
      iconLike.ariaLabel = "likes";
      

      /*Insertion des éléments */
      mediaSection.appendChild(article);
      article.appendChild(figure);
      figure.appendChild(imgLink);
      figure.appendChild(figcaption);
      imgLink.appendChild(myImg);
      figcaption.appendChild(titleArticle);
      figcaption.appendChild(textFigcaptionArticle);
      textFigcaptionArticle.appendChild(text);
      textFigcaptionArticle.appendChild(buttonLike);
      buttonLike.appendChild(iconLike);

      return article;
    },
  };
}
