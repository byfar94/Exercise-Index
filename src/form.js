export { revealForm, formSubmit };

function revealForm() {
  console.log("reveal form ran");
  const formContain = document.querySelector("#form-contain");
  const formBtn = document.querySelector("#form-btn");
  formBtn.addEventListener("click", () => {
    formContain.classList.toggle("form-in");
  });
  formSubmit();
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
