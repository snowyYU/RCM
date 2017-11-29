import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { SpreadDetailService } from './spread-detail.service'
import { ViewChild ,ElementRef} from '@angular/core';
@Component({
	selector:'spread-detail',
	templateUrl:'./spread-detail.component.html',
	styleUrls:['./spread-detail.component.less'],
	providers:[SpreadDetailService]
})
export class SpreadDetailComponent implements OnInit{
    loading:boolean

    rolloverApplyId              //展期单号
    borrowApplyId                //贷款单号 
    memberId                     //会员ID
    repaymentPrinciple           //展期金额(元)
    companyName                  //会员名称
    status                       //状态
    statusName                   //状态,中文
    createTime                   //申请日期
    remarks                      //申请原因
    auditOneTime	             //审批时间
    auditOneBy	                 //审核员
    auditOneRemarks              //审核意见
    repaymentPlan	             //还款期数
    rolloverDate	             //申请承诺还款日期
    comfirmRolloverDate	         //批准还款日期
    realRolloverDate	         //实际还款日期
    rolloverRate	             //展期利率
    paymentWayName
    auditTwoTime                 //二审时间
    auditTwoBy                   //二审员
    auditTwoRemarks              //二审意见
    

    rolloverData:{               //展期数据
        rolloverApplyId?
        createTime?
        statusName?
        memberId?
        companyName?
        resourceId?
        remarks?
        borrowApplyId?
        repaymentPlan?
        auditOneRemarks?
        auditTwoTime?
        auditTwoBy?
        auditTwoRemarks?
    }={}     
                              
    financeData:{                //借款单数据
        borrowApplyId?
        approveAmount?
        productName?
        borrowHowlong?
        resourceId?
        productId?
        repaymentWay?
    }={}

    productData:{                //产品参数数据
        paymentWayName?
        interestValue?
        interestTypeName?
    }={}

    repaymentList:any[]          //还款计划数据

	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private spreadDetail:SpreadDetailService
	){}
	ngOnInit(){
        this.rolloverApplyId=this.route.params['value']['id']
        this.getDetail(this.rolloverApplyId)
    }

    getDetail(id:string){
        this.spreadDetail.getRolloverDetail(id)
        .then(res=>{
            console.log(res)
            this.rolloverData=res.body.records[0]
            return Promise.resolve(res.body.records[0])
        })
        .then(res=>{
            this.spreadDetail.getfinanceApply(res.borrowApplyId)
            .then(res=>{
                console.log(res)
                this.financeData=res.body.records[0]
                return Promise.resolve(res.body.records[0])
            })
            .then(res=>{
                this.spreadDetail.getProductsAttach(res.resourceId,res.productId,res.repaymentWay)
                .then(res=>{
                    console.log(res)
                    this.productData=res.body.records[0]
                    return Promise.resolve(res.body.records[0])
                })
                .then(res=>{
                    this.spreadDetail.getRepaymentPlan(this.financeData.borrowApplyId)
                    .then(res=>{
                        console.log(res)
                        this.repaymentList=res.body.records
                    })
                    .catch(res=>{
                        this.pop.error({
                                title:'错误信息',
                            text:res.message
                        })
                    })  
                })
            })
        })
    }

    back(){
		window.history.back()
	}
}