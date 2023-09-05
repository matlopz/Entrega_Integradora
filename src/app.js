const express = require('express');
const cors = require('cors')
const handlebars = require('express-handlebars');
const connectMongo = require('./db');
const router = require('./router')();

const app = express();
const hbs = handlebars.create({
 
    allowProtoPropertiesByDefault: true
});

app.use(cors());
// Middleware para procesar JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


// Enlace del router
connectMongo()


app.use('/', router);

module.exports = app;
