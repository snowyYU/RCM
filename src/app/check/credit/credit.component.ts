
import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CreditService,SendData } from './credit.service';
import { PopService } from 'dolphinng'
import { AuthRoleService } from '../../../services/authRole/authRole.service'



@Component({
	selector:'credit',
	templateUrl:'./credit.component.html',
	styleUrls:['./credit.component.less'],
	providers:[CreditService]
})
export class CreditComponent implements OnInit{
	dataList:any
	//分页参数
	loading:boolean
	page:number=0;
	count:number
	rows:number=10;
	authApplyReplyNum:number

	creditModal:boolean=false
	modalMemberName
	modalCreditList:any[]

	status:string="1"
	constructor(
		private authList:CreditService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private authRole:AuthRoleService

		){}

	ngOnInit(){
		// this.authApplyReplyNum=this.route.params['value']['count'];
		if (this.route.queryParams['value']['status']) {
			this.status=this.route.queryParams['value']['status']
		}
		this.getList(this.status)

	}
	getList(type){
		this.authApplyReplyNum=type
		let sendData:SendData={
			page:this.page+1,
			rows:this.rows,
			
			// serviceMan:this.authRole.userName,
			qryStatus:type,
		}
		this.authList.getListData(sendData)
					.then(res=>{
						this.handleListData(res)
					})
					.catch(res=>{
						this.pop.error({
							title:'错误提示',
							text:res.message
						})
					})
	}
	handleListData(res){
		console.log(res);
		this.loading=false;
		this.count=res.body.paginator.totalCount;
		this.dataList=res.body.records;
	}

	check(data){
		this.router.navigate(['check/credit/creditCheck',data.creditAuthId])
	}

	detail(data){
		this.router.navigate(['check/credit/creditDetail',data.creditAuthId])
	}

	history(data){
		this.creditModal=true

		this.authList.getHistoryData(data.memberId)
			.then(res=>{
				console.log(res)
				this.modalCreditList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}
	closeModal(){
		this.creditModal=false
	}
}