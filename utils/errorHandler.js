const AppError = require('./AppErrors');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error: ', err);
    res
      .status(500)
      .json({ status: 'error', message: 'Something went very wrong' });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: $${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
  const message = `Duplicate field: "${err.keyValue.name}" use anther name`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((ele) => ele.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Something went wrong';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  if (process.env.NODE_ENV === 'production') {
    let error = Object.assign({}, err);
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateError(error);
    if (err.name === 'ValidationError') error = handleValidationError(error);
    sendErrorProd(error, res);
  }
};
