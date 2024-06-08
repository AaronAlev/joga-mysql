const con = require('../utils/db');

const getAllArticles = (req, res) => {
    let query = 'SELECT * FROM article';
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index' , {articles: articles});
    })
};

const getArticleBySlug = (req, res) => {
    let query = `SELECT *, author.name AS author, article.name 
                AS article FROM article INNER JOIN author 
                ON article.author_id = author.id WHERE slug = '${req.params.slug}'`;
    let article;
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result;
        res.render('article' , {article: article});
    });
};

const getAuthorArticles = (req, res) => {
    let query = `SELECT author.name AS author, article.name AS article, article.slug AS slug, article.image AS image FROM article INNER JOIN author ON article.author_id = author.id WHERE author.id = ${req.params.id}`;
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        author = result[0].author;
        res.render('author' , {articles: articles, author: author});
    });
};

module.exports = {
    getAllArticles,
    getArticleBySlug,
    getAuthorArticles
};