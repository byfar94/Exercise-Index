import _ from "lodash";
import "./style.css";

async function getData() {
  try {
    let response = await fetch("http://localhost:3000/info");

    let playlistData = await response.json();
    console.log(playlistData);
    return playlistData;
  } catch (err) {
    console.error(err);
  }
}

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

//card factory function, returns an object with HTML elements
function cardFactory(data) {
  let cardObj = {
    cardEl: createContainerElement("div", "card-contain"),
    imageEl: createImageElement(
      "img",
      "card-pic",
      data.snippet.thumbnails.high.url
    ),
    titleEl: createTextElement("h2", "card-title", data.snippet.title),
    descEl: createTextElement(
      "p",
      "card-description",
      data.snippet.description
    ),
    videoEl: createVideoElement(
      "div",
      "card-video",
      data.snippet.resourceId.videoId
    ),
  };
  console.log(cardObj.titleEl);
  return cardObj;
}

// function to create cards using cardFactory function, returns an array of objects containing cards information
async function createCards(asyncData) {
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
}

// function to append cards using an array (which will be t)
async function appendCards(array) {
  let exerciseContainer = document.querySelector(".exercise-container");
  let objArrray = await array;
  objArrray.forEach((obj) => {
    exerciseContainer.append(obj.cardEl);
    obj.cardEl.append(obj.imageEl);
    obj.cardEl.append(obj.titleEl);
    obj.cardEl.append(obj.descEl);
    obj.cardEl.append(obj.videoEl);
  });
}

// using youtube API data to create a card for each video in a youtube setlist

async function loadPage() {
  try {
    let vidData = await getData();
    let newArray = await createCards(vidData);
    appendCards(newArray);
    return newArray;
  } catch (err) {
    console.log(err);
  }
}
let pageData = loadPage();

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

//search functionality
async function search() {
  let exArray = await pageData;
  const searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", () => {
    let value = searchInput.value.toLowerCase();
    exArray.forEach(function (item) {
      console.log(item.titleEl.innerText);
      const visable = item.titleEl.innerText.toLowerCase().includes(value);
      if (value == "" || value == " ") {
        item.cardEl.classList.remove("invis");
      } else if (!visable && value != "") {
        item.cardEl.classList.add("invis");
      } else if (visable && value != "") item.cardEl.classList.remove("invis");
    });
  });
}

search();
