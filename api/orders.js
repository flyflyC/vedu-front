import request from '@/utils/request'
export default {
  //生成订单
  createOrders(courseId) {
    return request({
      url: `/orderservice/order/createOrder/${courseId}`,
      method: 'post'
    })
  },
  //根据订单id查询订单信息
  getOrdersInfo(id){
    return request({
      url: `/orderservice/order/getOrderInfo/${id}`,
      method: 'get'
    })
  },
  createNative(orderNo){
    return request({
      url: `/orderservice/payLog/createNative/${orderNo}`,
      method: 'get'
    })
  },
  queryPayStatus(orderNo){
    return request({
      url: `/orderservice/payLog/queryPayStatus/${orderNo}`,
      method: 'get'
    })
  }
}
