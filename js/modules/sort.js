/**
 * Classe List - permet de trier une liste d'objets média selon différents critères.
 *
 * @property {Array} mediasFromJson - un tableau d'objets média au format JSON
 * @property {HTMLElement} select - l'élément HTML correspondant à la liste déroulante de tri
 */
export default class List {
  /**
   *
   * @param {Array} mediasFromJson - un tableau d'objets média au format JSON
   */
  constructor(mediasFromJson) {
    this.mediasFromJson = mediasFromJson;
    this.select = document.getElementById("sort-select");
    this.mediaObjectsSorted = this.setArticleProperties();
    this.render(this.mediaObjectsSorted);
    this.sortSelectEvent();
  }
  /**
   * Ajoute un événement d'écouteur d'événements de changement sur l'élément HTML de sélection
   *
   */
  sortSelectEvent() {
    this.select.addEventListener("change", () => {
      // Mettre à jour la liste d'objets média triés en fonction du critère de tri sélectionné
      this.updateMediaList();
    });
  }
  /**
   * Initialise la propriété `likes` de chaque objet média à 0.
   *
   * @returns {Array} - un tableau d'objets média avec les propriétés initialisées
   */
  setArticleProperties() {
    const domArticles = Array.from(document.querySelectorAll(".card_article"));
    const mediaObjects = domArticles.map((article, index) => {
      return {
        article: article,
        properties: {
          likes: 0,
          title: this.mediasFromJson[index].title,
          date: this.mediasFromJson[index].date,
        },
      };
    });

    return mediaObjects;
  }

  /**
   * Met à jour la liste des objets média triés en fonction du critère de tri actuel.
   * Si un élément a été liké, le tri est effectué en prenant en compte les likes.
   * Si aucun élément n'a été liké, le tri est effectué en fonction du critère de tri actuel.
   * Met également à jour l'interface utilisateur avec la nouvelle liste triée.
   */
  updateMediaList() {
    /*
     * Les éléments HTML avec la classe `.likes`.
     * @type {Array.<HTMLElement>}
     */
    const userLikes = Array.from(document.querySelectorAll(".likes"));

    if (this.select.value === "Popularité") {
      if (userLikes) {
        // Parcourir tous les éléments likés et mettre à jour la propriété "likes" de chaque objet média
        userLikes.forEach((like, index) => {
          const articleProperties = this.mediaObjectsSorted[index].properties;

          articleProperties.likes = parseInt(like.innerHTML);

          // Ajouter un événement "click" pour incrémenter le nombre de likes lorsqu'un utilisateur clique sur le bouton "Like"
          like.addEventListener("click", () => {
            articleProperties.likes += 1;
            like.innerHTML = articleProperties.likes.toString();
            this.updateMediaList();
          });
        });
      }

      // Trier les objets média en fonction du nombre de likes décroissant
      this.mediaObjectsSorted.sort(
        (a, b) => b.properties.likes - a.properties.likes
      );
    } else if (this.select.value === "Date") {
      // Trier les objets média en fonction de la date décroissante
      this.mediaObjectsSorted.sort(
        (a, b) =>
          new Date(b.properties.date).getTime() -
          new Date(a.properties.date).getTime()
      );
    } else if (this.select.value === "Titre") {
      // Trier les objets média par ordre alphabétique(croissant)
      this.mediaObjectsSorted.sort((a, b) =>
        a.properties.title.localeCompare(b.properties.title)
      );
    }

    // Mettre à jour l'interface utilisateur avec la nouvelle liste d'objets média triés
    this.render();
  }

  /**
   * Met à jour la position des articles dans le DOM en fonction du tri spécifié.
   *
   * @param {Array} [this.mediaObjectsSorted] - un tableau d'objets média triés en fonction du critère de tri actuel.
   */
  render() {
    this.mediaObjectsSorted;
    const container = document.querySelector(".photograph-media");
    container.innerHTML = "";

    this.mediaObjectsSorted.forEach((media) => {
      container.appendChild(media.article);
    });
  }
}
