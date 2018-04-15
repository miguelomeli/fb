'use strict'

var express = require('express');
var inboxController = require('../controllers/inboxs');
var md_auth = require('../middlewares/authenticated');
var api =  express.Router();



api.get('/inboxs/:page?' , md_auth.ensureAuth , inboxController.getInboxs);
api.get('/inbox/:id' , md_auth.ensureAuth , inboxController.getInbox);
api.put('/inbox/:id' , md_auth.ensureAuth , inboxController.updateInbox);
api.delete('/inbox/:id' , md_auth.ensureAuth , inboxController.deleteInbox);
api.post('/inbox' , md_auth.ensureAuth , inboxController.saveInbox);











module.exports = api;