import { Injectable } from '@angular/core'
import { MyHttp } from '../../../services/myHttp/myhttp.service'

export class SendData{
	page:number;
	rows:number;
	// serviceMan:string;
	qryStatus:number;
}

@Injectable()
export class CreditService{
	constructor(
		private myHttp:MyHttp,
		){}
	getListData(sData:SendData):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.creditAuthList,
			query:sData
		}).toPromise().then(res=>{
			let data=res.json();
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getHistoryData(memberId):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.creditAuthHistory,
			query:{
				memberId:memberId
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