
//***=================   SETUP   =================***//

var express 		= require('express');
	app 			= express();
	http 			= require('http');
	morgan 			= require('morgan');
	path 			= require('path');
	bodyParser		= require('body-parser');
	mongoose		= require('mongoose');
	cookieParser	= require('cookie-parser');
	flash			= require('connect-flash');
	ensureAuth 		= require('./routes/auth').ensureAuthenticated;
	ensureAdmin		= require('./routes/auth').ensureAdminAuthenticated;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());              


//***=================   AUTHENTICATION   =================***//

var passport 		= require('passport');
var eSession		= require('express-session');


app.use(eSession({ 
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

//***=================   DATABASE  =================***//

var connect 	= mongoose.createConnection('mongodb://localhost/user_data');
var connect2 	= mongoose.createConnection('mongodb://localhost/ticket');
var connect3	= mongoose.createConnection('mongodb://localhost/ticket_answer');
var connect4	= mongoose.createConnection('mongodb://localhost/forum');
var connect5 	= mongoose.createConnection('mongodb://localhost/topic');
var connect6	= mongoose.createConnection('mongodb://localhost/replysub');

require('./config/models/users')(connect);
require('./config/models/ticket')(connect2);
require('./config/models/answer')(connect3);
require('./config/models/forum_ctg')(connect4);
require('./config/models/topic')(connect5);
require('./config/models/replyTopic')(connect6);

require('./config/models/crypt');

//***=================   ROUTES MIDDLEWARES  =================***//

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use('/home/ticket', express.static(__dirname + '/public'));
app.use('/forum/thread', express.static(__dirname + '/public'));


require('./config/passport/passport')(passport);
require('./routes/regist_user')(app, passport);
require('./routes/ticket')(app, ensureAuth, ensureAdmin);
require('./routes/forum')(app, ensureAuth, ensureAdmin);



//***=================   SERVER HTTPS  =================***//


//***=================   PORT   =================***//

var port = process.env.PORT || 3000

http.createServer(app).listen(port, function() {
	console.log('http://127.0.0.1:' + port + '/');
});

//***=================   DEBUG   =================***//

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('404');
});