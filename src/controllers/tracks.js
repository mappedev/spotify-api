const { matchedData } = require('express-validator')
const { tracksModel } = require('../models')
const { handleHttpError } = require('../utils/handleHttpError')

const getAllTracks = async (req, res) => {
  try {
    const data = await tracksModel.findAllData()
    const { user } = req

    return res.json({ data, user })
  } catch {
    handleHttpError(res, 'ERROR_GET_ALL_TRACKS')
  }
}

const getOneTrack = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await tracksModel.findOneData(id)
    const { user } = req

    if (!data) {
      handleHttpError(res, 'ERROR_USER_NOT_FOUND', 404)
      return
    }

    return res.json({ data, user })
  } catch (err) {
    console.log(err)
    handleHttpError(res, 'ERROR_GET_ONE_TRACK')
  }
}

const addNewTrack = async (req, res) => {
  try {
    // const { body } = req // Recibe todo los datos del body inclusive si hay más
    // const { name, ... } // No hay necesidad de desestructurar los datos que se necesitan
    const body = matchedData(req) // Recibe solo los datos necesarios del body
    const data = await tracksModel.create(body)
    const { user } = req

    return res.status(201).json({ data, user })
  } catch {
    handleHttpError(res, 'ERROR_ADD_NEW_TRACK')
  }
}

const updateTrack = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const data = await tracksModel.findOneAndUpdate(id, body)
    const { user } = req

    return res.json({ data, user })
  } catch {
    handleHttpError(res, 'ERROR_UPDATE_TRACK')
  }
}

const deleteTrack = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await tracksModel.delete({ _id: id })
    const { user } = req

    return res.json({ data, user })
  } catch {
    handleHttpError(res, 'ERROR_DELETE_TRACK')
  }
}

module.exports = {
  getAllTracks,
  getOneTrack,
  addNewTrack,
  updateTrack,
  deleteTrack
}
