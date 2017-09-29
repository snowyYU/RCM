import { Injectable } from '@angular/core'
import { MyHttp } from '../../../../services/myHttp/myhttp.service'


@Injectable()
export class CreditDetailService{
	constructor(
		private myHttp:MyHttp
		){}

	getData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.creditAuthDetail,
			query:{
				creditAuthId:id
			}
		}).toPromise().then(res=>{
			let data=res.json();
			if (data.status==200) {
				 return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}




}