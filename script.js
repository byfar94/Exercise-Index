let videoSection = document.querySelector(".exercise-container");

console.log(videoSection);

async function getData() {
  try {
    let response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLqhofO-4kYdstIouG7AtMPWUXL1ZwvGSG&key=AIzaSyDB8GhNoc3I3u8kspR7sozXGHlaZKlNRSc"
    );

    let playlistData = await response.json();
    console.log(playlistData);
    createCard(playlistData);
    return playlistData;
  } catch (err) {
    console.error(err);
  }
}

function createCard(datas) {
  datas.items.forEach((data) => {
    let cardTitle = createElement("h2", "card-title", data.snippet.title);
    console.log(cardTitle);
    videoSection.appendChild(cardTitle);
    let cardPic = createElement(
      "img",
      "card-pic",
      undefined,
      data.snippet.thumbnails.high.url
    );
    console.log(cardPic);
    videoSection.appendChild(cardPic);
    let cardDescription = createElement(
      "p",
      "card-description",
      data.snippet.description
    );
    console.log(cardDescription.innerText);
    videoSection.appendChild(cardDescription);
    let cardVideo = createElement(
      "div",
      "card-video",
      undefined,
      undefined,
      data.snippet.resourceId.videoId
    );
    console.log(cardVideo);
    videoSection.appendChild(cardVideo);
  });
}

function displayCards() {}

getData();

function createElement(el, cls, inText, image, vid) {
  let element = document.createElement(el);
  if (cls != undefined) {
    element.classList.add(cls);
  }
  if (inText != undefined) {
    element.innerHTML = inText;
  }
  if (image != undefined) {
    element.src = image;
  }
  if (vid != undefined) {
    element.innerHTML = `<iframe id=player type=text/html width=300 height=200 src= https://www.youtube.com/embed/${vid} frameborder=0 ></iframe>`;
  }
  return element;
}

function createExerciseCard(cardTitle, cardImg, cardVideo, cardSummary) {}

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
