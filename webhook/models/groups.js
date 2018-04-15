'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var TableSchema = Schema({
	id_user: {type: Schema.ObjectId, ref: 'User'},
	name: String,
	count: {type: Number, default: 1},
	date: {type: Date, default: Date.now},
	status: {type: Boolean, default: true}
});
 

module.exports = mongoose.model('Group', TableSchema);