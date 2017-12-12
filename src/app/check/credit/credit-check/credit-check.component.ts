import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { CreditCheckService,SendData,productItem } from './credit-check.service'
import { GalleryComponent} from 'dolphinng';
import { AuthRoleService } from '../../../../services/authRole/authRole.service'
import { SessionStorageService } from '../../../../services/session-storage/session-storage.service'
import { SubmitLoadingService } from '../../../../utils/submit-loading/submit-loading.service'
import { LibraryService } from 'snowy-library-ng'
import { config } from '../../../../services/config/app.config';
@Component({
	selector:'credit-check',
	templateUrl:'./credit-check.component.html',
	styleUrls:['./credit-check.component.less'],
	providers:[CreditCheckService]
})
export class CreditCheckComponent implements OnInit{
	creditAuthId:number; 			//申请ID
	createTime:string;		//申请时间	

	appId
	expiryDateBegin
	expiryDateEnd
	addCreditValue
	memberName
	memberId
	productName
	productTypeName
	serviceMan:string;		//服务经理

	oldCreditValue
	authRemark
	auditBy:string;			//审核人
    auditRemark:string;		//审核意见
    auditDate:string;		//审核时间
    memberRatingGrate=null

    memberRating=""			//评级
    memberRatingL:any[]=[]

    //授信产品列表
    creditProductList:any[]=[]
    productList:any[]=[]
    productListKey={}

	disabled:boolean=true//判断是否可以点击添加
	
    uniqueL:any[]=[]


	productLNotShow:any[]=[]

	totalCreditMount:number=0

	memberRatingGrateLimit:{
		placeholder?
		max?
		min?
	}={
		placeholder:"",
		max:null,
		min:null
	}

	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private authRole:AuthRoleService,
		private session:SessionStorageService,
		private creditCheck:CreditCheckService,
		private submitLoading:SubmitLoadingService,
		private libF:LibraryService
		){
		for (let i=1; i <100; i++) {
			this.uniqueL.push(i)
		}
		
	} 
	ngOnInit(){
		this.getData();
		this.auditBy=this.authRole.userName
		this.submitLoading.show=false
		// this.getCreditProducts()
		this.getMemberRatingL()
		
	}

	getData(){
		this.creditCheck.getData(this.route.params['value']['id'])
						.then(res=>{
							console.log(res)
							let t=(new Date()).valueOf()
							console.log("时间戳1",t)
							this.handle(res)
						})
						.then(res=>{
							console.log("test,you know",res)
							console.log("时间戳3",(new Date()).valueOf())

							this.getProductList()
						})
						.then(res=>{
							console.log("时间戳2",(new Date()).valueOf())
							this.getCreditProducts()
						})
						.then(res=>{
							this.memberRatingChange()
						})
						.catch(res=>{
							this.pop.error({
								title:'错误信息',
								text:res.message
							})
						})
	}

	getProductList(){
		this.creditCheck.getProductList(this.appId)
			.then((res)=>{
				if (res.status==200) {
					this.productList=res.body.records
					if (this.productList&&this.productList.length>0) {
						this.disabled=false
					}
					res.body.records.forEach(e=>{
						this.productListKey[e.productId]=e
					})
				}else{
					this.pop.error({
						title:"错误信息",
						text:res.message
					})
				}
			})
			.catch((res)=>{
				this.pop.error({
					title:"错误信息",
					text:"请求超时"
				})
			})
	}

	getCreditProducts(){
		console.log(this.memberId)
		if (!this.memberId) {
			return
		}
		this.creditCheck.getCreditProducts(this.memberId)
			.then((res)=>{
				if (res.status) {
					this.creditProductList=res.arr
					if (res.arr instanceof Array) {
						if (res.arr[0]) {
							this.creditProductList.forEach(e=>{
								e.uniqueId=this.libF.createUniqueId(this.uniqueL)
							})
						}else{
							this.addProductItem()
						}
							
					}
						
					//关小黑屋
					this.darkroom()
						
				}else{
					this.pop.error({
						title:"错误信息",
						text:res.message
					})
				}
			})
			.catch((res)=>{
				this.pop.error({
					title:"错误信息",
					text:res.message
				})
			})
	}
	getMemberRatingL(){
		this.creditCheck.getMemberRatingL()
			.then(res=>{
				if (res.status==200) {
					this.memberRatingL=res.body.records
					
				}else{
					this.pop.error({
						title:"错误信息",
						text:res.message
					})
				}
			})
			.catch((res)=>{
				this.pop.error({
					title:"错误信息",
					text:"请求超时"
				})
			})
	}
	//这个方法用来存已选的产品
	darkroom(){
		this.productLNotShow=[]
		this.creditProductList.forEach(e=>{
			if (e.productId) {
				this.productLNotShow.push(e.productId)
				// code...
			}
		})
		
		
	}
	ifShowThis(id){
		
		if (this.productLNotShow.indexOf(id)<0) {
			return false
		}else{
			return true
		}
	}
	//会员评级改变触发函数
	memberRatingChange(){
		this.memberRatingGrate=null
		this.creditCheck.getRateRange(this.memberRating)
			.then(res=>{
				if (res.status==200) {
					this.memberRatingGrateLimit.max=res.body.maxValue
					this.memberRatingGrateLimit.min=res.body.lowValue
					this.memberRatingGrateLimit.placeholder="评分范围"+res.body.lowValue+"～"+res.body.maxValue
				}
			})
	}

	handle(res){
		console.log(res)
		this.appId=res.body.appId
		this.creditAuthId=res.body.creditAuthId; 			//申请ID
		this.createTime=res.body.createTime
		this.expiryDateBegin=res.body.expiryDateBegin
		this.expiryDateEnd=res.body.expiryDateEnd
		this.addCreditValue=res.body.addCreditValue
		this.memberName=res.body.memberName
		this.memberId=res.body.memberId
		this.productName=res.body.productName
		this.productTypeName=res.body.productTypeName
		this.serviceMan=res.body.serviceMan;		//服务经理
		this.oldCreditValue=res.body.oldCreditValue
		this.auditDate=res.body.auditDate
		this.authRemark=res.body.authRemark
	    this.auditRemark=res.body.auditRemark;		//审核意见
	    this.memberRatingGrate=res.body.memberRatingGrate
	    this.memberRating=res.body.memberRating
	}

	countCreditMount(){
		let count=0
		this.creditProductList.forEach(e=>{
			if (typeof e.creditValue == "number") {
				count=count+e.creditValue
			}
		})
		this.totalCreditMount=count
	}

	back(){
		this.router.navigate(['check/credit'],{queryParams:{status:'1'}})
	}

	creditAuthApplyReply(result){
		console.log(this.memberRatingGrateLimit)
		//手动校验
		if (result>0) {
			if (this.memberRating) {
				if ((this.memberRatingGrate>=this.memberRatingGrateLimit.min)&&(this.memberRatingGrate<=this.memberRatingGrateLimit.max)) {
					
				}else{
					console.log(this.memberRatingGrateLimit.placeholder)
					this.pop.info({
						title:"提示信息",
						text:this.memberRatingGrateLimit.placeholder
					})
					return
				}
			}else{
				this.pop.info({
					title:"提示信息",
					text:"会员评级不能为空"
				})
				return
			}
		}

		this.submitLoading.show=true

		//传的值，productName需要从键值对象

		this.creditProductList.forEach(e=>{
			if (this.productListKey[e.productId]) {
				e.productName=this.productListKey[e.productId].productName
			}
		})
		console.log(this.creditProductList)

		let data:SendData={
			creditAuthId:this.creditAuthId,
			expiryDateBegin:this.expiryDateBegin,
			expiryDateEnd:this.expiryDateEnd,
			addCreditValue:this.addCreditValue,
			auditBy:this.auditBy,
			status:result,
			auditRemark:this.auditRemark,
			creditAuthVo2:this.creditProductList,
			memberRatingGrate:this.memberRatingGrate,
			memberRating:this.memberRating
		}
		this.creditCheck.creditAuthApplyReply(data)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示信息',
					text:'操作成功!'
				})
				this.submitLoading.show=false

				this.router.navigate(['check/credit'])
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
				this.submitLoading.show=false

			})
	}

	goToDetail(){
		console.log(this.route)
		console.log(this.router.url)
		this.session.deleteItem('memberDetailDomain')
		this.session.memberDetailDomain=this.router.url
		this.router.navigate(['memberM/memberManage/detail',this.memberId])
	}

	/**这里涉及了angular一个比较复杂的处理
	1.因为使用了ngfor循环渲染出了一个表格，并且每行有双向绑定的数据，这里引用了生成不重复随机数的方法，
	用以给name动态命名
	2.添加的逻辑为向循环数组中push进一个新的对象（对象的结构可以在service层定义，顺便把获取的数据给规范了）
	3.删除的逻辑为获取此条数据在数组中的位置，然后在数组中删除
	*/
	

	addProductItem(){
		if (this.creditProductList.length>=this.productList.length) {
			// this.pop.info({
			// 	title:"提示信息",
			// 	text:"产品数不能大于"+this.productList.length
			// })
			if(this.disabled){
				
			}else{
				this.disabled=true
			}
			return
		}
		let item:productItem={
			
				productId:'',
				productName:'',
				creditValue:'',
				expiryDateBegin:'',
				expiryDateEnd:'',
				uniqueId:this.libF.createUniqueId(this.uniqueL)
		}
		// console.log(this.uniqueL)

		this.creditProductList.push(item)
	}
	deleteProductItem(index){
		this.creditProductList.splice(index,1)
		this.countCreditMount()
	}


}