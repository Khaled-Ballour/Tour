const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppErrors');
const jwt = require('jsonwebtoken');

const signToken = (payload) => {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.jWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const fields = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };
  const newUser = await User.create(fields);
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Provide email and password'), 400);
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Email or Password is incorrect'), 401);
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
