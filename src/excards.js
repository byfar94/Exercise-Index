import { getDbData, getDbDataBP, getDbDataET } from "./apidb";
import { search } from "./search";
import {
  createContainerElement,
  createTextElement,
  createVideoElement,
  createImageElement,
} from "./elementFactory";
import { deleteDataHandler } from "./dataHandler";
import { showVid } from "./video";
import { createEditCardFormSelect, editFormSubmit } from "./editFormBtn";
import { createCatagoryTitle } from "./catagoryTitle";
export { loadExCards, loadExCardsBP, loadExCardsET };

//card factory function, returns an object with HTML elements
function cardFactory(data) {
  console.log(`${data.imagepath}`);
  console.log(`${data.videoid}`);
  let cardEditFormSelect = createEditCardFormSelect();

  let cardObj = {
    cardEl: createContainerElement("div", "card-contain"),
    imageEl: createImageElement(
      "img",
      "card-pic",
      `https://exercise-index-images.s3.amazonaws.com/${data.imagepath}`
    ),
    titleEl: createTextElement("h2", "card-title", data.extitle),
    descEl: createTextElement("p", "card-description", data.summary),
    videoEl: createVideoElement("div", "card-video", data.videoid),
    editEl: createContainerElement("div", "edit-btn-contain"),
    dltBtn: createTextElement("button", "delete-btn", "Delete"),
    editForm: cardEditFormSelect.form,
    editSelect: cardEditFormSelect.select,
    bodyPart: data.bodypart,
    exerciseType: data.extype,
    id: data.id,
  };

  console.log(cardObj.videoEl);
  console.log(cardObj.imageEl);
  return cardObj;
}

// function to create cards using cardFactory function, returns an array of objects containing cards information
async function createCards(asyncData) {
  try {
    let newData = await asyncData;
    console.log(newData);
    let domCardArray = [];
    newData.forEach((data) => {
      console.log(data);
      let newCard = cardFactory(data);
      console.log(newCard);
      domCardArray.push(newCard);
    });
    console.log(domCardArray);
    return domCardArray;
  } catch (err) {
    console.log(err);
  }
}

// function to append cards using an array (which will be t)
async function appendCards(array) {
  let exerciseContainer = document.querySelector(".exercise-container");
  exerciseContainer.innerHTML = "";
  try {
    let objArrray = await array;
    objArrray.forEach((obj) => {
      exerciseContainer.append(obj.cardEl);
      obj.cardEl.append(obj.imageEl);
      obj.cardEl.append(obj.titleEl);
      obj.cardEl.append(obj.descEl);
      obj.cardEl.append(obj.videoEl);
      obj.cardEl.append(obj.editEl);
      obj.editEl.append(obj.dltBtn);
      obj.editEl.append(obj.editForm);
    });
  } catch (err) {
    console.log(err);
  }
}

// using youtube API data to create a card for each video in a youtube setlist
/*
async function loadExCards() {
  try {
    showSidebar();
    renderLogInform();
    renderLogOutBtn();
    handleSignOut();
    let vidData = await getDbData();
    let newArray = await createCards(vidData);
    appendCards(newArray);
    search(newArray);
    deleteDataHandler(newArray);
    revealForm();
  } catch (err) {
    console.log(err);
  }
}
*/

//load all exercise cards
async function loadExCards() {
  try {
    let vidData = await getDbData();
    let newArray = await createCards(vidData);
    await appendCards(newArray);
    createCatagoryTitle("All exercise");
    search(newArray);
    deleteDataHandler(newArray);
    editFormSubmit(newArray);
    showVid();
  } catch (err) {
    console.log(err);
  }
}

//load exercise card query by bodypart
async function loadExCardsBP(bp) {
  try {
    let vidData = await getDbDataBP(bp);
    let newArray = await createCards(vidData);
    await appendCards(newArray);
    createCatagoryTitle(bp + " exercises");
    search(newArray);
    deleteDataHandler(newArray);
    editFormSubmit(newArray);
    showVid();
  } catch (err) {
    console.log(err);
  }
}

//load exercise card query by extype
async function loadExCardsET(et) {
  try {
    let vidData = await getDbDataET(et);
    let newArray = await createCards(vidData);
    await appendCards(newArray);
    createCatagoryTitle(et + " exercises");
    search(newArray);
    deleteDataHandler(newArray);
    editFormSubmit(newArray);
    showVid();
  } catch (err) {
    console.log(err);
  }
}
