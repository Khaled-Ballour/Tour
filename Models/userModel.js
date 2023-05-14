const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell your name'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, 'Provide a valid Email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      validator: function (ele) {
        return ele === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  // we passed the user password just because this.password will return undefined because of the select:false
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
