import _ from "lodash";
import "./style.css";
require.context("../images"); //will load all images from image folder
import { loadExCards } from "./excards";
import {
  showSidebar,
  hideSidebar,
  getBySidebarBodypart,
  getBySidebarAll,
  getBySidebarExtype,
} from "./sideMenu";
import { revealForm, hideForm } from "./form";
import { renderLogInform } from "./loginForms";
import { renderLogOutBtn, handleSignOut, myAuth } from "./authFireBase";

function loadUI() {
  showSidebar();
  hideSidebar();
  renderLogInform();
  renderLogOutBtn();
  handleSignOut();
  revealForm();
  hideForm();
  getBySidebarAll();
  getBySidebarBodypart();
  getBySidebarExtype();
}

loadUI();
loadExCards();
myAuth();
