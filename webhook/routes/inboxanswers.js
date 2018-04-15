'use strict'

var express = require('express');
var inboxController = require('../controllers/inboxanswers');
var md_auth = require('../middlewares/authenticated');
var api =  express.Router();



api.get('/inbox-answers/:id_config/:page?' , md_auth.ensureAuth , inboxController.getInboxs);
api.get('/inbox-answer/:id' , md_auth.ensureAuth , inboxController.getInbox);
api.put('/inbox-answer/:id' , md_auth.ensureAuth , inboxController.updateInbox);
api.delete('/inbox-answer/:id' , md_auth.ensureAuth , inboxController.deleteInbox);
api.post('/inbox-answer' , md_auth.ensureAuth , inboxController.saveInbox);











module.exports = api;