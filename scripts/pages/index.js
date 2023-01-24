
async function getPhotographers() {
    let photographers = [];
    /* j'appelle la fonction fetch pour ajouter les données dans le fichier json*/
    await fetch('../../data/photographers.json')
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.json()
        })
        .then(json => {
            this.datas = json;
            /*je pousse les données dans le tableau vide*/
            photographers.push(this.datas)
        })
        .catch( () => {
            this.dataError = true;
        })
            // et je retourne le tableau photographers seulement une fois récupéré
        return datas  
}


    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
init();
    
    
