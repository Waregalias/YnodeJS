'use strict';
const express = require("express");
const app     = express();
const http    = require('http').Server(app);
const multer  = require('multer');
const path    = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload');
  },
  filename: function (req, file, callback) {
    console.log('-------');
    console.log(file);
    console.log('-------');
    callback(null, file.originalname);
  }
});
let upload = multer({ storage : storage}).single('download_file');

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.get('/',function(req,res){
      res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(path.join(__dirname, 'views')));

app.listen(3000,function(){
    console.log("Working on port 3000");
});
