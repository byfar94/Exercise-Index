export { showSidebar };

function showSidebar() {
  const menuBtn = document.querySelector("#menu-icon");
  const sideBar = document.querySelector("#sidebar");
  menuBtn.addEventListener("click", () => {
    sideBar.classList.toggle("sidebar-in");
  });
}
