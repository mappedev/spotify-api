const express = require('express')
const { loginUser } = require('../../controllers/auth/login')
const { validatorLogin } = require('../../validators/auth/login')

const router = express.Router()

router.post('/', validatorLogin, loginUser)

module.exports = router
