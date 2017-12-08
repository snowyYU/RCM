import { Injectable } from '@angular/core'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

export class SendData{
	creditAuthId
	expiryDateBegin
	expiryDateEnd
	addCreditValue
	auditBy
	status
	creditAuthVo2
	memberRatingGrate
	memberRating
	auditRemark?
}

export interface productItem{
	
		productId,
		productName,
		creditValue,
		expiryDateBegin,
		expiryDateEnd,
		uniqueId
	

}

@Injectable()
export class CreditCheckService{
	constructor(
		private myHttp:MyHttpClient
		){}

	getMemberRatingL():Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getDictList,
			query:{
				type:'member_rating'
			}
		}).toPromise().then(res=>{
			return Promise.resolve(res)
		})
	}

	getCreditProducts(memberId:number):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getCreditFacilityList,
			query:{
				memberId:memberId
			}
		}).toPromise().then((res)=>{
			let data:{
				status?
				arr?:any[]
				message?
			}={arr:[]}
			if (res.status==200) {
				data.status=true
				if (res.body.records.length>0) {
					res.body.records.forEach((e)=>{
						let item:{
							productId?  //产品ID
							productName?  //产品名称
							creditValue?  //授信额(数字类型)
							expiryDateBegin?  //有效期(开始)  yyyy-MM-dd
							expiryDateEnd?  //有效期(结束)    yyyy-MM-dd
						}={}
						if (!e.creditFacility) {
							return 
						}
						if (e.creditFacility.expiryDateBegin.length>10) {
							item.expiryDateBegin=e.creditFacility.expiryDateBegin.substring(0,10)
						}
						if (e.creditFacility.expiryDateEnd.length>10) {
							item.expiryDateEnd=e.creditFacility.expiryDateEnd.substring(0,10)
						}
						item.productId=e.creditFacility.productId
						item.productName=e.creditFacility.productName
						item.creditValue=e.creditFacility.creditValue
						data.arr.push(item)

					})
					return Promise.resolve(data)
				}
			}else{
				data.status=false
				data.message=res.message
				return Promise.resolve(data)
			}
			
		})
	}

	getProductList(appId:number):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getProductsList,
			query:{
				appId:appId
			}
		}).toPromise().then((res)=>{
			return Promise.resolve(res)
		})
	}

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
			body:data
		}).toPromise().then(res=>{
			let data=res;
			if (data.status==200) {
				 return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}
	getRateRange(level){
		return this.myHttp.post({
			api:this.myHttp.api.rateRange,
			query:{
				memberClass:level
			}
		}).toPromise().then(res=>{
			return Promise.resolve(res)
		})
	}


}