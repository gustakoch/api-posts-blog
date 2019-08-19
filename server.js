const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const routes = require('./routes');
const port = process.env.PORT || 5000;

const app = express();

mongoose.connect('mongodb+srv://instagram:HcWmhyNpgh4ZbODY@cluster0-whyx0.mongodb.net/instagram?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.use(morgan('dev'));
app.use(morgan('common', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, console.log('Server is running ...'));
