var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multer = require('multer');
var fs = require('fs');
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

// (Completed) show at front end contents of file uploaded 
AttachmentRoutes.post('/fileUpload',upload.single('file'),(req,res,next)=>{
  res.send("fileuploaded   at public/images/uploads/" + req.file.filename+"   original name="+req.file.originalname);
});



// Save a text to a file which is entered at frontend
AttachmentRoutes.post('/saveFile',(req,res)=>{
  console.log(req.body);
  let data = req.body.text;
  console.log("fcckk   " + data);
  let filename = 'public/images/uploads/'+'file-'+Date.now()+'.txt';

  fs.writeFile(filename, data, function(err, data){
    if (err) console.log(err);
    console.log("Successfully Written to File.");
    res.status("200");
    res.send("your text is saved");
  });

});


// (Completed) Load a file from front end and display in front end text area . dont save any file at backend(save and delete it immediately)
AttachmentRoutes.post('/loadFile',upload.single('file'),(req,res,next)=>{
  console.log(req.body);
  console.log("asldjaljsdf "+req.file);
  var filepath = 'public/images/uploads/'+req.file.filename;
  console.log("narutoooooooooooo "+filepath);
  let data =  fs.readFileSync(filepath);
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log('file '+ filepath + ' was deleted');
  });
  // res.send("fileuploaded   at public/images/uploads/" + req.file.filename+"   original name="+req.file.originalname+"   data="+data);
  res.send(data);
});





module.exports = {"AttachmentRoutes" : AttachmentRoutes};