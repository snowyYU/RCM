import { Injectable } from '@angular/core'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

export class SendData{
	page:number;
	rows:number;
	// serviceMan:string;
	status:string;
	companyName?:string
	borrowApplyId?:string

}

@Injectable()
export class UseApplyService{
	constructor(
		private myHttp:MyHttpClient,
		){}
	getListData(sData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.loanList,
			query:sData
		}).toPromise().then(res=>{
			let data=res;
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	// getHistoryData(memberId):Promise<any>{
	// 	return this.myHttp.post({
	// 		api:this.myHttp.api.creditAuthHistory,
	// 		query:{
	// 			memberId:memberId
	// 		}
	// 	}).toPromise().then(res=>{
	// 		let data=res;
	// 		if (data.status==200) {
	// 			return Promise.resolve(data)
	// 		}else{
	// 			return Promise.reject(data)
	// 		}
	// 	})
	// }


}