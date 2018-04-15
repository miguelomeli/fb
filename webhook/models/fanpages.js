'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TableSchema = Schema({
	id_user: {type: Schema.ObjectId, ref: 'User'},
	id_group: {type: Schema.ObjectId, ref: 'Group'},
	uuid: String,
	token: String,
	user: String,
	name: String,
	type: {type: Number, default: 1},
	date: {type: Date, default: Date.now},
	status: {type: Boolean, default: true}
});


module.exports = mongoose.model('FanPage', TableSchema);