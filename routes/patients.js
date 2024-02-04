const express = require("express");
const router = express.Router();

const patientsController = require('../controllers/patients');
const validator = require("../middleware/validatePatient")
const isAuthenticated = require("../middleware/authenticate");


router.get('/', patientsController.getAll);
router.get('/:id', patientsController.getSingle);
router.post('/', isAuthenticated, validator, patientsController.createPatient); 
router.put('/:id', isAuthenticated, validator, patientsController.updatePatient); 
router.delete('/:id', isAuthenticated, patientsController.deletePatient); 

module.exports = router;
