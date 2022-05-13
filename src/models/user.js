/**
 * The user model.
 *
 * @author Erik Kroon Celander <ek223ur@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'You need to enter a valid password'],
    minlength: [4, 'Password needs contain at least 6 characters'],
    maxlength: [256, 'Password can only contain 256 characters'],
    writeOnly: true
  },
  firstName: {
    type: String,
    required: [true, 'You need to enter a name'],
    maxlength: [256]
  },
  lastName: {
    type: String,
    required: [true, 'You need to enter a last name'],
    maxlength: [256]
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'You need to enter a valid email'],
    validate: [validator.isEmail, 'The email you have entered is not valid']
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12)
})

/**
 * Authenticates a user.
 *
 * @param {string} email - Username from user input.
 * @param {string} password - Password from user input.
 * @returns {object} - Returns either user object if password match or false if no user was found or password was incorrect.
 */
schema.statics.authenticate = async function (email, password) {
  console.log(email)
  const user = await this.findOne({ email: email })
  console.log(user)
  if (!(await bcrypt.compare(password, user.password))) {
    return null
  }
  return user
}

const User = mongoose.models.User || mongoose.model('User', schema)
export default User
