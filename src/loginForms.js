import {
  createFormElement,
  createContainerElement,
  createTextElement,
} from "./elementFactory";

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
