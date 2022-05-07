const { check } = require('express-validator')
const validateResults = require('../utils/validateResults')

const validatorBody = [
  check('name')
    .exists()
    .notEmpty()
    .isString(),
  check('album')
    .exists()
    .notEmpty()
    .isString(),
  check('cover')
    .exists()
    .notEmpty()
    .isString(),
  check('artist')
    .exists()
    .notEmpty()
    .isObject(),
  check('artist.name')
    .exists()
    .notEmpty()
    .isString(),
  check('artist.nickname')
    .exists()
    .notEmpty()
    .isString(),
  check('artist.nationality')
    .exists()
    .notEmpty()
    .isString(),
  check('duration')
    .exists()
    .notEmpty()
    .isObject(),
  check('duration.start')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('duration.end')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('mediaId')
    .exists()
    .notEmpty(),
  // .isMongoId(),
  validateResults
]

module.exports = {
  validatorBody
}
