const tableApplication = document.querySelector("#tableApplication");
const applicationList = document.querySelector("#applicationList");
const submitaddApplication = document.querySelector("#submitaddApplication");
const deletedApplicationList = document.querySelector("#deletedApplication");
const FormAddApplication = document.forms.FormAddApplication;
var myModal = new bootstrap.Modal(document.getElementById("deleteModal"), {
  keyboard: false,
});
let modal = document.getElementById("deleteModal");
let indicate;
let listener;
const url =
  "https://cdn2.iconfinder.com/data/icons/seo-internet-marketing-6/256/Web_Development-512.png";
async function GetApplication() {
  const response = await fetch(
    `${SERVER_ADDRESS}/api/application/getApplication`,
    {
      method: "GET",
      headers: {
        Token: JSON.parse(localStorage.getItem("constr-comp")).token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok === true) {
    const applications = await response.json();
    return applications;
  }
}
async function getTargets() {
  const response = await fetch(`${SERVER_ADDRESS}/api/application/getTargets`, {
    method: "GET",
    headers: {
      Token: JSON.parse(localStorage.getItem("constr-comp")).token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const targets = await response.json();
    return targets;
  }
}
async function GetDeletedApplications() {
  const response = await fetch("/home/getDeletedApplications", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (response.ok === true) {
    const deletedApplications = await response.json();
    return deletedApplications;
  }
}
async function printApplication() {
  let applications = await GetApplication();
  if (applications.status) {
    applicationList.innerHTML = "";
    applications.message.forEach((application) => {
      printCard(application);
    });
  } else ShowWarning(applications.message);
}
printApplication();
async function setTargets() {
  let targets = await getTargets();
  if (targets.status) {
    const selectTargetMenu = document.querySelector("#selectTargetMenu");
    selectTargetMenu.innerHTML = "";
    targets.message.forEach((target) => {
      const option = document.createElement("option");
      option.setAttribute("value", `${target.id}`);
      option.append(target.target);
      selectTargetMenu.append(option);
    });
  }
}
setTargets();

function printDeletedApplicationList(deletedApplication) {
  let li = document.createElement("li");
  li.setAttribute("style", "list-style: none;");
  let delId = "delNum" + deletedApplication["номер заявки"];
  li.setAttribute("id", delId);
  let divContent = document.createElement("div");
  divContent.classList.add("deleted-Application-content");
  let divNum = document.createElement("div");
  divNum.classList.add("deleted-Application-num");
  let pText = document.createElement("p");
  pText.append("Номер заявки: ");
  pText.setAttribute("style", "opacity: 0.8;");
  let pNum = document.createElement("p");
  pNum.setAttribute("style", "color: rgb(255,212,59);font-size: 20px;");
  pNum.append(deletedApplication["номер заявки"]);
  divNum.append(pText);
  divNum.append(pNum);
  let divDate = document.createElement("div");
  divDate.classList.add("deleted-Application-date");
  let pTextDate = document.createElement("p");
  pTextDate.append("Дата удаления:");
  pTextDate.setAttribute("style", "opacity: 0.8;");
  let pDate = document.createElement("p");
  pDate.append(deletedApplication["Дата удаления"].slice(0, 10));
  pDate.setAttribute("style", "color: rgb(255,212,59);font-size: 16px;");
  divDate.append(pTextDate);
  divDate.append(pDate);
  divContent.append(divNum);
  divContent.append(divDate);
  let divButton = document.createElement("div");
  let recoverButton = document.createElement("button");
  recoverButton.classList.add("btn");
  recoverButton.classList.add("btn-warning");
  recoverButton.setAttribute("id", "recover");
  recoverButton.append("Восстановить");
  recoverButton.addEventListener("click", (e) => {
    e.preventDefault();
    RecoverApplication(deletedApplication["номер заявки"]);
  });
  divButton.append(recoverButton);
  let divMain = document.createElement("div");
  divMain.classList.add("deleted-Application-elem");
  divMain.append(divContent);
  divMain.append(divButton);
  li.append(divMain);
  deletedApplicationList.append(li);
}
async function RecoverApplication(deletedNum) {
  const response = await fetch(
    "/home/recoverDeletedApplication/" + deletedNum,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (response.ok === true) {
    const deletedApplication = await response.json();
    console.log(deletedApplication);
    if (!deletedApplication.status) showMessage(deletedApplication);
    else {
      printCard(deletedApplication.message);
      document.querySelector("#delNum" + deletedNum).remove();
    }
  }
}
async function addApplication(objAddApplication) {
  const response = await fetch(
    `${SERVER_ADDRESS}/api/application/addApplication`,
    {
      method: "POST",
      headers: {
        Token: JSON.parse(localStorage.getItem("constr-comp")).token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objAddApplication),
    }
  );
  if (response.ok) {
    const result = await response.json();
    if (result.status) {
      printCard(result.applications);
      showMessage({ status: true, message: "Заявка добавлена." });
    } else showMessage(result);
    console.log(result);
  }
}
submitaddApplication.addEventListener("click", async function (event) {
  event.preventDefault();
  let objAddApplication = {
    target: FormAddApplication.elements.target.value,
    targetSelect: FormAddApplication.elements.targetSelect.value,
    reason: FormAddApplication.elements.reason.value,
    title: FormAddApplication.elements.title.value,
    address: FormAddApplication.elements.adres.value,
    email: FormAddApplication.elements.email.value,
    area: FormAddApplication.elements.area.value,
  };
  await addApplication(objAddApplication);
  //await printApplication()
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
  if (message?.status === true) strong.innerHTML = "Success";
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
  if (message?.infoMessage)
    divFourth.innerHTML = message.message + "<br>" + message.infoMessage;
  else divFourth.innerHTML = message?.message;
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

function printCard(application) {
  if (document.querySelector("#alertWarning"))
    document.querySelector("#alertWarning").remove();
  let divMain = document.createElement("div");
  divMain.classList.add("card");
  divMain.classList.add("color-card");
  divMain.setAttribute("style", "width: 18rem");
  divMain.setAttribute("id", "num" + application.application_number);
  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = url;
  let divSecond = document.createElement("div");
  divSecond.classList.add("card-body");
  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.append(application.application_number);
  let date = document.createElement("p");
  date.classList.add("date-block");
  date.append(application.date_of_creation.slice(0, 10));
  let statusApp = document.createElement("p");
  if (application.status) {
    statusApp.style.color = "green";
    statusApp.append("Одобрено");
  } else {
    statusApp.style.color = "rgb(255,212,59)";
    statusApp.append("Ожидает");
  }
  date.append(statusApp);
  divSecond.append(h5);
  divSecond.append(date);
  let ul = document.createElement("ul");
  ul.classList.add("list-group");
  ul.classList.add("list-group-flush");
  ul.classList.add("list-group-application");
  let li2 = document.createElement("li");
  li2.classList.add("list-group-item");
  li2.classList.add("list-group-item-application");
  let p1 = document.createElement("p");
  p1.classList.add("card-text");
  p1.append("Цель обследования");
  li2.append(p1);
  li2.append(application.purpose_of_survey);
  let li3 = document.createElement("li");
  li3.classList.add("list-group-item");
  li3.classList.add("list-group-item-application");
  let p2 = document.createElement("p");
  p2.classList.add("card-text");
  p2.append("Причина обследования");
  li3.append(p2);
  li3.append(application.reason_for_examination);
  let li4 = document.createElement("li");
  li4.classList.add("list-group-item");
  li4.classList.add("list-group-item-application");
  let p3 = document.createElement("p");
  p3.classList.add("card-text");
  p3.append("Название объекта");
  li4.append(p3);
  li4.append(application.name_of_object);
  let li5 = document.createElement("li");
  li5.classList.add("list-group-item");
  li5.classList.add("list-group-item-application");
  let p4 = document.createElement("p");
  p4.classList.add("card-text");
  p4.append("Расположение объекта");
  li5.append(p4);
  li5.append(application.location_of_object);
  let li6 = document.createElement("li");
  li6.classList.add("list-group-item");
  li6.classList.add("list-group-item-application");
  let p5 = document.createElement("p");
  p5.classList.add("card-text");
  p5.append("Контактные данные");
  li6.append(p5);
  li6.append(application.client_contact_details);
  ul.append(li2);
  ul.append(li3);
  ul.append(li4);
  ul.append(li5);
  ul.append(li6);
  let divThird = document.createElement("div");
  divThird.classList.add("card-body");
  const removeLink = document.createElement("a");
  removeLink.setAttribute("data-id", application.application_number);
  removeLink.href = "#";
  removeLink.setAttribute(
    "style",
    "card-link; cursor:pointer; color:rgb(255,212,59);text-decoration: none;"
  );
  // removeLink.setAttribute("data-bs-toggle", "modal");
  // removeLink.setAttribute("data-bs-target", "#deleteModal");
  removeLink.append("Удалить");
  divThird.append(removeLink);
  divMain.append(img);
  divMain.append(divSecond);
  divMain.append(ul);
  divMain.append(divThird);
  applicationList.append(divMain);
  // if(indicate) DeleteApplication(application['номер заявки']);
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    modal.removeEventListener("hide.bs.modal", listener);
    listener = async function () {
      if (indicate) {
        await DeleteApplication(application.application_number);
        indicate = false;
        return;
      } else return;
    };
    modal.removeEventListener("hide.bs.modal", listener);
    myModal.show();
    modal.addEventListener("hide.bs.modal", listener);
    // if(indicate) DeleteApplication(application['номер заявки']);
    // else return
  });
}

function ShowWarning(result) {
  let div = document.createElement("div");
  div.classList.add("alert");
  div.classList.add("alert-primary");
  div.setAttribute("id", "alertWarning");
  div.setAttribute("role", "alert");
  div.setAttribute("style", "width:400px;text-align: center;font-size: 30px;");
  div.append(result);
  document.querySelector("#applictionContainer").append(div);
}
async function DeleteApplication(number) {
  const response = await fetch(
    `${SERVER_ADDRESS}/api/application/deleteApplication/${number}`,
    {
      method: "DELETE",
      headers: {
        Token: JSON.parse(localStorage.getItem("constr-comp")).token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const result = await response.json();
    if (result.status) {
      showMessage({ status: true, message: "Заявка удалена" });
      document.querySelector(`#num${number}`).remove();
      // let deletedApplications = await GetDeletedApplications();
      // if (deletedApplications.status) {
      //   deletedApplication.innerHTML = "";
      //   deletedApplications.message.forEach((deletedApplication) => {
      //     printDeletedApplicationList(deletedApplication);
      //   });
      // } else showMessage(deletedApplications);
    } else showMessage(result);
    if (applicationList.innerHTML == "") ShowWarning("Завки отсутствуют");
  }
}
// function printTable(results){
//     let thead = document.querySelector("#thead");
//     const tr = document.createElement("tr");
//     for (const key in results[0]) {
//         tr.append(head(key));
//     }
//     thead.append(tr)
//     let rows = document.querySelector("#tbody");
//     results.forEach(result => {
//         rows.append(row(result));
//     });
// }
// function row(application) {

//     const tr = document.createElement("tr");
//     tr.setAttribute("data-rowid", application['номер заявки']);

//     const idTd = document.createElement("td");
//     idTd.append(application['номер заявки']);
//     tr.append(idTd);

//     const nameTd = document.createElement("td");
//     nameTd.append(application['цель обследования']);
//     tr.append(nameTd);

//     const surnameTd = document.createElement("td");
//     surnameTd.append(application['причина обследования']);
//     tr.append(surnameTd);

//     const loginTd = document.createElement("td");
//     loginTd.append(application['название объекта']);
//     tr.append(loginTd);

//     const mailTd = document.createElement("td");
//     mailTd.append(application['расположение объекта']);
//     tr.append(mailTd);

//     const passwordTd = document.createElement("td");
//     passwordTd.append(application['контактные данные клиента']);
//     tr.append(passwordTd);

//     const linksTd = document.createElement("td");

//     const removeLink = document.createElement("a");
//     removeLink.setAttribute("data-id", application['номер заявки']);
//     removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
//     removeLink.append("Удалить");
//     removeLink.addEventListener("click", e => {

//         e.preventDefault();
//         DeleteUser(application['номер заявки']);
//     });

//     linksTd.append(removeLink);
//     tr.appendChild(linksTd);

//     return tr;
// }
document.querySelector("#acsesButton").addEventListener("click", function () {
  indicate = true;
  myModal.hide();
});
document.querySelector("#closeButton").addEventListener("click", function () {
  indicate = false;
});
document.querySelector("#closeCrosse").addEventListener("click", function () {
  indicate = false;
});
