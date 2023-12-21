export { search };

//search functionality
async function search(data) {
  try {
    let exArray = await data;
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
        } else if (visable && value != "")
          item.cardEl.classList.remove("invis");
      });
    });
  } catch (err) {
    console.log(err);
  }
}
