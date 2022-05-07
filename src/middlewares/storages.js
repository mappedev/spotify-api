const path = require('path')
const multer = require('multer')
const { getNameAndExtOfFile } = require('../utils/getNameAndExtOfFile')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathStorage = path.join(__dirname, '/..', '/..', '/storage')
    cb(null, pathStorage)
  },
  filename: (req, file, cb) => {
    const { filename, ext } = getNameAndExtOfFile(file.originalname)

    const filenameFormatted = `${filename}-${Date.now()}.${ext}` // Date.now to generate random names
    cb(null, filenameFormatted)
  }
})

const uploadMiddleware = multer({ storage })

module.exports = {
  uploadMiddleware
}
