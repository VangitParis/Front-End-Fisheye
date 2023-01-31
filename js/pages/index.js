async function getPhotographers() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5500/data/photographers.json"
    );
    const data = await response.json();
    //console.log(data.photographers);
    return { photographers: data.photographers };
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayData(photographers) {
  let photographersSection = document.querySelector(".photographer_section");

   photographers.forEach((data) => {
    const photographerModel = photographerFactory(data);
     let userCardDOM = photographerModel.getCardUserDOM();
     photographersSection.appendChild(userCardDOM);
    
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}
init();
