const { usersModel } = require('../models')
const { handleHttpError } = require('../utils/handleHttpError')

const verifyUserExist = async (req, res, next) => {
  try {
    const { email } = req.body

    const userFounded = await usersModel.exists({ email })

    if (userFounded) {
      handleHttpError(res, 'USER_ALREADY_EXIST', 409)
      return
    }

    next()
  } catch {
    handleHttpError(res, 'ERROR_VERIFY_USER_EXIST')
  }
}

module.exports = { verifyUserExist }
