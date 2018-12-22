var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');

// import HomeRoutes from './controllers/HomeController';

var HomeRoutes = require('./controllers/home_controller');
var AccountRoutes = require('./controllers/account_controller');


var port = process.env.PORT || 3000;


var app = new express();

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(session({secret: 'skjadfhjweournssd'}));
// app.use(bodyParser.json());

// app.use('/',function(req,res){
//     res.send("Hellow enter note controller");
// });

app.use('/',AccountRoutes.AccountRoutes);
app.use('/',HomeRoutes.HomeRoutes);
// app.use(express.static('public'));
app.use('/static', express.static('public'))
app.listen(port);