'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var TableSchema = Schema({
	id_inbox: {type: Schema.ObjectId, ref: 'Inbox'},
	type: {type: Number, default: 0},
	include: {type: String, lowercase: true, trim: true, default: ''},
	exclude: {type: String, lowercase: true, trim: true, default: ''},
	date: {type: Date, default: Date.now},
	status: {type: Boolean, default: true}
});
 

module.exports = mongoose.model('InboxConfig', TableSchema);

