const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


var app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', function (req, res) {
  res.send('hello app refactored!');
})


module.exports = app;