const showProfile = document.querySelector("#showProfile");
const profile = document.querySelector("#profile");
const submitaddApplication = document.querySelector("#submitaddApplication");
const FormAddApplication = document.forms.FormAddApplication;
const tbodyWorkstation = document.querySelector("#tbodyWorkstation");
const theadWorkstation = document.querySelector("#theadWorkstation");
async function getUser() {
  let response = await fetch(`${SERVER_ADDRESS}/api/employee/getEmployee`, {
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
async function getInfoEmployee() {
  let response = await fetch(`${SERVER_ADDRESS}/api/employee/getInfoEmployee`, {
    method: "GET",
    headers: {
      Token: JSON.parse(localStorage.getItem("constr-comp")).token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  let employee = await response.json();
  return employee;
}
async function getInfoWorks() {
  let response = await fetch(`${SERVER_ADDRESS}/api/works/getAllWorks`, {
    method: "GET",
    headers: {
      Token: JSON.parse(localStorage.getItem("constr-comp")).token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  let works = await response.json();
  return works;
}
(async function print() {
  let user = await getUser();
  let employees = await getInfoEmployee();
  let result = await getInfoWorks();
  console.log(result);
  const tr = document.createElement("tr");
  for (const key of result.header) {
    if (key == "предшевствующие работы") tr.append(head("#"));
    else tr.append(head(key));
  }
  theadWorkstation.append(tr);
  result.message.forEach((work) => {
    tbodyWorkstation.append(PrintWorks(work));
  });

  employees.forEach((employee, index, arr) => {
    PrintEmployees(employee, index);
  });
  console.log(employees);
})();

function head(key) {
  const th = document.createElement("th");
  th.append(key);
  return th;
}

function PrintWorks(work) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-rowid", work.previous_works);

  const idTd = document.createElement("td");
  idTd.append(work.previous_works);
  tr.append(idTd);

  const nameTd = document.createElement("td");
  nameTd.append(work.type_work);
  tr.append(nameTd);

  const typejd = document.createElement("td");
  typejd.append(work.target_work);
  tr.append(typejd);

  const loginTd = document.createElement("td");
  loginTd.append(work.cost_work + " у.е.");
  tr.append(loginTd);

  const objd = document.createElement("td");
  objd.append(work.hours_work + " ч.");
  tr.append(objd);

  const surnameTd = document.createElement("td");
  surnameTd.append(work.object_name);
  tr.append(surnameTd);

  const areaTd = document.createElement("td");
  areaTd.append(work.area_object + ' м²');
  tr.append(areaTd);

  const mailTd = document.createElement("td");
  mailTd.append(work.surname_manager);
  tr.append(mailTd);

  const dateWork = document.createElement("td");
  dateWork.append(work.date_work);
  tr.append(dateWork);

  return tr;
}

function PrintEmployees(employee, index) {
  let employee_name = document.querySelector(`#employee_name${index}`);
  let employee_post = document.querySelector(`#employee_post${index}`);
  employee_name.append(
    employee.name_of_employee + " " + employee.surname_of_employee
  );
  employee_post.append(employee.post_of_employee);
}
submitaddApplication.addEventListener("click", async function (event) {
  event.preventDefault();
  let objAddApplication = {
    target: FormAddApplication.elements.target.value,
    reason: FormAddApplication.elements.reason.value,
    title: FormAddApplication.elements.title.value,
    address: FormAddApplication.elements.adres.value,
    email: FormAddApplication.elements.email.value,
  };
  await addApplication(objAddApplication);
  //await printApplication()
});
async function addApplication(objAddApplication) {
  const response = await fetch(`${SERVER_ADDRESS}/api/application/addApplication`, {
    method: "POST",
    headers: {
      Token: JSON.parse(localStorage.getItem("constr-comp")).token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objAddApplication),
  });
  if (response.ok) {
    const result = await response.json();
    if (result.status) {
      result.message = "Заявка добавлена.";
      showMessage(result);
    } else showMessage(result);
  }
}

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
  if (message.status) strong.innerHTML = "Success";
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
  if (message.message)
    divFourth.innerHTML = message.message;
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
document
  .querySelector("#subscribeHome")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    let response = await fetch(`${SERVER_ADDRESS}/api/users/subscribe`, {
      method: "GET",
      headers: {
        Token: JSON.parse(localStorage.getItem("constr-comp")).token,
        Accept: "application/json",
      },
    });
    let result = await response.json();
    if (result.status)
    showMessage({ status: true, message: "Подписка оформлена" });
    else showMessage({ status: false, message: "Подписка уже была оформлена" });
    //return result
  });
