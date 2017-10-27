import {environment} from '../../environments/environment'



/**
 * 环境
 */
interface Environment{
  production?: boolean,
  test?:boolean,
  development?:boolean
}

/**
 * 主机地址
 */
class Host{
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
 * 基本配置
 * @type {{name: string; version: string; env: {production: boolean; test: boolean; development: boolean}}}
 */
export const config :{
  name: string,
  version: string,
  env: Environment
}= {
  name: 'crm_web',
  version: '0.0.1',
  env: {
    production:environment.production,
    test:environment.test,
    development:environment.development
  }
};

{
  //根据外部环境(assets/config/environment.js)设置覆盖当前环境设置
  let env:string='';
  if(typeof window['env']==='string'){
    env=window['env'].toLowerCase();
    if(env==='prod'||env==='production'){
      config.env.production=true;
      config.env.test=false;
      config.env.development=false;
    }else if(env==='test'){
      config.env.production=false;
      config.env.test=true;
      config.env.development=false;
    }else if(env==='dev'||env==='development'){
      config.env.production=false;
      config.env.test=false;
      config.env.development=true;
    }
  }
}

//项目主接口地址
export  const host=new Host(
  'http://192.168.10.10:8090/crm/',//dev
  'http://192.168.10.10:9090/crm/',//test
  'http://192.168.10.10:9090/crm/'//prod
).getCurrentHost(config.env);

//认证相关接口地址
export const host_ims=new Host(
  'http://192.168.10.10:8090/ims/',//dev
  'http://192.168.10.10:9090/ims/',//test
  'http://192.168.10.10:9090/ims/'//prod
).getCurrentHost(config.env);

//文件相关接口地址
export const host_file=new Host(
  'http://121.46.18.25:9090',//dev
  'http://121.46.18.25:9090',//test
  'http://121.46.18.25:9090'//prod
).getCurrentHost(config.env);



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
    展期审批
   */

   spreadLoanList:{//获取展期贷款申请列表
     url:'lms/rolloverLoan/getByPage',
     method:'get'
   },

   spreadLoanDetail:{//根据ID获取展期贷款详情
     url:'lms/rolloverLoan/getDetials',
     method:'get'
   },

   spreadLoanApplyReply:{//审核展期贷款申请
     url:'lms/rolloverLoan/rolloverLoanApplyReply',
     method:'post'
   },
  

  /*-----------------------------------文件服务器的接口---------------------------------------*/
  fileServer:host_file,
  
  loginHost:host_ims,


};

