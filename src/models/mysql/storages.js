const { sequalize } = '../../config/mysql'
const { DataTypes } = require('sequelize')

const Storages = sequalize.define(
  'storages',
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true
  }
)

module.exports = Storages
