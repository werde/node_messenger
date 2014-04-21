var User = require('../models/user').User;
//var HttpError = require('error').HttpError;
//var AuthError = require('models/user').AuthError;
var async = require('async');


exports.get = function(req, res) {
	console.log("koko");
	res.render('login');
};

exports.post = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	console.log("koko  " + req.body.username);
	console.log("koko  " + req.body.password);

	User.authorize(username, password, function(err, user){
		if (err) {
			return res.redirect('/error');
		}
		req.session.user = user._id;
		console.log(req.session.user)
		res.send({});
	});
};