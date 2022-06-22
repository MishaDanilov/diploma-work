const thead = document.querySelector("#thead");
const tbody = document.querySelector("#tbody");
const SERVER_ADDRESS = "http://localhost:8080";

var EditClientModal = new bootstrap.Modal(
  document.getElementById("EditClientModal"),
  {
    keyboard: false,
  }
);
var EditResurseModal = new bootstrap.Modal(
  document.getElementById("EditResurseModal"),
  {
    keyboard: false,
  }
);
var EditApplicationModal = new bootstrap.Modal(
  document.getElementById("EditApplicationModal"),
  {
    keyboard: false,
  }
);
var ForecastApplicationModal = new bootstrap.Modal(
  document.getElementById("ForecastApplicationModal"),
  {
    keyboard: false,
  }
);
var EditInfoWorksModal = new bootstrap.Modal(
  document.getElementById("EditInfoWorksModal"),
  {
    keyboard: false,
  }
);
var EditInfoEmployeesModal = new bootstrap.Modal(
  document.getElementById("EditInfoEmployeesModal"),
  {
    keyboard: false,
  }
);
var EditInfoAdministrationModal = new bootstrap.Modal(
  document.getElementById("EditInfoAdministrationModal"),
  {
    keyboard: false,
  }
);
var EditStandardsWorksModal = new bootstrap.Modal(
  document.getElementById("EditStandardsWorksModal"),
  {
    keyboard: false,
  }
);
var EditCommonRulesModal = new bootstrap.Modal(
  document.getElementById("EditCommonRulesModal"),
  {
    keyboard: false,
  }
);
var EditDetailedRulesModal = new bootstrap.Modal(
  document.getElementById("EditDetailedRulesModal"),
  {
    keyboard: false,
  }
);
var EditTechnicalConclusionModal = new bootstrap.Modal(
  document.getElementById("EditTechnicalConclusionModal"),
  {
    keyboard: false,
  }
);
const FormEditClient = document.forms.FormEditClient;
const FormEditApplication = document.forms.FormEditApplication;
const FormEditResurse = document.forms.FormEditResurse;
const FormEditInfoWorks = document.forms.FormEditInfoWorks;
const FormEditInfoEmployees = document.forms.FormEditInfoEmployees;
const FormEditAdministration = document.forms.FormEditAdministration;
const FormEditStandardsWorks = document.forms.FormEditStandardsWorks;
const FormEditCommonRules = document.forms.FormEditCommonRules;
const FormEditDetailedRules = document.forms.FormEditDetailedRules;
const FormEditTechnicalConclusion = document.forms.FormEditTechnicalConclusion;

const TableList = document.querySelector("#TableList");

document
  .querySelector("#clients")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#clients").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch(`${SERVER_ADDRESS}/api/employee/getEmployees`, {
      method: "GET",
      headers: {
        Token: JSON.parse(localStorage.getItem("constr-comp")).token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    console.log(result);
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key of result.header) {
        tr.append(head(key));
      }

      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "clientsAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);

      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableClients(elem));
      });
      document
        .querySelector("#clientsAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch("/admin/panel/addClient", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: document.querySelector("#IDклиента").value,
              column1: document.querySelector("#Имя").value,
              column2: document.querySelector("#Фамилия").value,
              column3: document.querySelector("#Логин").value,
              column4: document.querySelector("#Почта").value,
              column5: document.querySelector("#Пароль").value,
              column6: document.querySelector("#объектыклиента").value,
              column7: document.querySelector("#Заявки").value,
              column8: document.querySelector("#номертехническогозаключения")
                .value,
              column9: document.querySelector("#Статусподписки").value,
            }),
          });
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Пользователь добавлен" });
              tbody.append(printTableClients(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

let identificator;
document
  .querySelector("#submitEditClient")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/admin/panel/editClient", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: identificator,
        name: FormEditClient.elements.name.value,
        surname: FormEditClient.elements.surname.value,
        email: FormEditClient.elements.email.value,
        object: FormEditClient.elements.object.value,
        numOftex: FormEditClient.elements.numOftex.value,
        statusSubscription: FormEditClient.elements.statusSubscription.value,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        document
          .querySelector(
            "tr[data-rowid='" + result.message["ID клиента"] + "']"
          )
          .replaceWith(printTableClients(result.message));
        showMessage({ status: true, message: "Пользователь обновлён" });
        EditClientModal.hide();
      } else {
        showMessage(result);
        EditClientModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditApplication")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch(
      `${SERVER_ADDRESS}/api/application/editApplication`,
      {
        method: "POST",
        headers: {
          Token: JSON.parse(localStorage.getItem("constr-comp")).token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num: identificator,
          target: FormEditApplication.elements.target.value,
          reason: FormEditApplication.elements.reason.value,
          title: FormEditApplication.elements.title.value,
          placeobject: FormEditApplication.elements.placeobject.value,
          contactData: FormEditApplication.elements.contactData.value,
          statusAppliction: FormEditApplication.elements.statusAppliction.value,
        }),
      }
    );
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" + result.application.application_number + "']"
          )
          .replaceWith(printTableApplication(result.application));
        showMessage({ status: true, message: "Заявка обновлена" });
        EditApplicationModal.hide();
      } else {
        showMessage(result);
        EditApplicationModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditResurse")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/admin/panel/editResurse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: identificator,
        count: FormEditResurse.elements.count.value,
        cost: FormEditResurse.elements.cost.value,
        need: FormEditResurse.elements.need.value,
        documentation: FormEditResurse.elements.documentation.value,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" +
              result.message["порядковый номер складского учёта"] +
              "']"
          )
          .replaceWith(printTableResurse(result.message));
        showMessage({ status: true, message: "Материалы обновлены" });
        EditResurseModal.hide();
      } else {
        showMessage(result);
        EditResurseModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditInfoWorks")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/admin/panel/editInfoWorks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: identificator,
        ViewOfWork: FormEditInfoWorks.elements.ViewOfWork.value,
        TypeOfWork: FormEditInfoWorks.elements.TypeOfWork.value,
        countOfWork: FormEditInfoWorks.elements.countOfWork.value,
        objDev: FormEditInfoWorks.elements.objDev.value,
        surnameBoss: FormEditInfoWorks.elements.surnameBoss.value,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" + result.message["предшевствующие работы"] + "']"
          )
          .replaceWith(printTableInfoWorks(result.message));
        showMessage({
          status: true,
          message: "Предшевствующие работы обновлены",
        });
        EditInfoWorksModal.hide();
      } else {
        showMessage(result);
        EditInfoWorksModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditInfoEmployees")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/admin/panel/editInfoEmployees", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: identificator,
        employee: FormEditInfoEmployees.elements.employee.value,
        name: FormEditInfoEmployees.elements.name.value,
        surname: FormEditInfoEmployees.elements.surname.value,
        post: FormEditInfoEmployees.elements.post.value,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" + result.message["ID сотрудника"] + "']"
          )
          .replaceWith(printTableInfoEmployees(result.message));
        showMessage({ status: true, message: "Сотрудники обновлены" });
        EditInfoEmployeesModal.hide();
      } else {
        showMessage(result);
        EditInfoEmployeesModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditAdministration")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/admin/panel/editAdministration", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: identificator,
        employee: FormEditAdministration.elements.employee.value,
        name: FormEditAdministration.elements.name.value,
        surname: FormEditAdministration.elements.surname.value,
        post: FormEditAdministration.elements.post.value,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" + result.message["ID администратора"] + "']"
          )
          .replaceWith(printTableAdministration(result.message));
        showMessage({ status: true, message: "Администраторы обновлены" });
        EditInfoAdministrationModal.hide();
      } else {
        showMessage(result);
        EditInfoAdministrationModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditStandardsWorks")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/admin/panel/editStandardsWorks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: identificator,
        target: FormEditStandardsWorks.elements.target.value,
        resurs: FormEditStandardsWorks.elements.resurs.value,
        mater: FormEditStandardsWorks.elements.mater.value,
        limit: FormEditStandardsWorks.elements.limit.value,
        expenses: FormEditStandardsWorks.elements.expenses.value,
        budget: FormEditStandardsWorks.elements.budget.value,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" + result.message["порядковый номер работы"] + "']"
          )
          .replaceWith(printTableStandardsWorks(result.message));
        showMessage({
          status: true,
          message: "Нормы проведения работ обновлены",
        });
        EditStandardsWorksModal.hide();
      } else {
        showMessage(result);
        EditStandardsWorksModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditCommonRules")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/admin/panel/editCommonRules", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: identificator,
        searchClad: FormEditCommonRules.elements.searchClad.value,
        searchTresh: FormEditCommonRules.elements.searchTresh.value,
        deformation: FormEditCommonRules.elements.deformation.value,
        documentation: FormEditCommonRules.elements.documentation.value,
        rulesOwn: FormEditCommonRules.elements.rulesOwn.value,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" +
              result.message["порядковый номер общего обследования"] +
              "']"
          )
          .replaceWith(printTableCommonRules(result.message));
        showMessage({
          status: true,
          message: "Перечень мер общего обследования обновлены",
        });
        EditCommonRulesModal.hide();
      } else {
        showMessage(result);
        EditCommonRulesModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditDetailedRules")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/admin/panel/editDetailedRules", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: identificator,
        searchClad: FormEditDetailedRules.elements.searchClad.value,
        searchTresh: FormEditDetailedRules.elements.searchTresh.value,
        deformation: FormEditDetailedRules.elements.deformation.value,
        documentation: FormEditDetailedRules.elements.documentation.value,
        rulesOwn: FormEditDetailedRules.elements.rulesOwn.value,
        marck: FormEditDetailedRules.elements.marck.value,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" +
              result.message["порядковый номер детального обследования"] +
              "']"
          )
          .replaceWith(printTableDetailedRules(result.message));
        showMessage({
          status: true,
          message: "Перечень мер детального обследования обновлены",
        });
        EditDetailedRulesModal.hide();
      } else {
        showMessage(result);
        EditDetailedRulesModal.hide();
      }
    }
  });
document
  .querySelector("#submitEditTechnicalConclusion")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch(
      `${SERVER_ADDRESS}/api/conclusion/editConclusion`,
      {
        method: "PUT",
        headers: {
          Token: JSON.parse(localStorage.getItem("constr-comp")).token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serial_number_of_TK: identificator,
          results_of_preliminary_inspection:
            FormEditTechnicalConclusion.elements.past.value,
          results_of_general_survey:
            FormEditTechnicalConclusion.elements.common.value,
          results_of_detailed_survey:
            FormEditTechnicalConclusion.elements.deteil.value,
          damaged_elements_of_object:
            FormEditTechnicalConclusion.elements.demage.value,
          necessary_measures_to_improve_facility:
            FormEditTechnicalConclusion.elements.nessary.value,
        }),
      }
    );
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document
          .querySelector(
            "tr[data-rowid='" + result.message.serial_number_of_TK + "']"
          )
          .replaceWith(printTableTechnicalConclusion(result.message));
        showMessage({
          status: true,
          message: "Техническое заключение обновлено",
        });
        EditTechnicalConclusionModal.hide();
      } else {
        showMessage(result);
        EditTechnicalConclusionModal.hide();
      }
    }
  });
async function DeleteClient(id) {
  const response = await fetch("/admin/panel/DeleteClient/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({ status: true, message: "Пользователь удалён" });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteApplication(num) {
  const response = await fetch(
    `${SERVER_ADDRESS}/api/application/deleteApplication/` + num,
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
      document
        .querySelector(
          "tr[data-rowid='" + result.application.application_number + "']"
        )
        .remove();
      showMessage({ status: true, message: "Заявка удалена" });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteResurse(num) {
  const response = await fetch("/admin/panel/DeleteResurse/" + num, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({ status: true, message: "Материал удалён" });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteInfoWorks(num) {
  const response = await fetch("/admin/panel/DeleteInfoWorks/" + num, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({ status: true, message: "Работа удалён" });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteInfoEmployees(num) {
  const response = await fetch("/admin/panel/DeleteInfoEmployees/" + num, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({ status: true, message: "Сотрудник удалён" });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteAdministration(num) {
  const response = await fetch("/admin/panel/DeleteAdministration/" + num, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({ status: true, message: "Администратор удалён" });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteStandardsWorks(num) {
  const response = await fetch("/admin/panel/DeleteStandardsWorks/" + num, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({ status: true, message: "нормы проведения работ удалёны" });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteCommonRules(num) {
  const response = await fetch("/admin/panel/DeleteCommonRules/" + num, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({
        status: true,
        message: "перечень мер общего обследования удалён",
      });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteDetailedRules(num) {
  const response = await fetch("/admin/panel/DeleteDetailedRules/" + num, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({
        status: true,
        message: "перечень мер детального обследования удалён",
      });
    } else {
      showMessage(result);
    }
  }
}
async function DeleteTechnicalConclusion(num) {
  const response = await fetch(
    `${SERVER_ADDRESS}/api/conclusion/deleteConclusion/` + num,
    {
      method: "DELETE",
      headers: {
        Token: JSON.parse(localStorage.getItem("constr-comp")).token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok === true) {
    const result = await response.json();
    if (result.status) {
      document
        .querySelector("tr[data-rowid='" + result.message + "']")
        .remove();
      showMessage({ status: true, message: "техническое заключение удалено" });
    } else {
      showMessage(result);
    }
  }
}
document
  .querySelector("#application")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#application").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch(
      `${SERVER_ADDRESS}/api/application/getAllApplications`,
      {
        method: "GET",
        headers: {
          Token: JSON.parse(localStorage.getItem("constr-comp")).token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    let result = await response.json();
    console.log(result);
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      //const trAdd = document.createElement("tr");
      for (const key of result.header) {
        tr.append(head(key));
      }
      // for (const key in result.message[0]) {
      //   trAdd.append(addPanel(key, "clients"));
      // }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "applicationAdd");
      a.append("Добавить");
      tdAdd.append(a);
      //trAdd.append(tdAdd);
      //tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableApplication(elem));
      });
      document
        .querySelector("#applicationAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch("/admin/panel/applicationAdd", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: document.querySelector("#номерзаявки").value,
              column1: document.querySelector("#цельобследования").value,
              column2: document.querySelector("#причинаобследования").value,
              column3: document.querySelector("#названиеобъекта").value,
              column4: document.querySelector("#расположениеобъекта").value,
              column5: document.querySelector("#контактныеданныеклиента").value,
              column6: document.querySelector("#IDклиента").value,
              column7: document.querySelector("#Датасоздания").value,
              column8: document.querySelector("#Статус").value,
            }),
          });
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Заявка добавлена" });
              tbody.append(printTableApplication(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

document
  .querySelector("#resurse")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#resurse").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch("/admin/panel/getTableResurse", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let result = await response.json();
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key in result.message[0]) {
        tr.append(head(key));
      }
      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "resurseAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableResurse(elem));
      });
      document
        .querySelector("#resurseAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch("/admin/panel/resurseAdd", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: document.querySelector("#порядковыйномерскладскогоучёта")
                .value,
              column1: document.querySelector("#Количество").value,
              column2: document.querySelector("#цена").value,
              column3: document.querySelector("#номерпаспорта").value,
              column4: document.querySelector("#потребностьполимиту").value,
              column5: document.querySelector("#Документация").value,
            }),
          });
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Ресурс добавлена" });
              tbody.append(printTableResurse(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

document
  .querySelector("#infoWorks")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#infoWorks").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch(`${SERVER_ADDRESS}/api/works/getAllWorks`, {
      method: "GET",
      headers: {
        Token: JSON.parse(localStorage.getItem("constr-comp")).token,
        Accept: "application/json",
      },
    });
    let result = await response.json();
    console.log(result);
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key of result.header) {
        tr.append(head(key));
      }
      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "infoWorksAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableInfoWorks(elem));
      });
      document
        .querySelector("#infoWorksAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch(
            `${SERVER_ADDRESS}/api/works/addInfoWorks`,
            {
              method: "POST",
              headers: {
                Token: JSON.parse(localStorage.getItem("constr-comp")).token,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: document.querySelector("#previous_works").value,
                type_work: document.querySelector("#type_work").value,
                target_work: document.querySelector("#target_work").value,
                cost_work: document.querySelector("#cost_work").value,
                hours_work: document.querySelector("#hours_work").value,
                object_name: document.querySelector("#object_name").value,
                area_object: document.querySelector("#area_object").value,
                surname_manager:
                  document.querySelector("#surname_manager").value,
                date_work: document.querySelector("#date_work").value,
              }),
            }
          );
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Информация добавлена" });
              tbody.append(printTableInfoWorks(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

document
  .querySelector("#infoEmployees")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#infoEmployees").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch("/admin/panel/getTableInfoEmployees", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let result = await response.json();
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key in result.message[0]) {
        tr.append(head(key));
      }
      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "infoEmployeesAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableInfoEmployees(elem));
      });
      document
        .querySelector("#infoEmployeesAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch("/admin/panel/infoEmployeesAdd", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: document.querySelector("#Сотрудники").value,
              column1: document.querySelector("#IDсотрудника").value,
              column2: document.querySelector("#Имясотрудника").value,
              column3: document.querySelector("#Фамилиясотрудника").value,
              column4: document.querySelector("#Должностьсотрудника").value,
              column5: document.querySelector("#Логин").value,
              column6: document.querySelector("#Пароль").value,
            }),
          });
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Информация добавлена" });
              tbody.append(printTableInfoEmployees(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

document
  .querySelector("#Administration")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#Administration").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch("/admin/panel/getTableAdministration", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let result = await response.json();
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key in result.message[0]) {
        tr.append(head(key));
      }
      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "AdministrationAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableAdministration(elem));
      });
      document
        .querySelector("#AdministrationAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch("/admin/panel/AdministrationAdd", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: document.querySelector("#IDадминистратора").value,
              column1: document.querySelector("#порядковыйномерработы").value,
              column2: document.querySelector(
                "#порядковыйномеробщегообследования"
              ).value,
              column3: document.querySelector(
                "#порядковыйномердетальногообследования"
              ).value,
              column4: document.querySelector("#порядковыйномерскладскогоучёта")
                .value,
              column5: document.querySelector("#Сотрудники").value,
              column6: document.querySelector("#Имя").value,
              column7: document.querySelector("#Фамилия").value,
              column8: document.querySelector("#Логин").value,
              column9: document.querySelector("#Пароль").value,
              column10: document.querySelector("#Должность").value,
              column11: document.querySelector("#IDсотрудника").value,
            }),
          });
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Администратор добавлен" });
              tbody.append(printTableAdministration(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

document
  .querySelector("#standardsWorks")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#standardsWorks").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch("/admin/panel/getTableStandardsWorks", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let result = await response.json();
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key in result.message[0]) {
        tr.append(head(key));
      }
      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "standardsWorksAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableStandardsWorks(elem));
      });
      document
        .querySelector("#standardsWorksAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch("/admin/panel/standardsWorksAdd", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: document.querySelector("#порядковыйномерработы").value,
              column1: document.querySelector("#документация").value,
              column2: document.querySelector("#цельобследованияобъекта").value,
              column3: document.querySelector("#переченьресурсов").value,
              column4: document.querySelector("#необходимыематериалы").value,
              column5: document.querySelector("#лимитиспользованияматериалов")
                .value,
              column6: document.querySelector("#затратыпроведенияработ").value,
              column7: document.querySelector("#бюджет").value,
            }),
          });
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Нормы добавлен" });
              tbody.append(printTableStandardsWorks(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

document
  .querySelector("#commonRules")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#commonRules").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch("/admin/panel/getTableCommonRules", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let result = await response.json();
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key in result.message[0]) {
        tr.append(head(key));
      }
      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "commonRulesAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableCommonRules(elem));
      });
      document
        .querySelector("#commonRulesAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch("/admin/panel/commonRulesAdd", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: document.querySelector("#порядковыйномеробщегообследования")
                .value,
              column1: document.querySelector("#поискнекачетвеннойкладки")
                .value,
              column2: document.querySelector("#поисктрещинвбетонировании")
                .value,
              column3: document.querySelector("#наличиедеформациифундамента")
                .value,
              column4: document.querySelector("#проверкадокументацииобъекта")
                .value,
              column5: document.querySelector("#прававладенияобъектом").value,
              column6: document.querySelector("#порядковыйномерТЗ").value,
            }),
          });
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Перечень добавлен" });
              tbody.append(printTableCommonRules(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

document
  .querySelector("#detailedRules")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#detailedRules").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch("/admin/panel/getTableDetailedRules", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let result = await response.json();
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key in result.message[0]) {
        tr.append(head(key));
      }
      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "detailedRulesAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableDetailedRules(elem));
      });
      document
        .querySelector("#detailedRulesAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch("/admin/panel/detailedRulesAdd", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: document.querySelector(
                "#порядковыйномердетальногообследования"
              ).value,
              column1: document.querySelector(
                "#расчётнесущейспособностиобъекта"
              ).value,
              column2: document.querySelector(
                "#проверкапрочностибетоныхконструкций"
              ).value,
              column3: document.querySelector(
                "#оценкакачествасвязующихустройств"
              ).value,
              column4: document.querySelector("#оценкакачестваперегородок")
                .value,
              column5: document.querySelector(
                "#оценкапрочностиподвестныхсооружений"
              ).value,
              column6: document.querySelector("#оценкапрочностикреплений")
                .value,
            }),
          });
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({ status: true, message: "Перечень добавлен" });
              tbody.append(printTableDetailedRules(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

document
  .querySelector("#TechnicalConclusion")
  .addEventListener("click", async function (e) {
    for (const elem of TableList.children) {
      if (elem.children[0].classList.contains("active")) {
        elem.children[0].classList.remove("active");
      }
    }
    document.querySelector("#TechnicalConclusion").classList.add("active");
    e.preventDefault();
    thead.innerHTML = "";
    tbody.innerHTML = "";
    let response = await fetch(
      `${SERVER_ADDRESS}/api/Conclusion/getConclusion`,
      {
        method: "GET",
        headers: {
          Token: JSON.parse(localStorage.getItem("constr-comp")).token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    let result = await response.json();
    if (result.status) {
      const th = document.createElement("th");
      const tr = document.createElement("tr");
      const trAdd = document.createElement("tr");
      for (const key in result.message[0]) {
        tr.append(head(key));
      }
      for (const key in result.message[0]) {
        trAdd.append(addPanel(key, "clients"));
      }
      let tdAdd = document.createElement("td");
      let a = document.createElement("button");
      a.setAttribute("style", "cursor:pointer;padding:7px;");
      a.classList.add("btn");
      a.classList.add("btn-primary");
      a.setAttribute("id", "TechnicalConclusionAdd");
      a.append("Добавить");
      tdAdd.append(a);
      trAdd.append(tdAdd);
      tbody.append(trAdd);
      tr.append(th);
      tr.append(th);
      thead.append(tr);
      thead.append(tr);
      result.message.forEach((elem) => {
        tbody.append(printTableTechnicalConclusion(elem));
      });
      document
        .querySelector("#TechnicalConclusionAdd")
        .addEventListener("click", async function (e) {
          e.preventDefault();
          console.log("2");
          const response = await fetch(
            `${SERVER_ADDRESS}/api/conclusion/addConclusion`,
            {
              method: "POST",
              headers: {
                Token: JSON.parse(localStorage.getItem("constr-comp")).token,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                serial_number_of_TK: document.querySelector(
                  "#serial_number_of_tk"
                ).value,
                results_of_preliminary_inspection: document.querySelector(
                  "#results_of_preliminary_inspection"
                ).value,
                results_of_general_survey: document.querySelector(
                  "#results_of_general_survey"
                ).value,
                results_of_detailed_survey: document.querySelector(
                  "#results_of_detailed_survey"
                ).value,
                damaged_elements_of_object: document.querySelector(
                  "#damaged_elements_of_object"
                ).value,
                necessary_measures_to_improve_facility: document.querySelector(
                  "#necessary_measures_to_improve_facility"
                ).value,
                client_id: document.querySelector("#client_id").value,
              }),
            }
          );
          if (response.ok) {
            const result = await response.json();
            if (result.status) {
              showMessage({
                status: true,
                message: "Техническое заключение добавлено",
              });
              tbody.append(printTableTechnicalConclusion(result.message));
            } else {
              showMessage(result);
            }
          }
        });
    }
  });

function head(key) {
  const th = document.createElement("th");
  th.append(key);
  return th;
}

function printTableClients(element) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-rowid", element.employee_id);

  const idTd = document.createElement("td");
  idTd.append(element.employee_id);
  tr.append(idTd);

  const nameTd = document.createElement("td");
  nameTd.append(element.name);
  tr.append(nameTd);

  const surnameTd = document.createElement("td");
  surnameTd.append(element.surname);
  tr.append(surnameTd);

  const loginTd = document.createElement("td");
  loginTd.append(element.login);
  tr.append(loginTd);

  const mailTd = document.createElement("td");
  mailTd.append(element.email);
  tr.append(mailTd);

  const subscriptionTd = document.createElement("td");
  subscriptionTd.append(element.subscription_status ? "Активна" : "Не активна");
  tr.append(subscriptionTd);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute("data-id", element.employee_id);
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditClientModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.append("Изменить");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element.employee_id;
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute("data-id", element.employee_id);
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteClient(element.employee_id);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableApplication(element) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-rowid", element.application_number);

  const idTd = document.createElement("td");
  idTd.append(element.application_number);
  tr.append(idTd);

  const purposeTd = document.createElement("td");
  if (element.target) {
    purposeTd.append(element.target.target);
  } else {
    purposeTd.append(element.purpose_of_survey);
  }

  tr.append(purposeTd);

  const reasonTd = document.createElement("td");
  reasonTd.append(element.reason_for_examination);
  tr.append(reasonTd);

  const nameObjectTd = document.createElement("td");
  nameObjectTd.append(element.name_of_object);
  tr.append(nameObjectTd);

  const areaObjectTd = document.createElement("td");
  areaObjectTd.append(element.area_object + ' м²');
  tr.append(areaObjectTd);

  const placeTd = document.createElement("td");
  placeTd.append(element.location_of_object);
  tr.append(placeTd);

  const contactTd = document.createElement("td");
  contactTd.append(element.client_contact_details);
  tr.append(contactTd);

  const dateTd = document.createElement("td");
  dateTd.append(element.date_of_creation);
  tr.append(dateTd);

  const statusTd = document.createElement("td");
  statusTd.setAttribute("data-approveid", `${element.application_number}`);
  if (!element.status) {
    const approveButton = document.createElement("button");
    approveButton.setAttribute("type", "button");
    approveButton.classList.add("btn");
    approveButton.classList.add("btn-success");
    approveButton.innerHTML = "Принять";
    approveButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const response = await fetch(
        `${SERVER_ADDRESS}/api/application/approveApplication`,
        {
          method: "PUT",
          headers: {
            Token: JSON.parse(localStorage.getItem("constr-comp")).token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            num: element.application_number,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result.status) {
          const statusNewTd = document.createElement("td");
          statusNewTd.innerHTML = "Принята";
          document
            .querySelector(
              "td[data-approveid='" +
                result.application.application_number +
                "']"
            )
            .replaceWith(statusNewTd);
          showMessage({ status: true, message: "Заявка принята" });
        } else {
          showMessage({ status: false, message: "Не удалось принять заявку" });
        }
      }
    });
    statusTd.append(approveButton);
  } else {
    statusTd.append("Принята");
  }
  tr.append(statusTd);
  const linksTd = document.createElement("td");

  //forecastLink
  const forecastLink = document.createElement("a");
  forecastLink.setAttribute("data-id", element.application_number);
  forecastLink.setAttribute(
    "style",
    "cursor:pointer;padding:5px;color:#00a846;font-weight:bold;"
  );
  forecastLink.classList.add("links");

  forecastLink.setAttribute("data-bs-toggle", "modal");
  forecastLink.setAttribute("data-bs-target", "#ForecastApplicationModal");
  forecastLink.setAttribute("data-bs-whatever", "@mdo");
  forecastLink.append("Прогноз");
  forecastLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${SERVER_ADDRESS}/api/application/forecastApplication`,
      {
        method: "POST",
        headers: {
          Token: JSON.parse(localStorage.getItem("constr-comp")).token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num: element.application_number,
        }),
      }
    );
    if (response.ok) {
      const result = await response.json();
      if (result.status) {
        console.log(result);
        document.querySelector("#MaterialsList").innerHTML = "";
        const { workHours, workCost, materials } = result.message;
        document.querySelector("#WorkCost").innerHTML = `${workCost} у.е.`;
        document.querySelector("#WorkHours").innerHTML = `${workHours} ч.`;
        for (const material of materials) {
          const liMaterial = document.createElement("li");
          liMaterial.classList.add("list-group-item");
          liMaterial.classList.add("d-flex");
          liMaterial.classList.add("justify-content-between");
          liMaterial.classList.add("align-items-start");
          const divMaterial = document.createElement("div");
          divMaterial.classList.add("ms-2");
          divMaterial.classList.add("me-auto");
          const divInnerMaterial = document.createElement("div");
          divInnerMaterial.classList.add("fw-bold");
          divInnerMaterial.innerHTML = material.name;
          divMaterial.append(divInnerMaterial);
          const spanMaterial = document.createElement("span");
          spanMaterial.classList.add("badge");
          spanMaterial.classList.add("bg-primary");
          spanMaterial.classList.add("rounded-pill");
          spanMaterial.innerHTML = material.amount;
          liMaterial.append(divMaterial);
          liMaterial.append(spanMaterial);
          document.querySelector("#MaterialsList").append(liMaterial);
        }
      } else {
        showMessage({ status: false, message: "Не удалось получить данные" });
        ForecastApplicationModal.hide();
      }
    }
  });
  linksTd.append(forecastLink);

  const editLink = document.createElement("a");
  editLink.setAttribute("data-id", element.application_number);
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");

  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditApplicationModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.append("Изменить");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element.application_number;
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute("data-id", element.application_number);
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteApplication(element.application_number);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableResurse(element) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-rowid", elemen.serial_number_of_warehouse_accounting);

  const idTd = document.createElement("td");
  idTd.append(element.serial_number_of_warehouse_accounting);
  tr.append(idTd);

  const td1 = document.createElement("td");
  td1.append(element.amount);
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.append(element.price);
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.append(element.passport_number);
  tr.append(td3);

  const td4 = document.createElement("td");
  td4.append(element.need_for_limit);
  tr.append(td4);

  const td5 = document.createElement("td");
  td5.append(element.documentation);
  tr.append(td5);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute(
    "data-id",
    element.serial_number_of_warehouse_accounting
  );
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditResurseModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.append("Изменить");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element.serial_number_of_warehouse_accounting;
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute(
    "data-id",
    element.serial_number_of_warehouse_accounting
  );
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteResurse(element.serial_number_of_warehouse_accounting);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableInfoWorks(element) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-rowid", element.previous_works);

  const idTd = document.createElement("td");
  idTd.append(element.previous_works);
  tr.append(idTd);

  const td1 = document.createElement("td");
  td1.append(element.type_work);
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.append(element.target_work);
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.append(element.cost_work + " у.е.");
  tr.append(td3);

  const td4 = document.createElement("td");
  td4.append(element.hours_work + " ч.");
  tr.append(td4);

  const td5 = document.createElement("td");
  td5.append(element.object_name);
  tr.append(td5);

  const td6 = document.createElement("td");
  td6.append(element.area_object + " м²");
  tr.append(td6);

  const td7 = document.createElement("td");
  td7.append(element.surname_manager);
  tr.append(td7);

  const td8 = document.createElement("td");
  td8.append(element.date_work);
  tr.append(td8);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute("data-id", element.previous_works);
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.append("Изменить");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditInfoWorksModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element.previous_works;
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute("data-id", element.previous_works);
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteInfoWorks(element.previous_works);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableInfoEmployees(element) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-rowid", element.employee_id);

  const idTd = document.createElement("td");
  idTd.append(element.employees);
  tr.append(idTd);

  const td1 = document.createElement("td");
  td1.append(element.employee_id);
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.append(element.name_of_employee);
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.append(element.surname_of_employee);
  tr.append(td3);

  const td4 = document.createElement("td");
  td4.append(element.post_of_employee);
  tr.append(td4);

  const td5 = document.createElement("td");
  td5.append(element.login);
  tr.append(td5);

  const td6 = document.createElement("td");
  td6.append(element.password);
  tr.append(td6);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute("data-id", element.employee_id);
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.append("Изменить");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditInfoEmployeesModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element.employee_id;
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute("data-id", element.employee_id);
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteInfoEmployees(element.employee_id);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableAdministration(element) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-rowid", element.id);

  const idTd = document.createElement("td");
  idTd.append(element.id);
  tr.append(idTd);

  const td1 = document.createElement("td");
  td1.append(element.serial_number_of_work);
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.append(element.serial_number_of_general_survey);
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.append(element.serial_number_of_detailed_examination);
  tr.append(td3);

  const td4 = document.createElement("td");
  td4.append(element.serial_number_of_warehouse_accounting);
  tr.append(td4);

  const td5 = document.createElement("td");
  td5.append(element.employee);
  tr.append(td5);

  const td6 = document.createElement("td");
  td6.append(element.name);
  tr.append(td6);

  const td7 = document.createElement("td");
  td7.append(element.surname);
  tr.append(td7);

  const td8 = document.createElement("td");
  td8.append(element.login);
  tr.append(td8);

  const td9 = document.createElement("td");
  td9.append(element.password);
  tr.append(td9);

  const td10 = document.createElement("td");
  td10.append(element.post);
  tr.append(td10);

  const td11 = document.createElement("td");
  td11.append(element.employee_id);
  tr.append(td11);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute("data-id", element.id);
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.append("Изменить");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditInfoAdministrationModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element.id;
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute("data-id", element.id);
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteAdministration(element.id);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableStandardsWorks(element) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-rowid", element.serial_number_of_work);

  const idTd = document.createElement("td");
  idTd.append(element.serial_number_of_work);
  tr.append(idTd);

  const idTd1 = document.createElement("td");
  idTd1.append(element.documentation);
  tr.append(idTd1);

  const td1 = document.createElement("td");
  td1.append(element.purpose_of_object_survey);
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.append(element.list_of_resources);
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.append(element.required_materials);
  tr.append(td3);

  const td4 = document.createElement("td");
  td4.append(element.costs_of_work);
  tr.append(td4);

  const td5 = document.createElement("td");
  td5.append(element.limit_on_use_of_materials);
  tr.append(td5);

  const td6 = document.createElement("td");
  td6.append(element.budget);
  tr.append(td6);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute("data-id", element.serial_number_of_work);
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.append("Изменить");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditStandardsWorksModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element.serial_number_of_work;
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute("data-id", element.serial_number_of_work);
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteStandardsWorks(element.serial_number_of_work);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableCommonRules(element) {
  const tr = document.createElement("tr");
  tr.setAttribute(
    "data-rowid",
    element["порядковый номер общего обследования"]
  );

  const idTd = document.createElement("td");
  idTd.append(element["порядковый номер общего обследования"]);
  tr.append(idTd);

  const idTd1 = document.createElement("td");
  idTd1.append(element["поиск некачетвенной кладки"]);
  tr.append(idTd1);

  const td1 = document.createElement("td");
  td1.append(element["поиск трещин в бетонировании"]);
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.append(element["наличие деформации фундамента"]);
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.append(element["проверка документации объекта"]);
  tr.append(td3);

  const td4 = document.createElement("td");
  td4.append(element["права владения объектом"]);
  tr.append(td4);

  const td5 = document.createElement("td");
  td5.append(element["порядковый номер ТЗ"]);
  tr.append(td5);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute(
    "data-id",
    element["порядковый номер общего обследования"]
  );
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.append("Изменить");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditCommonRulesModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element["порядковый номер общего обследования"];
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute(
    "data-id",
    element["порядковый номер общего обследования"]
  );
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteCommonRules(element["порядковый номер общего обследования"]);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableDetailedRules(element) {
  const tr = document.createElement("tr");
  tr.setAttribute(
    "data-rowid",
    element["порядковый номер детального обследования"]
  );

  const idTd = document.createElement("td");
  idTd.append(element["порядковый номер детального обследования"]);
  tr.append(idTd);

  const idTd1 = document.createElement("td");
  idTd1.append(element["расчёт несущей способности объекта"]);
  tr.append(idTd1);

  const td1 = document.createElement("td");
  td1.append(element["проверка прочности бетоных конструкций"]);
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.append(element["оценка качества связующих устройств"]);
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.append(element["оценка качества перегородок"]);
  tr.append(td3);

  const td4 = document.createElement("td");
  td4.append(element["оценка прочности подвестных сооружений"]);
  tr.append(td4);

  const td5 = document.createElement("td");
  td5.append(element["оценка прочности креплений"]);
  tr.append(td5);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute(
    "data-id",
    element["порядковый номер детального обследования"]
  );
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.append("Изменить");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditDetailedRulesModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element["порядковый номер детального обследования"];
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute(
    "data-id",
    element["порядковый номер детального обследования"]
  );
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteDetailedRules(element["порядковый номер детального обследования"]);
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
}

function printTableTechnicalConclusion(element) {
  const tr = document.createElement("tr");

  tr.setAttribute(
    "data-rowid",
    element.serial_number_of_TK || element.serial_number_of_tk
  );

  const idTd = document.createElement("td");

  idTd.append(element.serial_number_of_TK || element.serial_number_of_tk);
  tr.append(idTd);

  const idTd1 = document.createElement("td");
  idTd1.append(element.results_of_preliminary_inspection);
  tr.append(idTd1);

  const td1 = document.createElement("td");
  td1.append(element.results_of_general_survey);
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.append(element.results_of_detailed_survey);
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.append(element.damaged_elements_of_object);
  tr.append(td3);

  const td4 = document.createElement("td");
  td4.append(element.necessary_measures_to_improve_facility);
  tr.append(td4);

  const td5 = document.createElement("td");
  td5.append(element.client_id);
  tr.append(td5);

  const linksTd = document.createElement("td");

  const editLink = document.createElement("a");
  editLink.setAttribute(
    "data-id",
    element.serial_number_of_TK || element.serial_number_of_tk
  );
  editLink.setAttribute("style", "cursor:pointer;padding:5px;");
  editLink.classList.add("links");
  editLink.append("Изменить");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#EditTechnicalConclusionModal");
  editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.addEventListener("click", (e) => {
    e.preventDefault();
    identificator = element.serial_number_of_TK || element.serial_number_of_tk;
  });
  linksTd.append(editLink);

  const removeLink = document.createElement("a");
  removeLink.setAttribute(
    "data-id",
    element.serial_number_of_TK || element.serial_number_of_tk
  );
  removeLink.setAttribute("style", "cursor:pointer;padding:5px;");
  removeLink.classList.add("links");
  removeLink.append("Удалить");
  removeLink.addEventListener("click", (e) => {
    e.preventDefault();
    DeleteTechnicalConclusion(
      element.serial_number_of_TK || element.serial_number_of_tk
    );
  });

  linksTd.append(removeLink);
  tr.appendChild(linksTd);

  return tr;
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

function addPanel(key, table) {
  let td = document.createElement("td");
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.classList.add("form-control");
  input.setAttribute("id", key.split(" ").join(""));
  td.append(input);
  return td;
}

function logOutAdmin() {
  localStorage.removeItem("constr-comp");
  window.location.href = "/admin";
}
