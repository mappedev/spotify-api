const path = require('path')
const { matchedData } = require('express-validator')
const { storagesModel } = require('../models')
const { handleHttpError } = require('../utils/handleHttpError')
const { getEngineProperties } = require('../utils/handlePropertiesEngine')

const PUBLIC_URL = process.env.PUBLIC_URL

const engineProperties = getEngineProperties()

const getAllStorages = async (req, res) => {
  try {
    const data = await storagesModel.find({})
    res.json(data)
  } catch {
    handleHttpError(res, 'ERROR_GET_ALL_STORAGES')
  }
}

const getOneStorage = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await storagesModel.findOne({ [engineProperties.id]: id })

    if (data) {
      return res.json(data)
    }

    handleHttpError(res, 'ERROR_STORAGE_NOT_FOUND', 404)
  } catch {
    handleHttpError(res, 'ERROR_GET_ONE_STORAGE')
  }
}

const addNewStorage = async (req, res) => {
  try {
    const { file } = req
    const { filename } = file

    const fileData = {
      filename,
      url: path.join(PUBLIC_URL, '/', filename)
    }
    const data = await storagesModel.create(fileData)
    return res.status(201).json(data)
  } catch {
    handleHttpError(res, 'ERROR_ADD_NEW_STORAGE')
  }
}

const deleteStorage = async (req, res) => {
  try {
    const { id } = matchedData(req)
    // const file = await storagesModel.findById({ _id: id })
    const data = await storagesModel.delete({ _id: id })

    // fs.unlinkSync(`${__dirname}/../storage/${file.filename}`)

    return res.json(data)
  } catch {
    handleHttpError(res, 'ERROR_DELETE_STORAGE')
  }
}

module.exports = {
  getOneStorage,
  getAllStorages,
  addNewStorage,
  deleteStorage
}
