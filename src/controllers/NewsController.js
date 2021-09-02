const newsService = require('../service/newsService');

class NewsController {
    async create(req, res) {
        try {
            newsService.create(req.body).then((response) => {
                res.json(response);
            })
        } catch (error) {
            res.status(400).json({message: 'Erro ao inserir o dado no banco. ' + error.message});
        }

    }
}

module.exports = NewsController;