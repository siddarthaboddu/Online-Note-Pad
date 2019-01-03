var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');


// multer middleware
// var multer = require('multer');
// var multerupload = multer.diskStorage({
//   destination: (req, file, cb)=>{
//     cb(null, 'public/images/uploads')
//   },
//   filename: (req, file, cb)=>{
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// var upload = multer({storage: storage});

// import HomeRoutes from './controllers/HomeController';

var HomeRoutes = require('./controllers/home_controller');
var AccountRoutes = require('./controllers/account_controller');
var AttachmentRoutes = require('./controllers/attachment_controller');

var port = process.env.PORT || 3000;


var app = new express();

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(session({secret: 'skjadfhjweournssd'}));
// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(bodyParser.json());

// app.use('/',function(req,res){
//     res.send("Hellow enter note controller");
// });

app.use('/',AccountRoutes.AccountRoutes);
app.use('/',HomeRoutes.HomeRoutes);
app.use('/static', express.static('public'))
app.use(function(req,res,next){
   console.log("yay");
   console.log("req.session.email = "+req.session.email);
  if(req.session.email == null || req.session.email.length ==0 ){
    // req.method = "GET";
    res.status(300).json({
      redirect_url: '/login'
  });
    // res.redirect('/login');
  }
  else{
    next();
  }
});

//fileupload routes
app.use('/',AttachmentRoutes.AttachmentRoutes);



// app.use(express.static('public'));

app.listen(port);