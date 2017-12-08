import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { SpreadCheckService } from './spread-check.service'
import { ViewChild ,ElementRef} from '@angular/core';
import { SendData } from './spread-check.service'
import { SessionStorageService } from '../../../../services/session-storage/session-storage.service'

import { AuthRoleService } from '../../../../services/authRole/authRole.service'
import { SubmitLoadingService } from '../../../../utils/submit-loading/submit-loading.service'
import { DateService } from '../../../../services/date/date.service'

@Component({
	selector:'spread-check',
	templateUrl:'./spread-check.component.html',
	styleUrls:['./spread-check.component.less'],
	providers:[SpreadCheckService,DateService]
})
export class SpreadCheckComponent implements OnInit{
    loading:boolean
    submitting:boolean=false
    down:boolean=false
    show:boolean=false
    //拜访日期在当日之前
	maxDate

    rolloverApplyId            //展期单号
    createTime                //创建时间
    status                    //状态
    statusName                //状态，中文
    
    memberId                //会员ID
    companyName                //企业名称
    repaymentCapital          //展期金额
    rolloverDeposit            //展期保证金
    repaymentInterest        //本期利息
    rolloverRate            //展期利率，百分比
    rolloverDate            //承诺还款日期
    comfirmRolloverDate        //批准还款日期

    remarks                    //申请理由
    
    borrowApplyId            //贷款单号
    currentPeriod            //还款期数
    currentPeriodStr        //还款期数，中文
    
    fileLoadId                //文件提取码
    
    auditOneBy                //一审人
    auditOneRemarks            //一审意见
    auditOneTime            //一审时间
 
    auditTwoTime            //二审时间
    auditTwoBy                //二审员
    auditTwoRemarks         //二审意见

    approveAmount            //贷款金额
    productId                //产品ID
    productName                //产品名称
    ratedCycle                //贷款周期
    paymentWay                //还款方式
    paymentWayDic            //还款方式，中文
    rate                    //利率
    rateType                //计息方式
    rateTypeDic                //计息方式，中文
    
    repaymentDate            //到期还款日

    //用于记录提交申请前的页面
    memberDetailDomain

    rolloverData:{          //展期数据
        rolloverApplyId?
        createTime?
        status?
        statusName?
        memberId?
        companyName?
        repaymentCapital?
        rolloverDeposit?
        repaymentInterest?
        rolloverRate?
        rolloverDate?
        comfirmRolloverDate?
        remarks?
        borrowApplyId?
        currentPeriod?
        currentPeriodStr?
        fileLoadId?
        auditOneBy?
        auditOneRemarks?
        auditOneTime?
        auditTwoTime?
        auditTwoBy?
        auditTwoRemarks?
    }={}     
                              
    financeData:{          //借款单数据
        borrowApplyId?
        approveAmount?
        productId?
        productName?
        ratedCycle?
        paymentWay?
        paymentWayDic?
        rate?
        rateType?
        rateTypeDic?
    }={}

    repaymentList:any[]     //还款计划数据

    contractList

    constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private session:SessionStorageService,
		private spreadCheck:SpreadCheckService,
		private auth:AuthRoleService,
		private submitLoading:SubmitLoadingService,
		private dateService:DateService
		){} 

	ngOnInit(){
        this.rolloverApplyId=this.route.params['value']['id']
        this.getDetail(this.rolloverApplyId)

        this.maxDate=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:'yyyy-MM-dd'
		});
    }

    getDetail(id:string){
        this.spreadCheck.getRolloverDetail(id)
        .then(res=>{
            console.log(res)
            this.rolloverData=res.body
            return this.spreadCheck.getfinanceApply(res.body.borrowApplyId)
        })
        .then(res=>{
            this.financeData=res.body.records[0]
            return this.spreadCheck.getRepaymentPlan(this.financeData.borrowApplyId)
        })
        .then(res=>{
            this.repaymentList=res.body.records
            return this.spreadCheck.getContractList(this.financeData.borrowApplyId)

        })
        .then(res=>{
            if (res.status==200) {
                console.log(res)
                this.contractList=res.body.records
            }
        })
        .catch(res=>{
            this.pop.error({
                title:'错误信息',
                text:res.message
            })
        })  
        
    }

    //获取合同附件
    

    submitConfirm(param: number) {
		let str:string
		if(param==3){
			if(!this.rolloverRate||this.rolloverRate==''){
				this.pop.error({
                        title:'错误信息',
                        text:'展期利率不能为空'
                    })
				return
			}
			if(!this.comfirmRolloverDate||this.comfirmRolloverDate==''){
				this.pop.error({
                        title:'错误信息',
                        text:'批准还款日期不能为空'
                    })
				return
			}
			str='通过'
		}else{
			str='拒绝'
		}
		this.pop.confirm({
			title: '操作确认',
			text: '确认 '+str+' 审批申请吗？'
		}).onConfirm(() => {
			this.submit(param)
		})

    }
    
    submit(param: number){
        this.submitting=true
        let queryData:SendData={
            rolloverApplyId:this.rolloverApplyId,
            extendRate:this.rolloverRate*0.01,
            status:param,
            auditTwoRemarks:this.auditTwoRemarks,
            comfirmRolloverTime:this.comfirmRolloverDate?this.comfirmRolloverDate+' 00:00:01':''
        }
        this.spreadCheck.saveRollover(queryData)
        .then(res => {
            this.submitting=false
            console.log(res)
            this.pop.info({
                title: '提示信息',
                text: '处理成功'
            })
            this.session.memberDetailDomain='check/spread'
            this.router.navigate(['check/spread/spreadDetail',this.rolloverApplyId])
        })
        .catch(res => {
            this.pop.error({
                title: '错误提示',
                text: res.message
            })
            this.submitting=false
        })
    }


    downEvent(){
        this.show=true;
        setTimeout(()=>{this.down=true},300);
    }

    upEvent(){
        this.show=false;
        setTimeout(()=>{this.down=false},300);
    }

    back(){
		window.history.back()
	}
}