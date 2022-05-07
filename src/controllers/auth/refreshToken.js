const { jwtConfig } = require('../../config/jwt')
const { handleHttpError } = require('../../utils/handleHttpError')
const { signToken } = require('../../utils/handleJwt')
const { getEngineProperties } = require('../../utils/handlePropertiesEngine')

const TOKEN_SECRET = process.env.TOKEN_SECRET

const engineProperties = getEngineProperties()

const refreshAccessToken = (req, res) => {
  try {
    const { user } = req
    const accessToken = signToken({ userId: user[engineProperties.id] }, TOKEN_SECRET, jwtConfig.accessToken.lifetime)

    return res.json({ accessToken })
  } catch {
    handleHttpError(res, 'ERROR_REFRESH_TOKEN')
  }
}

module.exports = { refreshAccessToken }
