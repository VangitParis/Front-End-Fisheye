function photographerFactory(data) {
  /* je génère tous les éléments nécessaires du DOM */
  let photographerData = data;
  
  let picture = `assets/photographers/${ photographerData.portrait }`;

    return {
        /* Liste des cards des photographes dans la page index.html*/
        getCardUserDOM: function () {
      
            let article = document.createElement("article");
            let img = document.createElement("img");
            img.setAttribute("src", picture);
            img.setAttribute("alt", "");

            let h2 = document.createElement("h2");
            h2.textContent = photographerData.name;

            let p = document.createElement("p");
            p.textContent = photographerData.tagline;

            let span = document.createElement("span");
            span.textContent = `${ photographerData.city }, ${ photographerData.country }`;

            let price = document.createElement("p");
            price.textContent = `${ photographerData.price } €/jour `;

            let link = document.createElement("a");
            link.href = `photographer.html?id=${ photographerData.id }`;
            link.tabIndex = 0;

            //  photographersSection.appendChild(article);
            article.appendChild(link);
            link.appendChild(img);
            link.appendChild(h2);
            article.appendChild(span);
            article.appendChild(p);
            article.appendChild(price);

            return article;
        },
      
        /* Création du header de la page photographer.html */
        getHeaderUserDOM: function () {
            let photographerHeader = document.querySelector(".photograph-header");

            let contactButton = document.querySelector(".contact_button");
            let contactBox = document.createElement("div");
            contactBox.className = 'contact-box';


            let textInfo = document.createElement("div");
            textInfo.className ="text-header-info";

            let h1 = document.createElement("h1");
            h1.textContent = photographerData.name;
            h1.className = "name_photograph";

            let h2 = document.createElement("h2");
            h2.textContent = `${ photographerData.city }, ${ photographerData.country }`;
            h2.classList.add("city", "country", "text-h2");

            let p = document.createElement("p");
            p.textContent = photographerData.tagline;
            p.className = "tagline";

            let portraitHeader = document.createElement("div");
            portraitHeader.className = "img-header-box";
            let portraitPhotographer = document.createElement("img");
            portraitPhotographer.classList.add("photographer-header_img");
            portraitPhotographer.setAttribute("src", picture);
            portraitPhotographer.setAttribute("alt", "");

            photographerHeader.appendChild(textInfo);
            photographerHeader.appendChild(contactBox);
            contactBox.appendChild(contactButton)

            photographerHeader.appendChild(portraitHeader);
            portraitHeader.appendChild(portraitPhotographer);

            textInfo.appendChild(h1);
            textInfo.appendChild(h2);
            textInfo.appendChild(p);

            return textInfo;
        },
        /* Création du PRIX du photographe dans l'encart fixe de la page photographer.html */
        getPrice: function () {
          
            let insertPrice = document.createElement("div");
            insertPrice.textContent = `${ photographerData.price } €/jour`;
            insertPrice.className = "insert-price";
         
            return insertPrice;
        },

        getNameInContactModal: function () {
            let formModal = document.querySelector("form");

            let fieldsetForm = document.querySelector("fieldset");
            let titleFormModal = document.createElement("legend");
            titleFormModal.textContent = photographerData.name;
            titleFormModal.className = "name-photograph-form";

            formModal.appendChild(fieldsetForm);
            fieldsetForm.appendChild(titleFormModal);

        }
    };
    
}
