import { Injectable } from '@angular/core'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

export class SendData{
	page:number;
	rows:number;
	// serviceMan:string;
	qryStatus:number;
}

@Injectable()
export class SpreadService{
	constructor(
		private myHttp:MyHttpClient,
		){}
	getListData(sData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.spreadLoanList,
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




}