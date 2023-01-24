function photographerFactory(data) {
    /* je génère tous les éléments nécessaires du DOM */
   const { name, portrait, city, country, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;
   
    /* Liste des cards des photographes */
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement('p');
        p.textContent = tagline;
        const span = document.createElement('span');
        span.textContent = `${ city }, ${ country }`;
        const priceTag = document.createElement( 'p' );
        priceTag.textContent = `${ price } €/jour `;
        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('tabindex', '0');
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(span);
        article.appendChild(p);
        article.appendChild(priceTag);
        return article;
    }
    return { ...data,  getUserCardDOM }
}