import { Injectable } from '@angular/core';
import { Http , Response , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
declare var window: any;
declare var FB: any;
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../models/users';
 



@Injectable()
export class FbService{
	public url: string;
	public user: User;


	constructor( private route: ActivatedRoute , private router: Router ){
	    FB.init({
	        appId            : '348573342328652',
	        autoLogAppEvents : true,
	        status 			 : true,
	        cookie			 : true, 
	        xfbml            : true,
	        version          : 'v2.12'
	    });
	    this.user = new User('a' , 'b' , '' , '' , '' , '' , '');
	}
	
/*
	role: {type: String, default: 'ROLE_USER'},
	uuid: {type: String, default: ''},
	uuidp: {type: String, default: ''},
	token: {type: String, default: ''},
	name: {type: String, default: ''},
	firstname: {type: String, default: ''},
	lastname: {type: String, default: ''},
	email: {type: String, lowercase: true, trim: true, default: ''},
	date: {type: Date, default: Date.now},
	status: {type: Boolean, default: false}


	user.uuid = params.uuid;
	user.token = params.token;
	user.name = params.name;
	user.firstname = params.firstname;
	user.lastname = params.lastname;
	user.email = params.email;	


*/





	fbLogin() {
		//public_profile,email,manage_pages,pages_messaging,pages_messaging_subscriptions,read_page_mailboxes
		FB.login(function(response){
			if(response.authResponse){
				console.log('Welcome!  Fetching your information.... ');
				console.log(response.authResponse.accessToken);
				var pageAccessToken = response.authResponse.accessToken;
				FB.api('/me?fields=id,first_name,last_name,name,email,gender,locale,timezone', {access_token : pageAccessToken} , function(response){
					if(response.error){
						console.log('Error al sacar datos del usuario');
						console.log(response);
					} else {
						this.user = new User('a' , 'b' , '' , '' , '' , '' , '');
						this.user.uuid = response.id;
						this.user.uuidp = response.id;
						this.user.token = pageAccessToken;
						this.user.name = response.name;
						this.user.firstname = response.first_name;
						this.user.lastname = response.last_name;
						this.user.email = response.email;
						console.log(response);
						console.log(this.user);
					}
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		} , {scope: 'public_profile,email,manage_pages' , expires_in:500});




	      

	      
	     return 'hola 2';

	}


	xlog(txt){
		console.log(txt);
	}

	redirect(){
		this.router.navigate(['/pages/ui-features/buttons']);
		this.router.navigateByUrl('/facebook-analysis');
	}


}


