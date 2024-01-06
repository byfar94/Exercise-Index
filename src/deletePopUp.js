import { createContainerElement, createTextElement } from "./elementFactory";

function createDeletePopUp() {
  return {
    PopUpContain: createContainerElement("div", "pop-up-contain"),
    popUpMsg: createTextElement(
      "div",
      "pop-up-msg",
      "Are you sure you want to delete this exercise?"
    ),
    popUpDltBtn: createTextElement("button", "pop-up-dlt-btn", "Delete"),
    popUpCnlBtn: createTextElement("button", "pop-up-cnl-btn", "cancel"),
  };
}

function renderDeletePopUp() {
  let popUp = createDeletePopUp();
  let body = document.querySelector("body");
  body.append(popUp.PopUpContain);
  popUp.PopUpContain.append(popUp.popUpMsg);
  popUp.PopUpContain.append(popUp.popUpCnlBtn);
  popUp.PopUpContain.append(popUp.popUpDltBtn);
  return {
    PopUpCon: popUp.PopUpContain,
    popUpD: popUp.popUpDltBtn,
    popUpC: popUp.popUpCnlBtn,
  };
}

export { renderDeletePopUp };
