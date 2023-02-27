/**
 * Sélectionne la première instance de la classe "custom-select"
 * @type {HTMLElement}
 */
const select = document.getElementsByClassName("custom-select")[0];

/**
 * Sélectionne l'élément avec la classe "custom-options"
 * @type {HTMLElement}
 */
const optionsContainer = document.querySelector(".custom-options");

/**
 * Crée une liste à partir de tous les éléments avec la classe "custom-option"
 * @type {Array.<HTMLElement>}
 */
const optionsList = Array.from(
  document.getElementsByClassName("custom-option")
);

/**
 * Sélectionne l'élément avec l'id "sort-select-trigger-text"
 * @type {HTMLElement}
 */
const selectText = document.getElementById("sort-select-trigger-text");

/**
 * Sélectionne l'élément avec la classe "custom-select-trigger"
 * @type {HTMLElement}
 */
const selectTrigger = document.querySelector(".custom-select-trigger");

/**
 * Affiche ou cache les options lorsqu'on clique sur le select
 */
function toggleOptions() {
  optionsContainer.classList.toggle("opened");
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
    select.value = option.dataset.value;
    selectText.innerText = option.innerText;
    closeOptions();
  };
}

// Ajoute un événement pour afficher ou cacher les options lorsqu'on clique sur le select
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
    select.value = currentOption.dataset.value;
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
  } else if (event.key === "Escape") {
    closeOptions();
  }
});
