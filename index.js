
const result = require('dotenv').config()
if (result.error) {
  throw result.error
}
console.log(result.parsed);

const express = require('express');
const bodyParser = require('body-parser');

//express config
const app = express();
const router = express.Router();
const routes = require('./routes/index.js');

// ************** CORS
var cors = require('cors')
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api/v1', routes(router));

//server up
app.listen(process.env.PORT, function () {
  console.log('Listening on port 4000!');
  console.log('ENV', process.env.NODE_ENV)
});

module.exports = app;
