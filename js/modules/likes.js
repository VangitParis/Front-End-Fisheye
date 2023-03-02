/**
* Sélectionne les boutons likes, ajoute un eventListener au clique,
* met à jour l'état du like par l'utilisateur.
@class Classe Likes représentant le compteur de likes.
*/
export default class Likes {
  constructor() {
    this.likedMedia = []; // tableau qui contient les objets média et le nombre de likes par utilisateur

    this.countLikes();
  }
/**
* Sélectionne les boutons likes et ajoute un eventListener.
* Met à jour l'état du like par l'utilisateur.
@function countLikes
*/
  countLikes() {
    const buttonLike = Array.from(document.getElementsByClassName("button-like"));

    for (let i = 0; i < buttonLike.length; i++) {
      let liked = false;
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
        const mediaIndex = this.likedMedia.findIndex((media) => media.id === mediaId);
        if (!liked) {
          // Si l'objet média n'existe pas dans le tableau, on l'ajoute avec le nombre de likes
          this.likedMedia.push({ id:mediaId, likes: 1 });
          const likedByUser = likes + 1;
          element.innerHTML = likedByUser;
         
          document.getElementById("total_likes").innerText = `${
            totalLikes += 1
          }`;
        
          return (liked = true);
        } else if (liked) {
          this.likedMedia.splice(mediaIndex, 1);
          const dislikedByUser = likes;
          element.innerHTML = dislikedByUser - 1;

          document.getElementById("total_likes").innerText = `${
            totalLikes -= 1
          }`;
          return (liked = false);
        }
      });
    }
  }
}
