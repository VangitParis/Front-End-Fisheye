/**
 * @method countLikes sélectionne les boutons likes,
 * ajoute un eventListener au clique,
 * met à jour l'état du like par l'utilisateur
 */
export default class Likes {
  constructor() {
    this.countLikes();
  }

  countLikes() {
    const buttonLike = document.querySelectorAll(".button-like");

    for (let i = 0; i < buttonLike.length; i++) {
      let liked = false;
      buttonLike[i].addEventListener("click", (e) => {
        e.preventDefault();

        const parent = e.target.closest(".figcaption-likes-icon");
        const element = parent.querySelector(".likes");
        const likes = parseInt(element.innerHTML);

        let totalLikes = parseInt(
          document.getElementById("total_likes").innerHTML
        );

        if (!liked) {
          const likedByUser = likes + 1;
          element.innerHTML = likedByUser;

          document.getElementById("total_likes").innerText = `${
            totalLikes + 1
          }`;

          return (liked = true);
        } else if (liked) {
          const dislikedByUser = likes;
          element.innerHTML = dislikedByUser - 1;

          document.getElementById("total_likes").innerText = `${
            totalLikes - 1
          }`;
          return (liked = false);
        }
      });
    }
  }
}
