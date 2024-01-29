import { createFormElement, createContainerElement } from "./elementFactory";

function createTextEditForm(editCatagory) {
  const form = createFormElement("form", "text-edit-form");
  const fieldset = createFormElement("fieldset", "text-eit-fieldset");
  const legend = createFormElement("legend", "text-edit-legend");
  legend.innerText = `Edit Exercise Card:`;
  const labelInputContainer = createContainerElement(
    "div",
    "text-edit-label-input-container"
  );
  const label = createFormElement("label", "text-edit'label");
  label.setAttribute("for", "text-input");
  label.innerText = `${editCatagory}`;
  let textInput;
  if (editCatagory === "Summary") {
    textInput = createFormElement("textarea", "text-edit-input");
  } else {
    textInput = createFormElement("input", "text-edit-input");
  }
  const textSubmitContainer = createContainerElement(
    "div",
    "text-edit-submit-container"
  );
  const textSubmit = createFormElement("input", "submit-text-edit-input");
  textSubmit.setAttribute("type", "submit");
  textSubmit.setAttribute("value", "Edit");
  const fieldsetContent = [legend, labelInputContainer, textSubmitContainer];
  const containerOnecontent = [label, textInput];
  const containerTwoContent = [textSubmit];

  appendTextEditForm(
    form,
    fieldset,
    fieldsetContent,
    containerOnecontent,
    containerTwoContent
  );
  return {
    form: form,
    textInput: textInput,
    textSubmitBtn: textSubmit,
  };
}

function appendTextEditForm(
  form,
  fieldset,
  fieldsetContent,
  containerOnecontent,
  containerTwoContent
) {
  let body = document.querySelector("body");

  body.append(form);

  form.append(fieldset);

  fieldsetContent.forEach((content) => {
    fieldset.append(content);
  });
  containerOnecontent.forEach((content) => {
    fieldsetContent[1].append(content);
  });
  containerTwoContent.forEach((content) => {
    fieldsetContent[2].append(content);
  });
}

export { createTextEditForm };
