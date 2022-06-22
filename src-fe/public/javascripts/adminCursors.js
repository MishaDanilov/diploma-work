const TableList3 = document.querySelector('#TableList3')
var EditPostAdministretionModal = new bootstrap.Modal(document.getElementById('EditPostAdministretionModal'), {
    keyboard: false
})
var EditEditTargetCheckModal = new bootstrap.Modal(document.getElementById('EditEditTargetCheckModal'), {
    keyboard: false
})
const FormEditPostAdministretion = document.forms.FormEditPostAdministretion
const FormEditTargetCheck = document.forms.FormEditTargetCheck
document.querySelector('#countUsers').addEventListener('click', async function (e) {
    for (const elem of TableList3.children) {
        if (elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#countUsers').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/countUsers', {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        }
    })
    let result = await response.json()
    if (result.status) {
        const tr = document.createElement("tr");
        for (const key in result.message[0]) {
            tr.append(head(key));
        }
        thead.append(tr)
        result.message.forEach((elem) => {
            tbody.append(printTablecountUsers(elem))
        });
    } else showMessage(result)
})
document.querySelector('#countResurs').addEventListener('click', async function (e) {
    for (const elem of TableList3.children) {
        if (elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#countResurs').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/countResurs', {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        }
    })
    let result = await response.json()
    if (result.status) {
        const tr = document.createElement("tr");
        for (const key in result.message[0]) {
            tr.append(head(key));
        }
        thead.append(tr)
        result.message.forEach((elem) => {
            tbody.append(printTablecountResurs(elem))
        });
    } else showMessage(result)
})
document.querySelector('#countandpriceResurs').addEventListener('click', async function (e) {
    for (const elem of TableList3.children) {
        if (elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#countandpriceResurs').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/countandpriceResurs', {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        }
    })
    let result = await response.json()
    if (result.status) {
        const tr = document.createElement("tr");
        for (const key in result.message[0]) {
            tr.append(head(key));
        }
        thead.append(tr)
        result.message.forEach((elem) => {
            tbody.append(printTablecountandpriceResurs(elem))
        });
    } else showMessage(result)
})
document.querySelector('#submitEditPostAdministretion').addEventListener('click', async function (e) {
    thead.innerHTML = ''
    tbody.innerHTML = ''
    e.preventDefault()
    const response = await fetch('/admin/panel/editPostAdministretion', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            post: FormEditPostAdministretion.elements.post.value
        })
    })
    if (response.ok) {
        let result = await response.json()
        if (result.status) {
            const tr = document.createElement("tr");
            for (const key in result.message[0]) {
                tr.append(head(key));
            }
            thead.append(tr)
            result.message.forEach((elem) => {
                tbody.append(printTableupdatePost(elem))
            });
            EditPostAdministretionModal.hide()
        } 
        else {
            showMessage(result)
            EditPostAdministretionModal.hide()
        }
    }
})
document.querySelector('#submitEditTargetCheck').addEventListener('click', async function (e) {
    thead.innerHTML = ''
    tbody.innerHTML = ''
    e.preventDefault()
    const response = await fetch('/admin/panel/editTargetCheck', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            target: FormEditTargetCheck.elements.target.value
        })
    })
    if (response.ok) {
        let result = await response.json()
        if (result.status) {
            const tr = document.createElement("tr");
            for (const key in result.message[0]) {
                tr.append(head(key));
            }
            thead.append(tr)
            result.message.forEach((elem) => {
                tbody.append(printTableupdateTarget(elem))
            });
            EditEditTargetCheckModal.hide()
        } 
        else {
            showMessage(result)
            EditEditTargetCheckModal.hide()
        }
    }
})
function head(key) {
    const th = document.createElement("th");
    th.append(key)
    return th;
}

function printTablecountUsers(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Количество клиентов']);
    tr.append(idTd);

    return tr;
}

function printTablecountResurs(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Количество складов']);
    tr.append(idTd);

    return tr;
}

function printTablecountandpriceResurs(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Общее количество материалов']);
    tr.append(idTd);

    const idTd1 = document.createElement("td");
    idTd1.append(element['Общая стоимость материалов']);
    tr.append(idTd1);

    return tr;
}

function printTableupdatePost(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Сотрудники']);
    tr.append(idTd);

    const idTd1 = document.createElement("td");
    idTd1.append(element['ID сотрудника']);
    tr.append(idTd1);

    const idTd2 = document.createElement("td");
    idTd2.append(element['Имя сотрудника']);
    tr.append(idTd2);

    const idTd3 = document.createElement("td");
    idTd3.append(element['Фамилия сотрудника']);
    tr.append(idTd3);

    const idTd4 = document.createElement("td");
    idTd4.append(element['Должность сотрудника']);
    tr.append(idTd4);

    const idTd5 = document.createElement("td");
    idTd5.append(element['Логин']);
    tr.append(idTd5);

    const idTd6 = document.createElement("td");
    idTd6.append(element['Пароль']);
    tr.append(idTd6);


    return tr;
}

function printTableupdateTarget(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['порядковый номер работы']);
    tr.append(idTd);

    const idTd1 = document.createElement("td");
    idTd1.append(element['документация']);
    tr.append(idTd1);

    const idTd2 = document.createElement("td");
    idTd2.append(element['цель обследования объекта']);
    tr.append(idTd2);

    return tr;
}