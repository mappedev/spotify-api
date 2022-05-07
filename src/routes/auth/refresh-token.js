const express = require('express')
const { refreshAccessToken } = require('../../controllers/auth/refreshToken')
const { verifyTokenAndSession } = require('../../middlewares/verifyTokenAndSession')

const router = express.Router()

router.post('/', verifyTokenAndSession(false), refreshAccessToken)

module.exports = router
