'use strict'
 
var User = require('../models/users');
var Bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');



function saveUser(req , res){
	var user = new User();
	var params = req.body;
	user.uuid = params.uuid;
	user.token = params.token;
	user.user = params.user;
	user.name = params.name;
	user.lastname = params.lastname;
	user.email = params.email;
	if(user.uuid != null || user.token != null || user.user != null){
		Bcrypt.hash(user.uuid , null , null , function(err , hash){
			if(err){
				res.status(200).send({error:true , msg:'Ocurrio un error'});
			} else {
				user.uuidp = hash;
		    	User.findOne({uuid:user.uuid} , (err , userFind) => {
		    		if(err){
		    			res.status(200).send({error:true , msg:'Ocurrio un error'});
		    		} else {
		    			if(!userFind){
					    	user.save((err , userStored) => {
					    		if(err){
					    			console.log(err);
					    			res.status(200).send({error:true , msg:'Error al guardar el usuario'});
					    		} else {
					    			if(!userStored){
					    				res.status(200).send({error:true , msg:'No se guardo el registro'});
					    			} else {
					    				res.status(200).send({error:false , data:userStored});
					    			}
					    		}
					    	});
		    			} else {
		    				res.status(200).send({error:true , msg:'El usuario ya existe'});
		    			}
		    		}
		    	});
			}
		});
	} else {
		res.status(200).send({error:true , msg:'Introduce los campos'});
	}
}




function loginUser(req , res){
	var params = req.body;
	var token = params.token;
	var uuidp = params.uuidp;
	User.findOne({uuidp:uuidp} , (err , userFind) => {
		if(err){
			res.status(200).send({error:true , msg:'Introduce los campos'});
		} else {
			if(!userFind){
				res.status(200).send({error:true , msg:'El usuario no existe'});
			} else {
				if(params.getHash){
					var tokenJwt = jwt.createToken(userFind);
					res.status(200).send({error:false , data:userFind , token:tokenJwt});
				} else {
					res.status(200).send({error:false , data:userFind});
				}
			}
		}
	});
}


function updateUser(req , res){
	var params = req.body;
	var userId = req.params.id;
	var status = params.status;
	if(req.user.role == 'ROLE_USER'){
		return res.status(403).send({error:true , msg:'No tienes acceso'});
	}
	if(status != null || role != null){
		User.findByIdAndUpdate(userId , {status:status} , (err , userUpdate) => {
			if(err){
				res.status(200).send({error:true , msg:'Error al actualizar el usuario'});
			} else {
				if(!userUpdate){
					res.status(200).send({error:true , msg:'No se ha podido actualizar el usuario'});
				} else {
					userUpdate.status = status;
					res.status(200).send({error:false , data:userUpdate});
				}
			}
		});
	} else {
		res.status(200).send({error:true , msg:'Introduce los campos'});
	}
}




function getUser(req , res){
	var params = req.body;
	var userId = req.params.id;
	var getHash = req.params.getHash;
	if(req.user.role == 'ROLE_USER'){
		return res.status(403).send({error:true , msg:'No tienes acceso'});
	}
	if(userId != null){
		User.findById(userId , (err , userFind) => {
			if(err){
				res.status(200).send({error:true , msg:'Error al buscar el usuario'});
			} else {
				if(userFind){
					if(getHash){
						var tokenJwt = jwt.createToken(userFind);
						res.status(200).send({error:false , data:userFind , token:tokenJwt});
					} else {
						res.status(200).send({error:false , data:userFind});
					}
				} else {
					res.status(200).send({error:true , msg:'No se ha podido encontrar al usuario'});
				}
			}
		});
	} else {
		res.status(200).send({error:true , msg:'Manda el id del usuario'});
	}
}





module.exports = {
	saveUser,
	loginUser,
	updateUser,
	getUser
};