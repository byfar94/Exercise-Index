export { revealForm };

function revealForm() {
  console.log("reveal form ran");
  const formContain = document.querySelector("#form-contain");
  const formBtn = document.querySelector("#form-btn");
  formBtn.addEventListener("click", () => {
    formContain.classList.toggle("form-in");
  });
}
