'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TableSchema = Schema({
	role: {type: String, default: 'ROLE_USER'},
	uuid: String,
	uuidp: String,
	token: String,
	user: String,
	name: String,
	lastname: {type: String, default: ''},
	email: {type: String, lowercase: true, trim: true, default: ''},
	date: {type: Date, default: Date.now},
	status: {type: Boolean, default: false}
});


module.exports = mongoose.model('User', TableSchema);