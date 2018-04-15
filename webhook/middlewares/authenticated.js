'use strict'
 
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'MiguelLomeli';



exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({error:true , msg:'La petición no tiene la cabecera de autenticación'});
	}
	var token = req.headers.authorization.replace(/['"]+/g, '');
	try{
		var payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			return res.status(403).send({error:true , msg:'El token ha expirado'});
		}
	}catch(ex){
		return res.status(403).send({error:true , msg:'El token no es válido'});
	}
	req.user = payload;
	next();
};