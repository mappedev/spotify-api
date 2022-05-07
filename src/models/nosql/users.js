const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      select: false
      // * No quiero que se devuelva cuando se solicite el usuario.
      // ! OJO esto no funciona con el método create de mongoose
    },
    roles: {
      type: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false
  }
)

// Esto no funciona con el método create de mongoose
// UserScheme.set('toJSON', {
//   transform: (doc, objReturn, options) => {
//     const userNormalized = objReturn
//     delete userNormalized.password

//     return userNormalized
//   }
// })

// Esto no funciona con el método create de mongoose
// UserScheme.set('toObject', {
//   hide: 'password'
// })

UserScheme.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('users', UserScheme)
