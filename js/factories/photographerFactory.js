/**
 * @param {string[]} data Tableau du fichier json photographers
 */
export class PhotographerFactory {
  constructor(data) {
    this.photographerData = data;
    this.picture = `assets/photographers/${this.photographerData.portrait}`;
    this.getCardUserDOM();
  }
  /**
   *
   * @returns {HTMLElement} article d'un photographe
   */
  getCardUserDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
    <a href="photographer.html?id=${this.photographerData.id}" tabindex="0">
      <img src=${this.picture} alt="">
      <h2>${this.photographerData.name}</h2></a >
      <span>${this.photographerData.city}, ${this.photographerData.country}</span>
      <p>${this.photographerData.tagline}</p>
      <p>${this.photographerData.price} €/jour </p>
    </article >`;

    return article;
  }

  /**
   * Création du header de la page photographer.html
   */
  getHeaderUserDOM() {
    const photographerHeader = `
    <div class="text-header-info">
        <h1 class="name_photograph">${this.photographerData.name}</h1>
        <h2 class="city country text-h2">${this.photographerData.city}, ${this.photographerData.country}</h2>
        <p class="tagline">${this.photographerData.tagline}</p>
    </div>
    <div class="contact-box">
        <button class="contact_button" onclick="displayModal()" type="button" aria-haspopup="dialog" aria-controls="dialog">Contactez-moi</button>
    </div>
    <div class="img-header-box">
        <img class="photographer-header_img" src="${this.picture}" alt="">
    </div>

    `;
    const photographerHeaderDiv = document.querySelector(".photograph-header");
    photographerHeaderDiv.innerHTML = photographerHeader;
  }

  /**
   * Création du PRIX du photographe dans l'encart fixe de la page photographer.html
   * @returns HTMLDivElement Price
   */
  getPrice() {
    const insertPrice = document.createElement("div");
    insertPrice.textContent = `${this.photographerData.price} €/jour`;
    insertPrice.className = "insert-price";

    return insertPrice;
  }

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
