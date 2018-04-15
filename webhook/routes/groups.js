'use strict'

var express = require('express');
var groupController = require('../controllers/groups');
var md_auth = require('../middlewares/authenticated');
var api =  express.Router();



api.get('/groups/:page?' , md_auth.ensureAuth , groupController.getGroups);
api.get('/group/:id' , md_auth.ensureAuth , groupController.getGroup);
api.put('/group/:id' , md_auth.ensureAuth , groupController.updateGroup);
api.delete('/group/:id' , md_auth.ensureAuth , groupController.deleteGroup);
api.post('/group' , md_auth.ensureAuth , groupController.saveGroup);











module.exports = api;