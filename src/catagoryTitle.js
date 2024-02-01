import { createTextElement, createContainerElement } from "./elementFactory";

function createCatagoryTitle(text) {
  const catagoryTitle = createTextElement("h2", "cat-title", `${text}`);
  const container = createContainerElement("div", "cat-title-contain");
  const iconElement = document.createElement("img");
  iconElement.setAttribute("alt", "dropdown icon");
  iconElement.classList.add("dropdown-icon");
  iconElement.setAttribute("src", "../images/dropdown.svg");
  appendCatagoryTitle(container, catagoryTitle, iconElement);
  return {
    catagoryTitle: catagoryTitle,
    container: container,
  };
}

function appendCatagoryTitle(container, title, icon) {
  let exerciseContainer = document.querySelector(".exercise-container");
  exerciseContainer.prepend(container);
  container.append(title);
  title.append(icon);
}

export { createCatagoryTitle };
