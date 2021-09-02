class News {
    constructor(title, content, publicationDate) {
        this.title = title;
        this.content = content;
        this.publicationDate = publicationDate;
    }

    Serializer() {
        return { "title": this.title, "content": this.content, "publicationDate": this.publicationDate };
    }
}

module.exports = News;