const bcryptjs = require('bcryptjs')

const encryptPassword = async (passwordPlain) => {
  return await bcryptjs.hash(passwordPlain, 10)
}

const comparePassword = async (passwordPlain, passwordHash) => {
  return await bcryptjs.compare(passwordPlain, passwordHash)
}

module.exports = { encryptPassword, comparePassword }
