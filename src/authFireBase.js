const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} = require("firebase/auth");
const { firebaseConfig } = require("../fireBaseConfig.js");
const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);

//log in
function handleLogInData() {
  const logInContainer = document.querySelector("#log-in-container");
  const form = document.querySelector("#log-in-form");
  const background = document.querySelector("#background");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector("#loginemailinput").value;
    const password = form.querySelector("#loginpasswordinput").value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`user logged in, user:${user}`);
        logInContainer.remove();
        background.classList.add("background-out");
        background.classList.remove("background-in");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  });
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
      let selectEdit = document.querySelectorAll(".edit-select-form");
      selectEdit.forEach((select) => {
        select.classList.remove("invis");
      });
      formBtn.classList.remove("invis");
      console.log(uid);
    } else {
      console.log("user signed out");
      let dltButtons = document.querySelectorAll(".delete-btn");
      dltButtons.forEach((btn) => {
        btn.classList.add("invis");
      });
      let selectEdit = document.querySelectorAll(".edit-select-form");
      selectEdit.forEach((select) => {
        select.classList.add("invis");
      });
      formBtn.classList.add("invis");
      btnOut.classList.add("invis");
      btnIn.classList.remove("invis");
    }
  });
}

export { handleLogInData, handleSignOut, myAuth };
