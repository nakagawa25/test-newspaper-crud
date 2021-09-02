const express = require('express');
const routes = require('./routes');

// const cors = require('cors');
// const expressJWT = require('express-jwt');

const app = express();

app.use(express.json());

app.use(routes);

module.exports = app;