const { matchedData } = require('express-validator')
const { jwtConfig } = require('../../config/jwt')
const { usersModel } = require('../../models')
const { handleHttpError } = require('../../utils/handleHttpError')
const { signToken } = require('../../utils/handleJwt')
const { encryptPassword } = require('../../utils/handlePassword')
const { getEngineProperties } = require('../../utils/handlePropertiesEngine')

const TOKEN_SECRET = process.env.TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const engineProperties = getEngineProperties()

const registerUser = async (req, res) => {
  try {
    const reqBody = matchedData(req)

    const passwordHashed = await encryptPassword(reqBody.password)
    const body = {
      ...reqBody,
      password: passwordHashed
    }
    const user = await usersModel.create(body)

    const accessToken = signToken({ userId: user[engineProperties.id] }, TOKEN_SECRET, jwtConfig.accessToken.lifetime)
    const refreshToken = signToken({ userId: user[engineProperties.id] }, REFRESH_TOKEN_SECRET, jwtConfig.refreshToken.lifetime)

    // * No retornamos la password
    // * Con esto indicamos que no queremos que devuelva la propiedad password.
    // * Es necesario para el método create de mongoose
    user.set('password', undefined, { strict: false })
    //* Enviamos la propiedad token al objeto data
    user.set('accessToken', accessToken, { strict: false })
    user.set('refreshToken', refreshToken, { strict: false })

    return res.status(201).json(user)
  } catch {
    handleHttpError(res, 'ERROR_REGISTER_USER')
  }
}

module.exports = { registerUser }
