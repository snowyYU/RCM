import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { SpreadCheckService } from './spread-check.service'
import { ViewChild ,ElementRef} from '@angular/core';
import { GalleryComponent} from 'dolphinng';
import { SendData } from './spread-check.service'
import { SessionStorageService } from '../../../../services/session-storage/session-storage.service'

import { AuthRoleService } from '../../../../services/authRole/authRole.service'
import { SubmitLoadingService } from '../../../../utils/submit-loading/submit-loading.service'

@Component({
	selector:'spread-check',
	templateUrl:'./spread-check.component.html',
	styleUrls:['./spread-check.component.less'],
	providers:[SpreadCheckService]
})
export class SpreadCheckComponent implements OnInit{

	rolloverLoan:{
	rolloverApplyId?	//展期申请id
	rolloverTime?	//展期申请日期
	memberId?	//会员id
	memberName?	//会员名
	appId?	//渠道ID
	appName?	//渠道名称
	borrowApplyId?	//借款申请单id
	comfirmRolloverTime?	//批准展期日期
	remarks?	//备注
	status?	//状态（-1：不通过；0：待审批；1：通过）
	statusDic?	//状态，中文
	auditOneTime?	//一审时间
	auditOneBy?	//一审员
	auditOneRemarks?	//一审意见
	auditTwoTime?	//二审时间
	auditTwoBy?	//二审员
	auditTwoRemarks?	//二审员意见
	rolloverAmount?		//展期金额
	rolloverDay?	//最长期限
}={}

financeApply:{
	approveAmount?	//借款金额
	borrowHowlong?	//借款周期
	productId?	//产品Id
	productName?	//产品名称
	borrowApplyId?	//借款单ID
}={}

productsAttach:{
	interestType?	//计息方式
	interestTypeName?	//计息方式名称
	paymentWay?	//还款方式
	paymentWayName?	//还款方式名称
	interestValue?	//利率
	interestValuePercent?	//利率百分比
}={}

repaymentPlan:{
	repaymentPlan?	//还款期数
	repaymentPlanDate?	//还款日
	repaymentPrinciple?	//应还本金
	repaymentInterest?	//应还利息
	statusDic?	//状态字典
}[]=[]
	
	
	auditTwoBy

	@ViewChild(GalleryComponent) gallery:GalleryComponent;
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private session:SessionStorageService,
		private spreadCheck:SpreadCheckService,
		private auth:AuthRoleService,
		private submitLoading:SubmitLoadingService,

		){
		// setTimeout(()=>{
		// 	this.gallery.open();
		// },3000);
		
	} 
	ngOnInit(){
		this.getData();
		this.auditTwoBy=this.auth.userName;
		this.submitLoading.show=false
		
	}

	getData(){
		this.spreadCheck.getData(this.route.params['value']['id'])
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
		this.rolloverLoan=res.body.rolloverLoan
		this.financeApply=res.body.financeApply
		this.productsAttach=res.body.productsAttach
		this.repaymentPlan=res.body.repaymentPlan


	}


	// checkAttach(e,id){
	// 	let url=this.spreadCheck.getAttachUrl(id)
	// 	this.gallery.open(e,url);
	// }

	back(){
		window.history.back()
	}

	rolloverLoanApplyReply(status){
		this.submitLoading.show=true

		let sendData:SendData={
			rolloverApplyId:this.rolloverLoan.rolloverApplyId,
			auditTwoBy:this.auditTwoBy,
			status:status,
			auditTwoRemarks:this.rolloverLoan.auditTwoRemarks
		}
		this.spreadCheck.rolloverLoanApplyReply(sendData)
			.then(res=>{
				console.log(res)
				this.submitLoading.show=false

			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
				this.submitLoading.show=false

			})
	}
	goToDetail(){
		console.log(this.route)
		console.log(this.router.url)
		this.session.deleteItem('memberDetailDomain')
		this.session.memberDetailDomain=this.router.url
		this.router.navigate(['memberM/memberManage/detail',this.rolloverLoan.memberId])
	}


}