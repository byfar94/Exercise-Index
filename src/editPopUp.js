import { createFormElement, createContainerElement } from "./elementFactory";

//text edit form
function createTextEditForm(editCatagory, title) {
  const form = createFormElement("form", "text-edit-form");
  const fieldset = createFormElement("fieldset", "text-eit-fieldset");
  const legend = createFormElement("legend", "text-edit-legend");
  legend.innerText = `Edit ${title} Card:`;
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

  appendEditForm(
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

//append function
function appendEditForm(
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

//image edit form
function createImageEditForm(title) {
  const form = createFormElement("form", "image-edit-form");
  const fieldset = createFormElement("fieldset", "image-eit-fieldset");
  const legend = createFormElement("legend", "image-edit-legend");
  legend.innerText = `Edit ${title} Card:`;
  const labelInputContainer = createContainerElement(
    "div",
    "image-edit-label-input-container"
  );
  const label = createFormElement("label", "image-edit'label");
  label.setAttribute("for", "image-edit-input");
  label.innerText = "image";
  const imageInput = createFormElement("input", "image-edit-input");
  imageInput.setAttribute("type", "file");
  imageInput.setAttribute("name", "imgfile");
  const imageSubmitContainer = createContainerElement(
    "div",
    "image-edit-submit-container"
  );
  const imageSubmit = createFormElement("input", "submit-image-edit-input");
  imageSubmit.setAttribute("type", "submit");
  imageSubmit.setAttribute("value", "Edit");

  const fieldsetContent = [legend, labelInputContainer, imageSubmitContainer];
  const containerOnecontent = [label, imageInput];
  const containerTwoContent = [imageSubmit];

  appendEditForm(
    form,
    fieldset,
    fieldsetContent,
    containerOnecontent,
    containerTwoContent
  );
  return {
    form: form,
    imageInput: imageInput,
    imageSubmitBtn: imageSubmit,
  };
}

export { createTextEditForm, createImageEditForm };
