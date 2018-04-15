'use strict'
 
var mongoosePaginate = require('mongoose-pagination');
var UsersFB = require('../models/usersfb');
var FanPages = require('../models/fanpages');
var Bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var checkbox = require('./checkbox');
var inbox = require('./inbox');

var graph = require('fbgraph');
var passwordWH = 'lomeli';



function xlog(x){
	console.log(x);
}


function webhookGet(req , res){
	var params = req.body;
	if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === passwordWH){
	    xlog("Validating webhook");
	    res.status(200).send(req.query['hub.challenge']);
	} else if(req.query['hub.mode'] === 'subscribe'){
	    res.status(200).send(req.query['hub.challenge']);
	    xlog("Payments");
	} else {
	    xlog("Failed validation. Make sure the validation tokens match.");
	    res.sendStatus(403);
	}
}




function u(val){
	if(typeof val == "undefined"){
		return false;
	} else {
		return true;
	}
}




function webhookPost(req , res){
	var data = req.body;
	var responseCheckBoxBool = false;
	if(data.object === 'page'){
		try{
			if( data.entry[0].messaging[0].recipient.id && data.entry[0].messaging[0].optin.user_ref && data.entry[0].messaging[0].optin.ref ){
				var id_fanpage = data.entry[0].messaging[0].recipient.id;
				var user_ref = data.entry[0].messaging[0].optin.user_ref;
				var ref = data.entry[0].messaging[0].optin.ref;
				checkbox.saveCheckbox(id_fanpage , user_ref , ref);
			}
		} catch(e){}
		try{
			if( data.entry[0].messaging[0].message.mid && data.entry[0].messaging[0].prior_message.source && data.entry[0].messaging[0].prior_message.source == 'checkbox_plugin' && data.entry[0].messaging[0].recipient.id && data.entry[0].messaging[0].sender.id && data.entry[0].messaging[0].message.mid && data.entry[0].messaging[0].message.text && data.entry[0].messaging[0].prior_message.identifier ){
				var id_fanpage = data.entry[0].messaging[0].recipient.id;
				var id_user = data.entry[0].messaging[0].sender.id;
				var user_ref = data.entry[0].messaging[0].prior_message.identifier;
				var msj = data.entry[0].messaging[0].message.text;
				var mid = data.entry[0].messaging[0].message.mid;
				responseCheckBoxBool = true;
				checkbox.responseCheckbox(id_fanpage , id_user , user_ref , msj , mid);
			}
		} catch(e){}
		try{
			if( !responseCheckBoxBool && data.entry[0].messaging[0].recipient.id && data.entry[0].messaging[0].sender.id && data.entry[0].messaging[0].message.mid && data.entry[0].messaging[0].message.text ){
				var id_fanpage = data.entry[0].messaging[0].recipient.id;
				var id_user = data.entry[0].messaging[0].sender.id;
				var mid = data.entry[0].messaging[0].message.mid;
				var msj = data.entry[0].messaging[0].message.text;
				inbox.responseInbox(id_fanpage , id_user , mid , msj);
			}
		} catch(e){}
		try{
			if( data.entry[0].messaging[0].read.watermark && data.entry[0].messaging[0].sender.id && data.entry[0].messaging[0].recipient.id ){
				var id_fanpage = data.entry[0].messaging[0].recipient.id;
				var id_user = data.entry[0].messaging[0].sender.id;
				inbox.readInbox(id_fanpage , id_user);
			}
		} catch(e){}

	}




	data = JSON.stringify(data);
	xlog(data);
	xlog("\n\n\n");
	res.sendStatus(200);
}





module.exports = {
	webhookGet,
	webhookPost
};