var crypto = require("crypto");
var async = require('async');

var mongoose = require("../lib/mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name : {
		type : String,
		unique : true,
		required : true
	},
	ava : {
		type: String,
	},
	hashedPwd : {
		type : String,
		required : true
	},
	salt : {
		type : String,
		required : true
	},
	key : {
		type : String,
		required : true
	}
});

userSchema.methods.encPwd = function(pwd) {
	return crypto.createHmac('sha1', this.salt).update(pwd).digest('hex');
}

userSchema.methods.checkPassword = function(password) {
	console.log(" " + this.encPwd(password) + "__" + this.hashedPwd);
	return this.encPwd(password) === this.hashedPwd;
}

userSchema.virtual('pwd').set( function(pwd){
	this._plainPwd = pwd;
	this.salt = Math.random() + '';
	this.key = "FFFFFFFFFFFFFF";
	this.hashedPwd = this.encPwd(pwd);
}).get(function(){
	return this._plainPwd;
})

userSchema.statics.authorize = function(username, password, callback) {
	var User = this;

	async.waterfall([
		function(callback) {
			console.log("first cb")
			User.findOne({name: username}, callback);
		},
		function(user, callback) {
			if (user) {
				if (user.checkPassword(password)) {
					console.log("calling cb null, user #1")
					callback(null, user)
				} else {
					console.log("error")
					callback(new Error)
				}
			} else {
				console.log("new user")
				var user = new User({name: username, pwd: password});
				user.save(function(err){
					console.log("error?")
					if(err) {
						console.log(err);
						callback(err);
						return
					}
					console.log("calling cb null, user")

					callback(null, user); 
				});
			}
		}
	], callback)
}

exports.User = mongoose.model('User', userSchema);