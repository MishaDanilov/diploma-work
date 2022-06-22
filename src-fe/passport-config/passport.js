const passport = require('passport')
const flash = require('connect-flash'); //flash
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const LocalStrategy = require('passport-local')
const customConfig = require('../models/ConfigModel').customConfig
const adminConfig = require('../models/ConfigModel').adminConfig;
passport.serializeUser(function (user, done) {
    let userNow
    if(user['ID клиента']) {
        process.hwo = 'user'
        userNow = user['ID клиента']
    }
    else {
        process.hwo = 'admin'
        userNow = user['ID сотрудника']
    }
    console.log('serialize:', userNow)
    process.id = userNow
    done(null, userNow);
});

passport.deserializeUser(async function (id, done) {
    
    requestUser = new Request("findUserbyID", function (err, count, rows) {
        if (err) return done(err);
        let user = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        console.log('deserialize', id)
        done(err, user);
    });
    requestUser.addParameter('id', TYPES.Int, id);
    requestAdmin = new Request("findAdminbyID", function (err, count, rows) {
        if (err) return done(err);
        let user = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        console.log('deserialize', id)
        done(err, user);
    });
    requestAdmin.addParameter('id', TYPES.Int, id);
    if(process.hwo=='user') process.connection.callProcedure(requestUser);
    else process.connection.callProcedure(requestAdmin);
   

});

passport.use('login', new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    customConfig.authentication.options.userName = username
    customConfig.authentication.options.password = password
    process.connection = new Connection(customConfig);
    process.connection.connect();
    //connection.close()
    process.connection.on('connect', function (err) {
        if (err) return done(err);
        request = new Request("findUserbyLoginPassword", function (err, count, rows) {
            if (err) return done(err);
            let user = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            if (!user) return done(new Error('Неверный логин или пароль!'));
            return done(err, user);
        });
        request.addParameter('username', TYPES.NVarChar, username);
        request.addParameter('password',TYPES.NVarChar, password);
        process.connection.callProcedure(request);
    })
}));
passport.use('registration', new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    RegistrationUser = function () {
        let email = req.body.email
        let name = req.body.name
        let surname = req.body.surname
        process.connection = new Connection(adminConfig);
        process.connection.connect();
        process.connection.on('connect', function (err) {
            if (err) return done(err);
            request = new Request('Registration', function (err, count, rows) {
                if (err) return done(err);
                let user = rows.map(elem => {
                    return elem.reduce((total, elem) => {
                        total[elem.metadata.colName] = elem.value
                        return total
                    }, {})
                })[0]
                if (user) {
                    customConfig.authentication.options.userName = username
                    customConfig.authentication.options.password = password
                    process.connection = new Connection(customConfig);
                    process.connection.connect();
                    return done(null, user);
                } else return done(new Error('Пользователь уже существует!'));

            });
            request.addParameter('name', TYPES.NVarChar, name);
            request.addParameter('surname', TYPES.NVarChar, surname);
            request.addParameter('login', TYPES.NVarChar, username);
            request.addParameter('mail', TYPES.NVarChar, email);
            request.addParameter('password', TYPES.NVarChar, password);
            //вызов процедуры
            process.connection.callProcedure(request)

        })
    }
    process.nextTick(RegistrationUser)
}))
passport.use('loginAdmin', new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    customConfig.authentication.options.userName = username
    customConfig.authentication.options.password = password
    process.connection = new Connection(customConfig);
    process.connection.connect();
    //connection.close()
    process.connection.on('connect', function (err) {
        if (err) return done(err);
        request = new Request("findAdminbyLoginPassword", function (err, count, rows) {
            if (err) return done(err);
            let user = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            if (!user) return done(new Error('Неверный логин или пароль!'));
            return done(err, user);
        });
        request.addParameter('username', TYPES.NVarChar, username);
        request.addParameter('password', TYPES.NVarChar, password);
        process.connection.callProcedure(request);
    })
}));