const newsService = require('../service/newsService');
const yup = require('yup');

class NewsController {
    async create(req, res) {
        try {
            const schema = yup.object().shape({
                title: yup.string().required(),
                content: yup.string().required(),
                publicationDate: yup.date().required()
            });
            await schema.validate(req.body, { abortEarly: false })
            newsService.create(req.body).then((response) => {
                res.json(response);
            });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao inserir o dado no banco. ' + error.message });
        }
    }

    async findAll(req, res) {
        try {
            newsService.findAll().then((response) => {
                res.json(response);
            });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao selecionar os dados do banco. ' + error.message });
        }
    }

    async update(req, res) {
        try {
            const schema = yup.object().shape({
                title: yup.string().required(),
                newTitle: yup.string().required(),
                newContent: yup.string().required(),
                newPublicationDate: yup.date().required()
            });
            await schema.validate(req.body, { abortEarly: false })
            const { title, newTitle, newContent, newPublicationDate } = req.body;
            newsService.update(title, newTitle, newContent, newPublicationDate).then((response) => {
                res.json(response);
            });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar os dados do banco. ' + error.message });
        }
    }

    async delete(req, res) {
        try {
            const schema = yup.object().shape({
                title: yup.string().required()
            });
            await schema.validate(req.body, { abortEarly: false });
            const { title } = req.body;
            newsService.delete(title).then((response) => {
                res.json(response);
            });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao excluir o dado do banco. ' + error.message });
        }
    }
}

module.exports = NewsController;