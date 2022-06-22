const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const app = express()
const path = require('path');
const cookieParser = require('cookie-parser');
const jsonParser = express.json()
const hbs = require("hbs");
const passport = require('passport'); //!
const LocalStrategy = require('passport-local')
const session = require('express-session'); //!
const flash = require('connect-flash'); //flash
const sessionStorage = require('session-file-store')(session)
const urlencoded = express.urlencoded({extended: false})
const feConfig = require("./feConfig")

// app.use(express.urlencoded({
//   extended: false
// }));

app.use(express.json())

app.use(cookieParser())

app.use(session({
  secret: 'mySecretKey',
  store: new sessionStorage(),
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + "/views/partials");

app.use(passport.initialize());

app.use(passport.session());

require('./passport-config/passport.js')

let loginRouter = require('./routes/loginRoutes'); //!

let homeRouter = require('./routes/homeRoutes'); //!

let adminRouter = require('./routes/adminRoutes'); //!

app.use('/', loginRouter);

app.use('/home', homeRouter);

app.use('/admin', adminRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

//error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  })
});
app.listen(feConfig.server.port, function (err) {
  if (err) console.log(err.message)
  else console.log(`Application is up and running on port ${feConfig.server.port}`)
})