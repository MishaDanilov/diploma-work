const TableList1 = document.querySelector('#TableList1')
document.querySelector('#vwPosition').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#vwPosition').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/vwPosition', {
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
            tbody.append(printTablevwPosition(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infoMaterial').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infoMaterial').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infoMaterial', {
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
            tbody.append(printTableinfoMaterial(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infoProperty').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infoProperty').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infoProperty', {
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
            tbody.append(printTableinfoProperty(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infolateWork').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infolateWork').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infolateWork', {
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
            tbody.append(printTableinfolateWork(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infoDateLanding').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infoDateLanding').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infoDateLanding', {
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
            tbody.append(printTableinfoDateLanding(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#inftargetUser').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#inftargetUser').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/inftargetUser', {
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
            tbody.append(printTableinftargetUser(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infholdEx').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infholdEx').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infholdEx', {
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
            tbody.append(printTableinfholdEx(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infaregion').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infaregion').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infaregion', {
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
            tbody.append(printTableinfaregion(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infprice').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infprice').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infprice', {
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
            tbody.append(printTableinfprice(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infa10').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infa10').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infa10', {
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
            tbody.append(printTableinfa10(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infa12').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infa12').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infa12', {
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
            tbody.append(printTableinfa12(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infa14').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infa14').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infa14', {
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
            tbody.append(printTableinfa14(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infa15').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infa15').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infa15', {
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
            tbody.append(printTableinfa15(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infa13').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infa13').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infa13', {
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
            tbody.append(printTableinfa13(elem))
        });
    }
    else showMessage(result)
})
document.querySelector('#infa11').addEventListener('click', async function (e) {
    for (const elem of TableList1.children) {
        if(elem.children[0].classList.contains('active')) {
            elem.children[0].classList.remove('active')
        }
    }
    document.querySelector('#infa11').classList.add('active')
    e.preventDefault()
    thead.innerHTML = ''
    tbody.innerHTML = ''
    let response = await fetch('/admin/panel/infa11', {
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
            tbody.append(printTableinfa11(elem))
        });
    }
    else showMessage(result)
})
function head(key) {
    const th = document.createElement("th");
    th.append(key)
    return th;
}
function printTablevwPosition(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Сотрудники']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['ID сотрудника']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['Имя сотрудника']);
    tr.append(surnameTd);

    const loginTd = document.createElement("td");
    loginTd.append(element['Фамилия сотрудника']);
    tr.append(loginTd);

    const mailTd = document.createElement("td");
    mailTd.append(element['Должность сотрудника']);
    tr.append(mailTd);

    return tr;
}
function printTableinfoMaterial(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['порядковый номер складского учёта']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Количество']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['цена']);
    tr.append(surnameTd);

    const loginTd = document.createElement("td");
    loginTd.append(element['номер паспорта']);
    tr.append(loginTd);

    const mailTd = document.createElement("td");
    mailTd.append(element['потребность по лимиту']);
    tr.append(mailTd);

    const mailTd1 = document.createElement("td");
    mailTd1.append(element['Документация']);
    tr.append(mailTd1);

    return tr;
}
function printTableinfoProperty(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Имя']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['название объекта']);
    tr.append(nameTd);

    return tr;
}
function printTableinfolateWork(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['предшевствующие работы']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Вид работы']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['тип работы']);
    tr.append(surnameTd);

    const loginTd = document.createElement("td");
    loginTd.append(element['стоимость работы']);
    tr.append(loginTd);

    const mailTd1 = document.createElement("td");
    mailTd1.append(element['объект обседования']);
    tr.append(mailTd1);

    const mailTd2 = document.createElement("td");
    mailTd2.append(element['Фамилия руководителя']);
    tr.append(mailTd2);

    const mailTd3 = document.createElement("td");
    mailTd3.append(element['Дата проведения работы']);
    tr.append(mailTd3);

    return tr;
}
function printTableinfoDateLanding(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['предшевствующие работы']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Вид работы']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['тип работы']);
    tr.append(surnameTd);

    const loginTd = document.createElement("td");
    loginTd.append(element['стоимость работы']);
    tr.append(loginTd);

    const mailTd1 = document.createElement("td");
    mailTd1.append(element['объект обседования']);
    tr.append(mailTd1);

    const mailTd2 = document.createElement("td");
    mailTd2.append(element['Фамилия руководителя']);
    tr.append(mailTd2);

    const mailTd3 = document.createElement("td");
    mailTd3.append(element['Дата проведения работы']);
    tr.append(mailTd3);

    return tr;
}
function printTableinftargetUser(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Имя']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['объекты клиента']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['цель обследования']);
    tr.append(surnameTd);

    return tr;
}
function printTableinfholdEx(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['предшевствующие работы']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Вид работы']);
    tr.append(nameTd);

    const surnameTd1 = document.createElement("td");
    surnameTd1.append(element['тип работы']);
    tr.append(surnameTd1);

    const surnameTd2 = document.createElement("td");
    surnameTd2.append(element['стоимость работы']);
    tr.append(surnameTd2);
    
    const surnameTd3 = document.createElement("td");
    surnameTd3.append(element['объект обседования']);
    tr.append(surnameTd3);

    const surnameTd4 = document.createElement("td");
    surnameTd4.append(element['Фамилия руководителя']);
    tr.append(surnameTd4);

    return tr;
}
function printTableinfaregion(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['ID клиента']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Имя']);
    tr.append(nameTd);

    const surnameTd2 = document.createElement("td");
    surnameTd2.append(element['Фамилия']);
    tr.append(surnameTd2);

    const surnameTd3 = document.createElement("td");
    surnameTd3.append(element['расположение объекта']);
    tr.append(surnameTd3);

    return tr;
}
function printTableinfprice(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['порядковый номер работы']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['документация']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['цель обследования объекта']);
    tr.append(surnameTd);

    const surnameTd1 = document.createElement("td");
    surnameTd1.append(element['перечень ресурсов']);
    tr.append(surnameTd1);

    const surnameTd2 = document.createElement("td");
    surnameTd2.append(element['необходимые материалы']);
    tr.append(surnameTd2);

    const surnameTd3 = document.createElement("td");
    surnameTd3.append(element['лимит использования материалов']);
    tr.append(surnameTd3);

    const surnameTd4 = document.createElement("td");
    surnameTd4.append(element['затраты проведения работ']);
    tr.append(surnameTd4);

    const surnameTd5 = document.createElement("td");
    surnameTd5.append(element['бюджет']);
    tr.append(surnameTd5);

    return tr;
}
function printTableinfa10(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Имя']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Фамилия']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['объекты клиента']);
    tr.append(surnameTd);

    const surnameTd1 = document.createElement("td");
    surnameTd1.append(element['решение об эксплуатации объекта']);
    tr.append(surnameTd1);

    return tr;
}
function printTableinfa12(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['ID клиента']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Имя']);
    tr.append(nameTd);

    const surnameTd1 = document.createElement("td");
    surnameTd1.append(element['Фамилия']);
    tr.append(surnameTd1);

    const surnameTd2 = document.createElement("td");
    surnameTd2.append(element['расположение объекта']);
    tr.append(surnameTd2);

    const surnameTd3 = document.createElement("td");
    surnameTd3.append(element['причина обследования']);
    tr.append(surnameTd3);
    
    return tr;
}
function printTableinfa14(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['порядковый номер складского учёта']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Количество']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['цена']);
    tr.append(surnameTd);

    const surnameTd1 = document.createElement("td");
    surnameTd1.append(element['номер паспорта']);
    tr.append(surnameTd1);

    const surnameTd2 = document.createElement("td");
    surnameTd2.append(element['потребность по лимиту']);
    tr.append(surnameTd2);
    
    const surnameTd3 = document.createElement("td");
    surnameTd3.append(element['Документация']);
    tr.append(surnameTd3);

    return tr;
}
function printTableinfa15(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['Фамилия']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Имя']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['цель обследования объекта']);
    tr.append(surnameTd);

    const surnameTd1 = document.createElement("td");
    surnameTd1.append(element['затраты проведения работ']);
    tr.append(surnameTd1);

    return tr;
}
function printTableinfa13(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['ID клиента']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Имя']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['Фамилия']);
    tr.append(surnameTd);

    const surnameTd1 = document.createElement("td");
    surnameTd1.append(element['Логин']);
    tr.append(surnameTd1);

    const surnameTd22 = document.createElement("td");
    surnameTd22.append(element['Почта']);
    tr.append(surnameTd22);

    const surnameTd223 = document.createElement("td");
    surnameTd223.append(element['Пароль']);
    tr.append(surnameTd223);
    
    const surnameTd3 = document.createElement("td");
    surnameTd3.append(element['объекты клиента']);
    tr.append(surnameTd3);

    const surnameTd4 = document.createElement("td");
    surnameTd4.append(element['Заявки']);
    tr.append(surnameTd4);

    const surnameTd5 = document.createElement("td");
    surnameTd5.append(element['номер технического заключения']);
    tr.append(surnameTd5);

    return tr;
}
function printTableinfa11(element) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.append(element['ID клиента']);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(element['Имя']);
    tr.append(nameTd);

    const surnameTd = document.createElement("td");
    surnameTd.append(element['Фамилия']);
    tr.append(surnameTd);

    const surnameTd1 = document.createElement("td");
    surnameTd1.append(element['расположение объекта']);
    tr.append(surnameTd1);

    const surnameTd4 = document.createElement("td");
    surnameTd4.append(element['причина обследования']);
    tr.append(surnameTd4);

    return tr;
}