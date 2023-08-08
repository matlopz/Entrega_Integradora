const express = require('express');
const handlebars = require('express-handlebars')
const router = require('./router/index')();
const app = express();


// Middleware para procesar JSON 
app.use(express.json());


app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Enlace del router
app.use('/api', router);

module.exports = app;
