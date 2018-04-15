'use strict'

var express = require('express');
var userController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
var api =  express.Router();




api.get('/user/:id/:getHash?' , md_auth.ensureAuth , userController.getUser);
api.put('/user/:id' , md_auth.ensureAuth , userController.updateUser);
api.post('/register' , userController.saveUser);
api.post('/login' , userController.loginUser);
api.post('/loginRegister' , userController.loginRegister);










module.exports = api;