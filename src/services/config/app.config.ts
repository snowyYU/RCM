import {environment} from '../../environments/environment'
export const CONFIG = {
  name: 'FBPS',
  version: '0.0.1',
  env: !!environment.production
}
export const HOST = {
  dev: 'http://192.168.10.10:8090/rcm/',
  //dev:'http://192.168.1.117:8082/',
  // prod: 'http://192.168.10.10:8090/rcm-api/'
  prod: 'http://192.168.10.10:9090/rcm/'
  //测试路径
};

export const host = environment.production?HOST.prod:HOST.dev


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
     url:'lms/rolloverLoan/getById',
     method:'get'
   },

   spreadLoanApplyReply:{//审核展期贷款申请
     url:'lms/rolloverLoan/rolloverLoanApplyReply',
     method:'post'
   },
  

  /*-----------------------------------文件服务器的接口---------------------------------------*/
  fileServer:'http://121.46.18.25:9090',
  
  loginHost:environment.production?'http://192.168.10.10:9090/ims/':'http://192.168.10.10:8090/ims/',


};

