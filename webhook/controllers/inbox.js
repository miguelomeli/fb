'use strict'
 
var mongoosePaginate = require('mongoose-pagination');
var UsersFB = require('../models/usersfb');
var FanPages = require('../models/fanpages');
var Responds = require('../models/responds');
var responseInboxC = require('./responseInbox');
var InboxSend = require('../models/inboxsends');
var graph = require('fbgraph');


function xlog(x){
	console.log(x);
}






function responseInbox(id_fanpage , id_user , mid , msj){
	xlog("responseInbox");
	var dataOr = { $or:[  {uuid_1:id_user}, {uuid_2:id_user}, {uuid_3:id_user}, {uuid_4:id_user}, {uuid_5:id_user} ] };
	UsersFB.findOne(dataOr , (err , regFind) => {
		if(!err){
			if(regFind){
				if(regFind.first_name != '' && regFind.first_name != '' && regFind.status_answer == true){
					FanPages.findOne({uuid:id_fanpage} , (err , regFindFP) => {
						if(!err){
							if(regFindFP){
								var token = regFindFP.token;
								var idUser = regFind._id;
								var idFanPage = regFindFP._id;
								actionResponseInbox(id_fanpage , id_user , mid , msj , token , idUser , idFanPage);
							}
						}
					});
				} else {
					FanPages.findOne({uuid:id_fanpage} , (err , regFindFP) => {
						if(!err){
							if(regFindFP){
								var token = regFindFP.token;
								var idUser = regFind._id;
								var idFanPage = regFindFP._id;
								var url = id_user+'?fields=id,first_name,last_name,name,gender,profile_pic,locale,timezone';
								graph.get(url, {access_token: token}, function(err, resFB){
									if(err){
										UsersFB.update(dataOr, {uuid_1:id_user , status_answer:true , status:true}, { multi: true }, (err , regUpdate) => {});
									} else {
										var dataUpdate = {
											first_name: resFB.first_name,
											last_name: resFB.last_name,
											gender: resFB.gender,
											profile_pic: resFB.profile_pic,
											locale: resFB.locale,
											timezone: resFB.timezone,
											status_answer: true,
											status: true
										};
										UsersFB.update(dataOr, dataUpdate, { multi: true }, (err , regUpdate) => {});
									}
									actionResponseInbox(id_fanpage , id_user , mid , msj , token , idUser , idFanPage);
								});
							}
						}
					});
				}
			} else {
				// No existe el user
				FanPages.findOne({uuid:id_fanpage} , (err , regFindFP) => {
					if(!err){
						if(regFindFP){
							var token = regFindFP.token;
							var idUser = 0;
							var idFanPage = regFindFP._id;
							var usersfb = new UsersFB();
							usersfb.id_fanpage = regFindFP._id;
							var url = id_user+'?fields=id,first_name,last_name,name,gender,profile_pic,locale,timezone';
							graph.get(url, {access_token: token}, function(err, resFB){
								if(err){
									usersfb.uuid_1 = id_user;
									usersfb.status_answer = true;
									usersfb.status = true;
								} else {
									usersfb.uuid_1 = id_user;
									usersfb.first_name = resFB.first_name;
									usersfb.last_name = resFB.last_name;
									usersfb.gender = resFB.gender;
									usersfb.profile_pic = resFB.profile_pic;
									usersfb.locale = resFB.locale;
									usersfb.timezone = resFB.timezone;
									usersfb.status_answer = true;
									usersfb.status = true;
								}
								usersfb.save((err , regStored) => {
									if(!err){
										if(regStored){
											actionResponseInbox(id_fanpage , id_user , mid , msj , token , regStored._id , idFanPage);
										}
									}
								});
							});
						}
					}
				});
			}
		}
	});
}



function actionResponseInbox(id_fanpage , id_user , mid , msj , token , idUser , idFanPage){
	xlog("actionResponseInbox");
	var responds = new Responds();
	responds.id_fanpage = idFanPage;
	responds.id_user = idUser;
	responds.mid = mid;
	responds.msg = msj;
	responds.save((err , regStored) => {
		if(!err){
			if(regStored){
				respondedInbox(id_fanpage , id_user)
				responseInboxC.Init(idFanPage , idUser , regStored._id , mid , msj , token , id_fanpage , id_user);
			}
		}
	});
}



function readInbox(id_fanpage , id_user){
	xlog("readInbox");
	var dataOr = { $or:[  {uuid_1:id_user}, {uuid_2:id_user}, {uuid_3:id_user}, {uuid_4:id_user}, {uuid_5:id_user} ] };
	UsersFB.findOne(dataOr , (err , regFind) => {
		if(!err){
			if(regFind){
				var id_user = regFind._id;
				var id_fanpage = regFind.id_fanpage;
				InboxSend.findOne({id_user:id_user , id_fanpage:id_fanpage , status_read: false}).sort({ field: 'desc', date: -1 }).paginate(1 , 1 ,  function(err , regs , total){
					if(!err){
						if(total > 0){
							InboxSend.findByIdAndUpdate(regs._id , {status_read:true} , (err , regUpdate) => {});
						}
					}
				});

			}
		}
	});
}



function respondedInbox(id_fanpage , id_user){
	xlog("respondedInbox");
	var dataOr = { $or:[  {uuid_1:id_user}, {uuid_2:id_user}, {uuid_3:id_user}, {uuid_4:id_user}, {uuid_5:id_user} ] };
	UsersFB.findOne(dataOr , (err , regFind) => {
		if(!err){
			if(regFind){
				var id_user = regFind._id;
				var id_fanpage = regFind.id_fanpage;
				InboxSend.findOne({id_user:id_user , id_fanpage:id_fanpage , status_response: false}).sort({ field: 'desc', date: -1 }).paginate(1 , 1 ,  function(err , regs , total){
					if(!err){
						if(total > 0){
							InboxSend.findByIdAndUpdate(regs._id , {status_response:true} , (err , regUpdate) => {});
						}
					}
				});

			}
		}
	});
}



module.exports = {
	responseInbox,
	actionResponseInbox,
	readInbox
};