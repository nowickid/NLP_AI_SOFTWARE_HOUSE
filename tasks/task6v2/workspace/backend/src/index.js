const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employees');
const deviceRoutes = require('./routes/devices');

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/devices', deviceRoutes);

let server;
if (require.main === module) {
  server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

module.exports = app;
