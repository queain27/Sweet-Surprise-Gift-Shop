var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	Fname: String,
	phoneNum: String,
	password: String,
	passwordConf: String,
	
}),
User = mongoose.model('user', userSchema);

module.exports = User;