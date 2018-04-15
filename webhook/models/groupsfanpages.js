'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var TableSchema = Schema({
	id_group: {type: Schema.ObjectId, ref: 'Group'},
	id_fanpage: {type: Schema.ObjectId, ref: 'FanPage'},
	date: {type: Date, default: Date.now},
	status: {type: Boolean, default: false}
});
 

module.exports = mongoose.model('GroupsFanPage', TableSchema);