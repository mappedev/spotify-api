const { validationResult } = require('express-validator')

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    next()
  } catch (err) {
    res.status(403).send({ error: err.array()[0].msg })
  }
}

module.exports = validateResults
