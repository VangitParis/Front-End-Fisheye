/**
 * Modifie la div en section
 */
const photographDivSort = document.getElementsByClassName("photograph-sort")[0];
const newSection = document.createElement("section");
photographDivSort.replaceWith(newSection);
// Copie des attributs de l'élément existant dans le nouvel élément
newSection.classList = photographDivSort.classList;
newSection.innerHTML = photographDivSort.innerHTML;
// /**
//  * Sélectionne la première instance de la classe "custom-select"
//  * @type {HTMLElement}
//  */
// const select = document.getElementsByClassName("custom-select")[0];

/**
 * Sélectionne l'élément avec la classe "custom-options"
 * @type {HTMLElement}
 */
const optionsContainer = document.querySelector(".custom-options"); // ul

/**
 * Crée une liste à partir de tous les éléments avec la classe "custom-option"
 * @type {Array.<HTMLElement>}
 */
const optionsList = Array.from(
  document.getElementsByClassName("custom-option") //li
);

/**
 * Sélectionne l'élément avec l'id "sort-select-trigger-text"
 * @type {HTMLElement}
 */
const selectText = document.getElementById("sort-select-trigger-text"); //text des li

/**
 * Sélectionne l'élément avec la classe "custom-select-trigger"
 * @type {HTMLElement}
 */
const selectTrigger = document.getElementsByClassName(
  "custom-select-trigger"
)[0]; // button tabindex=0

/**
 * Affiche ou cache les options lorsqu'on clique sur le select
 */
function toggleOptions() {
  optionsContainer.classList.toggle("opened"); // ul
}

/**
 * Cache les options
 */
function closeOptions() {
  optionsContainer.classList.remove("opened");
}

/**
 * Renvoie une fonction qui met à jour la valeur du select et l'affichage
 * du texte sélectionné, puis cache les options
 * @param {HTMLElement} option - L'option cliquée
 * @return {Function}
 */
function onOptionClick(option) {
  return function () {
    selectText.value = option.dataset.value;
    selectText.innerText = option.innerText;
    closeOptions();
  };
}

// Ajoute un événement pour afficher ou cacher les options lorsqu'on clique sur le bouton
selectTrigger.addEventListener("click", toggleOptions);

// Ajoute un événement pour chaque option pour mettre à jour la valeur du select
// et l'affichage du texte sélectionné lorsqu'on clique dessus, puis cache les options
optionsList.forEach((option) => {
  option.addEventListener("click", onOptionClick(option));
});
/**
 * Sélectionne l'option précédente dans la liste d'options
 */
function selectPreviousOption() {
  const currentOption = optionsContainer.querySelector(":focus");
  const currentOptionIndex = optionsList.indexOf(currentOption);
  const previousOption = optionsList[currentOptionIndex - 1];
  if (previousOption) {
    previousOption.focus();
  }
}

/**
 * Sélectionne l'option suivante dans la liste d'options
 */
function selectNextOption() {
  const currentOption = optionsContainer.querySelector(":focus");
  const currentOptionIndex = optionsList.indexOf(currentOption);
  const nextOption = optionsList[currentOptionIndex + 1];
  if (nextOption) {
    nextOption.focus();
  }
}

/**
Cache les options et met à jour la valeur du select et l'affichage
du texte sélectionné avec l'option actuellement sélectionnée
*/
function selectCurrentOption() {
  const currentOption = optionsContainer.querySelector(":focus");
  if (currentOption) {
    selectText.value = currentOption.dataset.value;
    selectText.innerText = currentOption.innerText;
    closeOptions();
  }
}

/** 

/**
 * Cache les options si on clique en dehors du select et de ses options
 * @param {MouseEvent} event - L'événement de clic
 */
document.addEventListener("click", function (event) {
  if (
    !selectTrigger.contains(event.target) &&
    !optionsContainer.contains(event.target)
  ) {
    closeOptions();
  }
});
/**
 * Cache les options si on appuie sur la touche "Tab" ou la touche "Escape"
 * et ajoute le focus sur le bouton qui ouvre la dropdown après sa fermeture
 * @param {KeyboardEvent} event - L'événement de clavier
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    closeOptions();
  }
});
/**
Ajoute des événements pour les touches du clavier
*/
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectNextOption();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    selectPreviousOption();
  } else if (event.key === "Enter") {
    selectCurrentOption();
  } else if (event.key === "Escape" || event.key === "Esc") {
    closeOptions();
  }
});
