const validator = require("../validation/patientValidation");


const validatePatient = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    age: 'required|number',
    phone: 'required|number',
    rut: 'required|number',
    id: 'required|number',
    reason: 'required|string',
    specification: 'required|string'
  };

  if (typeof validator === 'function') {
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  } else {
    // Handle the case where validator is not a function
    res.status(500).send({
      success: false,
      message: 'Validation function not found',
      data: null
    });
  }
};

module.exports = validatePatient;
