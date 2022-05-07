const jwt = require('jsonwebtoken')

const signToken = (payload, tokenSecret, expiresIn) => {
  return jwt.sign(payload, tokenSecret, { expiresIn })
}

const verifyToken = (jwtToken, tokenSecret) => {
  try {
    return jwt.verify(jwtToken, tokenSecret)
  } catch (err) {
    return err.message
  }
}

module.exports = { signToken, verifyToken }
