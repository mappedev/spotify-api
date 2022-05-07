const { check } = require('express-validator')
const validateResults = require('../utils/validateResults')

const validatorIdParam = [
  check('id')
    .exists()
    .notEmpty(),
  // .isMongoId(),
  validateResults
]

module.exports = {
  validatorIdParam
}
