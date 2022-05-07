const { handleHttpError } = require('../utils/handleHttpError')

const verifyRoles = (roles) => (req, res, next) => {
  try {
    const userRoles = req.user.roles

    const checkRole = roles.some(role => userRoles.includes(role))

    if (!checkRole) {
      handleHttpError(res, 'USER_NOT_AUTHORIZED', 401)
      return
    }

    next()
  } catch {
    handleHttpError(res, 'ERROR_PERMISSIONS')
  }
}

module.exports = { verifyRoles }
