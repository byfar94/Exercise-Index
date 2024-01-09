import _ from "lodash";
import "./style.css";
require.context("../images"); //will load all images from image folder
import { loadExCards, loadExCardsLoggedIn } from "./excards";

loadExCards();

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
      console.log(vidID);
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
