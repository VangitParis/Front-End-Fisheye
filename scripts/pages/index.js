
async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

    //     {
    //         "name": "Ma data test",
    //         "id": 1,
    //         "city": "Paris",
    //         "country": "France",
    //         "tagline": "Ceci est ma data test",
    //         "price": 400,
    //         "portrait": "account.png"
    //     },
    //     {
    //         "name": "Autre data test",
    //         "id": 2,
    //         "city": "Londres",
    //         "country": "UK",
    //         "tagline": "Ceci est ma data test 2",
    //         "price": 500,
    //         "portrait": "account.png"
    //     },
    // ]

    
    /* je crée un tableau vide pour photographers */
    let photographers = [];
    /* j'appelle la fonction fetch pour récupérer les données dans le fichier json*/
    await fetch('/data/photographers.json')
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            
            /* je récupère la réponse json()*/
            return response.json()
        })
        /*je transforme les données en json*/
        .then(json => {
            this.datas = json;
            //console.log(this.datas);
            // console.log(photographers.push(this.datas)
            
            /*je pousse les données dans le tableau vide*/
            photographers.push(this.datas)
        })
        .catch(function () {
            this.dataError = true;
        })
            // et bien retourner le tableau photographers seulement une fois récupéré
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
    
    
