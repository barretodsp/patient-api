
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

var cors = require('cors')
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/api/v1', (req, res) => {
  res.send('Setup Completed! ')
})

//server up
app.listen(process.env.PORT, function () {
  console.log('Listening on port 4000!');
});

module.exports = app;
