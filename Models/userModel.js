const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
    enum: ['user', 'admin', 'guide', 'lead-guide'],
    default: 'user',
  },
  passwordChangedAt: Number,
  passwordResetToken: String,
  passwordResetExpires: Number,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  // we passed the user password just because this.password will return undefined because of the select:false
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  console.log(this.passwordChangedAt);
  if (this.passwordChangedAt)
    return JWTTimestamp * 1000 < this.passwordChangedAt;
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
