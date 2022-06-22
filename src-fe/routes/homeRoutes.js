var express = require('express');
// const Connection = require('tedious').Connection;
// const Request = require('tedious').Request;
// const TYPES = require('tedious').TYPES;
var router = express.Router();
const displayHome = require('../controllers/homeController').displayHome
const authentication = require('../controllers/homeController').authentication
const logOut = require('../controllers/homeController').logOut
const getUser = require('../controllers/homeController').getUser
const getInfoEmployee = require('../controllers/homeController').getInfoEmployee
const getInfoWorks = require('../controllers/homeController').getInfoWorks
const showProfile = require('../controllers/homeController').showProfile
const editUser = require('../controllers/homeController').editUser
const editPassword = require('../controllers/homeController').editPassword
const showApplication = require('../controllers/homeController').showApplication
const getApplication = require('../controllers/homeController').getApplication
const deleteApplication = require('../controllers/homeController').deleteApplication
const addApplication = require('../controllers/homeController').addApplication
const GetDeletedApplications = require('../controllers/homeController').GetDeletedApplications
const recoverDeletedApplication = require('../controllers/homeController').recoverDeletedApplication
const subscribe = require('../controllers/homeController').subscribe
// const closeDB = require('../controllers/homeController').closeDB
router.get('/', displayHome)
router.get('/logOut', logOut)
router.get('/getUser', getUser)
router.get('/getInfoEmployee', getInfoEmployee)
router.get('/getInfoWorks', getInfoWorks)
router.get('/profile', showProfile)
router.post('/editUser', editUser)
router.post('/editPassword', editPassword)
router.get('/application', showApplication)
router.get('/getApplication', getApplication)
router.delete('/deleteApplication/:num', deleteApplication)
router.post('/addApplication', addApplication)
router.get('/getDeletedApplications', GetDeletedApplications)
router.get('/recoverDeletedApplication/:deletedNum', recoverDeletedApplication)
router.get('/subscribe', subscribe)
module.exports = router;