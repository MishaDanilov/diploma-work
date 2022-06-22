var passport = require('passport');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const customConfig = require('../models/ConfigModel').customConfig
const adminConfig = require('../models/ConfigModel').adminConfig;
module.exports.logOut = function (req, res) {
    req.logout()
    process.connection.close()
    process.connection.on('end', function () {
        console.log('DATABASE CLOSED')

    })
    res.redirect('/admin')
}
module.exports.authentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/admin')
    }
}
module.exports.loginAdmin = function (req, res, next) {
    passport.authenticate('loginAdmin', function (err, user, info) {
        if (err) return next(err);
        // if (!user) {
        //     console.log('Неверный логин или пароль!')
        //     return res.redirect('/');
        // }
        req.logIn(user, function (err) {
            if (err) return next(err);
            return res.redirect('/admin/panel');
        });
    })(req, res, next);
}
module.exports.displayLoginAdmin = function (req, res, next) {
    req.logout()
    res.render('adminLogin');
}
module.exports.displayPanelAdmin = function (req, res, next) {
    res.render('adminPanel');
}
module.exports.getTableClients = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [Клиенты]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.getTableApplication = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [заявка на проведения работ]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.getTableResurse = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [Материалы]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.getTableInfoWorks = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [информация о предшевствующих работах]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.getTableInfoEmployees = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [информация о сотрудниках]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}

module.exports.getTableAdministration = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [Администрация]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}

module.exports.getTableStandardsWorks = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [Нормы проведения работ]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.getTableCommonRules = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [перечень мер общего обследования]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.getTableDetailedRules = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [перечень необходимых мер детального обследования]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.getTableTechnicalConclusion = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [Техническое заключение]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editClient = function (req, res) {
    let id = req.body.id
    let name = req.body.name
    let surname = req.body.surname
    let email = req.body.email
    let object = req.body.object
    let numOftex = req.body.numOftex
    let statusSubscription = req.body.statusSubscription
    let result
    let infoMessage
    let request = new Request('EditUser', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('id', TYPES.Int, id)
    request.addParameter('name', TYPES.NVarChar, name)
    request.addParameter('surname', TYPES.NVarChar, surname)
    request.addParameter('email', TYPES.NVarChar, email)
    request.addParameter('object', TYPES.NVarChar, object)
    request.addParameter('numOftex', TYPES.Int, numOftex)
    request.addParameter('statusSubscription', TYPES.Bit, statusSubscription)
    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteClient = function (req, res) {
    const idFind = req.params.id;
    let result
    let infoMessage
    request = new Request("DeleteClient", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: idFind
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('id', TYPES.Int, idFind);
    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editApplication = function (req, res) {
    let num = req.body.num
    let target = req.body.target
    let reason = req.body.reason
    let title = req.body.title
    let placeobject = req.body.placeobject
    let contactData = req.body.contactData
    let statusAppliction = req.body.statusAppliction
    let result
    let infoMessage
    let request = new Request('editApplication', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('target', TYPES.NVarChar, target)
    request.addParameter('reason', TYPES.NVarChar, reason)
    request.addParameter('title', TYPES.NVarChar, title)
    request.addParameter('placeobject', TYPES.NVarChar, placeobject)
    request.addParameter('contactData', TYPES.NVarChar, contactData)
    request.addParameter('statusAppliction', TYPES.Bit, statusAppliction)
    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteApplication = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [заявка на проведения работ] where [заявка на проведения работ].[номер заявки] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editResurse = function (req, res) {
    let num = req.body.num
    let count = req.body.count
    let cost = req.body.cost
    let need = req.body.need
    let documentation = req.body.documentation
    let result
    let infoMessage
    let request = new Request('editResurse', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('count', TYPES.Int, count)
    request.addParameter('cost', TYPES.Int, cost)
    request.addParameter('need', TYPES.Int, need)
    request.addParameter('documentation', TYPES.NVarChar, documentation)
    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteResurse = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [Материалы] WHERE [Материалы].[порядковый номер складского учёта] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editInfoWorks = function (req, res) {
    let num = req.body.num
    let ViewOfWork = req.body.ViewOfWork
    let TypeOfWork = req.body.TypeOfWork
    let countOfWork = req.body.countOfWork
    let objDev = req.body.objDev
    let surnameBoss = req.body.surnameBoss
    let result
    let infoMessage
    let request = new Request('editInfoWorks', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('ViewOfWork', TYPES.NVarChar, ViewOfWork)
    request.addParameter('TypeOfWork', TYPES.NVarChar, TypeOfWork)
    request.addParameter('countOfWork', TYPES.Money, countOfWork)
    request.addParameter('objDev', TYPES.NVarChar, objDev)
    request.addParameter('surnameBoss', TYPES.NVarChar, surnameBoss)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteInfoWorks = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [информация о предшевствующих работах] WHERE [информация о предшевствующих работах].[предшевствующие работы] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editInfoEmployees = function (req, res) {
    let num = req.body.num
    let employee = req.body.employee
    let name = req.body.name
    let surname = req.body.surname
    let post = req.body.post
    let result
    let infoMessage
    let request = new Request('editInfoEmployees', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('employee', TYPES.NVarChar, employee)
    request.addParameter('name', TYPES.NVarChar, name)
    request.addParameter('surname', TYPES.NVarChar, surname)
    request.addParameter('post', TYPES.NVarChar, post)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteInfoEmployees = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [информация о сотрудниках] WHERE [информация о сотрудниках].[ID сотрудника] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteAdministration = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [Администрация] WHERE [Администрация].[ID администратора] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editAdministration = function (req, res) {
    let num = req.body.num
    let employee = req.body.employee
    let name = req.body.name
    let surname = req.body.surname
    let post = req.body.post
    let result
    let infoMessage
    let request = new Request('editAdministration', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('employee', TYPES.NVarChar, employee)
    request.addParameter('name', TYPES.NVarChar, name)
    request.addParameter('surname', TYPES.NVarChar, surname)
    request.addParameter('post', TYPES.NVarChar, post)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editStandardsWorks = function (req, res) {
    let num = req.body.num
    let target = req.body.target
    let resurs = req.body.resurs
    let mater = req.body.mater
    let limit = req.body.limit
    let expenses = req.body.expenses
    let budget = req.body.budget
    let result
    let infoMessage
    let request = new Request('editStandardsWorks', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('target', TYPES.NVarChar, target)
    request.addParameter('resurs', TYPES.NVarChar, resurs)
    request.addParameter('mater', TYPES.NVarChar, mater)
    request.addParameter('limit', TYPES.Int, limit)
    request.addParameter('expenses', TYPES.Money, expenses)
    request.addParameter('budget', TYPES.Money, budget)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteStandardsWorks = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [Нормы проведения работ] WHERE [Нормы проведения работ].[порядковый номер работы] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editCommonRules = function (req, res) {
    let num = req.body.num
    let searchClad = req.body.searchClad
    let searchTresh = req.body.searchTresh
    let deformation = req.body.deformation
    let documentation = req.body.documentation
    let rulesOwn = req.body.rulesOwn
    let result
    let infoMessage
    let request = new Request('editCommonRules', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('searchClad', TYPES.Bit, searchClad)
    request.addParameter('searchTresh', TYPES.Bit, searchTresh)
    request.addParameter('deformation', TYPES.Bit, deformation)
    request.addParameter('documentation', TYPES.Bit, documentation)
    request.addParameter('rulesOwn', TYPES.Bit, rulesOwn)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteCommonRules = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [перечень мер общего обследования] WHERE [перечень мер общего обследования].[порядковый номер общего обследования] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editDetailedRules = function (req, res) {
    let num = req.body.num
    let searchClad = req.body.searchClad
    let searchTresh = req.body.searchTresh
    let deformation = req.body.deformation
    let documentation = req.body.documentation
    let rulesOwn = req.body.rulesOwn
    let marck = req.body.marck
    let result
    let infoMessage
    let request = new Request('editDetailedRules', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('searchClad', TYPES.Bit, searchClad)
    request.addParameter('searchTresh', TYPES.Bit, searchTresh)
    request.addParameter('deformation', TYPES.Bit, deformation)
    request.addParameter('documentation', TYPES.Bit, documentation)
    request.addParameter('rulesOwn', TYPES.Bit, rulesOwn)
    request.addParameter('marck', TYPES.Bit, marck)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteDetailedRules = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [перечень необходимых мер детального обследования] WHERE [перечень необходимых мер детального обследования].[порядковый номер детального обследования] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.editTechnicalConclusion = function (req, res) {
    let num = req.body.num
    let past = req.body.past
    let common = req.body.common
    let deteil = req.body.deteil
    let demage = req.body.demage
    let nessary = req.body.nessary
    let desigion = req.body.desigion
    let result
    let infoMessage
    let request = new Request('editTechnicalConclusion', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('num', TYPES.Int, num)
    request.addParameter('past', TYPES.NVarChar, past)
    request.addParameter('common', TYPES.NVarChar, common)
    request.addParameter('deteil', TYPES.NVarChar, deteil)
    request.addParameter('demage', TYPES.NVarChar, demage)
    request.addParameter('nessary', TYPES.NVarChar, nessary)
    request.addParameter('desigion', TYPES.NVarChar, desigion)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.DeleteTechnicalConclusion = function (req, res) {
    const num = req.params.num;
    let result
    let infoMessage
    request = new Request("delete [Техническое заключение] WHERE [Техническое заключение].[порядковый номер ТЗ] = @num", function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            result = {
                status: true,
                message: num
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });

    });
    request.addParameter('num', TYPES.Int, num);
    process.connection.execSql(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.addClient = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let column7 = req.body.column7
    let column8 = req.body.column8
    let column9 = req.body.column9
    let result
    let infoMessage
    let request = new Request('addClient', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('name', TYPES.NVarChar, column1)
    request.addParameter('surname', TYPES.NVarChar, column2)
    request.addParameter('login', TYPES.NVarChar, column3)
    request.addParameter('mail', TYPES.NVarChar, column4)
    request.addParameter('password', TYPES.NVarChar, column5)
    request.addParameter('status', TYPES.NVarChar, column9)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.applicationAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let column7 = req.body.column7
    let column8 = req.body.column8
    let column9 = req.body.column9
    let result
    let infoMessage
    let request = new Request('addApplication', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('target', TYPES.NVarChar, column1)
    request.addParameter('reason', TYPES.NVarChar, column2)
    request.addParameter('title', TYPES.NVarChar, column3)
    request.addParameter('adres', TYPES.NVarChar, column4)
    request.addParameter('email', TYPES.NVarChar, column5)
    request.addParameter('id', TYPES.NVarChar, column6)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.resurseAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let result
    let infoMessage
    let request = new Request('resurseAdd', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('count', TYPES.Int, column1)
    request.addParameter('cost', TYPES.Int, column2)
    request.addParameter('numberofpassport', TYPES.Int, column3)
    request.addParameter('need', TYPES.Int, column4)
    request.addParameter('documention', TYPES.NVarChar, column5)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.infoWorksAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let result
    let infoMessage
    let request = new Request('infoWorksAdd', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('view', TYPES.NVarChar, column1)
    request.addParameter('type', TYPES.NVarChar, column2)
    request.addParameter('cost', TYPES.Money, column3)
    request.addParameter('obj', TYPES.NVarChar, column4)
    request.addParameter('surname', TYPES.NVarChar, column5)
    request.addParameter('date', TYPES.DateTime, column6)

    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.infoEmployeesAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let result
    let infoMessage
    let request = new Request('infoEmployeesAdd', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })

    request.addParameter('name', TYPES.NVarChar, column2)
    request.addParameter('surname', TYPES.NVarChar, column3)
    request.addParameter('post', TYPES.NVarChar, column4)
    request.addParameter('login', TYPES.NVarChar, column5)
    request.addParameter('password', TYPES.NVarChar, column6)
    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.AdministrationAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let column7 = req.body.column7
    let column8 = req.body.column8
    let column9 = req.body.column9
    let column10 = req.body.column10
    let column11 = req.body.column11
    let result
    let infoMessage
    let request = new Request('AdministrationAdd', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('numWork', TYPES.Int, column1)
    request.addParameter('numCommonWork', TYPES.Int, column2)
    request.addParameter('numDeteilWork', TYPES.Int, column3)
    request.addParameter('numResursWork', TYPES.Int, column4)
    request.addParameter('emploeyy', TYPES.NVarChar, column5)
    request.addParameter('name', TYPES.NVarChar, column6)
    request.addParameter('surname', TYPES.NVarChar, column7)
    request.addParameter('login', TYPES.NVarChar, column8)
    request.addParameter('password', TYPES.NVarChar, column9)
    request.addParameter('post', TYPES.NVarChar, column10)
    request.addParameter('idEmploeyy', TYPES.Int, column11)
    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.standardsWorksAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let column7 = req.body.column7
    let result
    let infoMessage
    let request = new Request('standardsWorksAdd', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('numWork', TYPES.NVarChar, column1)
    request.addParameter('documentation', TYPES.NVarChar, column2)
    request.addParameter('target', TYPES.NVarChar, column3)
    request.addParameter('resurses', TYPES.NVarChar, column4)
    request.addParameter('material', TYPES.Int, column5)
    request.addParameter('limit', TYPES.Money, column6)
    request.addParameter('zatrate', TYPES.Money, column7)
    process.connection.callProcedure(request);
    process.connection.on('infoMessage', function (info) {
        infoMessage = {
            infoMessage: info.message
        }
    })
}
module.exports.commonRulesAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let result
    let infoMessage
    let request = new Request('commonRulesAdd', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('col1', TYPES.Bit, column1)
    request.addParameter('col2', TYPES.Bit, column2)
    request.addParameter('col3', TYPES.Bit, column3)
    request.addParameter('col4', TYPES.Bit, column4)
    request.addParameter('col5', TYPES.Bit, column5)
    request.addParameter('col6', TYPES.Int, column6)
    process.connection.callProcedure(request);
}
module.exports.detailedRulesAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let result
    let infoMessage
    let request = new Request('detailedRulesAdd', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('col1', TYPES.Bit, column1)
    request.addParameter('col2', TYPES.Bit, column2)
    request.addParameter('col3', TYPES.Bit, column3)
    request.addParameter('col4', TYPES.Bit, column4)
    request.addParameter('col5', TYPES.Bit, column5)
    request.addParameter('col6', TYPES.Bit, column6)
    process.connection.callProcedure(request);
}
module.exports.TechnicalConclusionAdd = function (req, res) {
    let id = req.body.id
    let column1 = req.body.column1
    let column2 = req.body.column2
    let column3 = req.body.column3
    let column4 = req.body.column4
    let column5 = req.body.column5
    let column6 = req.body.column6
    let column7 = req.body.column7
    let result
    let infoMessage
    let request = new Request('TechnicalConclusionAdd', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('col1', TYPES.NVarChar, column1)
    request.addParameter('col2', TYPES.NVarChar, column2)
    request.addParameter('col3', TYPES.NVarChar, column3)
    request.addParameter('col4', TYPES.NVarChar, column4)
    request.addParameter('col5', TYPES.NVarChar, column5)
    request.addParameter('col6', TYPES.NVarChar, column6)
    request.addParameter('col7', TYPES.Int, column7)
    process.connection.callProcedure(request);

}
module.exports.vwPosition = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [vwPosition]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infoMaterial = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infoMaterial]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.inftargetUser = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [inftargetUser]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infprice = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infprice]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infoProperty = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infoProperty]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infolateWork = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infolateWork]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infoDateLanding = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infoDateLanding]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infholdEx = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infholdEx]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infaregion = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infaregion]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infa15 = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infa15]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infa14 = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infa14]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infa13 = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infa13]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infa12 = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infa12]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infa11 = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infa11]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.infa10 = function (req, res) {
    let result
    let infoMessage
    let request = new Request('select * from [infa10]', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    process.connection.execSql(request);
    
}
module.exports.countUsers = function (req, res) {
    let result
    let infoMessage
    let request = new Request('countUsers', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    

    process.connection.callProcedure(request);
    
}
module.exports.countResurs = function (req, res) {
    let result
    let infoMessage
    let request = new Request('countResurs', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    

    process.connection.callProcedure(request);
    
}
module.exports.countandpriceResurs = function (req, res) {
    let result
    let infoMessage
    let request = new Request('countandpriceResurs', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    

    process.connection.callProcedure(request);
    
}
module.exports.editPostAdministretion = function (req, res) {
    let post = req.body.post
    let result
    let infoMessage
    let request = new Request('updatePost', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('post', TYPES.NVarChar, post)
    process.connection.callProcedure(request);
}
module.exports.editTargetCheck = function (req, res) {
    let target = req.body.target
    let result
    let infoMessage
    let request = new Request('updateTarget', function (err, count, rows) {
        if (err) result = {
            status: false,
            message: err.message
        }
        else {
            let responseTable = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })
            result = {
                status: true,
                message: responseTable
            }
        }
        res.send({
            ...result,
            ...infoMessage
        });
    })
    request.addParameter('target', TYPES.NVarChar, target)
    process.connection.callProcedure(request);
}