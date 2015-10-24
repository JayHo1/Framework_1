var ticket	= require('../config/models/ticket');

module.exports = function(app, ensureAuth, ensureAdmin) {

	app.get('/home', ensureAuth, function(req, res) {
		res.render('home', {message: req.user});
	});

	app.post('/home/ticket', ensureAuth, function(req, res) {
		console.log(req.body.content);
		console.log(req.user._id);
		var newTicket =	new ticket;

		newTicket.ticket_id = req.user._id;
		newTicket.subject 	= req.body.subject;
		newTicket.name		= req.body.name;
		newTicket.content 	= req.body.content;
		newTicket.category	= req.body.category;

		newTicket.save(function(err) {
			if (err) throw err;
			console.log("Ticket registered");
		});
	});

};