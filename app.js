const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/AppErrors');
const errorHandler = require('./utils/errorHandler');
const tourRouter = require('./routers/tourRouter');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`The route ${req.originalUrl} is not found`, 404));
});
app.use(errorHandler);

module.exports = app;
