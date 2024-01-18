export { showSidebar, hideSidebar };

function showSidebar() {
  const menuBtn = document.querySelector("#menu-icon");
  const sideBar = document.querySelector("#sidebar");
  const background = document.querySelector("#background");
  menuBtn.addEventListener("click", () => {
    sideBar.classList.add("sidebar-in");
    background.classList.remove("background-out");
    background.classList.add("background-in");
  });
}

function hideSidebar() {
  const sideBar = document.querySelector("#sidebar");
  const menuIcon = document.querySelector("#menu-icon");
  const background = document.querySelector("#background");
  document.addEventListener("click", (event) => {
    if (
      !sideBar.contains(event.target) &&
      event.target !== menuIcon &&
      !document.querySelector("#log-in-container") &&
      sideBar.classList.contains("sidebar-in")
    ) {
      console.log(event.target);
      sideBar.classList.remove("sidebar-in");
      background.classList.add("background-out");
      background.classList.remove("background-in");
    }
  });
}

/*
// will allow hideSidebar to work even when the log-in-container doesn't exist
function ifLogInContain(event) {
  if (
    document.querySelector("#log-in-container") &&
    !document.querySelector("#log-in-container").contains(event.target)
  ) {
    return true;
  }
  if (!document.querySelector("#log-in-container")) {
    return true;
  } else {
    return false;
  }
}

*/
