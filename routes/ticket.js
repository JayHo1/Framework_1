var ticket	= require('../config/models/ticket');
var answer	= require('../config/models/answer');

module.exports = function(app, ensureAuth, ensureAdmin) {

	app.get('/home', ensureAuth, function(req, res) {
		if (req.isAuthenticated() && !req.user.user_permissions.admin){
			ticket.find({ticket_id: req.user._id}, function(err, ticket_data){
				res.render('home', {ticket: ticket_data, user: req.user});
			});
		}
		else {
			ticket.find(function(err, ticket_datas){
				if (err) throw err;
				res.render('home', {ticket: ticket_datas, user: req.user});
			});
		}
	});

	app.post('/home', ensureAuth, function(req, res) {
		var newTicket =	new ticket;

		newTicket.ticket_id = req.user._id;
		newTicket.subject 	= req.body.subject;
		newTicket.name		= req.body.name;
		newTicket.content 	= req.body.content;
		newTicket.category	= req.body.category;

		newTicket.save(function(err) {
			if (err) res.send({success: false});
			console.log("Ticket registered");
			res.send({success: true});
		});
	});

	app.post('/home/ticket/remove', function(req, res) {
		ticket.remove({ _id: req.body._id}, function(err) {
			answer.remove({rep_id: req.body._id}, function(err) {
				if (err) res.send({success: false});
				console.log("Remove done!");
				res.send({success: true});
			});
		});
	});

	app.post('/home/ticket/lock', function(req, res) {
		ticket.findOne({ _id: req.body._id}, function(err, data){
			console.log(data);
			if (data.status == 'Being solved') {
				ticket.update({ _id: req.body._id}, { $set: { status: 'close'}}, function(err){
					if (err) throw err;
					console.log("Ticket close !");
					res.send({close: true, message: "Ticket close !", _id: req.body._id});
				});
			}
			else {
				ticket.update({ _id: req.body._id}, { $set: { status: 'Being solved'}}, function(err){
					if (err) throw err;
					console.log("Ticket open !");
					res.send({close: false, message: "Ticket open !", _id: req.body._id});
				});
			}
		});
	});

	app.get('/home/ticket/:ticketId', ensureAuth, function(req, res) {
		ticket.findOne({ _id: req.params.ticketId }, function(err, ticket_data){
			if ((req.user._id == ticket_data.ticket_id) || req.user.user_permissions.admin) {
				answer.findOne({ rep_id: req.params.ticketId}, function(err, answer_data){
					if (answer_data)
					{
						res.render('ticket', { 
							ticketData: ticket_data,
							answerData: answer_data,
							tickets: answer_data.rep
						});
					}
					else
						res.render('ticket', { 
							ticketData: ticket_data, 
							answerData: false,
						});
				});
			}
			else
				res.send(404, "ERROR SOMEWHERE!");
		});
	});

	app.post('/home/ticket', function(req, res) {
		answer.findOne({ rep_id: req.body.ans_id }, function(err, data) {
			if (err) res.send({success: false});
			if (!data)
			{
				var newAnswer = new answer;
				newAnswer.rep_id = req.body.ans_id;
				newAnswer.rep.push({rep_user: req.user.user_info.username, rep_message: req.body.content});

				newAnswer.save(function(err) {
					if(err) res.send({success: false});
					console.log("Answer registered");
					res.send({success: true});
				})
			}
			else
			{
				answer.update(
					{ rep_id: req.body.ans_id },
					{ $push:  { rep: { rep_user: req.user.user_info.username, rep_message: req.body.content }}},
					function(err) {
						if (err)
							console.log("SAVE FALSE");
						else
						{
							console.log("SAVE SUCCESS");
							res.send({success: true});
						}
				});
			}
		})
	});

};