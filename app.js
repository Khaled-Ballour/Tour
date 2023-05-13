const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routers/tourRouter');
const userRouter = require('./routers/userRouter');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({
      status: 'fail',
      message: `The route ${req.originalUrl} is not found`,
    });
});

module.exports = app;
