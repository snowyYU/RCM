import { Injectable } from '@angular/core'
import { MyHttp } from '../../../../services/myHttp/myhttp.service'

export class SendData{
	authId
	auditBy
	status
	auditRemark?
}

@Injectable()
export class AuthCheckService{
	constructor(
		private myHttp:MyHttp
		){}

	getData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.authMemberDetail,
			query:{
				authId:id
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

	memberAuthApplyReply(data:SendData){
		return this.myHttp.post({
			api:this.myHttp.api.memberAuthApplyReply,
			query:data
		}).toPromise().then(res=>{
			let data=res.json();
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