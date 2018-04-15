'use strict'

var express = require('express');
var inboxController = require('../controllers/inboxsends');
var md_auth = require('../middlewares/authenticated');
var api =  express.Router();



api.get('/inbox-sends/:id_config/:page?' , md_auth.ensureAuth , inboxController.getInboxs);
api.get('/inbox-send/:id' , md_auth.ensureAuth , inboxController.getInbox);
api.put('/inbox-send/:id' , md_auth.ensureAuth , inboxController.updateInbox);
api.delete('/inbox-send/:id' , md_auth.ensureAuth , inboxController.deleteInbox);
api.post('/inbox-send' , md_auth.ensureAuth , inboxController.saveInbox);











module.exports = api;