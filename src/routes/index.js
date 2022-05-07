const express = require('express')
const { getAllFilesPath } = require('../utils/getAllFilesPath')
const { getFilePathAfterDirname } = require('../utils/getFilePathAfterDirname')
const { removeExtension } = require('../utils/removeExtension')

const router = express.Router()

try {
  const filePaths = getAllFilesPath(__dirname)

  if (filePaths.length === 0) {
    throw new Error('The folder route is empty')
  }

  filePaths.forEach(filePath => {
    const routePath = getFilePathAfterDirname(filePath, 'routes')
    const route = removeExtension(routePath)

    router.use(route, require(filePath))
    console.log(`✅ Route ${route} added from ${filePath}`)
  })
} catch (err) {
  console.log(err)
  console.error(`❌ ${err.message}`)
}

module.exports = router
