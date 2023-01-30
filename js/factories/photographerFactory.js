function photographerFactory(data) {
  /* je génère tous les éléments nécessaires du DOM */
  let photographerData = data;
  
  const picture = `assets/photographers/${ photographerData.portrait }`;

    return {
        /* Liste des cards des photographes dans la page index.html*/
        getCardUserDOM: function () {
      
            const article = document.createElement("article");
            const img = document.createElement("img");
            img.setAttribute("src", picture);
            img.setAttribute("alt", "");

            const h2 = document.createElement("h2");
            h2.textContent = photographerData.name;

            const p = document.createElement("p");
            p.textContent = photographerData.tagline;

            const span = document.createElement("span");
            span.textContent = `${ photographerData.city }, ${ photographerData.country }`;

            const price = document.createElement("p");
            price.textContent = `${ photographerData.price } €/jour `;

            const link = document.createElement("a");
            link.href = `photographer.html?id=${ photographerData.id }`;
            link.setAttribute("tabindex", "0");

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
            //const main = document.getElementById("main");
            const photographerHeader = document.querySelector(".photograph-header");
            const contactButton = document.querySelector(".contact_button");

            const textInfo = document.createElement("div");
            textInfo.setAttribute("class", "text_info");

            const h1 = document.createElement("h1");
            h1.textContent = photographerData.name;
            h1.className = "name_photograph";

            const h2 = document.createElement("h2");
            h2.textContent = `${ photographerData.city }, ${ photographerData.country }`;
            h2.classList.add("city", "country", "text-h2");

            const p = document.createElement("p");
            p.textContent = photographerData.tagline;
            p.className = "tagline";

            const img = document.createElement("img");
            img.classList.add("photographer-header_img");
            img.setAttribute("src", picture);
            img.setAttribute("alt", "");

            photographerHeader.appendChild(textInfo);
            photographerHeader.appendChild(contactButton);
            photographerHeader.appendChild(img);
            textInfo.appendChild(h1);
            textInfo.appendChild(h2);
            textInfo.appendChild(p);

            return textInfo;
        },
        /* Création du prix du photographe dans l'encart fixe de la page photographer.html */
        getPrice: function () {
          
            const insertPrice = document.createElement("div");
            insertPrice.textContent = `${ photographerData.price }`;
            insertPrice.className = "insert-price";
         
            return insertPrice;
        }
    };
    
}
