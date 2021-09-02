// const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const client = new MongoClient(uri, { useUnifiedTopology: true });
const yup = require('yup');
const newsModel = require('../models/News');


module.exports = {

    async create(newsParams) {
        try {
            const schema = yup.object().shape({
                title: yup.string().required(),
                content: yup.string().required(),
                publicationDate: yup.date().required()
            });

            await schema.validate(newsParams, { abortEarly: true })

            const { title, content, publicationDate } = newsParams;

            const news = new newsModel(title, content, publicationDate);

            const message = client.connect().then(async () => {
                const newsCollection = client.db('newspapper-crud').collection('news');
                return await newsCollection.insertOne(news.Serializer()).then(async () => {
                    return true;
                });
            });

            return message;
        } catch (error) {
            return { message: 'Erro ao criar uma nova notícia' };
        }
    }

}