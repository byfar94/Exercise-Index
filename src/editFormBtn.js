import { createFormElement } from "./elementFactory";
import { createTextEditForm } from "./editPopUp";

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
  return {
    form: form,
    select: select,
  };
}

function appendFormSelect(form, label, select, arrrayOfOptions, input) {
  form.append(label);
  form.append(select);
  arrrayOfOptions.forEach((option) => {
    select.append(option);
  });
  form.append(input);
}

async function editFormSubmit(array) {
  const exerciseCardArray = await array;
  exerciseCardArray.forEach((card) => {
    const editForm = card.editForm;
    const editSelect = card.editSelect;
    const id = card.id;
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (editSelect.value === `Video`) {
        console.log("you selected to edit a video");
        const textEditForm = createTextEditForm(`Video ID`);
        const btn = textEditForm.textSubmitBtn;
        console.log(textEditForm.form);
        console.log(textEditForm.textInput);
        textEditHandler(btn, id, `videoid`);
      }
      if (editSelect.value === `Title`) {
        console.log("you selected to edit a title");
        const textEditForm = createTextEditForm(`Title`);
        const btn = textEditForm.textSubmitBtn;
        console.log(textEditForm.form);
        console.log(textEditForm.textInput);
        textEditHandler(btn, id, `extitle`);
      }
      if (editSelect.value === `Summary`) {
        console.log("you selected to edit a summary");
        const textEditForm = createTextEditForm(`Summary`);
        const btn = textEditForm.textSubmitBtn;
        console.log(textEditForm.form);
        console.log(textEditForm.textInput);
        textEditHandler(btn, id, `summary`);
      } else {
        return;
      }
    });
  });
}

function textEditHandler(btn, ID, catagory) {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const input = document.querySelector("#text-edit-input");
    const data = input.value;
    const formData = { [catagory]: data };
    console.log(btn);
    console.log(formData);
    const response = await fetch(`/exercise/${ID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      //window.location.reload();
    } else {
      return console.log("error after attempting edit");
    }
    console.log("edit ran");
    console.log(response);
    const resData = await response.json();
    return resData;
  });
}

export { createEditCardFormSelect, editFormSubmit };
