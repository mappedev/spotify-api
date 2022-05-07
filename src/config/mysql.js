const { Sequelize } = require('sequelize')

const MYSQL_DB = process.env.MYSQL_DB
const MYSQL_USERNAME = process.env.MYSQL_USERNAME
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
const MYSQL_HOST = process.env.MYSQL_HOST

const sequelize = new Sequelize(
  MYSQL_DB,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: 'mysql'
  }
)

const dbConnectMySQL = async (cbSuccess, cbFailed) => {
  try {
    await sequelize.authenticate()
    console.log('✅ MySQL DB connected')
  } catch (err) {
    console.log('❌ Error trying to connect the MySQL DB')
    console.log(err)
  }
}

module.exports = { sequelize, dbConnectMySQL }
