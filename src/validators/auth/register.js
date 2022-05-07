
const { check } = require('express-validator')
const validateResults = require('../../utils/validateResults')

const validatorRegister = [
  check('name')
    .exists()
    .notEmpty()
    .isAlpha()
    .isLength({ min: 3, max: 99 }),
  check('age')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('password')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 15 }),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  check('roles'),
  validateResults
]

module.exports = { validatorRegister }
