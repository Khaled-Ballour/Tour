const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.json({ status: 200, size: users.length, users });
});

exports.createUser = catchAsync(async (req, res, next) => {});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync((req, res, next) => {});

exports.getUser = catchAsync((req, res, next) => {});
