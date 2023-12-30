import _ from "lodash";
import "./style.css";
require("/images/menu.svg");
require("/images/search.svg");
import { getData } from "./api";
import { search } from "./search";
import {
  createContainerElement,
  createTextElement,
  createVideoElement,
  createImageElement,
} from "./elementFactory";
import { showSidebar } from "./sideMenu";
import { revealForm } from "./form";

//card factory function, returns an object with HTML elements
function cardFactory(data) {
  let fullDesc = data.snippet.description;
  console.log(fullDesc);
  let descArray = fullDesc.split(",", 3);
  console.log(descArray[0]);
  console.log(descArray);
  let cardObj = {
    cardEl: createContainerElement("div", "card-contain"),
    imageEl: createImageElement(
      "img",
      "card-pic",
      data.snippet.thumbnails.high.url
    ),
    titleEl: createTextElement("h2", "card-title", data.snippet.title),
    descEl: createTextElement("p", "card-description", descArray[2]),
    videoEl: createVideoElement(
      "div",
      "card-video",
      data.snippet.resourceId.videoId
    ),
    bodyPart: descArray[0],
    exerciseType: descArray[1],
  };
  console.log(cardObj.titleEl);
  return cardObj;
}

// function to create cards using cardFactory function, returns an array of objects containing cards information
async function createCards(asyncData) {
  try {
    let newData = await asyncData;
    console.log(newData);
    let domCardArray = [];
    newData.items.forEach((data) => {
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
  try {
    let objArrray = await array;
    objArrray.forEach((obj) => {
      exerciseContainer.append(obj.cardEl);
      obj.cardEl.append(obj.imageEl);
      obj.cardEl.append(obj.titleEl);
      obj.cardEl.append(obj.descEl);
      obj.cardEl.append(obj.videoEl);
    });
  } catch (err) {
    console.log(err);
  }
}

// using youtube API data to create a card for each video in a youtube setlist

async function loadPage() {
  try {
    let vidData = await getData();
    let newArray = await createCards(vidData);
    appendCards(newArray);
    search(newArray);
    if (newArray) {
      showSidebar();
      revealForm();
    }
  } catch (err) {
    console.log(err);
  }
}

loadPage();
//event listeners

async function showVid() {
  let pictures = document.querySelectorAll(".card-pic");
  let videos = document.querySelectorAll(".card-video");
  console.log({
    pics: pictures,
    vids: videos,
  });
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener("click", function () {
      videos[i].classList.remove("hide");
      videos[i].classList.add("show");
      let vidContain = videos[i];
      let vidID = vidContain.getAttribute("videoId");
      videos[
        i
      ].innerHTML = `<iframe id=player type=text/html src= https://www.youtube.com/embed/${vidID}?autoplay=1 frameborder=0 ></iframe>`;
      setTimeout(hideVideo, 15000, videos[i]);
    });
  }
}

function hideVideo(para) {
  para.classList.remove("show");
  para.classList.add("hide");
  para.innerHTML = "";
  console.log(`${para.getAttribute("videoId")} has stopper playing`);
}

setTimeout(showVid, 1000);
