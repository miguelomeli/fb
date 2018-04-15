'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var TableSchema = Schema({
	id_fanpage: {type: Schema.ObjectId, ref: 'FanPage'},
	uuid_1: {type: String, default: ''},
	uuid_2: {type: String, default: ''},
	uuid_3: {type: String, default: ''},
	uuid_4: {type: String, default: ''},
	uuid_5: {type: String, default: ''},
	user_ref: {type: String, default: ''},
	ref: {type: String, default: ''},
	first_name: {type: String, default: ''},
	last_name: {type: String, default: ''},
	gender: {type: String, default: ''},
	profile_pic: {type: String, default: ''},
	locale: {type: String, default: ''},
	timezone: {type: String, default: ''},
	date: {type: Date, default: Date.now},
	checkbox: {type: Boolean, default: false},
	status_answer: {type: Boolean, default: false},
	status: {type: Boolean, default: false}
});


module.exports = mongoose.model('UsersFB', TableSchema);