/**
 * La classe PhotographerFactory crée des objets photographe à partir des données du fichier JSON.
 */
export class PhotographerFactory {
  /**
   * Crée une instance de la classe PhotographerFactory.
   * @param {Object} data - Les données du photographe.
   * @param {string} data.portrait - L'URL de l'image du photographe.
   * @param {string} data.name - Le nom du photographe.
   * @param {string} data.city - La ville du photographe.
   * @param {string} data.country - Le pays du photographe.
   * @param {string} data.tagline - La tagline du photographe.
   * @param {number} data.price - Le prix par jour du photographe.
   */
  constructor(data) {
    this.photographerData = data;
    this.picture = `assets/photographers/${this.photographerData.portrait}`;
    this.getCardUserDOM();
  }

  /**
   * Renvoie le DOM d'un article pour le photographe.
   * @returns {HTMLElement} - Le DOM de l'article.
   */
  getCardUserDOM() {
    const article = document.createElement("article");
    article.innerHTML = ` 
    <a class="image-link profil" href="photographer.html?id=${this.photographerData.id}" aria-label="Visiter le profil du photographe ${this.photographerData.name}" role="link" tabindex="0">
      <img src=${this.picture} alt="image du photographe ${this.photographerData.name} " >
      <h2>${this.photographerData.name}</h2>
    </a >
    <span>${this.photographerData.city}, ${this.photographerData.country}</span>
    <p class="photographer-tagline">${this.photographerData.tagline}</p>
    <p class="photographer-price">${this.photographerData.price} €/jour </p>
    `;

    return article;
  }

  /**
   * Renvoie le DOM de la section d'en-tête pour le photographe.
   * @returns {HTMLElement} - Le DOM de la section d'en-tête.
   */
  getHeaderUserDOM() {
    const photographerHeaderSection =
      document.getElementById("photograph-header");

    const newSection = document.createElement("section");

    // Copie des attributs de l'élément existant dans le nouvel élément
    newSection.id = photographerHeaderSection.id;
    newSection.innerHTML = photographerHeaderSection.innerHTML;

    // Remplacement de l'élément existant par le nouvel élément
    photographerHeaderSection.replaceWith(newSection);

    const photographerHeaderInfo = `
        <div class="header-info-container">
            <div class="text-header-info">
                <h1 class="name_photograph">${this.photographerData.name}</h1>
                <h2 class="city country text-h2">${this.photographerData.city}, ${this.photographerData.country}</h2>
                <p class="tagline">${this.photographerData.tagline}</p>
            </div>
        </div>
        <div id="contact-box">
        <button class="contact-open_button" onclick="displayModal()" aria-labelledby="contact-title" type="button" aria-haspopup="dialog" tabindex="0">Contactez-moi</button>
        <span id="contact-title" class="sr-only">Ouvrir le formulaire de contact</span>
      </div> 
        <div class="img-header-box">
            <img class="photographer-header_img" src="${this.picture}" alt="photo de profil de ${this.photographerData.name}">
        </div>
    `;

    newSection.innerHTML = photographerHeaderInfo;
  }

  /**
   * Renvoie le DOM de l'encart de prix pour le photographe.
   * @returns {HTMLElement} - Le DOM de l'encart de prix.
   */
  getPrice() {
    const insertPrice = document.createElement("span");
    insertPrice.textContent = `${this.photographerData.price} €/jour`;
    insertPrice.ariaLabel = `Le tarif de ce photographe est de ${this.photographerData.price} €/jour`;
    insertPrice.tabIndex = "0";
    insertPrice.className = "insert-price";
    return insertPrice;
  }

  /**
   * Renvoie le nom du photographe pour la fenêtre modale de contact.
   * @returns {string} - Le nom du photographe pour la fenêtre modale de contact.
   */
  getNameInContactModal() {
    const modalTitle = document.getElementById("modal-title");
    const titleFormModal = document.createElement("legend");
    titleFormModal.textContent = this.photographerData.name;
    titleFormModal.className = "name-photograph-form";
    modalTitle.appendChild(titleFormModal);
  }
}
