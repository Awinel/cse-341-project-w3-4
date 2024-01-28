const { body, validationResult } = require('express-validator');

const savePatient = [
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  body('age').notEmpty().isNumeric(),
  body('phone').notEmpty().isNumeric(),
  body('rut').notEmpty().isNumeric(),
  body('id').notEmpty().isNumeric(),
  body('reason').notEmpty().isString(),
  body('specification').notEmpty().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: errors.array()
      });
    }
    next();
  }
];
