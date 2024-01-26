import { createFormElement, createContainerElement } from "./elementFactory";

function createEditCardFormSelect() {
  const form = createFormElement("form", "edit-select-form");
  form.classList.add("edit-select-form");
  const label = createFormElement("label", "edit-select-label");
  label.setAttribute("for", "edit-options");
  const select = createFormElement("select", "edit-options");
  const optionTitle = createFormElement("option", "option-title");
  optionTitle.innerText = "Title";
  const optionSummary = createFormElement("option", "option-summary");
  optionSummary.innerText = "Summary";
  const optionImage = createFormElement("option", "option-image");
  optionImage.innerText = "Image";
  const optionVideo = createFormElement("option", "option-video");
  optionVideo.innerText = "Video";
  const inputSubmit = createFormElement("input", "editSelectSubmit");
  inputSubmit.setAttribute("value", "Edit");
  const optionArray = [optionTitle, optionSummary, optionImage, optionVideo];
  optionArray.forEach((option) => {
    option.classList.add("option-edit");
  });
  inputSubmit.setAttribute("type", "submit");
  appendFormSelect(form, label, select, optionArray, inputSubmit);
  return form;
}

function appendFormSelect(form, label, select, arrrayOfOptions, input) {
  form.append(label);
  form.append(select);
  arrrayOfOptions.forEach((option) => {
    select.append(option);
  });
  form.append(input);
}

export { createEditCardFormSelect };
