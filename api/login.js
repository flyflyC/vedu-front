import request from '@/utils/request'
export default {
  //登录
  submitLoginUser(userInfo) {
    return request({
      url: `/member/login`,
      method: 'post',
      data:userInfo
    })
  },
  //根据token获取用户信息
  getLoginUserInfo(){
    return request({
      url: `/member/getMemberInfo`,
      method: 'get',
    })
  }
}
