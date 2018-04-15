import { Component , OnInit  } from '@angular/core';
import { FbService } from '../../services/fb.service';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  providers: [FbService]
})
export class LoginComponent implements OnInit{

	  constructor(
	  	private fbService:FbService
	  ){

	  }

	ngOnInit(){
		//var a = this.fbService.fbLogin();
		//console.log(a);
	}


	fbLogin(){
		this.fbService.fbLogin();
	}

}