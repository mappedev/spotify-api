const removeExtension = (filePath) => {
  return filePath.split('.').shift()
}

module.exports = { removeExtension }
