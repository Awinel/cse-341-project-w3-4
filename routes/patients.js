const express = require("express");
const router = express.Router();

const patientsController = require('../controllers/patients');
const validator = require('../middleware/validate'); 

router.get('/', patientsController.getAll);
router.get('/:id', patientsController.getSingle);
router.post('/', validator.savePatient, patientsController.createPatient); 
router.put('/:id', validator.savePatient, patientsController.updatePatient); 
router.delete('/:id', validator.savePatient, patientsController.deletePatient); 

module.exports = router;
