import request from '@/utils/request'
export default {
  //查询banner
  getListBanner() {
    return request({
      url: `/bannerfront/getAllBanner`,
      method: 'get'
    })
  }
}