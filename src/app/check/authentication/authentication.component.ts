
import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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
	authApplyReplyNum:number
	status:string="1"
	constructor(
		private authList:AuthenticationService,
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
		this.router.navigate(['check/authentication/authCheck',data.authId])
	}

	detail(data){
		this.router.navigate(['check/authentication/authDetail',data.authId])
	}

}