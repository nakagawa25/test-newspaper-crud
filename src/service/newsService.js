const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const client = new MongoClient(uri, { useUnifiedTopology: true });
const newsModel = require('../models/News');

module.exports = {

    async create(newsParams) {
        try {
            const { title, content, publicationDate } = newsParams;
            const news = new newsModel(title, content, publicationDate);
            const message = client.connect().then(async () => {
                const newsCollection = client.db('newspapper-crud').collection('news');
                return await newsCollection.insertOne(news.Serializer()).then(async () => {
                    return { message: 'Notícia criada com sucesso. ' };
                });
            });

            return message;
        } catch (error) {
            await client.close();
            return { message: 'Erro ao criar uma nova notícia' };
        }
    },

    async findAll() {
        try {
            const message = client.connect().then(async () => {
                let news = [];
                const newsCollection = client.db('newspapper-crud').collection('news');
                const cursor = newsCollection.find({});
                await cursor.forEach(result => {
                    news.push(result);
                });
                return news;
            });

            return message;
        } catch (error) {
            await client.close();
            return { message: 'Erro ao buscar todas as notícias no banco de dados' };
        }
    },

    async update(title, newTitle, newContent, newDate) {
        try {
            const message = client.connect().then(async () => {
                const newsCollection = client.db('newspapper-crud').collection('news');
                const filter = { title };
                const newNews = {
                    title,
                    title: newTitle,
                    content: newContent,
                    publicationDate: newDate
                };
                return await newsCollection.replaceOne(filter, newNews).then(async (result) => {
                    return { message: 'Notícia atualizada com sucesso. ' };
                });
            });

            return message;
        } catch (error) {
            await client.close();
            return { message: 'Erro ao atualizar a notícia no banco de dados.' };
        }
    },

    async delete(title) {
        try {
            const message = client.connect().then(async () => {
                const newsColletcion = client.db('newspapper-crud').collection('news');
                return await newsColletcion.deleteMany({ title }).then(async (deletedResult) => {
                    if (deletedResult.deletedCount > 0) {
                        return { message: 'Excluído com sucesso. ' };
                    }
                    else {
                        return { message: 'Nenhuma notícia foi encontrada com esse título no banco de dados. ' }
                    }
                });
            });

            return message;
        } catch (error) {
            await client.close();
            return { message: 'Erro ao excluir a notícia do banco de dados.' };
        }
    }
}