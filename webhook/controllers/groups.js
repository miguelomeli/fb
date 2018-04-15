'use strict'
 
var mongoosePaginate = require('mongoose-pagination');
var Groups = require('../models/groups');
var Bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');




function getGroup(req , res){
	var params = req.body;
	var Id = req.params.id;
	if(Id != null){
		Groups.findById(Id , (err , regFind) => {
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



function getGroups(req , res){
	var params = req.body;
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}
	var itemsPerPage = 3;
	Groups.find({id_user:req.user.sub}).sort('name').paginate(page , itemsPerPage ,  function(err , regs , total){
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






function saveGroup(req , res){
	var group = new Groups();
	var params = req.body;
	group.id_user = req.user.sub;
	group.name = params.name;
	group.status = params.status;
	if(group.id_user != null || group.name != null || group.status != null){
    	Groups.findOne({id_user:group.id_user , name:group.name} , (err , regFind) => {
    		if(err){
    			res.status(200).send({error:true , msg:'Ocurrio un error'});
    		} else {
    			if(!regFind){
			    	group.save((err , regStored) => {
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








function updateGroup(req , res){
	var params = req.body;
	var regId = req.params.id;
	var name = params.name;
	var count = parseInt(params.count);
	var status = (params.status);
	if(params.name != null || params.count != null || params.status != null){
		Groups.findByIdAndUpdate(regId , {name:name , count:count , status:status} , (err , regUpdate) => {
			if(err){
				res.status(200).send({error:true , msg:'Error al actualizar el registro'});
			} else {
				if(!regUpdate){
					res.status(200).send({error:true , msg:'No se ha podido actualizar el registro'});
				} else {
					regUpdate.name = name;
					regUpdate.count = count;
					regUpdate.status = status;
					res.status(200).send({error:false , data:regUpdate});
				}
			}
		});
	} else {
		res.status(200).send({error:true , msg:'Introduce los campos'});
	}
}





function deleteGroup(req , res){
	var params = req.body;
	var regId = req.params.id;
	Groups.findByIdAndRemove(regId , (err , regDelete) => {
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
	getGroup,
	getGroups,
	saveGroup,
	updateGroup,
	deleteGroup
};