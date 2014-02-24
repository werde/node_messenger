var crypto = require("crypto");

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

userSchema.virtual('pwd').set( function(pwd){
	this._plainPwd = pwd;
	this.salt = Math.random() + '';
	this.key = "FFFFFFFFFFFFFF";
	this.hashedPwd = this.encPwd(pwd);
}).get(function(){
	return this._plainPwd;
})

exports.User = mongoose.model('User', userSchema);