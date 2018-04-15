'use strit'

var app = require('./app');
var mongoose = require('mongoose');
var port = 5050;


//http://thecodebarbarian.com/managing-connections-with-the-mongodb-node-driver.html
//https://ianlondon.github.io/blog/mongodb-auth/
//https://stackoverflow.com/questions/26813912/how-can-i-connect-to-a-remote-mongo-server-from-mac-os-terminal?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
//mongo 127.0.0.1:27017/atm -u atm -p lomeli


var Promise = require('bluebird');




mongoose.Promise = global.Promise;
Promise.promisifyAll(mongoose); 
 
mongoose.connect('mongodb://fb:fbADM00@127.0.0.1:27017/fb' , (err , res) => {
	if(err){
		console.log("Error en la db");
		throw err;
	} else {
		console.log("La db esta corriendo normalmente.");
		app.listen(port , function(){
		  console.log('Servidor de ATM corriendo correctamente');
		}); 		
	}
});






