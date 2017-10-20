import { Injectable } from '@angular/core'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

@Injectable()
export class SpreadDetailService{
	constructor(
		private myHttp:MyHttpClient
		){}

	getData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.spreadLoanDetail,
			query:{
				rolloverApplyId:id
			}
		}).toPromise().then(res=>{
			let data=res;
			if (data.status==200) {
				 return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getAttachUrl(id):any{
		return this.myHttp.sShow(id,1)

	}


}