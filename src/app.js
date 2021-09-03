const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');


app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    res.header("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");

    app.use(cors());
    next();
});

app.use(express.json());
app.use(routes);

module.exports = app;