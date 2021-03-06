import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { SpreadDetailService } from './spread-detail.service'
import { ViewChild ,ElementRef} from '@angular/core';
import { SessionStorageService } from '../../../../services/session-storage/session-storage.service';

import { GalleryComponent} from 'dolphinng';
import { PreviewerComponent } from '../../../../utils/previewer/previewer.component'
import {img,file } from "../../../../utils/previewer/filetype"

import { LibraryService } from "snowy-library-ng"

@Component({
	selector:'spread-detail',
	templateUrl:'./spread-detail.component.html',
	styleUrls:['./spread-detail.component.less'],
	providers:[SpreadDetailService,LibraryService]
})
export class SpreadDetailComponent implements OnInit{
    loading:boolean
    submitting:boolean=false
    down:boolean=false
    showArrow:boolean=false

    rolloverApplyId            //展期单号
    // createTime                //创建时间
    // status                    //状态
    // statusName                //状态，中文
    
    // memberId                //会员ID
    // companyName                //企业名称
    // repaymentCapital          //展期金额
    // rolloverDeposit            //展期保证金
    // repaymentInterest        //本期利息
    // rolloverRate            //展期利率，百分比
    // rolloverDate            //承诺还款日期
    // comfirmRolloverDate        //批准还款日期

    // remarks                    //申请理由
    
    // borrowApplyId            //贷款单号
    // currentPeriod            //还款期数
    // currentPeriodStr        //还款期数，中文
    
    // fileLoadId                //文件提取码
    
    // auditOneBy                //一审人
    // auditOneRemarks            //一审意见
    // auditOneTime            //一审时间
 
    // auditTwoTime            //二审时间
    // auditTwoBy                //二审员
    // auditTwoRemarks         //二审意见

    // approveAmount            //贷款金额
    // productId                //产品ID
    // productName                //产品名称
    // ratedCycle                //贷款周期
    // paymentWay                //还款方式
    // paymentWayDic            //还款方式，中文
    // rate                    //利率
    // rateType                //计息方式
    // rateTypeDic                //计息方式，中文
    
    // repaymentDate            //到期还款日

    //用于记录提交申请前的页面
    memberDetailDomain


    contractList:any[]=[]

    attachment:object={}

    @ViewChild(GalleryComponent) gallery:GalleryComponent;
    @ViewChild(PreviewerComponent) previewer:PreviewerComponent;
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

	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private spreadDetail:SpreadDetailService,
        private sessionStorage:SessionStorageService,
        private libraryF:LibraryService
	){}
	ngOnInit(){
        this.rolloverApplyId=this.route.params['value']['id']
        this.getDetail(this.rolloverApplyId)
    }

    getDetail(id:string){
        this.spreadDetail.getRolloverDetail(id)
        .then(res=>{
            console.log(res)
            this.rolloverData=res.body
            this.attachment[res.body.fileLoadId]={}
            return Promise.resolve(res.body)
        })
        // .then(res=>{
        //     this.spreadDetail.getContractList(res.borrowApplyId)
        //         .then(res=>{
        //             console.log(res)
        //     })
        //     return Promise.resolve(res)

        // })
        .then(res=>{
            this.spreadDetail.getContractList(res.rolloverApplyId)
                .then(res=>{
                    console.log(res)
                    this.contractList=res.body.records
                    if (res.body.records[0]) {
                        res.body.records.forEach(e=>{
                            this.attachment[e.fileLoadId]=e
                        })
                    }
            })
            this.spreadDetail.getfinanceApply(res.borrowApplyId)
                .then(res=>{
                    console.log(res)
                    this.financeData=res.body.records[0]
                    return Promise.resolve(res.body.records[0])
                })
                .then(res=>{
                    this.spreadDetail.getRepaymentPlan(res.borrowApplyId)
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
        .catch()
        
    }
    

    //--end

    downEvent(){
        this.showArrow=true;
        setTimeout(()=>{this.down=true},300);
    }

    upEvent(){
        this.showArrow=false;
        setTimeout(()=>{this.down=false},300);
    }

    back(){
		console.log(this.sessionStorage.memberDetailDomain)
        if(!!this.sessionStorage.memberDetailDomain){
            this.memberDetailDomain=this.sessionStorage.memberDetailDomain
            this.sessionStorage.deleteItem('memberDetailDomain')
            this.router.navigate([this.memberDetailDomain])
        }else{
            window.history.back()
        }
	}
}