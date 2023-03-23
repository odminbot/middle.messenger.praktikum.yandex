const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.use(express.static(`${__dirname}/dist/`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Start web server on http://${HOSTNAME}:${PORT}`);
});
