require('./api/data/dbconnection.js').open()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./api/routes')
const port = 3000

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/services', routes);


 server = app.listen(port);
