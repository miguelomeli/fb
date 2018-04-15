'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar Rutas
var user_routes = require('./routes/user');
var group_routes = require('./routes/groups');
var fanpage_routes = require('./routes/fanpages');
var usersfb_routes = require('./routes/usersfb');
var wh_routes = require('./routes/wh');
var inboxs_routes = require('./routes/inboxs');
var inboxconfig_routes = require('./routes/inboxconfig');
var inboxanswers_routes = require('./routes/inboxanswers');
var inboxsends_routes = require('./routes/inboxsends');







app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Configurar Cabezeras HTTP
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin , X-Requested-With , Content-Type , Accept , Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT , DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT , DELETE');
    next();
});




//Rutas Base
app.use('/wh', wh_routes);
app.use('/api', user_routes);
app.use('/api', group_routes);
app.use('/api', fanpage_routes);
app.use('/api', usersfb_routes);
app.use('/api', inboxs_routes);
app.use('/api', inboxconfig_routes);
app.use('/api', inboxanswers_routes);
//app.use('/api', inboxsends_routes);


















module.exports = app;