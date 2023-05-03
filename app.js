const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routers/tourRouter');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/tours', tourRouter);

app.get('/api/v1/', (req, res) => {
  res.json({ status: 200, data: 'Hello' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`the server running on port: ${port}...`);
});
