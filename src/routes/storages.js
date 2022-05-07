const express = require('express')
const { addNewStorage, getAllStorages, getOneStorage, deleteStorage } = require('../controllers/storages')
const { uploadMiddleware } = require('../middlewares/storages')
const { validatorIdParam } = require('../validators/commons')
const { verifyTokenAndSession } = require('../middlewares/verifyTokenAndSession')
const { verifyRoles } = require('../middlewares/verifyRoles')

const router = express.Router()

router.get('/', getAllStorages)
router.get('/:id', validatorIdParam, getOneStorage)
// uploadMiddleware.multi we can to send multiple fieldnames.
// file is the fieldname of file uploaded
router.post('/', verifyTokenAndSession(true), verifyRoles(['admin']), uploadMiddleware.single('file'), addNewStorage)
router.delete('/:id', verifyTokenAndSession(true), verifyRoles(['admin']), validatorIdParam, deleteStorage)

module.exports = router
