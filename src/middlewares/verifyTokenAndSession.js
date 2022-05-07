const { jwtConfig } = require('../config/jwt')
const { usersModel } = require('../models')
const { handleHttpError } = require('../utils/handleHttpError')
const { verifyToken } = require('../utils/handleJwt')

const TOKEN_SECRET = process.env.TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const verifyTokenAndSession = (isAccessToken) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, 'NOT_TOKEN_PROVIDED', 401)
      return
    }

    const token = req.headers.authorization.split(' ').pop()
    const verifyTokenRes = verifyToken(token, isAccessToken ? TOKEN_SECRET : REFRESH_TOKEN_SECRET)

    if (!verifyTokenRes) {
      handleHttpError(res, 'TOKEN_NOT_PAYLOAD_DATA', 401)
      return
    }

    if (verifyTokenRes === jwtConfig.errorMessages.INVALID_SIGNATURE) {
      handleHttpError(res, 'TOKEN_INVALID', 401)
      return
    }

    if (verifyTokenRes === jwtConfig.errorMessages.JWT_EXPIRED) {
      handleHttpError(res, 'TOKEN_EXPIRED', 401)
      return
    }

    const user = await usersModel.findOne({ userId: verifyTokenRes })
    req.user = user // * Pasamos el usuario a la req para que se pueda obtener en el siguiente middleware o controlador

    // if (verifyTokenRes === jwtConfig.errorMessages.JWT_EXPIRED) {
    //   const session = await sessionsModel.findById(user._id)
    //   // TODO: REFRESH TOKEN
    // }

    next()
  } catch {
    handleHttpError(res, 'NOT_SESSION')
  }
}

module.exports = { verifyTokenAndSession }
