var express = require('express');
var router = express.Router();
const urlencoded = express.urlencoded({extended: false})
var passport = require('passport');
const loginAdmin = require('../controllers/adminController').loginAdmin
const displayLoginAdmin = require('../controllers/adminController').displayLoginAdmin
const displayPanelAdmin = require('../controllers/adminController').displayPanelAdmin
const authentication = require('../controllers/adminController').authentication
const logOut = require('../controllers/adminController').logOut
const getTableClients = require('../controllers/adminController').getTableClients
const getTableApplication = require('../controllers/adminController').getTableApplication
const getTableResurse = require('../controllers/adminController').getTableResurse
const getTableInfoWorks = require('../controllers/adminController').getTableInfoWorks
const getTableInfoEmployees = require('../controllers/adminController').getTableInfoEmployees
const getTableAdministration = require('../controllers/adminController').getTableAdministration
const getTableStandardsWorks = require('../controllers/adminController').getTableStandardsWorks
const getTableCommonRules = require('../controllers/adminController').getTableCommonRules
const getTableDetailedRules = require('../controllers/adminController').getTableDetailedRules
const getTableTechnicalConclusion = require('../controllers/adminController').getTableTechnicalConclusion
const editClient = require('../controllers/adminController').editClient
const DeleteClient = require('../controllers/adminController').DeleteClient
const editApplication = require('../controllers/adminController').editApplication
const DeleteApplication = require('../controllers/adminController').DeleteApplication
const editResurse = require('../controllers/adminController').editResurse
const DeleteResurse = require('../controllers/adminController').DeleteResurse
const editInfoWorks = require('../controllers/adminController').editInfoWorks
const DeleteInfoWorks = require('../controllers/adminController').DeleteInfoWorks
const editInfoEmployees = require('../controllers/adminController').editInfoEmployees
const DeleteInfoEmployees = require('../controllers/adminController').DeleteInfoEmployees
const editAdministration = require('../controllers/adminController').editAdministration
const DeleteAdministration = require('../controllers/adminController').DeleteAdministration
const editStandardsWorks = require('../controllers/adminController').editStandardsWorks
const DeleteStandardsWorks = require('../controllers/adminController').DeleteStandardsWorks
const editCommonRules = require('../controllers/adminController').editCommonRules
const DeleteCommonRules = require('../controllers/adminController').DeleteCommonRules
const editDetailedRules = require('../controllers/adminController').editDetailedRules
const DeleteDetailedRules = require('../controllers/adminController').DeleteDetailedRules
const editTechnicalConclusion = require('../controllers/adminController').editTechnicalConclusion
const DeleteTechnicalConclusion = require('../controllers/adminController').DeleteTechnicalConclusion
const addClient = require('../controllers/adminController').addClient
const applicationAdd = require('../controllers/adminController').applicationAdd
const resurseAdd = require('../controllers/adminController').resurseAdd
const infoWorksAdd = require('../controllers/adminController').infoWorksAdd
const infoEmployeesAdd = require('../controllers/adminController').infoEmployeesAdd
const AdministrationAdd = require('../controllers/adminController').AdministrationAdd
const standardsWorksAdd = require('../controllers/adminController').standardsWorksAdd
const commonRulesAdd = require('../controllers/adminController').commonRulesAdd
const detailedRulesAdd = require('../controllers/adminController').detailedRulesAdd
const TechnicalConclusionAdd = require('../controllers/adminController').TechnicalConclusionAdd
const vwPosition = require('../controllers/adminController').vwPosition
const infoMaterial = require('../controllers/adminController').infoMaterial
const infa10 = require('../controllers/adminController').infa10
const infa11 = require('../controllers/adminController').infa11
const infa12 = require('../controllers/adminController').infa12
const infa13 = require('../controllers/adminController').infa13
const infa14 = require('../controllers/adminController').infa14
const infa15 = require('../controllers/adminController').infa15
const infaregion = require('../controllers/adminController').infaregion
const infholdEx = require('../controllers/adminController').infholdEx
const infoDateLanding = require('../controllers/adminController').infoDateLanding
const infolateWork = require('../controllers/adminController').infolateWork
const infoProperty = require('../controllers/adminController').infoProperty
const infprice = require('../controllers/adminController').infprice
const inftargetUser = require('../controllers/adminController').inftargetUser
const countUsers = require('../controllers/adminController').countUsers
const countResurs = require('../controllers/adminController').countResurs
const countandpriceResurs = require('../controllers/adminController').countandpriceResurs
const editPostAdministretion = require('../controllers/adminController').editPostAdministretion
const editTargetCheck = require('../controllers/adminController').editTargetCheck

router.get('/', displayLoginAdmin);
router.post('/login',urlencoded,loginAdmin)
router.get('/panel',displayPanelAdmin);
router.get('/panel/logOut',logOut);
router.get('/panel/getTableClients',getTableClients);
router.get('/panel/getTableApplication',getTableApplication);
router.get('/panel/getTableResurse',getTableResurse);
router.get('/panel/getTableInfoWorks',getTableInfoWorks);
router.get('/panel/getTableInfoEmployees',getTableInfoEmployees);
router.get('/panel/getTableAdministration',getTableAdministration);
router.get('/panel/getTableStandardsWorks',getTableStandardsWorks);
router.get('/panel/getTableCommonRules',getTableCommonRules);
router.get('/panel/getTableDetailedRules',getTableDetailedRules);
router.get('/panel/getTableTechnicalConclusion',getTableTechnicalConclusion);
router.post('/panel/editClient',editClient)
router.delete("/panel/DeleteClient/:id", DeleteClient);
router.post("/panel/editApplication", editApplication);
router.delete("/panel/DeleteApplication/:num", DeleteApplication);
router.post("/panel/editResurse", editResurse);
router.delete("/panel/DeleteResurse/:num", DeleteResurse);
router.post("/panel/editInfoWorks", editInfoWorks);
router.delete("/panel/DeleteInfoWorks/:num", DeleteInfoWorks);
router.post("/panel/editInfoEmployees", editInfoEmployees);
router.delete("/panel/DeleteInfoEmployees/:num", DeleteInfoEmployees);
router.post("/panel/editAdministration", editAdministration);
router.delete("/panel/DeleteAdministration/:num", DeleteAdministration);
router.post("/panel/editStandardsWorks", editStandardsWorks);
router.delete("/panel/DeleteStandardsWorks/:num", DeleteStandardsWorks);
router.post("/panel/editCommonRules", editCommonRules);
router.delete("/panel/DeleteCommonRules/:num", DeleteCommonRules);
router.post("/panel/editDetailedRules", editDetailedRules);
router.delete("/panel/DeleteDetailedRules/:num", DeleteDetailedRules);
router.post("/panel/editTechnicalConclusion", editTechnicalConclusion);
router.delete("/panel/DeleteTechnicalConclusion/:num", DeleteTechnicalConclusion);
router.post("/panel/addClient", addClient);
router.post("/panel/applicationAdd", applicationAdd);
router.post("/panel/resurseAdd", resurseAdd);
router.post("/panel/infoWorksAdd", infoWorksAdd);
router.post("/panel/infoEmployeesAdd", infoEmployeesAdd);
router.post("/panel/AdministrationAdd", AdministrationAdd);
router.post("/panel/standardsWorksAdd", standardsWorksAdd);
router.post("/panel/commonRulesAdd", commonRulesAdd);
router.post("/panel/detailedRulesAdd", detailedRulesAdd);
router.post("/panel/TechnicalConclusionAdd", TechnicalConclusionAdd);
router.get("/panel/vwPosition", vwPosition);
router.get("/panel/infa10", infa10);
router.get("/panel/infa11", infa11);
router.get("/panel/infa12", infa12);
router.get("/panel/infa13", infa13);
router.get("/panel/infa14", infa14);
router.get("/panel/infa15", infa15);
router.get("/panel/infaregion", infaregion);
router.get("/panel/infholdEx", infholdEx);
router.get("/panel/infoDateLanding", infoDateLanding);
router.get("/panel/infolateWork", infolateWork);
router.get("/panel/infoProperty", infoProperty);
router.get("/panel/infprice", infprice);
router.get("/panel/inftargetUser", inftargetUser);
router.get("/panel/infoMaterial", infoMaterial);
router.get("/panel/countUsers", countUsers);
router.get("/panel/countResurs", countResurs);
router.get("/panel/countandpriceResurs", countandpriceResurs);
router.post("/panel/editPostAdministretion", editPostAdministretion);
router.post("/panel/editTargetCheck", editTargetCheck);

module.exports = router;
