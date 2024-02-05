import { createFormElement, createContainerElement } from "./elementFactory";
import { handleLogInData } from "./authFireBase";
/*
function createSignUpForm() {
  const signUpFormContainer = createContainerElement("div", "sign-in-contain");
  signUpFormContainer.setAttribute("id", "sign-up-container");
  const signUpForm = createFormElement("form", "sign-up-form");
  const fieldSet = createFormElement("fieldset", "sign-up-fieldset");
  const emailContain = createContainerElement("div");
  const emailLabel = createFormElement("label", "signupemaillabel");
  const emailInput = createFormElement("input", "signupemailinput");
  const PasswordContain = createContainerElement("div");
  const PasswordLabel = createFormElement("label", "signuppasswordlabel");
  const PasswordInput = createFormElement("input", "signuppasswordinput");
  const submitBtn = createFormElement("input", "submit-btn");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "submit");

  return {
    signUpFormContainer: signUpFormContainer,
    signUpForm: signUpForm,
    fieldSet: fieldSet,
    emailContain: emailContain,
    emailLabel: emailLabel,
    emailInput: emailInput,
    PasswordContain: PasswordContain,
    PasswordLabel: PasswordLabel,
    PasswordInput: PasswordInput,
    submitBtn: submitBtn,
  };
}

function renderSignUpform() {
  const btn = document.querySelector("#sign-up-btn");
  let toggle = false;
  btn.addEventListener("click", () => {
    if (toggle == false) {
      console.log("add container sign up");
      const body = document.querySelector("body");
      console.log(body);
      let form = createSignUpForm();
      body.append(form.signUpFormContainer);
      form.signUpFormContainer.append(form.signUpForm);
      form.signUpForm.append(form.fieldSet);
      form.fieldSet.append(form.emailContain);
      form.emailContain.append(form.emailLabel);
      form.emailContain.append(form.emailInput);
      form.fieldSet.append(form.PasswordContain);
      form.PasswordContain.append(form.PasswordLabel);
      form.PasswordContain.append(form.PasswordInput);
      form.fieldSet.append(form.submitBtn);
      toggle = true;
      handleSignUpData();
      return;
    }
    if (toggle == true) {
      console.log("remove container sign up");
      toggle = false;
      document.querySelector("#sign-up-container").remove();
      return;
    }
  });
}

function handleSignUpData() {
  const form = document.querySelector("#sign-up-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      signupemailinput: form.querySelector("#signupemailinput").value,
      signuppasswordinput: form.querySelector("#signuppasswordinput").value,
    };

    try {
      const response = await fetch(`/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      console.log(err.message);
    }
  });
}

export { renderSignUpform };
*/

///login form

function createLogInForm() {
  const logInFormContainer = createContainerElement("div", "sign-in-contain");
  logInFormContainer.setAttribute("id", "log-in-container");
  const logInForm = createFormElement("form", "log-in-form");
  const fieldSet = createFormElement("fieldset", "log-in-fieldset");
  const emailContain = createContainerElement("div");
  const emailLabel = createFormElement("label", "loginemaillabel");
  emailLabel.innerText = "Email";
  const emailInput = createFormElement("input", "loginemailinput");
  const PasswordContain = createContainerElement("div");
  const PasswordLabel = createFormElement("label", "loginpasswordlabel");
  PasswordLabel.innerText = "Password";
  const PasswordInput = createFormElement("input", "loginpasswordinput");
  const submitBtn = createFormElement("input", "log-in-submit-btn");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "submit");

  return {
    logInFormContainer: logInFormContainer,
    logInForm: logInForm,
    fieldSet: fieldSet,
    emailContain: emailContain,
    emailLabel: emailLabel,
    emailInput: emailInput,
    PasswordContain: PasswordContain,
    PasswordLabel: PasswordLabel,
    PasswordInput: PasswordInput,
    submitBtn: submitBtn,
  };
}

function renderLogInform() {
  const btn = document.querySelector("#log-in-btn");
  const background = document.querySelector("#background");
  btn.addEventListener("click", () => {
    if (!document.querySelector("#log-in-container")) {
      console.log("add container log in");
      const body = document.querySelector("body");
      console.log(body);
      let form = createLogInForm();
      body.append(form.logInFormContainer);
      form.logInFormContainer.append(form.logInForm);
      form.logInForm.append(form.fieldSet);
      form.fieldSet.append(form.emailContain);
      form.emailContain.append(form.emailLabel);
      form.emailContain.append(form.emailInput);
      form.fieldSet.append(form.PasswordContain);
      form.PasswordContain.append(form.PasswordLabel);
      form.PasswordContain.append(form.PasswordInput);
      form.fieldSet.append(form.submitBtn);
      handleLogInData();
      background.classList.add("background-in");
      background.classList.remove("background-out");
      hideLogInForm();
      return;
    }
    if (document.querySelector("#log-in-container")) {
      console.log("remove container log in");
      document.querySelector("#log-in-container").remove();
      background.classList.add("background-out");
      background.classList.remove("background-in");
      return;
    }
  });
}

function hideLogInForm() {
  document.addEventListener("click", handleCloseLogInOnClick);
}

function handleCloseLogInOnClick(event) {
  const formContain = document.querySelector("#log-in-container");
  const formBtn = document.querySelector("#log-in-btn");
  const background = document.querySelector("#background");

  if (
    formContain &&
    !formContain.contains(event.target) &&
    event.target !== formBtn
  ) {
    console.log(event.target);
    console.log("removed form");
    formContain.remove();
    background.classList.add("background-out");
    background.classList.remove("background-in");

    document.removeEventListener("click", handleCloseLogInOnClick);
  }
}

export { renderLogInform };
