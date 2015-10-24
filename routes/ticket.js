var ticket	= require('../config/models/ticket');

module.exports = function(app, ensureAuth, ensureAdmin) {

	app.get('/home', ensureAuth, function(req, res) {
		res.render('home');
	});

	app.post('/home/ticket', ensureAuth, function(req, res) {
		var newTicket =	new ticket;

		newTicket.ticket_id = req.user._id;
		newTicket.subject 	= req.body.subject;
		newTicket.name		= req.body.name;
		newTicket.content 	= req.body.content;
		newTicket.category	= req.body.category;

		newTicket.save(function(err) {
			if (err) res.send({success: false});
			console.log("Ticket registered");
			ticket.find({ticket_id: req.user._id}, function(err, ticket_data){
				res.send({success: true, user_ticket: ticket_data});
			});
		});
	});

};