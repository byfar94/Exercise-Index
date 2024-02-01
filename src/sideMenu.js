import { loadExCards, loadExCardsBP, loadExCardsET } from "./excards";
import { myAuth } from "./authFireBase";
export {
  showSidebar,
  hideSidebar,
  getBySidebarBodypart,
  getBySidebarAll,
  getBySidebarExtype,
};

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

// query database by catagory (body part or exercise type), clicking all will query all exercies

function getBySidebarAll() {
  const allBtn = document.querySelector("#all-btn");

  allBtn.addEventListener("click", async () => {
    await loadExCards();
    myAuth();
  });
}

function getBySidebarBodypart() {
  const listItems = document.querySelectorAll(".bp-catagory-li");

  listItems.forEach((item) => {
    item.addEventListener("click", async () => {
      console.log(item);
      let bodypart = item.innerText;
      console.log(bodypart);
      await loadExCardsBP(bodypart);
      myAuth();
    });
  });
}

function getBySidebarExtype() {
  const listItems = document.querySelectorAll(".et-catagory-li");

  listItems.forEach((item) => {
    item.addEventListener("click", async () => {
      console.log(item);
      let extype = item.innerText;
      console.log(extype);
      await loadExCardsET(extype);
      myAuth();
    });
  });
}
