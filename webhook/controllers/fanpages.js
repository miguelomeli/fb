'use strict'
 
var mongoosePaginate = require('mongoose-pagination');
var FanPages = require('../models/fanpages');
var Bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');




function getFanpage(req , res){
	var params = req.body;
	var Id = req.params.id;
	if(Id != null){
		FanPages.findById(Id , (err , regFind) => {
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




function getFanpages(req , res){
	var params = req.body;
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}
	var itemsPerPage = 3;
	FanPages.find({id_user:req.user.sub}).sort('name').paginate(page , itemsPerPage ,  function(err , regs , total){
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




function getFanpagesGroup(req , res){
	var params = req.body;
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}
	var group = req.params.group;
	var itemsPerPage = 3;
	FanPages.find({id_user:req.user.sub , id_group:group}).sort('name').paginate(page , itemsPerPage ,  function(err , regs , total){
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





function saveFanPage(req , res){
	var fanpages = new FanPages();
	var params = req.body;
	fanpages.id_user = req.user.sub;
	if(params.id_group){
		fanpages.id_group = params.id_group;
	} else {
		fanpages.id_group = null;
	}
	fanpages.uuid = params.uuid;
	fanpages.token = params.token;
	fanpages.user = params.user;
	fanpages.name = params.name;
	if(fanpages.id_user != null || fanpages.uuid != null || fanpages.token != null || fanpages.user != null || fanpages.name != null){
    	FanPages.findOne({id_user:fanpages.id_user , id_group:fanpages.id_group , uuid:fanpages.uuid} , (err , regFind) => {
    		if(err){
    			res.status(200).send({error:true , msg:'Ocurrio un error'});
    		} else {
    			if(!regFind){
			    	fanpages.save((err , regStored) => {
			    		if(err){
			    			console.log(err);
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







function updateFanPage(req , res){
	var params = req.body;
	var regId = req.params.id;
	var token = params.token;
	var status = (params.status);
	if(params.token != null || params.status != null){
		var updateData = {token:token , status:status};
		if(params.id_group){
			var updateData = {token:token , status:status , id_group:params.id_group};
		} else {
			var updateData = {token:token , status:status};
		}
		FanPages.findByIdAndUpdate(regId , updateData , (err , regUpdate) => {
			if(err){
				res.status(200).send({error:true , msg:'Error al actualizar el registro'});
			} else {
				if(!regUpdate){
					res.status(200).send({error:true , msg:'No se ha podido actualizar el registro'});
				} else {
					regUpdate.token = token;
					regUpdate.status = status;
					if(params.id_group){
						regUpdate.id_group = params.id_group;
					}
					res.status(200).send({error:false , data:regUpdate});
				}
			}
		});
	} else {
		res.status(200).send({error:true , msg:'Introduce los campos'});
	}
}





function deleteFanPage(req , res){
	var params = req.body;
	var regId = req.params.id;
	FanPages.findByIdAndRemove(regId , (err , regDelete) => {
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
	getFanpages,
	getFanpagesGroup,
	getFanpage,
	updateFanPage,
	deleteFanPage,
	saveFanPage
};