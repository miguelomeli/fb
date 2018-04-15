'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var TableSchema = Schema({
	id_fanpage: {type: Schema.ObjectId, ref: 'FanPage'},
	id_user: {type: Schema.ObjectId, ref: 'User'},
	date: {type: Date, default: Date.now},
	status: {type: Boolean, default: true}
});
 

module.exports = mongoose.model('Inbox', TableSchema);