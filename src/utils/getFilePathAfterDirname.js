const getFilePathAfterDirname = (filePath, dirname) => {
  return filePath.split(dirname).pop()
}

module.exports = { getFilePathAfterDirname }
