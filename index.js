var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// import HomeRoutes from './controllers/HomeController';

var HomeRoutes = require('./controllers/home_controller');


var port = process.env.PORT || 3000;


var app = new express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
// app.use(bodyParser.json());

// app.use('/',function(req,res){
//     res.send("Hellow enter note controller");
// });

app.use('/',HomeRoutes.HomeRoutes);
// app.use(express.static('public'));
app.use('/static', express.static('public'))
app.listen(port);