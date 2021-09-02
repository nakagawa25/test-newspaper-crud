const express = require('express');
const routes = express.Router();

const NewsController = require('./controllers/NewsController');
const newsController = new NewsController();

routes.post('/create', newsController.create);


module.exports = routes;