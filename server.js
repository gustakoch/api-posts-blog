const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const port = process.ENV.PORT || 4444

const app = express();

mongoose.connect('mongodb+srv://instagram:HcWmhyNpgh4ZbODY@cluster0-whyx0.mongodb.net/instagram?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, console.log('Server is running...'));
