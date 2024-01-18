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
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);

    try {
      const response = await fetch(`/exercise`, {
        method: "POST",
        body: fd,
      });
      console.log(response);
      const resData = await response.json(response);
      console.log(resData);
    } catch (err) {
      console.log(err.message);
    }
  });
}
