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
  let user_give_filename = req.body.filename + ".txt";
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
        original_file_name: user_give_filename,   // file name given by customer
        file_name: filename            // filename of file created by code to store data
      },{
        include: [{
          model: models.User,
          as: 'user'
        }]
      }).then(function(created_attachment){
        console.log("new attachment");
        console.log(created_attachment);
        console.log("now attachment's user");
        console.log(created_attachment.user);
        attachments_promise = models.Attachment.findAll({
          where: {
            user_id: user.id
          },
          include: [{
            model: models.User,
            as: 'user'
        }] 
        });
        attachments_promise.then(function(atts){
          console.log("atts");
          // console.log(atts);
          console.log("first user");
          console.log(atts[0].user);
        });
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

AttachmentRoutes.get('/files',function(req,res){
  user_promise = importantMethods.currentUser(req);
  user_promise.then(function(user){
    console.log("xxxxxxxxxxxxxxxxxxxxxxx");
    console.log(user);
    attachments_promise = models.Attachment.findAll({
      where: {
        user_id: user.id
      }
    });
    attachments_promise.then(function(attachments){
      // res.send(attachments);
      res.render('attachments/index',{files: attachments});
    });
    // res.send(user);
  });
});


AttachmentRoutes.post('/filecontent',function(req,res){
  original_filename = req.body.filename;
  user_promise = importantMethods.currentUser(req);
  user_promise.then(function(user){
    console.log("xxxxxxxxxxxxxxxxxxxxxxx");
    console.log(user);
    attachments_promise = models.Attachment.findAll({
      where: {
        original_file_name: original_filename
      }
    });
    attachments_promise.then(function(attachments){
      // res.send(attachments);
      var filename = attachments[0].file_name;
      let filepath = 'public/images/uploads/'+filename;
      let content = "";
      console.log("sasukeeeeeeeeeeeeeeeeee");
      console.log(attachments);
      console.log("hinataaaaaaaaaaaaaaa");
      console.log(filepath);
      fs.readFile(filepath, 'utf8', function(err, contents) {
        content = content + contents;
        console.log("narupoooooooooooooooooooo");
        console.log(contents);
        res.send(contents);
      });
      // res.render('attachments/index',{files: attachments});
    });
    // res.send(user);
  });
  

});




module.exports = {"AttachmentRoutes" : AttachmentRoutes};