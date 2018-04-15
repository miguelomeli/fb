'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var TableSchema = Schema({
	id_config: {type: Schema.ObjectId, ref: 'InboxConfig'},
	answer: {type: String, lowercase: true, trim: true, default: ''},
	date: {type: Date, default: Date.now},
	status: {type: Boolean, default: true}
});
 

module.exports = mongoose.model('InboxAnswer', TableSchema);

