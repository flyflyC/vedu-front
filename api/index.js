import request from '@/utils/request'
export default {
  //查询课程、名师
  getHotTeacher() {
    return request({
      url: `/eduservice/indexfront/hotTeacher`,
      method: 'get'
    })
  },
  //查询课程
  getHotCourse() {
    return request({
      url: `/eduservice/indexfront/hotCourse`,
      method: 'get'
    })
  }
}
