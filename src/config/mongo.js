const mongoose = require('mongoose')

const MONGO_DB_URI = process.env.MONGO_DB_URI

const dbConnectMongo = () => {
  mongoose.connect(
    MONGO_DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err, res) => {
      if (err) {
        console.log('❌ Error trying to connect the Mongo DB')
        return
      }
      console.log('✅ Mongo DB connected')
    }
  )
}

module.exports = { dbConnectMongo }
