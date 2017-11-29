import {environment} from '../../environments/environment'



/**
 * 环境
 */
interface Environment{
  production?: boolean,
  test?:boolean,
  development?:boolean
}

interface Host{
   api:string;
   oauth:string;
   fbps:string;
   file:string;
 }
 interface System{
   name:string;
   link:{
     dev:string,
     test:string,
     prod:string
   };
   active?:boolean;
 }

/**
 * 主机地址
 */
class HostManage{
  dev:string;
  test:string;
  prod:string;

  /**
   * 构造函数
   * @param dev 开发环境地址
   * @param test 测试环境地址
   * @param prod 生产环境地址
   */
  constructor(dev:string,test:string,prod:string){
    this.dev=dev;
    this.test=test;
    this.prod=prod;
  }

  /**
   * 获取当前环境主机地址
   * @param env
   * @returns {string}
   */
  getCurrentHost(env:Environment){
    if(env.production){
      return this.prod;
    }else if(env.test){
      return this.test;
    }else{
      return this.dev;
    }
  }
}

/**
 * 
 */
class Config{
  name: string;
  version: string;
  env: Environment;
  private host:{
    dev:Host,
    test:Host,
    prod:Host
  };
  private systems:System[];
  constructor(){
    this.init();
    this.initEnv();
    this.initHost();
    this.initSystems();
  }
  init(){
    this.name='fbps_web';
    this.version='0.01';
    this.env={
      production:environment.production,
      test:environment.test,
      development:environment.development
    };
    this.host={
      dev:{
        api:'http://192.168.10.10:8090/rcm/',
        oauth:'http://192.168.10.10:8090/ims/',
        fbps:'http://192.168.10.10:8090/fbps/',
        file:'http://121.46.18.25:9090/oss/'
      },
      test:{
        api:'http://192.168.10.10:9090/crm/',
        oauth:'http://192.168.10.10:9090/ims/',
        fbps:'http://192.168.10.10:9090/fbps/',
        file:'http://121.46.18.25:9090/oss/'
      },
      prod:{
        api:'http://192.168.10.10:9090/crm/',
        oauth:'http://192.168.10.10:9090/ims/',
        fbps:'http://192.168.10.10:9090/fbps/',
        file:'http://121.46.18.25:9090/oss/'
      }
    };
    this.systems=[{
      name:'金融SaaS云平台',//系统名称
      link:{//链接
        dev:'',
        test:'',
        prod:'',
      },
      active:false //是否激活（当前系统）
    },{
      name:'金融业务处理系统',
      link:{//链接
        dev:'http://192.168.10.10:8091/fbps',
        test:'http://192.168.10.10:9091/fbps',
        prod:'',
      },
      active:false
    },{
      name:'客户关系管理系统',
      link:{//链接
        dev:'http://192.168.10.10:8090/crm',
        test:'http://192.168.10.10:9090/crm',
        prod:'',
      },
      active:false
    },{
      name:'金融风控管理系统',
      link:{//链接
        dev:'http://192.168.10.10:8091/rcm',
        test:'http://192.168.10.10:9091/rcm',
        prod:'',
      },
      active:true
    },{
      name:'银行账户管理系统',
      link:{//链接
        dev:'',
        test:'',
        prod:'',
      },
      active:false
    },{
      name:'后台综合管理系统',
      link:{//链接
        dev:'http://192.168.10.10:8091/ims',
        test:'http://192.168.10.10:9091/ims',
        prod:'',
      },
      active:false
    }];
  }





initEnv() {
     //根据外部环境(assets/config/environment.js)设置覆盖当前环境设置
     if (window['config'] && typeof window['config'] === 'object') {
       //env
       let env: string = window['config']['env'];
       (typeof env === 'string') && (env = env.toLowerCase());
       if (env === 'prod' || env === 'production') {
         this.env.production = true;
         this.env.test = false;
         this.env.development = false;
       } else if (env === 'test') {
         this.env.production = false;
         this.env.test = true;
         this.env.development = false;
       } else if (env === 'dev' || env === 'development') {
         this.env.production = false;
         this.env.test = false;
         this.env.development = true;
       }
     }
   }

initHost(){
    if(window['config']&&typeof window['config']==='object'){
      let host=window['config']['host'];
      let regUrl=/^http[s]?:\/\/\S+/;
      if(host&&typeof host==='object'){
        for(let o in host){
          if(o in this.host){
           for(let k in host[o+'']){
             if(regUrl.test(host[o+''][k+''])){
               this.host[o+''][k+'']=host[o+''][k+''];
             }
           }
          }
        }
      }
    }
  }
  initSystems(){
    if(window['config']&&typeof window['config']==='object'){
      let systems=window['config']['systems'];
      if(systems&&systems instanceof Array){
        let newSystems=[];
        for(let sys of systems){
          if(typeof sys['name']==='string'&&sys['link']&&typeof sys['link']==='object'){
            let system:System={
              name:sys['name'],
              link:{
                dev:sys['link']['dev']||'',
                test:sys['link']['test']||'',
                prod:sys['link']['prod']||''
              },
              active:!!sys['active']
            };
            newSystems.push(system);
          }
        }
        if(newSystems.length>0){
          this.systems=newSystems;
        }
      }
    }
  }


  getHost():Host{
    if(this.env.production){
      return this.host.prod;
    }else if(this.env.test){
      return this.host.test;
    }else if(this.env.development){
      return this.host.dev;
      }
    }

  getSystems():{
    name:string,
    link:string,
    active?:boolean
  }[]{
    let systems=[];
    for(let sys of this.systems){
      let link='';
      if(this.env.production){
        link=sys.link.prod;
      }else if(this.env.test){
        link=sys.link.test;
      }else if(this.env.development){
        link=sys.link.dev;
      }
      let system={
        name:sys.name,
        link:link,
        active:!!sys.active
      };
      systems.push(system);
    }
    return systems;
  }
  }
  

//基本配置
export const config=new Config();
//host
export const cur_host=config.getHost();



//项目主接口地址


export  const host=cur_host.api;

//认证相关接口地址
export const host_ims=cur_host.oauth;

//业务系统host
export const host_fbps=cur_host.fbps;

//文件相关接口host
export const host_file=cur_host.file;

//文件接口地址

export const file_api={
  getInfo:host_file+'file/getInfo',
}

export const API = {
  login: {
    url: 'oauth/login',
    method: 'post'
  },
  setPassword:{//修改密码/审核口令
    url:'/iam/employee/setPwd',
    method: 'post'
  },
  /*-----------------------------------刷新Token---------------------------------------*/
  refreshToken:{
    url:'oauth/refreshToken',
    method:'post'
  },
  /*-----------------------------------地址类接口---------------------------------------*/
  areaAddress:{
    url:'sys/area/getByPage',
    method:'get'
  },


  /*-----------------------------------字典列表接口---------------------------------------*/

  getDictList:{
    url:'sys/dict/getDictList',
    method:'get'
  },
  getDicList_fbps:{
    url:'base/dictionary/dictionaryList',
    method:'get',
    host:host_fbps
  },

  /*-----------------------------------审批事项---------------------------------------*/

  /*
    会员认证审批
   */
  authMemberList:{//获取会员认证申请列表（分页）
    url:'sem/memberAuth/getByPage',
    method:'get'
  },

  authMemberDetail:{//根据认证ID获取认证详情
    url:'sem/memberAuth/getById',
    method:'get'
  },

  memberAuthApplyReply:{
    url:'sem/memberAuth/memberAuthApplyReply',
    method:'post'
  },

  /*
    产品授信审批
   */
  
  creditAuthList:{//产品授权审批列表
    url:'sem/creditAuth/getByPage',
    method:'get'
  },

  creditAuthDetail:{//根据ID获取产品授信详情
    url:'sem/creditAuth/getById',
    method:'get'
  },

  creditAuthHistory:{//根据ID获取产品授信历史
    url:'sem/creditAuth/getHistory',
    method:'get'
  },

  creditAuthApplyReply:{//审核产品授信申请
    url:'sem/creditAuth/creditAuthApplyReply',
    method:'post'
  },

  /*
    用款审批
   */
  loanList:{//用款列表
    url:'lms/financeApply/applyList',
    method:'get',
    host:host_fbps
  },

  loanDetail:{//用款详情
    url:'lms/financeApply/applyDetail',
    method:'get',

    host:host_fbps
  },
  secondApprove:{
    url:'lms/financeApply/secondApprove',
    method:'post',
    host:host_fbps
  },
  proveDataList:{
    url:'lms/financeApply/proveDataList',
    method:'post',
    host:host_fbps
  },
  logList:{
    url:'sys/log/logList',
    method:'get',
    host:host_fbps
  },

  /*
    展期审批
   */
  getRolloverList:{
    url:'/lms/rolloverLoan/getByPage',
    method:'post'
  },
  getRolloverDetail:{
    url:'/lms/rolloverLoan/getRolloverDetail',
    method:'post'
  },
  getfinanceApply:{
    url:'/lms/rolloverLoan/getFinanceApply',
    method:'post'
  },
  getProductsAttach:{
    url:'/lms/rolloverLoan/getProductsAttach',
    method:'post'
  },
  getRepaymentPlan:{
    url:'/lms/rolloverLoan/getRepaymentPlan',
    method:'post'
  },
  saveRollover:{
    url:'/lms/rolloverLoan/rolloverApprove',
    method:'post'
  },
  
  /*-----------------------------------会员管理---------------------------------------*/
  /*-----------------------------------会员管理---------------------------------------*/
  vipManageList:{//会员管理列表
    url:'member/getByPage',
    method:'post'
  },
  getCreditFacilityList:{//查看授信额度
    url:'member/getCreditFacilityList',
    method:'get'
  },
  checkApplyExist:{//会员对应产品进行重新授信时，校验对应产品是否已经申请授信且正在审批
    url:'sem/creditAuth/checkApplyExist',
    method:'post'
  },
  getProductsList:{//根据appId获取产品列表
    url:'sem/creditAuth/getProductsList',
    method:'post'
  },
  getProductsParam:{
    url:'sem/creditAuth/getProductsParam',
    method:'post'
  },
  creditAuthApply:{//保存产品授信|重新授信接口
    url:'sem/creditAuth/creditAuthApply',
    method:'post'
  },
  memberDetailMain:{//查询单个会员的概要详情
    url:'member/getMemberOutline',
    method:'get'
  },
  changeServiceMan:{//用户主管级别用户，会员管理模块变更客服经理
    url:'member/changeServiceMan',
    method:'post'
  },


  memberCompanyInfo:{//会员详情>尽调资料>企业基本信息
    url:'member/getMemberBaseInfo',
    method:'get'
  },
  //企业基本信息四个保存编辑接口
  saveCompanyBorrower:{//修改借款人信息
    url:'ms/commondb/companyBorrower/update',
    method:'post'
  },
  saveCompanyInfo:{//修改公司信息
    url:'ms/commondb/company/update',
    method:'post'
  },
  saveCompanyLegal:{//修改法人信息
    url:'ms/commondb/companyLegal/update',
    method:'post'
  },
  saveCompanyBankCard:{//修改银行信息
    url:'ms/commondb/companyBankCard/update',
    method:'post'
  },
  getBanks:{//获取银行列表
    url:'base/baseBankController/getBanks',
    method:'post'
  },
  getSubbankList:{// 获取指定银行支行列表
    url:'base/baseBankController/getSubbankList',
    method:'post'
  },
  updateApply:{//修改银行信息
    url:'ms/commondb/companyBankCard/updateApply',
    method:'post'
  },
  upBankCardApply:{//公司银行卡编辑
    url:'ms/commondb/companyBankCard/upBankCardApply',
    method:'post'
  },



  getOperationSituation:{//会员详情>尽调资料>运营状况
    url:'member/getOperationSituation',
    method:'get'
  },

  saveRunInfo:{//修改运营信息
    url:'ms/commondb/companyOperation/update',
    method:'post'
  },

  getRiskFill:{//会员风控补充资料
    url:'member/getRiskFill',
    method:'get'
  },

  saveCompanyAsset:{//修改资产信息
    url:'ms/commondb/companyAsset/update',
    method:'post'
  },
  saveCompanyDebt:{//修改负债信息
    url:'ms/commondb/companyDebt/update',
    method:'post'
  },
  saveCompanyCredit:{//修改履约信息
    url:'ms/commondb/companyCredit/update',
    method:'post'
  },
  getCompanyAttach:{//会员查看电子附件接口
    url:'member/getCompanyAttach',
    method:'get'
  },
  getMemberReports:{//会员尽调报告查询接口
    url:'member/getMemberReports',
    method:'get'
  },
  /*-----------------------------------删除附件接口---------------------------------------*/
  deleteAttach:{
    url:'file/deleteAttach',
    method:'post'
  },
  /*-----------------------------------文件服务器的接口---------------------------------------*/
  fileServer:host_file,
  
  loginHost:host_ims,


};

