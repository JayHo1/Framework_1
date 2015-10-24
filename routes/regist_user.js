// User Register

module.exports = function(app, passport) {

	app.get('/', function(req, res){
		if(req.isAuthenticated())
			res.redirect('/home');
		else
			res.render('index', { message: req.flash('message')});
	});

	app.post('/', function(req, res, next){
		passport.authenticate('sign-up', function(err, user){
		if(err) {
			return next(err);
		}
		if (!user) {
			return res.send({success: false, message: 'signup failed'});
		}
		req.logIn(user, function(err) {
			if (err) return next(err);
			return res.send({success: true, message: 'signup success'});
		})
		})(req, res, next);
	});

	app.post('/login', function(req, res, next){
		passport.authenticate('login', function(err, user, info){
			if(err) {
			return next(err);
			}
			if (!user) {
				return res.send({success: false, message: 'signup failed'});
			}
			req.logIn(user, function(err) {
				if (err) return next(err);
				return res.send({success: true, message: 'signup success'});
			})
		})(req, res, next);
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
}