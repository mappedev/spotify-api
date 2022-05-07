const fs = require('fs')
const path = require('path')

const getAllFilesPath = (dirPath, arrayOfPathFiles) => {
  const files = fs.readdirSync(dirPath)
  arrayOfPathFiles = arrayOfPathFiles || []

  if (files.length === 0) {
    console.log(`⚠️ Dir ${dirPath} is empty`)
  } else {
    files.forEach(file => {
      if (file === 'index.js') return

      if (fs.statSync(path.join(dirPath, '/', file)).isDirectory()) {
        arrayOfPathFiles = getAllFilesPath(path.join(dirPath, '/', file), arrayOfPathFiles)
      } else {
        arrayOfPathFiles.push(path.join(dirPath, '/', file))
      }
    })
  }

  return arrayOfPathFiles
}

module.exports = { getAllFilesPath }
