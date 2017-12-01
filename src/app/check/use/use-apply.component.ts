
import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { UseApplyService,SendData } from './use-apply.service';
import { PopService } from 'dolphinng'
import { AuthRoleService } from '../../../services/authRole/authRole.service'



@Component({
	selector:'use-apply',
	templateUrl:'./use-apply.component.html',
	styleUrls:['./use-apply.component.less'],
	providers:[UseApplyService]
})
export class UseApplyComponent implements OnInit{
	dataList:any
	//分页参数
	loading:boolean
	
	count:number
	page:number=0;
	rows:number=10;
	companyName:string
	borrowApplyId:string

	thisPageRoute:string="check/use"

	authApplyReplyNum:number

	creditModal:boolean=false
	modalMemberName
	modalCreditList:any[]=[]

	status:string="2"
	constructor(
		private useApply:UseApplyService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private authRole:AuthRoleService

		){}

	ngOnInit(){
		this.subscribeRouteParams()

	}

	subscribeRouteParams(){
		this.route.paramMap.subscribe((paramMap:ParamMap)=>{
			paramMap['params']['rows']?this.rows=parseInt(paramMap['params']['rows']):null
			paramMap['params']['page']?this.page=parseInt(paramMap['params']['page']):null
			paramMap['params']['status']?this.status=paramMap['params']['status']:null
			paramMap['params']['companyName']?this.companyName=paramMap['params']['companyName']:null
			paramMap['params']['borrowApplyId']?this.borrowApplyId=paramMap['params']['borrowApplyId']:null
			this.loading=true
			this.getList()
		})
		
	}

	navigate(){
		let routeParam:{
			page:number;
			rows:number;
			status:string;
			companyName?:string;
			borrowApplyId?:string
		}={
			page:this.page,
			rows:this.rows,
			status:this.status
		}
		if (this.companyName) {
			routeParam.companyName=this.companyName
		}
		if (this.borrowApplyId) {
			routeParam.borrowApplyId=this.borrowApplyId
		}

		this.router.navigate([this.thisPageRoute,routeParam])
	}

	getList(){
		
		let sendData:SendData={
			page:this.page+1,
			rows:this.rows,
			status:this.status,
			companyName:this.companyName,
			borrowApplyId:this.borrowApplyId
		}
		this.useApply.getListData(sendData)
					.then(res=>{
						this.handleListData(res)
					})
					.catch(res=>{
						this.pop.error({
							title:'错误提示',
							text:res.message
						})
						this.loading=false
					})
	}
	handleListData(res){
		console.log(res);
		this.loading=false;
		this.count=res.body.paginator.totalCount;
		this.dataList=res.body.records;
	}

	
	
}