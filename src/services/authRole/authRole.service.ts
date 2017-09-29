import {Injectable} from '@angular/core';
import { CookieService } from 'ng2-cookies'
import { MyHttp } from '../myHttp/myhttp.service'

@Injectable()
export class AuthRoleService {
	// role:string="mem";
	// role:string;
	eTime:number

	constructor(
		private cookie:CookieService,
		private myhttp:MyHttp
		){}
	// cookie:CookieService=new CookieService;
	
	set role(type:string){
		this.cookie.set('role',type,this.eTime,'/')
	}

	get role(){
		return this.cookie.get('role')
	}

	set userName(name:string){
		this.cookie.set('userName',name,this.eTime,'/')
	}

	get userName(){
		return this.cookie.get('userName')
	}

	set token(token:string){
		this.cookie.set("token",token,this.eTime,'/');
	}

	get token():string{
		return this.cookie.get("token");
	}

	refreshToken(){

		if (this.token) {
			// code...
			this.myhttp.post({
			api:this.myhttp.api.refreshToken,
			query:{
				accessToken:this.token
			}
			}).toPromise()
		  	  .then(res=>{

		  	})
		}
		
		
	}

	deleteAllCookies(){
		this.cookie.set('role','',1,'/')
		this.cookie.set('userName','',1,'/')
		this.cookie.set('token','',1,'/')
		

		// this.cookie.deleteAll('','/')
		console.log("cookies",document.cookie)
	}

} 