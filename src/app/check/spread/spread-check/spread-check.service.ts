import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'


export interface SendData{
    rolloverApplyId?:string  	//展期申请ID
    extendRate?:number          //展期利率
    status?:number           	//展期审批状态
    auditTwoRemarks?:string  	//二审意见
    comfirmRolloverTime:string  //批准还款日期
}

@Injectable()
export class SpreadCheckService {
	
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

	//保存审批结果
    saveRollover(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveRollover,
			query:queryData
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
    		query:{borrowApplyId:id}
    	}).toPromise().then(res=>{
    		return Promise.resolve(res)
    	})
    }


    
}