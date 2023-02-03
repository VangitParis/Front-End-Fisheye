export class PhotographerFactory {
  constructor(data) {
    /* je génère tous les éléments nécessaires du DOM */
    this.photographerData = data;
    this.picture = `assets/photographers/${this.photographerData.portrait}`;
  }

  /* Liste des cards des photographes dans la page index.html*/
  getCardUserDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", this.picture);
    img.setAttribute("alt", "");

    const h2 = document.createElement("h2");
    h2.textContent = this.photographerData.name;

    const p = document.createElement("p");
    p.textContent = this.photographerData.tagline;

    const span = document.createElement("span");
    span.textContent = `${this.photographerData.city}, ${this.photographerData.country}`;

    const price = document.createElement("p");
    price.textContent = `${this.photographerData.price} €/jour `;

    const link = document.createElement("a");
    link.href = `photographer.html?id=${ this.photographerData.id }`;
    link.tabIndex = 0;


    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(span);
    article.appendChild(p);
    article.appendChild(price);

    return article;
  }

  /* Création du header de la page photographer.html */
  getHeaderUserDOM() {
    const photographerHeader = document.querySelector(".photograph-header");

    const contactButton = document.querySelector(".contact_button");
    const contactBox = document.createElement("div");
    contactBox.className = "contact-box";

    const textInfo = document.createElement("div");
    textInfo.className = "text-header-info";

    const h1 = document.createElement("h1");
    h1.textContent = this.photographerData.name;
    h1.className = "name_photograph";

    const h2 = document.createElement("h2");
    h2.textContent = `${this.photographerData.city}, ${this.photographerData.country}`;
    h2.classList.add("city", "country", "text-h2");

    const p = document.createElement("p");
    p.textContent = this.photographerData.tagline;
    p.className = "tagline";

    const portraitHeader = document.createElement("div");
    portraitHeader.className = "img-header-box";
    const portraitPhotographer = document.createElement("img");
    portraitPhotographer.classList.add("photographer-header_img");
    portraitPhotographer.setAttribute("src", this.picture);
    portraitPhotographer.setAttribute("alt", "");

    photographerHeader.appendChild(textInfo);
    photographerHeader.appendChild(contactBox);
    contactBox.appendChild(contactButton);

    photographerHeader.appendChild(portraitHeader);
    portraitHeader.appendChild(portraitPhotographer);

    textInfo.appendChild(h1);
    textInfo.appendChild(h2);
    textInfo.appendChild(p);

    return textInfo;
  }
  /* Création du PRIX du photographe dans l'encart fixe de la page photographer.html */
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
