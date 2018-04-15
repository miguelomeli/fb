'use strict'

var express = require('express');
var fanpageController = require('../controllers/fanpages');
var md_auth = require('../middlewares/authenticated');
var api =  express.Router();



api.get('/fanpages/:page?' , md_auth.ensureAuth , fanpageController.getFanpages);
api.get('/fanpages-group/:group/:page?' , md_auth.ensureAuth , fanpageController.getFanpagesGroup);
api.get('/fanpage/:id' , md_auth.ensureAuth , fanpageController.getFanpage);
api.put('/fanpage/:id' , md_auth.ensureAuth , fanpageController.updateFanPage);
api.delete('/fanpage/:id' , md_auth.ensureAuth , fanpageController.deleteFanPage);
api.post('/fanpage' , md_auth.ensureAuth , fanpageController.saveFanPage);











module.exports = api;