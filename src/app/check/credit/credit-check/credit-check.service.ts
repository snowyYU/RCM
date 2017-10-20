import { Injectable } from '@angular/core'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

export class SendData{
	creditAuthId
	expiryDateBegin
	expiryDateEnd
	addCreditValue
	auditBy
	status
	auditRemark?
}

@Injectable()
export class CreditCheckService{
	constructor(
		private myHttp:MyHttpClient
		){}

	getData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.creditAuthDetail,
			query:{
				creditAuthId:id
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

	creditAuthApplyReply(data:SendData){
		return this.myHttp.post({
			api:this.myHttp.api.creditAuthApplyReply,
			query:data
		}).toPromise().then(res=>{
			let data=res;
			if (data.status==200) {
				 return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}



}