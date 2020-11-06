import request from '../utils/request'
export default {
  // 1 博客列表（条件查询分页）
  // current当前页 limit每页记录数 queryBlog条件对象
  getBlogListPage(current, limit, queryBlog) {
    return request({
      // url: '/eduservice/blog/pageBlogCondition/'+current+"/"+limit,
      url: '/edublog/blog/pageBlogFronCondition/'+current+"/"+limit,
      //url: '/edublog/blog/findAll',
      method: 'post',
      // queryBlog条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: queryBlog
    })
  },
  detail(id){
    return request({
      url:'/edublog/blog/detail/'+id,
      method: 'get',
    })
  },
  // 删除博客
  deleteBlogById(id) {
    return request({
      url: `/edublog/blog/delete/${id}`,
      method: 'delete'
    })
  },

  // 修改博客
  updateBlogInfo(blog) {
    return request({
      url: `/edublog/blog/updateBlog`,
      method: 'post',
      data: blog
    })
  },
  // 修改并发布博客
  updateIssueBlog(blog) {
    return request({
      url: `/edublog/blog/updateIssueBlog`,
      method: 'post',
      data: blog
    })
  },
  //展示个人博客
  pageMyBlogCondition(current, limit, queryBlog) {
    return request({
      url: '/edublog/blog/pageMyBlogCondition/'+current+"/"+limit,
      method: 'post',
      data: queryBlog
    })
  },
  //判断用户是否登录
  isLogin() {
    return request({
      url: '/edublog/blog/isLogin/',
      method: 'post'
    })
  },

  //发布博客
  addMyBlog(blog){
    return request({
      url: '/edublog/blog/addBlog',
      method: 'post',
      data: blog
    })
  },
  //暂存博客
  saveBlog(blog){
    return request({
      url: '/edublog/blog/saveBlog',
      method: 'post',
      data: blog
    })
  },
  //分页获得博客评论
  getPageList(page, limit, blogId) {
    return request({
      url: `/eduBlog/commentator/pageComment/${page}/${limit}/${blogId}`,
      method: 'get',
      //params: {courseId}
    })
  },

  //添加评论
  addComment(comment) {
    return request({
      url: `/eduBlog/commentator/addComment`,
      method: 'post',
      data: comment
    })
  }

}
