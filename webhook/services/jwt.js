'use strict'
 
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'MiguelLomeli';



exports.createToken = function(user){
	try{
		var payload = {
			sub: user._id,
			uuid: user.uuid,
			token: user.token,
			user: user.user,
			name: user.name,
			role: user.role,
			iat: moment().unix(),
			exp: moment().add(30 , 'days').unix
		};
		return jwt.encode(payload , secret);
	} catch(err){
		return null;
	}
};
