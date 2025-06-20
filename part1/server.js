// server.js
const express = require('express');
const app = express();
const dogwalkApi = require('./dogwalk_api');

app.use(express.json());
app.use('/api', dogwalkApi);

const PORT = 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server running at http://localhost:${PORT}`);
});
