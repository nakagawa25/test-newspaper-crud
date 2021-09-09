const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
    app.use(cors());
    next();
});

app.use(express.json());
app.use(routes);

module.exports = app;