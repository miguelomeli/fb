'use strict'

var express = require('express');
var usersfbController = require('../controllers/usersfb');
var md_auth = require('../middlewares/authenticated');
var api =  express.Router();





api.get('/usersfbs/:id/:page?' , md_auth.ensureAuth , usersfbController.getUsersFBs);
api.get('/usersfb/:id' , md_auth.ensureAuth , usersfbController.getUsersFB);
api.put('/usersfb/:id' , md_auth.ensureAuth , usersfbController.updateUsersFB);
api.delete('/usersfb/:id' , md_auth.ensureAuth , usersfbController.deleteUsersFB);
api.post('/usersfb' , md_auth.ensureAuth , usersfbController.saveUsersFB);











module.exports = api;