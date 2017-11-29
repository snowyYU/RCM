import { Component,OnInit } from '@angular/core';
import { ViewChild ,ElementRef} from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { UseDetailService } from './use-detail.service'
import { GalleryComponent} from 'dolphinng';

import { PreviewerComponent } from '../../../../utils/previewer/previewer.component'
import {img,file } from "../../../../utils/previewer/filetype"

import { LibraryService } from "snowy-library-ng"
@Component({
	selector:'use-detail',
	templateUrl:'./use-detail.component.html',
	styleUrls:['./use-detail.component.less'],
	providers:[UseDetailService]
})
export class UseDetailComponent implements OnInit{
	
          
	borrowApplyId	//贷款单号：
	createTime	//申请时间：
	status	//状态：
	statusName	//状态：
	loanTime	//放款时间：
	companyName	//企业名称：
	memberId	//企业ID：
	applyAmount	//申请金额：
	approveAmount	//贷款金额：
	productName	//贷款产品：
	borrowHowlong	//贷款周期：
	repaymentWay	//还款方式：
	rate	//利率：
	rateType	//计息方式：

	proveDataList:any[]=[]
    
	//一审相关信息
	firstCheckPeople:string=''
	firstCheckTime:string=''
	firstCheckOpinion:string=''

	//二审相关信息
	secondCheckOpinion:string=''

	attachment:object={}
	@ViewChild(GalleryComponent) gallery:GalleryComponent;
	@ViewChild(PreviewerComponent) previewer:PreviewerComponent;

	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private useDetail:UseDetailService,
		private library:LibraryService
		){
		// setTimeout(()=>{
		// 	this.gallery.open();
		// },3000);
		
	} 
	ngOnInit(){
		this.getData()
			.then(res=>{
				this.getFirstLogList()
			})
			.then(res=>{
				this.getSecondLogList()
			})
			.then(res=>{
				this.useDetail.getDicData_fbps("interest_type")
					.then(res=>{
						res.body.records.forEach(e=>{
							if (e.value==this.rateType) {
								this.rateType=e.label
							}
						})
					})
			})
			.then(res=>{
				this.useDetail.getDicData_fbps("payment_way")
					.then(res=>{
						res.body.records.forEach(e=>{
							if (e.value==this.repaymentWay) {
								this.repaymentWay=e.label
							}
						})
					})
			})
		this.getProveDataList();
	}

	getData():Promise<any>{
		return this.useDetail.getData(this.route.params['value']['id'])
				.then(res=>{
					console.log(res)
					this.handle(res)
					return Promise.resolve(res)
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
		this.borrowApplyId=res.body.borrowApplyId	//贷款单号：
		this.createTime=res.body.createTime	//申请时间：
		this.status=res.body.status	//状态：
		this.statusName=res.body.statusName	//状态：
		this.loanTime=res.body.loanTime	//放款时间：
		this.companyName=res.body.companyName	//企业名称：
		this.memberId=res.body.memberId	//企业ID：
		this.applyAmount=res.body.applyAmount	//申请金额：
		this.approveAmount=res.body.approveAmount	//贷款金额：
		this.productName=res.body.productName	//贷款产品：
		this.borrowHowlong=res.body.borrowHowlong	//贷款周期：
		this.repaymentWay=res.body.repaymentWay	//还款方式：
		this.rate=res.body.rate	//利率：
		this.rateType=res.body.rateType	//计息方式：

	}

	getProveDataList(){
		this.useDetail.getProveDataList(this.route.params['value']['id'])
			.then(res=>{
				console.log(res)
				this.proveDataList=res.body.records
				this.attachment=this.library.changeToKeyValue(this.proveDataList,"fileLoadId")
				console.log(this.attachment)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}
	getFirstLogList(){
		this.useDetail.getLogList(this.borrowApplyId,2)
			.then(res=>{
				console.log(res)
				this.firstCheckPeople=res.body.records[0].createBy
				this.firstCheckTime=res.body.records[0].createTime
				this.firstCheckOpinion=res.body.records[0].remarks
			})
	}
	getSecondLogList(){
		this.useDetail.getLogList(this.borrowApplyId,3)
			.then(res=>{
				if (res.body.records[0]) {
					this.secondCheckOpinion=res.body.records[0].remarks
					
				}
			})
	}

	//show方法，获取文件信息方法，下载方法--start
	show(e,fileLoadId){
		console.log(fileLoadId)
		
		if (fileLoadId) {
			let url:any=this.useDetail.getFileUrl(fileLoadId)
			let extension=this.attachment[fileLoadId].extension
			let event=e

			// this.gallery.open(e,url);
			//这里判断上传文件的类型
			//分为可以预览的和不可以预览的，不可以预览的需要下载
			console.log("show 方法中的文件后缀",extension)

			if(img.indexOf(extension)>=0||file.indexOf(extension)>=0){
				if (img.indexOf(extension)>=0) {
					this.previewer.open(event,url,"img")
					
				}else if (file.indexOf(extension)>=0) {
					this.previewer.open(event,url,"file")
					
				}
			}else{
				this.pop.confirm({
					title:"提示框",
					text:"此文件不支持预览，是否下载查看？"
				}).onConfirm(()=>{
					this.download(fileLoadId)
				})
			}
		}/*else{
			this.pop.error({
				title:'错误提示',
				text:'无此文件！'
			})
		}*/
	}

	tranferFileType(fileType,fileLoadId){
		this.attachment[fileLoadId].extension=fileType
		console.log(fileType)
	}

	download(fileLoadId){
		if (!!this.attachment[fileLoadId]) {
			let url=this.useDetail.downLoadFile(this.attachment[fileLoadId].fileLoadId)
			// window.open(url)
			console.log(url)
			window.location.href =url
			
		}else{
		
			this.pop.info({
				title:"提示信息",
				text:"下载失败"
			})
		}
	}

	//--end

	back(){
		window.history.back()
		
	}

}