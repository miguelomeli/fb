'use strict'
 
var mongoosePaginate = require('mongoose-pagination');
var UsersFB = require('../models/usersfb');
var FanPages = require('../models/fanpages');
var graph = require('fbgraph');
var inbox = require('./inbox');


function xlog(x){
	console.log(x);
}


function saveCheckbox(id_fanpage , user_ref , ref){
	xlog("saveCheckbox");
	FanPages.findOne({uuid:id_fanpage} , (err , regFind) => {
		if(!err){
			if(regFind){
				var usersfb = new UsersFB();
				usersfb.user_ref = user_ref;
				usersfb.ref = ref;
				usersfb.id_fanpage = regFind._id;
				UsersFB.findOne({user_ref:user_ref , id_fanpage:regFind._id} , (err , regFind) => {
					if(!err){
						if(!regFind){
							usersfb.save((err , regStored) => {
								if(!err){
									if(regStored){

									}
								}
							});
						}
					}
				});
			}
		}
	});
}




function responseCheckbox(id_fanpage , id_user , user_ref , msj , mid){
	xlog("responseCheckbox");
	FanPages.findOne({uuid:id_fanpage} , (err , regFindFP) => {
		if(!err){
			if(regFindFP){
				var token = regFindFP.token;
				var idFanPage = regFindFP._id;
				UsersFB.findOne({user_ref:user_ref , id_fanpage:regFindFP._id} , (err , regFind) => {
					if(!err){
						if(regFind){
							var idUser = regFind._id;
							var url = id_user+'?fields=id,first_name,last_name,name,gender,profile_pic,locale,timezone';
							graph.get(url, {access_token: token}, function(err, resFB){
								if(err){
									UsersFB.findByIdAndUpdate(regFind._id , {uuid_1:id_user , checkbox:true , status:true} , (err , regUpdate) => {});
								} else {
									var dataUpdate = {
										uuid_1: id_user,
										first_name: resFB.first_name,
										last_name: resFB.last_name,
										gender: resFB.gender,
										profile_pic: resFB.profile_pic,
										locale: resFB.locale,
										timezone: resFB.timezone,
										checkbox: true,
										status: true
									};
									UsersFB.findByIdAndUpdate(regFind._id , dataUpdate , (err , regUpdate) => {});
									inbox.actionResponseInbox(id_fanpage , id_user , mid , msj , token , idUser , idFanPage);
								}
							});
						}
					}
				});
			}
		}
	});
}



module.exports = {
	saveCheckbox,
	responseCheckbox
};