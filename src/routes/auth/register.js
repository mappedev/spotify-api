const express = require('express')
const { registerUser } = require('../../controllers/auth/register')
const { verifyUserExist } = require('../../middlewares/verifyUserExist')
const { validatorRegister } = require('../../validators/auth/register')

const router = express.Router()

router.post('/', validatorRegister, verifyUserExist, registerUser)

module.exports = router
