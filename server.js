const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(`the server running on port: ${port}...`);
});
