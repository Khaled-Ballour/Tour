const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routers/tourRouter');
const userRouter = require('./routers/userRouter');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`the server running on port: ${port}...`);
});
