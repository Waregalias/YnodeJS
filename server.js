'use strict';
const express       = require('express');
const app           = express();
const http          = require('http').Server(app);
const path          = require('path');
const router        = express.Router();

let port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var AnnuaireList = [];

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/users', function (req, res) {
  res.end(JSON.stringify(AnnuaireList));
});

app.post('/users', function (req, res) {
  AnnuaireList.push(req.body.params);
  res.end(JSON.stringify(AnnuaireList));
});

app.delete('/users/', function (req, res) {
  AnnuaireList.splice(req.query.key, 1);
  res.end(JSON.stringify(AnnuaireList));
});

app.use(express.static(path.join(__dirname, 'views')));

http.listen(port, () => {
  console.log('\nTP1 listening at 127.0.0.1:', port);
});
