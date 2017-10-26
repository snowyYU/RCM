import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { SpreadDetailService } from './spread-detail.service'
import { ViewChild ,ElementRef} from '@angular/core';
import { GalleryComponent} from 'dolphinng';
@Component({
	selector:'spread-detail',
	templateUrl:'./spread-detail.component.html',
	styleUrls:['./spread-detail.component.less'],
	providers:[SpreadDetailService]
})
export class SpreadDetailComponent implements OnInit{

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
	auditOneRemark?	//一审意见
	auditTwoTime?	//二审时间
	auditTwoBy?	//二审员
	auditTwoRemarks?	//二审员意见
	rolloverAmount?		//展期金额
	rolloverDay?		//最长期限
}={}

financeApply:{
	approveAmount?	//借款金额
	borrowHowlong?	//借款周期
	productId?	//产品Id
	productName?	//产品名称
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


	spreadId:number; 			//申请ID
	memberTypeDic:string;	//会员类别
	serviceMan:string;		//服务经理
	createTime:string;		//申请时间	
    companyTypeDic:string;	//公司类型
    foundTime:string;		//成立时间
	registerCapital:number; //注册资金
	licenceNum:string;		//营业执照号
	companyAddress:string;	//公司地址
	companyName:string;		//客户名称
	linkName:string;		//联系人
	linkMobile:string;		//联系手机
	linkJob:string;			//联系人职位
	isLegalDic:string;		//是否法人
	linkIdcard:string;		//身份证
	auditBy:string;			//审核人
    auditDate:string;		//审核时间
    auditRemark:string;		//审核意见

    attch1Loadid
	attch1Type
	attch1TypeDic
	attch2Loadid
	attch2Type
	attch2TypeDic
	attch3Loadid
	attch3Type
	attch3TypeDic
	attch4Loadid
	attch4Type
	attch4TypeDic
	attch5Loadid
	attch5Type
	attch5TypeDic
	

	@ViewChild(GalleryComponent) gallery:GalleryComponent;
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private spreadDetail:SpreadDetailService
		){
		// setTimeout(()=>{
		// 	this.gallery.open();
		// },3000);
		
	} 
	ngOnInit(){
		this.getData();
	}

	getData(){
		this.spreadDetail.getData(this.route.params['value']['id'])
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


	checkAttach(e,id){
		let url=this.spreadDetail.getAttachUrl(id)
		this.gallery.open(e,url);
	}

	back(){
		window.history.back()
	}

}