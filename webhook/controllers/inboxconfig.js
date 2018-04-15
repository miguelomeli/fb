'use strict'
 
var mongoosePaginate = require('mongoose-pagination');
var Inbox = require('../models/inboxconfig');
var Bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');




function getInbox(req , res){
	var params = req.body;
	var Id = req.params.id;
	if(Id != null){
		Inbox.findById(Id , (err , regFind) => {
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



function getInboxs(req , res){
	var params = req.body;
	var id_inbox = req.params.id_inbox;
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}
	var itemsPerPage = 3;
	Inbox.find({id_inbox:id_inbox}).sort('name').paginate(page , itemsPerPage ,  function(err , regs , total){
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






function saveInbox(req , res){
	var inbox = new Inbox();
	var params = req.body;
	inbox.id_inbox = params.id_inbox;
	inbox.type = parseInt(params.type);
	inbox.include = params.include;
	inbox.exclude = params.exclude;
	if(inbox.id_inbox != null){
    	Inbox.findOne({include:inbox.include , exclude:inbox.exclude} , (err , regFind) => {
    		if(err){
    			res.status(200).send({error:true , msg:'Ocurrio un error'});
    		} else {
    			if(!regFind){
			    	inbox.save((err , regStored) => {
			    		if(err){
			    			res.status(200).send({error:true , msg:'Error al guardar el registro'});
			    		} else {
			    			if(!regStored){
			    				res.status(200).send({error:true , msg:'No se guardo el registro'});
			    			} else {
			    				res.status(200).send({error:false , data:regStored});
			    			}
			    		}
			    	});
    			} else {
    				res.status(200).send({error:true , msg:'El registro ya existe'});
    			}
    		}
    	});
	} else {
		res.status(200).send({error:true , msg:'Introduce los campos'});
	}
}






function updateInbox(req , res){
	var params = req.body;
	var regId = req.params.id;
	var status = (params.status);
	var type = parseInt(params.type);
	var include = params.include;
	var exclude = params.exclude;
	if(params.status != null){
		Inbox.findByIdAndUpdate(regId , {type:type , include:include , exclude:exclude , status:status} , (err , regUpdate) => {
			if(err){
				res.status(200).send({error:true , msg:'Error al actualizar el registro'});
			} else {
				if(!regUpdate){
					res.status(200).send({error:true , msg:'No se ha podido actualizar el registro'});
				} else {
					regUpdate.status = status;
					regUpdate.type = type;
					regUpdate.include = include;
					regUpdate.exclude = exclude;
					res.status(200).send({error:false , data:regUpdate});
				}
			}
		});
	} else {
		res.status(200).send({error:true , msg:'Introduce los campos'});
	}
}





function deleteInbox(req , res){
	var params = req.body;
	var regId = req.params.id;
	Inbox.findByIdAndRemove(regId , (err , regDelete) => {
		if(err){
			res.status(200).send({error:true , msg:'Error al elimino el registro'});
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
	getInboxs,
	getInbox,
	updateInbox,
	deleteInbox,
	saveInbox
};