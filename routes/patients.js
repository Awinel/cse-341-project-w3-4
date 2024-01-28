const express = require("express");
const router = express.Router();

const patientsController = require('../controllers/patients');
const validator = require('../validation/patientValidation');

router.get('/', patientsController.getAll);
router.get('/:id', patientsController.getSingle);
router.post('/', validator.validatePatient, patientsController.createPatient); 
router.put('/:id', validator.validateUpdate, patientsController.updatePatient); 
router.delete('/:id', patientsController.deletePatient); 

module.exports = router;
