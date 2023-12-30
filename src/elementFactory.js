export {
  createContainerElement,
  createTextElement,
  createImageElement,
  createVideoElement,
  createFormElement,
};

// element factory functions
function createContainerElement(el, cls) {
  let element = document.createElement(el);
  element.classList.add(cls);
  return element;
}

function createTextElement(el, cls, inText) {
  let element = document.createElement(el);
  element.classList.add(cls);
  element.innerHTML = inText;
  return element;
}

function createImageElement(el, cls, image) {
  let element = document.createElement(el);
  element.classList.add(cls);
  element.src = image;
  return element;
}

function createVideoElement(el, cls, vid) {
  let element = document.createElement(el);
  element.classList.add(cls);
  element.classList.add("hide");
  element.setAttribute("videoId", `${vid}`);
  return element;
}

function createFormElement(type, cls) {
  let element = document.createElement("form");
  element.classList.add(cls);
  element.type = type;
  return element;
}
