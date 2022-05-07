const getNameAndExtOfFile = (file) => {
  const filenameSplited = file.split('.')
  const filename = filenameSplited.shift()
  const ext = filenameSplited.pop()

  return { filename, ext }
}

module.exports = { getNameAndExtOfFile }
