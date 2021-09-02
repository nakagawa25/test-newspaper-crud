const express = require('express');
const routes = express.Router();
const NewsController = require('./controllers/NewsController');
const newsController = new NewsController();

routes.get('/all', newsController.findAll);
routes.post('/create', newsController.create);
routes.put('/update', newsController.update);
routes.delete('/delete', newsController.delete);

module.exports = routes;