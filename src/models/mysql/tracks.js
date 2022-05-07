const { sequalize } = '../../config/mysql'
const { DataTypes } = require('sequelize')
const Storages = require('./storages')

const Tracks = sequalize.define(
  'tracks',
  {
    name: {
      type: DataTypes.STRING
    },
    album: {
      type: DataTypes.STRING
    },
    cover: {
      type: DataTypes.STRING
    },
    artis_name: {
      type: DataTypes.STRING
    },
    artis_nickname: {
      type: DataTypes.STRING
    },
    artis_nationality: {
      type: DataTypes.STRING
    },
    duration_start: {
      type: DataTypes.NUMBER
    },
    duration_end: {
      type: DataTypes.NUMBER
    },
    mediaId: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true
  }
)

Tracks.findAllData = function (models) {
  Tracks.belongsTo(Storages, {
    foreignKey: 'mediaId',
    as: 'file'
  })

  return Tracks.findAll({ include: 'file' })
}

Tracks.findOneData = function (id) {
  Tracks.belongsTo(Storages, {
    foreignKey: 'mediaId',
    as: 'file'
  })

  return Tracks.findOne({ where: { id }, include: 'file' })
}

module.exports = Tracks
