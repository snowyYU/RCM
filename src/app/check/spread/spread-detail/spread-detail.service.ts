import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

@Injectable()
export class SpreadDetailService {
	
	constructor(
		private myHttp:MyHttpClient,
        ) {}

	//获取展期详情
	getRolloverDetail(id:string):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getRolloverDetail,
			query:{
                rolloverApplyId:id
            }
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
    }

    //获取借款单详情
    getfinanceApply(id:string):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getfinanceApply,
			query:{
                borrowApplyId:id
            }
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
    }

	//获取还款计划
    getRepaymentPlan(id:string):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getRepaymentPlan,
			query:{
                borrowApplyId:id
            }
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
    }
    getContractList(id):Promise<any>{
    	return this.myHttp.post({
    		api:this.myHttp.api.contractList,
    		query:id
    	}).toPromise().then(res=>{
    		return Promise.resolve(res)
    	})
    }
    


}