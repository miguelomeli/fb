'use strict'
 
var mongoosePaginate = require('mongoose-pagination');
var UsersFB = require('../models/usersfb');
var FanPages = require('../models/fanpages');
var Bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');




function getUsersFB(req , res){
	var params = req.body;
	var Id = req.params.id;
	if(Id != null){
		UsersFB.findById(Id , (err , regFind) => {
			if(err){
				res.status(200).send({error:true , msg:'Error al buscar el registro'});
			} else {
				if(regFind){
					res.status(200).send({error:false , data:regFind});
				} else {
					res.status(200).send({error:true , msg:'No se ha podido encontrar al registro'});
				}
			}
		});
	} else {
		res.status(200).send({error:true , msg:'Manda el id'});
	}
}



function getUsersFBs(req , res){
	var params = req.body;
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}
	var Id = req.params.id;
	var itemsPerPage = 3;
	UsersFB.find({id_fanpage:Id}).sort('name').paginate(page , itemsPerPage ,  function(err , regs , total){
		if(err){
			res.status(200).send({error:true , msg:'Error al listar los registros'});
		} else {
			if(regs){
				res.status(200).send({error:false , total:total , data:regs});
			} else {
				return res.status(200).send({error:true , msg:'No se encontraron registros'});
			}
		}
	});
}





function saveUsersFB(req , res){
	var usersfb = new UsersFB();
	var params = req.body;
	usersfb.id_fanpage = params.id_fanpage;
	if(params.uuid_1){ usersfb.uuid_1 = params.uuid_1; }
	if(params.uuid_2){ usersfb.uuid_2 = params.uuid_2; }
	if(params.uuid_3){ usersfb.uuid_3 = params.uuid_3; }
	if(params.uuid_4){ usersfb.uuid_4 = params.uuid_4; }
	if(params.uuid_5){ usersfb.uuid_5 = params.uuid_5; }
	if(params.user_ref){ usersfb.user_ref = params.user_ref; }
	if(params.first_name){ usersfb.first_name = params.first_name; }
	if(params.last_name){ usersfb.last_name = params.last_name; }
	if(params.profile_pic){ usersfb.profile_pic = params.profile_pic; }
	if(params.locale){ usersfb.locale = params.locale; }
	if(params.timezone){ usersfb.timezone = params.timezone; }
	if(params.checkbox){ usersfb.checkbox = params.checkbox; }
	if(params.status_answer){ usersfb.status_answer = params.status_answer; }
	if(params.status){ usersfb.status = params.status; }
	if(params.id_fanpage != null){
    	FanPages.findOne({uuid:params.id_fanpage} , (err , regFind) => {
    		if(err){
    			res.status(200).send({error:true , msg:'Ocurrio un error'});
    		} else {
    			if(!regFind){
			    	res.status(200).send({error:true , msg:'No existe la fanpage'});
    			} else {
    				usersfb.id_fanpage = regFind._id;
    				UsersFB.findOne({user_ref:params.user_ref} , (err , regFind) => {
    					if(err){
    						res.status(200).send({error:true , msg:'Ocurrio un error'});
    					} else {
    						if(!regFind){
    							usersfb.save((err , regStored) => {
    								if(err){
    									res.status(200).send({error:true , msg:'Ocurrio un error'});
    								} else {
										if(!regStored){
						    				res.status(200).send({error:true , msg:'No se guardo el registro'});
						    			} else {
						    				res.status(200).send({error:false , data:regStored});
						    			}
    								}
    							});
    						} else {
    							res.status(200).send({error:true , msg:'Existe el usuario'});
    						}
    					}
    				});
    			}
    		}
    	});
	} else {
		res.status(200).send({error:true , msg:'Introduce los campos'});
	}
}








function updateUsersFB(req , res){
	var params = req.body;
	var regId = req.params.id;
	var updateData = {};
	if(params.uuid_1){ updateData.uuid_1 = params.uuid_1; }
	if(params.uuid_2){ updateData.uuid_2 = params.uuid_2; }
	if(params.uuid_3){ updateData.uuid_3 = params.uuid_3; }
	if(params.uuid_4){ updateData.uuid_4 = params.uuid_4; }
	if(params.uuid_5){ updateData.uuid_5 = params.uuid_5; }
	if(params.first_name){ updateData.first_name = params.first_name; }
	if(params.last_name){ updateData.last_name = params.last_name; }
	if(params.profile_pic){ updateData.profile_pic = params.profile_pic; }
	if(params.locale){ updateData.locale = params.locale; }
	if(params.timezone){ updateData.timezone = params.timezone; }
	if(params.checkbox){ updateData.checkbox = params.checkbox; }
	if(params.status_answer){ updateData.status_answer = params.status_answer; }
	if(params.status){ updateData.status = params.status; }
	if(req.params.id != null){
		UsersFB.findByIdAndUpdate(regId , updateData , (err , regUpdate) => {
			if(err){
				res.status(200).send({error:true , msg:'Error al actualizar el registro'});
			} else {
				if(!regUpdate){
					res.status(200).send({error:true , msg:'No se ha podido actualizar el registro'});
				} else {
					if(params.uuid_1){ regUpdate.uuid_1 = params.uuid_1; }
					if(params.uuid_2){ regUpdate.uuid_2 = params.uuid_2; }
					if(params.uuid_3){ regUpdate.uuid_3 = params.uuid_3; }
					if(params.uuid_4){ regUpdate.uuid_4 = params.uuid_4; }
					if(params.uuid_5){ regUpdate.uuid_5 = params.uuid_5; }
					if(params.first_name){ regUpdate.first_name = params.first_name; }
					if(params.last_name){ regUpdate.last_name = params.last_name; }
					if(params.profile_pic){ regUpdate.profile_pic = params.profile_pic; }
					if(params.locale){ regUpdate.locale = params.locale; }
					if(params.timezone){ regUpdate.timezone = params.timezone; }
					if(params.checkbox){ regUpdate.checkbox = params.checkbox; }
					if(params.status_answer){ regUpdate.status_answer = params.status_answer; }
					if(params.status){ regUpdate.status = params.status; }
					res.status(200).send({error:false , data:regUpdate});
				}
			}
		});
	} else {
		res.status(200).send({error:true , msg:'Introduce los campos'});
	}
}





function deleteUsersFB(req , res){
	var params = req.body;
	var regId = req.params.id;
	UsersFB.findByIdAndRemove(regId , (err , regDelete) => {
		if(err){
			res.status(200).send({error:true , msg:'Error al eliminar el registro'});
		} else {
			if(!regDelete){
				res.status(200).send({error:true , msg:'No se ha podido eliminar el registro'});
			} else {
				res.status(200).send({error:false , msg:'Se elimino el registro correctamente'});
			}
		}
	});
}









module.exports = {
	getUsersFBs,
	getUsersFB,
	updateUsersFB,
	deleteUsersFB,
	saveUsersFB
};