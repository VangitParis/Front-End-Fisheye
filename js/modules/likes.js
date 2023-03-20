/**
* Sélectionne les boutons likes, ajoute un eventListener au clique,
* met à jour l'état du like par l'utilisateur.
@class Classe Likes représentant le compteur de likes.
*/
export default class Likes {
  constructor() {
    this.likedMedia = []; // tableau qui contient les objets média et le nombre de likes par utilisateur

    this.countLikes();
    this.updateTotalLikes();
  }
  /**
* Sélectionne les boutons likes et ajoute un eventListener.
* Met à jour l'état du like par l'utilisateur.
@function countLikes
*/
  countLikes() {
    const buttonLike = Array.from(
      document.getElementsByClassName("button-like")
    );

    for (let i = 0; i < buttonLike.length; i++) {
      let liked = false;
      const likesElement = buttonLike[i].querySelector(".likes");
      likesElement.addEventListener("focus", () => {
        likesElement.setAttribute("aria-live", "polite");
      });
      buttonLike[i].addEventListener("click", (e) => {
        e.preventDefault();

        const parent = e.target.closest(".figcaption-likes-icon");
        const element = parent.getElementsByClassName("likes")[0];
        const likes = parseInt(element.innerHTML);

        let totalLikes = parseInt(
          document.getElementById("total_likes").innerHTML
        );
        const mediaId = parseInt(parent.dataset.mediaId);

        // Vérifie si l'objet média est déjà dans le tableau likedMedia
        const mediaIndex = this.likedMedia.findIndex(
          (media) => media.id === mediaId
        );
        const button = e.currentTarget;
        // Obtenir le cœur SVG dans le bouton "j'aime"
        const heartSvg = button.querySelector(
          ".button-like svg.svg-inline--fa"
        );

        if (!liked) {
          // Si l'objet média n'existe pas dans le tableau, on l'ajoute avec le nombre de likes
          this.likedMedia.push({ id: mediaId, likes: 1 });
          const likedByUser = likes + 1;
          element.innerHTML = likedByUser;
          document.getElementById(
            "total_likes"
          ).innerText = `${(totalLikes += 1)}`;

          if (likedByUser) {
            // Ajouter ou supprimer la classe "animate" pour déclencher l'animation
            heartSvg.classList.remove("unlike");
            heartSvg.classList.add("animate");
          } else {
            heartSvg.classList.remove("animate");
          }
          this.updateTotalLikes(totalLikes);
          return (liked = true);
        } else if (liked) {
          this.likedMedia.splice(mediaIndex, 1);
          const dislikedByUser = likes;
          element.innerHTML = dislikedByUser - 1;

          document.getElementById(
            "total_likes"
          ).innerText = `${(totalLikes -= 1)}`;

          if (dislikedByUser - 1) {
            heartSvg.classList.remove("animate");
            heartSvg.classList.add("unlike");
          } else {
            heartSvg.classList.remove("unlike");
            heartSvg.classList.remove("animate");
          }
          this.updateTotalLikes(totalLikes);
          return (liked = false);
        }
      });
    }
  }
  updateTotalLikes(totalLikes) {
    // Mettre à jour la valeur de aria-label
    const totalLikesElement = document.getElementById("total_likes");
    totalLikesElement.setAttribute(
      "aria-label",
      `Le nombre de j'aime de ce photographe est de ${totalLikes}`
    );
  }
}
