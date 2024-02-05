import { createTextElement, createContainerElement } from "./elementFactory";

function createCatagoryTitle(text) {
  const catagoryTitle = createTextElement("h2", "cat-title", `${text}`);
  catagoryTitle.setAttribute("id", "catagory-title-btn");
  const container = createContainerElement("div", "cat-title-contain");
  const iconElement = document.createElement("img");
  iconElement.setAttribute("alt", "dropdown icon");
  iconElement.setAttribute("id", "dropdown-icon");
  iconElement.setAttribute("src", "../images/right-arrow.svg");
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
