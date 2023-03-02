/**
 * Classe sortMedias - permet de trier une liste d'objets média selon différents critères.
 *
 * @property {Array} mediasFromJson - un tableau d'objets média au format JSON
 * @property {HTMLElement} select - l'élément HTML correspondant à la liste déroulante de tri
 */
export default class SortMedias {
  /**
   *
   * @param {Array} mediasFromJson - un tableau d'objets média au format JSON
   */
  constructor(mediasFromJson) {
    this.mediasFromJson = mediasFromJson;
    this.mediaObjectsSorted = this.setArticleProperties();
    this.render(this.mediaObjectsSorted);

    const customOptions = Array.from(
      document.getElementsByClassName("custom-option")
    );
    customOptions.forEach((option) =>
      option.addEventListener("click", () => this.updateMediaList())
    );

    // Ajoute l'écouteur d'événements pour gérer le tri des options au clavier
    customOptions.forEach((focusedOption) => {
      focusedOption.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          focusedOption.dispatchEvent(new Event("click"));

          //focus sur le bouton qui ouvre la modal si on a choisit une option de tri
          if (focusedOption) {
            const focusSort = document.getElementsByClassName(
              "custom-select-trigger"
            )[0];
            focusSort.focus();
          }
        }
      });
    });
  }

  /**
   * Initialise la propriété `likes` de chaque objet média à 0.
   *
   * @returns {Array} - un tableau d'objets média avec les propriétés initialisées
   */
  setArticleProperties() {
    const domArticles = Array.from(
      document.getElementsByClassName("card_article")
    );
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
    const userLikes = Array.from(document.getElementsByClassName("likes"));
    const selectTrigger = document.getElementsByClassName(
      "custom-select-trigger"
    )[0];

    const currentValue = selectTrigger.textContent.trim();

    if (currentValue === "Popularité") {
      if (userLikes) {
        // Parcourir tous les éléments likés et mettre à jour la propriété "likes" de chaque objet média
        userLikes.forEach((like, index) => {
          const articleProperties = this.mediaObjectsSorted[index].properties;
          articleProperties.likes = parseInt(like.innerHTML, 10);
        });
      }
      // Trier les objets média en fonction du nombre de likes décroissant
      this.mediaObjectsSorted.sort(
        (a, b) => b.properties.likes - a.properties.likes
      );
    } else if (currentValue === "Date") {
      // Trier les objets média en fonction de la date décroissante
      this.mediaObjectsSorted.sort(
        (a, b) =>
          new Date(b.properties.date).getTime() -
          new Date(a.properties.date).getTime()
      );
    } else if (currentValue === "Titre") {
      // Trier les objets média par ordre alphabétique(croissant)
      this.mediaObjectsSorted.sort((a, b) =>
        a.properties.title.localeCompare(b.properties.title)
      );
    }
    this.render();
  }
  // Mettre à jour l'interface utilisateur avec la nouvelle liste d'objets média triés
  render() {
    const articleContainer = document.getElementById("photograph-media");
    articleContainer.innerHTML = "";

    const mediaObjects = this.mediaObjectsSorted;
    mediaObjects.forEach((media) => {
      articleContainer.appendChild(media.article);
    });
  }
}
