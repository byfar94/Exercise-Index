import { createFormElement } from "./elementFactory";
import { createTextEditForm, createImageEditForm } from "./editPopUp";
import { loadExCards } from "./excards";

function createEditCardFormSelect() {
  const form = createFormElement("form", "edit-select-form");
  form.classList.add("edit-select-form");
  const select = createFormElement("select", "edit-options");
  const optionTitle = createFormElement("option", "option-title");
  optionTitle.innerText = "Title";
  const optionSummary = createFormElement("option", "option-summary");
  optionSummary.innerText = "Summary";
  const optionImage = createFormElement("option", "option-image");
  optionImage.innerText = "Image";
  const optionVideo = createFormElement("option", "option-video");
  optionVideo.innerText = "Video";
  const optionBodypart = createFormElement("option", "option-bodypart");
  optionBodypart.innerText = "Body Part";
  const optionExtype = createFormElement("option", "option-extype");
  optionExtype.innerText = "Exercise Type";
  const inputSubmit = createFormElement("input", "editSelectSubmit");
  inputSubmit.setAttribute("value", "Edit");
  const optionArray = [
    optionTitle,
    optionSummary,
    optionImage,
    optionVideo,
    optionBodypart,
    optionExtype,
  ];
  optionArray.forEach((option) => {
    option.classList.add("option-edit");
  });
  inputSubmit.setAttribute("type", "submit");
  appendFormSelect(form, select, optionArray, inputSubmit);
  return {
    form: form,
    select: select,
  };
}

function appendFormSelect(form, select, arrrayOfOptions, input) {
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
    const extitle = card.titleEl.innerText;
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (editSelect.value === `Video`) {
        console.log("you selected to edit a video");
        const textEditForm = createTextEditForm(`Video ID`, extitle);
        const btn = textEditForm.textSubmitBtn;
        console.log(textEditForm.form);
        console.log(textEditForm.textInput);
        textEditHandler(textEditForm.form, btn, id, `videoid`);
      }
      if (editSelect.value === `Title`) {
        console.log("you selected to edit a title");
        const textEditForm = createTextEditForm(`Title`, extitle);
        const btn = textEditForm.textSubmitBtn;
        console.log(textEditForm.form);
        console.log(textEditForm.textInput);
        textEditHandler(textEditForm.form, btn, id, `extitle`);
      }
      if (editSelect.value === `Summary`) {
        console.log("you selected to edit a summary");
        const textEditForm = createTextEditForm(`Summary`, extitle);
        const btn = textEditForm.textSubmitBtn;
        console.log(textEditForm.form);
        console.log(textEditForm.textInput);
        textEditHandler(textEditForm.form, btn, id, `summary`);
      }
      if (editSelect.value === `Body Part`) {
        console.log("you selected to edit Body Part");
        const textEditForm = createTextEditForm(`Body Part`, extitle);
        const btn = textEditForm.textSubmitBtn;
        console.log(textEditForm.form);
        console.log(textEditForm.textInput);
        textEditHandler(textEditForm.form, btn, id, `bodypart`);
      }
      if (editSelect.value === `Exercise Type`) {
        console.log("you selected to edit Exercise Type");
        const textEditForm = createTextEditForm(`Exercise Type`, extitle);
        const btn = textEditForm.textSubmitBtn;
        console.log(textEditForm.form);
        console.log(textEditForm.textInput);
        textEditHandler(textEditForm.form, btn, id, `extype`);
      }
      if (editSelect.value === `Image`) {
        console.log("you selected to edit a summary");
        const imageEditForm = createImageEditForm(extitle);
        const btn = imageEditForm.imageSubmitBtn;
        console.log(imageEditForm.form);
        console.log(imageEditForm.imageInput);
        imageEditHandler(imageEditForm.form, btn, id, extitle);
      } else {
        return;
      }
    });
  });
}

function textEditHandler(textEditForm, btn, ID, catagory) {
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
      console.log("edit ran");
      console.log(response);
      const resData = await response.json();
      console.log(resData);
      loadExCards();
      textEditForm.remove();
    } else {
      return console.log("error after attempting edit");
    }
  });
}

function imageEditHandler(imageEditForm, btn, ID, extitle) {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(imageEditForm);
    console.log(btn);
    console.log(formData);
    formData.append("extitle", extitle);
    const response = await fetch(`/exercise/image/${ID}`, {
      method: "PATCH",
      body: formData,
    });
    if (response.ok) {
      console.log("edit ran");
      console.log(response);
      const resData = await response.json();
      console.log(resData);
      loadExCards();
      imageEditForm.remove();
    } else {
      return console.log("error after attempting edit");
    }
  });
}

export { createEditCardFormSelect, editFormSubmit };
