const express = require('express');
const app = express();

const path = require('path');

const hbs = require('express-handlebars');

const con = require('./utils/db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const articleRoutes = require('./routes/article');

app.use('/', articleRoutes);
app.use('/article', articleRoutes);
app.use('/author', articleRoutes);

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});