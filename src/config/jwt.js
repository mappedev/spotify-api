const jwtConfig = {
  accessToken: {
    lifetime: '2h'
  },
  refreshToken: {
    lifetime: '1y'
  },
  errorMessages: {
    JWT_EXPIRED: 'jwt expired',
    INVALID_SIGNATURE: 'invalid signature'
  }
}

module.exports = { jwtConfig }
