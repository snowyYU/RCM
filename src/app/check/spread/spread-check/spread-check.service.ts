import { Injectable } from '@angular/core'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

export class SendData{
	rolloverApplyId
	auditTwoBy
	status
	auditTwoRemarks
}

@Injectable()
export class SpreadCheckService{
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
			console.log(data)
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

	rolloverLoanApplyReply(param:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.spreadLoanApplyReply,
			query:param
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