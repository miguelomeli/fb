'use strict'

var express = require('express');
var whController = require('../controllers/wh');
var api =  express.Router();




api.get('/webhook' , whController.webhookGet);
api.post('/webhook' , whController.webhookPost);












module.exports = api;