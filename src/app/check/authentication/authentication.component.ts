
import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { AuthenticationService,SendData } from './authentication.service';
import { PopService } from 'dolphinng'
import { AuthRoleService } from '../../../services/authRole/authRole.service'



@Component({
	selector:'authentication',
	templateUrl:'./authentication.component.html',
	styleUrls:['./authentication.component.less'],
	providers:[AuthenticationService]
})
export class AuthenticationComponent implements OnInit{
	dataList:any
	//分页参数
	loading:boolean
	page:number=0;
	count:number
	rows:number=10;
	authApplyReplyNum:number=1
	thisPageRoute:string='check/authentication'
	constructor(
		private authList:AuthenticationService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private authRole:AuthRoleService

		){}

	ngOnInit(){
		// this.authApplyReplyNum=this.route.params['value']['count'];
		// if (this.route.queryParams['value']['status']) {
		// 	this.status=this.route.queryParams['value']['status']
		// }
		// this.getList(this.status)
		this.subscribeRouteParams()
	}

	subscribeRouteParams(){
		this.route.paramMap.subscribe((paramMap:ParamMap)=>{
			console.log(paramMap)
			console.log(paramMap['params']['rows'])
			console.log(!!paramMap['params'])
	
		    paramMap['params']['rows']?this.rows=parseInt(paramMap['params']['rows']):null
            paramMap['params']['page']?this.page=parseInt(paramMap['params']['page']):null
            paramMap['params']['status']?this.authApplyReplyNum=paramMap['params']['status']:null

			this.getList(this.authApplyReplyNum)
		})
	}

	navigate(){
		let routeParam:{
			page,
            rows,
            status?
		}={
			page:this.page,
            rows:this.rows,
        }
        
        if(this.authApplyReplyNum){
            routeParam.status=this.authApplyReplyNum
        }

		console.log("router",this.router)
		console.log("activerouter",this.route)
		this.router.navigate([this.thisPageRoute,routeParam])
    }

	getList(type){
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
		this.router.navigate(['check/authentication/authCheck',data.authId])
	}

	detail(data){
		this.router.navigate(['check/authentication/authDetail',data.authId])
	}

}