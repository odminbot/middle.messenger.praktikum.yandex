const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.use(express.static(`${__dirname}/dist/`));

app.listen(PORT, function () {
  console.log(`Start web server on http://${HOSTNAME}:${PORT}`);
});