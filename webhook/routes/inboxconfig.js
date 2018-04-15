'use strict'

var express = require('express');
var inboxController = require('../controllers/inboxconfig');
var md_auth = require('../middlewares/authenticated');
var api =  express.Router();



api.get('/inbox-configs/:id_inbox/:page?' , md_auth.ensureAuth , inboxController.getInboxs);
api.get('/inbox-config/:id' , md_auth.ensureAuth , inboxController.getInbox);
api.put('/inbox-config/:id' , md_auth.ensureAuth , inboxController.updateInbox);
api.delete('/inbox-config/:id' , md_auth.ensureAuth , inboxController.deleteInbox);
api.post('/inbox-config' , md_auth.ensureAuth , inboxController.saveInbox);











module.exports = api;