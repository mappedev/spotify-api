const handleHttpError = (res, message = 'Something has happened.', statusCode = 403) => {
  return res.status(statusCode).json({ error: message })
}

module.exports = { handleHttpError }
