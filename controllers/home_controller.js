var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var path = require('path');
var HomeRoutes = express.Router();


var correct_path = path.join(__dirname+'/../views/home/');
// var scripts_path = path.join(__dirname+'/../public/js/');
HomeRoutes.get('/',function(req,res){
    // res.send("Naruto");
    let siddu = "ohh shit";
    // res.render('home/index',{"scripts_path":scripts_path}); 
    res.render('home/index');
});

module.exports = {"HomeRoutes" : HomeRoutes};