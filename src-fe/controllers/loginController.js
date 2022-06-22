var passport = require("passport");
const http = require("http")

module.exports.login = function (req, res, next) {
  passport.authenticate("login", function (err, user, info) {
    if (err) return next(err);
    // if (!user) {
    //     console.log('Неверный логин или пароль!')
    //     return res.redirect('/');
    // }
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.redirect("/home");
    });
  })(req, res, next);
};

// module.exports.checkToken = function (req, res, next) {
//   const { token, employeeId, redirect } = req.body;

//   const data = JSON.stringify({
//     token,
//     employeeId,
//     redirect,
//   });

//   const options = {
//     hostname: "localhost",
//     port: 8080,
//     path: "/api/dummy",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//       "Access-Control-Allow-Origin": "http://localhost:3000"
//     },
//   };

//   const requestCurrent = http.request(options, (res) => {
//     console.log(`statusCode: ${res.statusCode}`);
//     res.on("data", (result) => {
//       process.stdout.write(result);
//     });
//   });

//   requestCurrent.on("error", (error) => {
//     console.error(error);
//   });

//   requestCurrent.write(data);
//   requestCurrent.end();
// };

module.exports.registration = async function (req, res, next) {
  res.redirect("/home");
  //   try {
  //     const response = await fetch("/registration", {
  //       method: "POST",
  //       body: JSON.stringify(req.body),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const responseJSON = await response.json();

  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
};

module.exports.displayLogin = function (req, res, next) {
  res.render("login");
};
module.exports.displayRegistration = function (req, res, next) {
  res.render("registration");
};
