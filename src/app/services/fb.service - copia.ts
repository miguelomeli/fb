import { Injectable } from '@angular/core';
import { Http , Response , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
declare var window: any;
declare var FB: any;
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';             // Add this
 



@Injectable()
export class FbService{
	public url: string;


	constructor( private route: ActivatedRoute , private router: Router ){
	    FB.init({
	        appId            : '348573342328652',
	        autoLogAppEvents : true,
	        status 			 : true,
	        cookie			 : true, 
	        xfbml            : true,
	        version          : 'v2.12'
	    });
	}
	

	fbLogin() {
		//public_profile,email,manage_pages,pages_messaging,pages_messaging_subscriptions,read_page_mailboxes

	      FB.login(result => {

	      	//this.router.navigateByUrl('/facebook-analysis');

	      	//console.log(result.authResponse.accessToken);
	      	var pageAccessToken = result.authResponse.accessToken;
		    FB.api('/me', {
  access_token : pageAccessToken
} , response => {
		      //console.log(response);
		      this.router.navigate(['/pages/ui-features/buttons']);
		      //this.router.navigateByUrl('/pages/ui-features/buttons');
		      //this.redirect();

		  });


	      }, {scope: 'public_profile,email,manage_pages' , expires_in:0})
	      

	      
	     return 'hola 2';

	}

	redirect(){
		this.router.navigateByUrl('/facebook-analysis');
	}


}


