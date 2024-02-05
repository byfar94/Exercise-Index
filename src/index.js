import _ from "lodash";
import "./style.css";
require.context("./images"); //will load all images from image folder
import { loadExCards } from "./excards";
import {
  getBySidebarBodypart,
  getBySidebarAll,
  getBySidebarExtype,
} from "./sideMenu";
import { revealForm, hideForm } from "./form";
import { renderLogInform } from "./loginForms";
import { handleSignOut, myAuth } from "./authFireBase";
import { moveSearch, listenForWindowResize } from "./windowAdjust";

async function loadUI() {
  renderLogInform();
  handleSignOut();
  revealForm();
  hideForm();
  getBySidebarBodypart();
  getBySidebarAll();
  getBySidebarExtype();
}

loadExCards();
loadUI();
myAuth();
moveSearch();
listenForWindowResize();
