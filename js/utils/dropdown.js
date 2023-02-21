const select = document.getElementById("sort-select");
const dropdown = document.querySelector(".select-dropdown");
const options = select.querySelectorAll(".select-option");

if (options.length > 0) {
  const dropdownOptions = document.createElement("ul");
  dropdownOptions.classList.add("dropdown-options");

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("li");
    option.classList.add("dropdown-option-item");
    option.textContent = options[i].textContent;
    option.addEventListener("click", () => {
      select.ariaSelected= i;
      dropdownOptions.classList.remove("open");
    });
    dropdownOptions.appendChild(option);
  }
    
  dropdown.appendChild(dropdownOptions) ;
  select.addEventListener("click", () => {
      dropdownOptions.classList.toggle("open");
  
  });
}
