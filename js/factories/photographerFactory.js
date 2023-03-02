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
    <a href="photographer.html?id=${this.photographerData.id}" tabindex="0" aria-label="${this.photographerData.name}" role="link">
      <img src=${this.picture} alt="">
      <h2>${this.photographerData.name}</h2>
    </a >
    <span>${this.photographerData.city}, ${this.photographerData.country}</span>
    <p>${this.photographerData.tagline}</p>
    <p>${this.photographerData.price} €/jour </p>
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
  
    const photographerHeaderInfo = `
        <div class="header-info-container">
            <div class="text-header-info">
                <h1 class="name_photograph">${ this.photographerData.name }</h1>
                <h2 class="city country text-h2">${ this.photographerData.city }, ${ this.photographerData.country }</h2>
                <p class="tagline">${ this.photographerData.tagline }</p>
            </div>
        </div>
        <div id="contact-box">
        <button class="contact-open_button" onclick="displayModal()" type="button" aria-haspopup="dialog" aria-controls="dialog">Contactez-moi</button>
      </div> 
        <div class="img-header-box">
            <img class="photographer-header_img" src="${this.picture}" alt="${this.photographerData.name}">
        </div>
    `;
    

    photographerHeaderSection.innerHTML = photographerHeaderInfo ;

  }

  /**
   * Renvoie le DOM de l'encart de prix pour le photographe.
   * @returns {HTMLElement} - Le DOM de l'encart de prix.
   */
  getPrice() {
    const insertPrice = document.createElement("div");
    insertPrice.textContent = `${this.photographerData.price} €/jour`;
    insertPrice.className = "insert-price";
    return insertPrice;
  }

  /**
   * Renvoie le nom du photographe pour la fenêtre modale de contact.
   * @returns {string} - Le nom du photographe pour la fenêtre modale de contact.
   */
  getNameInContactModal() {
    const formModal = document.querySelector("form");
    const fieldsetForm = document.querySelector("fieldset");
    const titleFormModal = document.createElement("legend");
    titleFormModal.textContent = this.photographerData.name;
    titleFormModal.className = "name-photograph-form";

    formModal.appendChild(fieldsetForm);
    fieldsetForm.appendChild(titleFormModal);
  }
}
