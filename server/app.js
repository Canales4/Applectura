var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require("cors")
var bodyParser = require("body-parser")

var HomeRouter = require('./routes/HomeRouter');
var LoginRouter = require('./routes/LoginRouter');
var BooksRouter = require('./routes/BooksRouter');
var ProfileRouter = require('./routes/ProfileRouter');
var ClubRouter = require('./routes/ClubRouter');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/home', HomeRouter);
app.use('/books', BooksRouter);
app.use('/profile', ProfileRouter);
app.use('/loginPage', LoginRouter);
app.use('/club', ClubRouter);

module.exports = app;
