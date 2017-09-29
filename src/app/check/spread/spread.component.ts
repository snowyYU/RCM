import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SpreadService,SendData } from './spread.service';
import { PopService } from 'dolphinng'

@Component({
	moduleId: module.id,
	selector: 'spread',
	templateUrl: 'spread.component.html',
	styleUrls:['spread.component.less'],
	providers:[SpreadService]

})
export class SpreadComponent implements OnInit {
	dataList:any
	//分页参数
	loading:boolean
	page:number=0;
	count:number
	rows:number=10;
	authApplyReplyNum:number
	constructor(
		private authList:SpreadService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,

		){}

	ngOnInit(){
		// this.authApplyReplyNum=this.route.params['value']['count'];
		this.getList(1)

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
		this.router.navigate(['check/spread/spreadCheck',data.rolloverApplyId])
	}

	detail(data){
		this.router.navigate(['check/spread/spreadDetail',data.rolloverApplyId])
	}
}