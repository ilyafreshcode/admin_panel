var express = require('express');
var app = express();
var session  = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require("passport");
var exphbs  = require('express-handlebars');
var cookieParser = require('cookie-parser');



app.engine('hbs', exphbs({extname: "hbs", defaultLayout: 'default', layoutsDir: __dirname + '/content/layout/'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'content'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'content')));

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});


app.use(session({
    secret: 'alwaysrunning',
    resave: true,
    saveUninitialized: true
} ));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

require('./app/passport.js')(passport);
require('./app/routers.js')(app, passport);