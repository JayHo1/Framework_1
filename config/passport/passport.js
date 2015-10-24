
var localStrategy 	= require('passport-local').Strategy;
var hashing			= require('../models/crypt');
var User 			= require('../models/users');

module.exports = function(passport) {

	//***=================   SIGN UP   =================***//

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			if (err) throw err;
			done(err, user);
		});
	});

	passport.use('sign-up', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true,
	},
		function(req, userid, password, done) {
			User.findOne({ 'user_info.username': userid }, function(err, user) {
				if (err) { return done(err); };
				if (user) {
					return done(null, false, req.flash('message', 'That username is already taken.'));
				}
				else {

					var newUser = new User();

					newUser.user_info.username 	= userid;
					newUser.user_info.password 	= hashing.generateHash(password);
					newUser.user_info.email		= req.body.email;
					newUser.user_info.firstname = req.body.firstname;
					newUser.user_info.lastname 	= req.body.lastname;
					
					newUser.save(function(err) {
						if (err) throw err;
						console.log("User registered");
						return done(null, newUser);
					});
				}
			});
		})
	)

	//***=================   LOG IN   =================***//

	passport.use('login', new localStrategy({

		usernameField: 'login',
		passwordField: 'password',

	},
		function(username, password, done) {
			User.findOne({ 'user_info.username': username }, function(err, user){
				if (err)
					return done(err);
				if (!user)
					return done(null, false);
				var userPass = user.user_info.password;
				if (!hashing.validPassword(password, userPass))
					return done(null, false);
				return done(null, user);
			});
		}
	));



};