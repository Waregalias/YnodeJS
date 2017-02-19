'use strict';
const express = require('express');
const app  = express();
const http = require('http').Server(app);
const path = require('path');
const io   = require('socket.io')(http);
const router  = express.Router();

let port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let messagesList = [];

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/messages', function (req, res) {
  res.end(JSON.stringify(messagesList));
});

app.post('/messages', function (req, res) {
  messagesList.push(req.body.params);
  res.end(JSON.stringify(messagesList));
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use(express.static(path.join(__dirname, 'views')));

http.listen(port, () => {
  console.log('\nTP3 listening at 127.0.0.1:', port);
});
