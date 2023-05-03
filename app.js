const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/v1/', (req, res) => {
  res.json({ status: 200, data: 'Hello' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`the server running on port: ${port}...`);
});
