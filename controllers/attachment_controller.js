var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multer = require('multer');
var fs = require('fs');
var models = require('../models');
var Sequelize = require('sequelize');

var importantMethods = require('./important_methods');

var storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb)=>{
    cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({storage: storage});


var path = require('path');
var AttachmentRoutes = express.Router();

//  show at front end contents of file uploaded 
AttachmentRoutes.post('/fileUpload',upload.single('file'),(req,res,next)=>{
  res.send("fileuploaded   at public/images/uploads/" + req.file.filename+"   original name="+req.file.originalname);
});



// (Completed) Save a text to a file which is entered at frontend
AttachmentRoutes.post('/saveFile',(req,res)=>{

   
  //  
  let data = req.body.text;
  //  
  let filepath = 'public/images/uploads/'+'file-'+Date.now()+'.txt';
  let filename = 'file-'+Date.now()+'.txt';

  console.log("fccc");
  console.log(importantMethods.currentUser(req));

  user_promise = importantMethods.currentUser(req);
  user_promise.then(function(user){
    console.log("xxxxxxxxxxxxxxxxxxxxxxx");
    console.log(user);

    fs.writeFile(filepath, data, function(err, data){
      if (err){
        throw err;
      }  

      models.Attachment.create({
        user_id: user.id,
        original_file_name: filename,   // file name given by customer
        file_name: filename            // filename of file created by code to store data
      }).then(function(created_attachment){
        console.log("new attachment");
        console.log(created_attachment);
        res.status("200");
        res.send("your text is saved");
      });
     
    });

  })

});


// (Completed) Load a file from front end and display in front end text area . dont save any file at backend(save and delete it immediately)
AttachmentRoutes.post('/loadFile',upload.single('file'),(req,res,next)=>{
  //  
   
  var filepath = 'public/images/uploads/'+req.file.filename;
   
  let data =  fs.readFileSync(filepath);
  fs.unlink(filepath, (err) => {
    if (err) throw err;
     
  });
  // res.send("fileuploaded   at public/images/uploads/" + req.file.filename+"   original name="+req.file.originalname+"   data="+data);
  res.send(data);
});





module.exports = {"AttachmentRoutes" : AttachmentRoutes};