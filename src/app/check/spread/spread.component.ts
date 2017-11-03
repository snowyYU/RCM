import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
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
	status="1"

	path:string='check/spread'

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
		// if (this.route.queryParams['value']['status']) {
		// 	this.status=this.route.queryParams['value']['status']
		// }
		// this.getList(this.status)
		this.subscribeRouteParams()

	}
	subscribeRouteParams() {
  this.route.params.subscribe((params: Params)=> {
    // let tabIndex = params['tab'] ? parseInt(params['tab']) : 0;
		let status = params['status'] ? params['status'] : 1;
    let page = params['page'] ? parseInt(params['page']) : 0;
    let rows = params['rows'] ? parseInt(params['rows']) : this.rows;
    // let companyName = params['companyName'] ? params['companyName'] : '';
    // let borrowApplyId = params['borrowApplyId'] ? params['borrowApplyId'] : '';
		this.status = status;
    this.page = page;
    this.rows = rows;
		console.log(params)
		console.log(params['status'])
		console.log(this.status)


    this.getList(this.status);
  });
}
navigate(status) {
  // let tab = 0;
  // for (let i = 0, len = this.tabs.length; i < len; i++) {
  //   if (this.tabs[i].active) {
  //     tab = i;
  //     break;
  //   }
  // }
	this.status=status
  let params: {
    status,
    page: number,
    rows: number,
    companyName?: string,
    borrowApplyId?: string,
  } = {
    status: status,
    page: this.page,
    rows: this.rows,
  };
	console.log(params)
  // if (this.params.companyName !== '') {
  //   params.companyName = this.params.companyName;
  // }
  // if (this.params.borrowApplyId !== '') {
  //   params.borrowApplyId = this.params.borrowApplyId;
  // }
  this.router.navigate([this.path, params]);
}


	getList(type){
		this.authApplyReplyNum=type
		// this.router.navigate(['check/spread'], { queryParams: {status:type} });
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

	replaceDate(date:string):string{
    if(typeof date==='string'){
      return date.replace(/-/g,'/');
    }else{
      return date;
    }
  }
}
