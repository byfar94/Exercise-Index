function moveSearch() {
  const mobileWidth = 600;
  const header = document.querySelector("header");
  const mainSection = document.querySelector("main");
  const search = document.querySelector(".search-contain");
  const btnContainer = document.querySelector("#header-btn-contain");

  if (window.innerWidth <= mobileWidth) {
    //  for mobile screen
    search.remove();
    mainSection.prepend(search);
  } else {
    //  for desktop screen
    search.remove();
    header.insertBefore(search, btnContainer);
  }
}

function listenForWindowResize() {
  window.addEventListener("resize", moveSearch);
}

export { moveSearch, listenForWindowResize };
