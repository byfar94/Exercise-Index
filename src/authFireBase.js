const { createTextElement } = require("./elementFactory.js");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} = require("firebase/auth");
const { firebaseConfig } = require("../fireBaseConfig.js");
import { startCase } from "lodash";

const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);

//log in
function handleLogInData() {
  const logInContainer = document.querySelector("#log-in-container");
  const form = document.querySelector("#log-in-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector("#loginemailinput").value;
    const password = form.querySelector("#loginpasswordinput").value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`user logged in, user:${user}`);
        logInContainer.remove();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  });
}

//log out
function createLogOutBtn() {
  let btn = createTextElement("button", "log-out-btn", "log out");
  btn.setAttribute("id", "log-out-btn");
  return btn;
}

function renderLogOutBtn() {
  let btn = createLogOutBtn();
  let container = document.querySelector("#user-btn-contain");
  container.append(btn);
  console.log("append log out btn");
}

function handleSignOut() {
  let btnOut = document.querySelector("#log-out-btn");

  btnOut.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

//auth state
async function myAuth() {
  onAuthStateChanged(auth, (user) => {
    let btnOut = document.querySelector("#log-out-btn");
    let btnIn = document.querySelector("#log-in-btn");
    let formBtn = document.querySelector("#form-btn");
    console.log(btnOut.classList);
    console.log(btnIn.classList);
    if (user) {
      const uid = user.uid;
      console.log(`user is logged in, user:${uid}`);
      btnIn.classList.add("invis");
      btnOut.classList.remove("invis");
      let dltButtons = document.querySelectorAll(".delete-btn");
      dltButtons.forEach((btn) => {
        btn.classList.remove("invis");
      });
      formBtn.classList.remove("invis");
      console.log(uid);
    } else {
      console.log("user signed out");
      let dltButtons = document.querySelectorAll(".delete-btn");
      dltButtons.forEach((btn) => {
        btn.classList.add("invis");
      });
      formBtn.classList.add("invis");
      btnOut.classList.add("invis");
      btnIn.classList.remove("invis");
    }
  });
}

export { handleLogInData, renderLogOutBtn, handleSignOut, myAuth };
