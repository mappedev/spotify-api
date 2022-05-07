const { matchedData } = require('express-validator')
const { usersModel } = require('../../models')
const { handleHttpError } = require('../../utils/handleHttpError')
const { signToken } = require('../../utils/handleJwt')
const { comparePassword } = require('../../utils/handlePassword')
const { jwtConfig } = require('../../config/jwt')
const { getEngineProperties } = require('../../utils/handlePropertiesEngine')

const TOKEN_SECRET = process.env.TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const engineProperties = getEngineProperties()

const ENGINE_DB = process.env.ENGINE_DB

const loginUser = async (req, res) => {
  try {
    const reqBody = matchedData(req)

    let user

    if (ENGINE_DB === 'nosql') {
      user = await usersModel
        .findOne({ email: reqBody.email })
        .select('password name email roles age')
    } else {
      user = await usersModel
        .findOne({ email: reqBody.email })
    }

    if (!user) {
      handleHttpError(res, 'USER_NOT_EXIST', 404)
      return
    }

    const checkPassword = await comparePassword(reqBody.password, user.password)

    if (!checkPassword) {
      handleHttpError(res, 'PASSWORD_INVALID', 401)
      return
    }

    const accessToken = signToken({ userId: user[engineProperties.id] }, TOKEN_SECRET, jwtConfig.accessToken.lifetime)
    const refreshToken = signToken({ userId: user[engineProperties.id] }, REFRESH_TOKEN_SECRET, jwtConfig.refreshToken.lifetime)

    user.set('password', undefined, { strict: false })
    user.set('accessToken', accessToken, { strict: false })
    user.set('refreshToken', refreshToken, { strict: false })

    return res.json(user)
  } catch {
    handleHttpError(res, 'ERROR_LOGIN_USER')
  }
}

module.exports = { loginUser }
