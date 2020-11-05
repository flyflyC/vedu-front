import request from '@/utils/request'
export default {

  getPlayAuth1(vid) {
    return request({
      url: `/vod/video/getPlayAuth/${vid}`,
      method: 'get'
    })
  }

}
