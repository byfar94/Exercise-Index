import { loadExCards } from "./excards";
export { revealForm, formSubmit, hideForm };

function revealForm() {
  console.log("reveal form ran");
  const formContain = document.querySelector("#form-contain");
  const formBtn = document.querySelector("#form-btn");
  const background = document.querySelector("#background");
  console.log(background);
  formBtn.addEventListener("click", () => {
    formContain.classList.add("form-in");
    background.classList.remove("background-out");
    background.classList.add("background-in");
    console.log(background.classList);
  });
  formSubmit();
}

function hideForm() {
  const formContain = document.querySelector("#form-contain");
  const formBtn = document.querySelector("#form-btn");
  const background = document.querySelector("#background");
  console.log(background);

  document.addEventListener("click", (event) => {
    if (
      !formContain.contains(event.target) &&
      event.target !== formBtn &&
      formContain.classList.contains("form-in")
    ) {
      console.log(event.target);
      formContain.classList.remove("form-in");
      background.classList.add("background-out");
      background.classList.remove("background-in");
    }
  });
}

function formSubmit() {
  const form = document.querySelector("#exercise-form");
  const formContain = document.querySelector("#form-contain");
  const background = document.querySelector("#background");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    console.log(fd);
    const bodypart = fd.get(`bodypart`);
    const extype = fd.get(`extype`);
    console.log(bodypart);
    console.log(extype);

    const errMsgs = [];
    console.log(errMsgs);
    const bodyPartArray = ["hand", "wrist", "forearm", "elbow", "shoulder"];
    const exTypeArray = ["aarom", "arom", "resistance", "stretch"];

    if (!bodyPartArray.includes(bodypart)) {
      errMsgs.push(
        `Body part must include one of the following: ${bodyPartArray}`
      );
    }
    if (!exTypeArray.includes(extype)) {
      errMsgs.push(
        `Exercise type must include one of the following: ${exTypeArray}`
      );
    }
    if (errMsgs.length === 0) {
      try {
        const response = await fetch(`/exercise`, {
          method: "POST",
          body: fd,
        });
        console.log(response);
        const resData = await response.json(response);
        console.log(resData);
        loadExCards();
        formContain.classList.remove("form-in");
        background.classList.add("background-out");
        background.classList.remove("background-in");
      } catch (err) {
        console.log(err.message);
      }
    }
    if (errMsgs.length > 0) {
      let spacedErrMsg = errMsgs.join(`\n \n`);
      alert(spacedErrMsg);
    }
  });
}
