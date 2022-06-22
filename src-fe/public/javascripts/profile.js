const login = document.querySelector("#login");
const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const email = document.querySelector("#email");
const submitEditUser = document.querySelector("#submitEditUser");
const submitEditPassword = document.querySelector("#submitEditPassword");
const closeEditPassword = document.querySelector("#closeEditPassword");
const modalFooter = document.querySelector("#modalFooter");
const spinnerEdit = document.querySelector("#spinnerEdit");
const FormEditUser = document.forms.FormEditUser;
const FormEditPassword = document.forms.FormEditPassword;
async function getUser() {
  let response = await fetch(`${SERVER_ADDRESS}/api/users/getUser`, {
    method: "GET",
    headers: {
      Token: JSON.parse(localStorage.getItem("constr-comp")).token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  let user = await response.json();
  return user;
}
async function printHome() {
  let user = await getUser();
  login.innerHTML = "";
  login.append(user.login);
  name.innerHTML = "";
  name.append(user.name);
  surname.innerHTML = "";
  surname.append(user.surname);
  email.innerHTML = "";
  email.append(user.email);
  FormEditUser.elements.login.value = user.login;
  FormEditUser.elements.name.value = user.name;
  FormEditUser.elements.surname.value = user.surname;
  FormEditUser.elements.email.value = user.email;
}
printHome();
async function editUser(objEditValue) {
  const response = await fetch(`${SERVER_ADDRESS}/api/users/editUser`, {
    method: "POST",
    headers: {
      Token: JSON.parse(localStorage.getItem("constr-comp")).token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objEditValue),
  });
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    showMessage(result);
  }
}
submitEditUser.addEventListener("click", async function (event) {
  event.preventDefault();
  spinnerEdit.classList.toggle("invisible");
  let objEditValue = {
    login: FormEditUser.elements.login.value,
    name: FormEditUser.elements.name.value,
    surname: FormEditUser.elements.surname.value,
    email: FormEditUser.elements.email.value,
  };
  await editUser(objEditValue);
  let user = await getUser();
  nameAndSurname.innerHTML = "";
  nameAndSurname.append(user.name + " " + user.surname);
  await printHome();
  spinnerEdit.classList.toggle("invisible");
});

function showMessage(message) {
  let divMain = document.querySelector("#ToastMain");
  let divSecond = document.createElement("div");
  let randomID = Math.random() + "liveToast" + performance.now();
  divSecond.setAttribute("id", randomID);
  divSecond.classList.add("toast");
  divSecond.classList.add("show");
  divSecond.classList.add("fade");
  let divThird = document.createElement("div");
  divThird.classList.add("toast-header");
  let strong = document.createElement("strong");
  strong.classList.add("me-auto");
  if (message.status === true) strong.innerHTML = "Success";
  else strong.innerHTML = "Error";
  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("aria-label", "Закрыть");
  button.setAttribute("id", randomID);
  button.classList.add("btn-close");
  divThird.append(strong);
  divThird.append(button);
  let divFourth = document.createElement("div");
  divFourth.classList.add("toast-body");
  divFourth.setAttribute("id", "message");
  if (message.infoMessage)
    divFourth.innerHTML = message.message + "<br>" + message.infoMessage;
  else divFourth.innerHTML = message.message;
  divSecond.append(divThird);
  divSecond.append(divFourth);
  divMain.prepend(divSecond);
  button.addEventListener("click", function () {
    document.getElementById(randomID).classList.replace("show", "hide");
  });
  hide(randomID);
}

function hide(ToastID) {
  setTimeout(() => {
    document.getElementById(ToastID).remove();
  }, 4000);
}
submitEditPassword.addEventListener("click", async function (event) {
  event.preventDefault();
  let result = await EditPassword({
    oldPassword: FormEditPassword.elements.oldPassword.value,
    newPassword: FormEditPassword.elements.newPassword.value,
    repeatNewPassword: FormEditPassword.elements.repeatNewPassword.value,
  });
  if (result) {
    closeEditPassword.click();
    showMessage(result);
    FormEditPassword.elements.oldPassword.value = "";
    FormEditPassword.elements.newPassword.value = "";
    FormEditPassword.elements.repeatNewPassword.value = "";
  } else {
    for (const alert of document.querySelectorAll("#alertWarning")) {
      alert.remove();
    }
    let div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add("alert-warning");
    div.setAttribute("role", "alert");
    div.setAttribute("id", "alertWarning");
    div.append("Неверный старый пароль либо два новых пароля не совпадают.");
    modalFooter.before(div);
    setTimeout(() => {
      div.remove();
    }, 4000);
  }
});
closeEditPassword.addEventListener("click", function () {
  FormEditPassword.elements.oldPassword.value = "";
  FormEditPassword.elements.newPassword.value = "";
  FormEditPassword.elements.repeatNewPassword.value = "";
  for (const alert of document.querySelectorAll("#alertWarning")) {
    alert.remove();
  }
});
async function EditPassword(passwords) {
  if (passwords.newPassword == passwords.repeatNewPassword) {
    const response = await fetch(`${SERVER_ADDRESS}/api/users/editPassword`, {
      method: "POST",
      headers: {
        Token: JSON.parse(localStorage.getItem("constr-comp")).token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldpassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return false;
      }
    }
  } else return false;
}
