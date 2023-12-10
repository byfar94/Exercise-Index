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
  element.innerHTML = `<iframe id=player type=text/html width=300 height=200 src= https://www.youtube.com/embed/${vid} frameborder=0 ></iframe>`;
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
  domCardArray = [];
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
(async () => {
  try {
    let vidData = await getData();
    let newArray = createCards(vidData);
    appendCards(newArray);
  } catch (err) {
    console.log(err);
  }
})();

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
    });
  }
}

setTimeout(showVid, 1000);

//search functionality
function search() {
  const searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", () => {
    let value = searchInput.value.toLowerCase();
    exArray.forEach(function (item) {
      const visable = item.exercise.toLowerCase().includes(value);
      if (value == "" || value == " ") {
        item.card.classList.remove("hide");
      } else if (!visable && value != "") {
        item.card.classList.add("hide");
      } else if (visable && value != "") item.card.classList.remove("hide");
    });
  });
}
