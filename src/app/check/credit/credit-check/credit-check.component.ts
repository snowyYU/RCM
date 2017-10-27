import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { CreditCheckService,SendData } from './credit-check.service'
import { GalleryComponent} from 'dolphinng';
import { AuthRoleService } from '../../../../services/authRole/authRole.service'

@Component({
	selector:'credit-check',
	templateUrl:'./credit-check.component.html',
	styleUrls:['./credit-check.component.less'],
	providers:[CreditCheckService]
})
export class CreditCheckComponent implements OnInit{
	creditAuthId:number; 			//申请ID
	createTime:string;		//申请时间	

	expiryDateBegin
	expiryDateEnd
	addCreditValue
	memberName
	memberId
	productName
	productTypeName
	serviceMan:string;		//服务经理

	oldCreditValue
	authRemark
	auditBy:string;			//审核人
    auditRemark:string;		//审核意见
    auditDate:string;		//审核时间



	



	
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private authRole:AuthRoleService,
		private creditCheck:CreditCheckService
		){
		// setTimeout(()=>{
		// 	this.gallery.open();
		// },3000);
		
	} 
	ngOnInit(){
		this.getData();
		this.auditBy=this.authRole.userName
	}

	getData(){
		this.creditCheck.getData(this.route.params['value']['id'])
						.then(res=>{
							console.log(res)
							this.handle(res)
						})
						.catch(res=>{
							this.pop.error({
								title:'错误信息',
								text:res.message
							})
						})
	}

	handle(res){
		console.log(res)
		this.creditAuthId=res.body.creditAuthId; 			//申请ID
		this.createTime=res.body.createTime
		this.expiryDateBegin=res.body.expiryDateBegin
		this.expiryDateEnd=res.body.expiryDateEnd
		this.addCreditValue=res.body.addCreditValue
		this.memberName=res.body.memberName
		this.memberId=res.body.memberId
		this.productName=res.body.productName
		this.productTypeName=res.body.productTypeName
		this.serviceMan=res.body.serviceMan;		//服务经理
		this.oldCreditValue=res.body.oldCreditValue
		this.auditDate=res.body.auditDate
		this.authRemark=res.body.authRemark
	    this.auditRemark=res.body.auditRemark;		//审核意见

	}


	back(){
		this.router.navigate(['check/credit'],{queryParams:{status:'1'}})
	}

	creditAuthApplyReply(result){
		let data:SendData={
			creditAuthId:this.creditAuthId,
			expiryDateBegin:this.expiryDateBegin,
			expiryDateEnd:this.expiryDateEnd,
			addCreditValue:this.addCreditValue,
			auditBy:this.auditBy,
			status:result,
			auditRemark:this.auditRemark
		}
		this.creditCheck.creditAuthApplyReply(data)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示信息',
					text:'操作成功!'
				})
				this.router.navigate(['check/credit'])
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}


}