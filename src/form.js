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

    // pass form data to URLSearchParams() constructor
    const searchParams = new URLSearchParams(fd);

    console.log(searchParams.toString());

    try {
      const response = await fetch(`http://localhost:3000/exercise`, {
        method: "POST",
        body: searchParams,
      });
      console.log(response);
      let resData = response.json(response);
      console.log(resData);
    } catch (err) {
      console.log(err.message);
    }
  });
}
