const { sequalize } = '../../config/mysql'
const { DataTypes } = require('sequelize')

const Users = sequalize.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.NUMBER
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    roles: {
      type: DataTypes.ENUM(['user', 'admin'])
    }
  },
  {
    timestamps: true
  }
)

module.exports = Users
