const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const TYPES = require("tedious").TYPES;
const customConfig = require("../models/ConfigModel").customConfig;
const adminConfig = require("../models/ConfigModel").adminConfig;
const http = require("http");

const SERVER_ADDRESS = "http://localhost";

module.exports.displayHome = function (req, res) {
  res.render("home");
};
// module.exports.authentication = function (req, res, next) {
//   const data = JSON.stringify({
//     token: req.body,
//   });

//   const options = {
//     hostname: "localhost",
//     port: 8080,
//     path: "/emptyRequest",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//     },
//   };

//   const req = http.request(options, (res) => {
//     console.log(`statusCode: ${res.statusCode}`)
//     res.on('data', (result) => {
//       process.stdout.write(result)
//     })
//   })
  
//   req.on('error', (error) => {
//     console.error(error)
//   })
  
//   req.write(data)
//   req.end()
// };
// module.exports.closeDB = function (req, res) {
//     if (!req.isAuthenticated()) {
//         process.connection.close()
//         process.connection.on('end', function () {
//             console.log('DATABASE CLOSED')

//         })
//         res.redirect('/');
//     }
// }
module.exports.logOut = function (req, res) {
  req.logout();
  logoutFunction = function () {
    process.connection.close();
    process.connection.on("end", function () {
      console.log("DATABASE CLOSED");
    });
    res.redirect("/");
  };
  process.nextTick(logoutFunction);
};
module.exports.getUser = function (req, res, next) {
  let request = new Request("findUserbyID", function (err, count, rows) {
    //if (err) return next(err);
    let user = rows.map((elem) => {
      return elem.reduce((total, elem) => {
        total[elem.metadata.colName] = elem.value;
        return total;
      }, {});
    })[0];
    res.send(user);
  });
  request.addParameter("id", TYPES.Int, process.id);
  process.connection.callProcedure(request);
};
module.exports.getInfoEmployee = function (req, res, next) {
  let request = new Request("getInfoEmployee", function (err, count, rows) {
    //if (err) return next(err);
    let employees = rows.map((elem) => {
      return elem.reduce((total, elem) => {
        total[elem.metadata.colName] = elem.value;
        return total;
      }, {});
    });
    res.send(employees);
  });
  process.connection.callProcedure(request);
};
module.exports.getInfoWorks = function (req, res, next) {
  let request = new Request("getInfoWorks", function (err, count, rows) {
    //if (err) return next(err);
    let works = rows.map((elem) => {
      return elem.reduce((total, elem) => {
        total[elem.metadata.colName] = elem.value;
        return total;
      }, {});
    });
    res.send(works);
  });
  process.connection.callProcedure(request);
};
module.exports.showProfile = function (req, res) {
  res.render("profile");
};
module.exports.editUser = function (req, res, next) {
  let login = req.body.login;
  let name = req.body.name;
  let surname = req.body.surname;
  let email = req.body.email;
  let result;
  let infoMessage;
  let request = new Request("UpdateUserbyClient", function (err, count, rows) {
    if (err)
      result = {
        status: false,
        message: err.message,
      };
    else
      result = {
        status: true,
        message: "Пользователь изменён.",
      };
    res.send({
      ...result,
      ...infoMessage,
    });
  });
  request.addParameter("id", TYPES.Int, process.id);
  request.addParameter("name", TYPES.VarChar, name);
  request.addParameter("surname", TYPES.VarChar, surname);
  request.addParameter("login", TYPES.VarChar, login);
  request.addParameter("mail", TYPES.VarChar, email);
  process.connection.callProcedure(request);
  process.connection.on("infoMessage", function (info) {
    infoMessage = {
      infoMessage: info.message,
    };
  });
};
module.exports.editPassword = function (req, res, next) {
  let password = req.body.password;
  let oldpassword = req.body.oldpassword;
  let login = req.body.login;
  let result;
  let infoMessage;
  process.connection = new Connection(adminConfig);
  process.connection.connect();
  process.connection.on("connect", function (err) {
    let request = new Request("UpdateUserPassword", function (
      err,
      count,
      rows
    ) {
      if (err) {
        result = {
          status: false,
          message: err.message,
        };
        customConfig.authentication.options.userName = login;
        customConfig.authentication.options.password = oldpassword;
        process.connection = new Connection(customConfig);
        process.connection.connect();
      } else {
        result = {
          status: true,
          message: "Пароль изменён.",
        };
        customConfig.authentication.options.userName = login;
        customConfig.authentication.options.password = password;
        process.connection = new Connection(customConfig);
        process.connection.connect();
      }
      res.send({
        ...result,
        ...infoMessage,
      });
    });
    request.addParameter("id", TYPES.Int, process.id);
    request.addParameter("password", TYPES.VarChar, password);
    process.connection.callProcedure(request);
    process.connection.on("infoMessage", function (info) {
      infoMessage = {
        infoMessage: info.message,
      };
    });
  });
};
module.exports.showApplication = function (req, res) {
  res.render("application");
};
module.exports.getApplication = function (req, res) {
  let result;
  let infoMessage;
  let request = new Request("getApplication", function (err, count, rows) {
    if (err)
      result = {
        status: false,
        message: err.message,
      };
    else {
      let application = rows.map((elem) => {
        return elem.reduce((total, elem) => {
          total[elem.metadata.colName] = elem.value;
          return total;
        }, {});
      });
      result = {
        status: true,
        message: application,
      };
    }
    res.send({
      ...result,
      ...infoMessage,
    });
  });
  request.addParameter("id", TYPES.Int, process.id);
  process.connection.callProcedure(request);
  process.connection.on("infoMessage", function (info) {
    infoMessage = {
      infoMessage: info.message,
    };
  });
};
module.exports.deleteApplication = function (req, res) {
  const numberApplication = req.params.num;
  let result;
  let infoMessage;
  let request = new Request("deleteApplication", function (err, count, rows) {
    if (err)
      result = {
        status: false,
        message: err.message,
      };
    else {
      result = {
        status: true,
        message: "Заявка удалена",
      };
    }
    res.send({
      ...result,
      ...infoMessage,
    });
  });
  request.addParameter("id", TYPES.Int, process.id);
  request.addParameter("num", TYPES.Int, numberApplication);
  process.connection.callProcedure(request);
  process.connection.on("infoMessage", function (info) {
    infoMessage = {
      infoMessage: info.message,
    };
  });
};
module.exports.addApplication = function (req, res) {
  let target = req.body.target;
  let reason = req.body.reason;
  let title = req.body.title;
  let adres = req.body.adres;
  let email = req.body.email;
  let result;
  let infoMessage;
  let request = new Request("addApplication", function (err, count, rows) {
    if (err)
      result = {
        status: false,
        message: err.message,
      };
    else {
      let application = rows.map((elem) => {
        return elem.reduce((total, elem) => {
          total[elem.metadata.colName] = elem.value;
          return total;
        }, {});
      })[0];
      result = {
        status: true,
        message: application,
      };
    }
    res.send({
      ...result,
      ...infoMessage,
    });
  });
  request.addParameter("target", TYPES.NVarChar, target);
  request.addParameter("reason", TYPES.NVarChar, reason);
  request.addParameter("title", TYPES.NVarChar, title);
  request.addParameter("adres", TYPES.NVarChar, adres);
  request.addParameter("email", TYPES.NVarChar, email);
  request.addParameter("id", TYPES.Int, process.id);
  process.connection.callProcedure(request);
  process.connection.on("infoMessage", function (info) {
    infoMessage = {
      infoMessage: info.message,
    };
  });
};
module.exports.GetDeletedApplications = function (req, res) {
  let result;
  let infoMessage;
  let request = new Request(
    "select * from DeletedApplication where iduser = @id",
    function (err, count, rows) {
      if (err)
        result = {
          status: false,
          message: err.message,
        };
      else {
        let application = rows.map((elem) => {
          return elem.reduce((total, elem) => {
            total[elem.metadata.colName] = elem.value;
            return total;
          }, {});
        });
        result = {
          status: true,
          message: application,
        };
      }
      res.send({
        ...result,
        ...infoMessage,
      });
    }
  );
  request.addParameter("id", TYPES.Int, process.id);
  process.connection.execSql(request);
  process.connection.on("infoMessage", function (info) {
    infoMessage = {
      infoMessage: info.message,
    };
  });
};
module.exports.recoverDeletedApplication = function (req, res) {
  const deletedNum = req.params.deletedNum;
  let result;
  let infoMessage;
  let request = new Request("recoverDeletedApplication", function (
    err,
    count,
    rows
  ) {
    if (err)
      result = {
        status: false,
        message: err.message,
      };
    else {
      let application = rows.map((elem) => {
        return elem.reduce((total, elem) => {
          total[elem.metadata.colName] = elem.value;
          return total;
        }, {});
      })[0];
      result = {
        status: true,
        message: application,
      };
    }
    res.send({
      ...result,
      ...infoMessage,
    });
  });
  request.addParameter("id", TYPES.Int, process.id);
  request.addParameter("deletedNum", TYPES.Int, deletedNum);
  process.connection.callProcedure(request);
  process.connection.on("infoMessage", function (info) {
    infoMessage = {
      infoMessage: info.message,
    };
  });
};
module.exports.subscribe = function (req, res) {
  let result;
  let infoMessage;
  let request = new Request("subscribe", function (err, count, rows) {
    if (err)
      result = {
        status: false,
        message: err.message,
      };
    else {
      result = {
        status: true,
        message: "Подписка оформлена.",
      };
    }
    res.send({
      ...result,
      ...infoMessage,
    });
  });
  request.addParameter("id", TYPES.Int, process.id);
  process.connection.callProcedure(request);
  process.connection.on("infoMessage", function (info) {
    infoMessage = {
      infoMessage: info.message,
    };
  });
};
