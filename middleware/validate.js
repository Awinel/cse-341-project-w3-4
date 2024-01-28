const validator = require("../validation/validate");

const savePatient = (req, res, next) => {
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

module.exports = {
savePatient
};
