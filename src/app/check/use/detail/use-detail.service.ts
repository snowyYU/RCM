import { Injectable } from '@angular/core'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'


@Injectable()
export class UseDetailService{
	constructor(
		private myHttp:MyHttpClient
		){}
	getDicData_fbps(key:string):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDicList_fbps,
			query:{
				type:key
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
	getData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.loanDetail,
			query:{
				borrowApplyId:id
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
	getProveDataList(id:number):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.proveDataList,
			query:{
				borrowApplyId:id
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

	getLogList(id,status):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.logList,
			query:{
				type:0,
				id:id,
				status2:status
			}
		}).toPromise().then(res=>{
			return Promise.resolve(res)
			
		})
	}
	getFileUrl(id,mode?){
		return this.myHttp.sShow(id,mode)
				
	}
	downLoadFile(id){
		return this.myHttp.sDownLoad(id)
	}


}