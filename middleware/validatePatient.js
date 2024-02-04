const validator = require("../validation/patientValidation");


const validate = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    age: 'required|numeric',
    phone: 'required|numeric',
    rut: 'required|numeric',
    id: 'required|numeric',
    reason: 'required|string',
    specification: 'required|string'
  };

  
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
  };
module.exports = validate;
