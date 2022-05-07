const { check } = require('express-validator')
const validateResults = require('../../utils/validateResults')

const validatorLogin = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  check('password')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 15 }),
  validateResults
]

module.exports = { validatorLogin }
