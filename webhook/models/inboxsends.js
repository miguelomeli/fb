'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TableSchema = Schema({
	id_fanpage: {type: Schema.ObjectId, ref: 'FanPage'},
	id_user: {type: Schema.ObjectId, ref: 'UsersFB'},
	id_respond: {type: Schema.ObjectId, ref: 'Responds'},
	id_answer: {type: Schema.ObjectId, ref: 'InboxAnswer'},
	type: {type: Number, default: 0},
	mid: {type: String, default: ''},
	msg: {type: String, default: ''},
	date: {type: Date, default: Date.now},
	status_read: {type: Boolean, default: false},
	status_response: {type: Boolean, default: false},
	status: {type: Boolean, default: true}
});
 

module.exports = mongoose.model('InboxSend', TableSchema);

