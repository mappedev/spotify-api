const express = require('express')
const { getAllTracks, addNewTrack, getOneTrack, updateTrack, deleteTrack } = require('../controllers/tracks')
const { validatorBody } = require('../validators/tracks')
const { validatorIdParam } = require('../validators/commons')
const { verifyTokenAndSession } = require('../middlewares/verifyTokenAndSession')
const { verifyRoles } = require('../middlewares/verifyRoles')

const router = express.Router()

router.get('/', getAllTracks)
router.get('/:id', validatorIdParam, getOneTrack)
// router.get("/:id/:var1/:var2", getOneTrack) // Es posible pasar más de una variable
router.post('/', validatorBody, verifyTokenAndSession(true), verifyRoles(['admin']), addNewTrack)
router.put('/:id', validatorIdParam, validatorBody, verifyTokenAndSession(true), verifyRoles(['admin']), updateTrack)
router.delete('/:id', validatorIdParam, verifyTokenAndSession(true), verifyRoles(['admin']), deleteTrack)

module.exports = router
