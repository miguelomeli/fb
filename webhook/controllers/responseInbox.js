'use strict'
var graph = require('fbgraph');
var ObjectId = require('mongoose').Types.ObjectId; 
var mongoosePaginate = require('mongoose-pagination');
var UsersFB = require('../models/usersfb');
var FanPages = require('../models/fanpages');
var Responds = require('../models/responds');
var Inbox = require('../models/inboxs');
var InboxConfig = require('../models/inboxconfig');
var InboxAnswer = require('../models/inboxanswers');
var InboxSend = require('../models/inboxsends');




function xlog(x){
	//console.log(x);
}






function Init(idFanPage , idUser , id_respon , mid , msj , token , id_fanpage , id_user){
	xlog("Init");
	msj = msj.toLowerCase();
	Inbox.findOne({id_fanpage:idFanPage , status:true} , (err , regFind) => {
		if(!err){
			if(regFind){
				var id_inbox = regFind._id;
				InboxConfig.find({id_inbox:id_inbox , status:true} , (err , regFind) => {
					if(!err){
						//xlog(regFind);
						if(regFind){
							//xlog("Existe InboxConfig");
							var Incluir = false;
							var Excluir = false;
							var idRespuesta = null;
							var id_config = null;
							var typeComentario = 0;
							for(var key in regFind){
								var val = regFind[key];
								//xlog(val);
								var contener = val.include;
								var contenerE = contener.split("\n");
								var excluir = val.exclude;
								var excluirE = excluir.split("\n");
								for(var i=0; i<contenerE.length; i++){
									if(Incluir){
										break;
									}
									if(contenerE[i].length <= 0){
										break;
									}
									if( msj.indexOf(contenerE[i]) >= 0 ){
					                    Incluir = true;
					                    idRespuesta = val._id;
					                    id_config = val._id;
					                    typeComentario = 0;
					                    break;
									}
								}
								for(var i=0; i<excluirE.length; i++){
									if(Excluir){
										break;
									}
									if(excluirE[i].length <= 0){
										break;
									}
									if( msj.indexOf(excluirE[i]) >= 0 ){
					                    Excluir = true;
	                    				break;
									}
								}
							}
							if(Incluir && !Excluir && idRespuesta != 0){
								InboxAnswer.find({id_config:id_config , status:true} , (err , regFind) => {
									if(!err){
										if(regFind){
											var respuesta = regFind[Math.floor(Math.random() * regFind.length)];
											if(respuesta.answer.indexOf('{') >= 0){
												var message = respuesta.answer;
											} else {
												var message = {text:respuesta.answer}
											}
											var recipient = {id:id_user}
											var id_answer = regFind._id;
											graph.post('/me/messages', {access_token:token , recipient:recipient , message:message}, function(err, resFB){
												if(!err){
													var message_id = resFB.message_id;
													var inboxSend = new InboxSend();
													inboxSend.id_fanpage = idFanPage;
													inboxSend.id_user = idUser;
													inboxSend.id_respond = id_respon;
													inboxSend.id_answer = id_answer;
													inboxSend.type = 0;
													inboxSend.mid = message_id;
													inboxSend.msg = respuesta.answer;
													inboxSend.status = true;
					    							inboxSend.save((err , regStored) => {
					    								if(!err){
					    									if(regStored){
					    										xlog("Respuesta enviada");
					    									}
					    								}
					    							});
												}
											});
										}
									}
								});
							}
						}
					}
				});
			}
		}
	});
}







module.exports = {
	Init
};