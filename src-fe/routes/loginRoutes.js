var express = require('express');
var router = express.Router();
const urlencoded = express.urlencoded({extended: false})
var passport = require('passport');
const login = require('../controllers/loginController').login
const displayLogin = require('../controllers/loginController').displayLogin
const checkToken = require('../controllers/loginController').checkToken
const displayRegistration = require('../controllers/loginController').displayRegistration
const registration = require('../controllers/loginController').registration
router.get('/', displayLogin);
// router.post('/checkToken', checkToken);
router.post('/login',urlencoded,login)
router.get('/registration',displayRegistration)
router.post('/registration',urlencoded,registration)
module.exports = router;
