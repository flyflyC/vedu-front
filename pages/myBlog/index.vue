<template>

  <!-- /博客列表 开始 -->
  <section class="container">
    <header class="comm-title">
      <h2 class="fl tac">
        <span class="c-333">全部博客</span>
      </h2>
      <router-link to="/blogEdit" tag="li" class="myblog" active-class="current">
        <a style="color:blue ">新建博客</a>
      </router-link>
    </header>
    <section >
      <section class="c-s-dl">
        <dl>
          <dt>
            <span class="c-999 fsize14">博客类别</span>
          </dt>
          <dd class="c-s-dl-li">
            <ul class="clearfix">
              <li>
                <a title="全部" href="#" @click="gotoPage(1)">全部</a>
              </li>
              <li v-for="(blog,index) in list" :key="index" >
                <a :title="blog.title" href="#" >{{blog.title}}</a>
              </li>
            </ul>
          </dd>
        </dl>
        <div class="clear"></div>
      </section>

      <div class="mt40">
        <!-- /无数据提示 开始-->
        <section class="no-data-wrap" v-if="this.total==0">
          <em class="icon30 no-data-ico">&nbsp;</em>
          <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
        </section>
        <!-- /无数据提示 结束-->
        <article  v-if="this.total>0">
          <div class="block">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="queryBlog.title" placeholder="标题"/>
              </el-form-item>
              <el-form-item>
                <el-input v-model="queryBlog.username" placeholder="作者"/>
              </el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
              <el-button type="default" @click="resetData()">清空</el-button>
            </el-form>
          </div>

          <el-timeline>
            <el-timeline-item :timestamp="blog.gmtCreate"  placement="top" v-for="blog in list" :key="blog.id">
              <el-card>
                <h4>
                  <router-link :to="'/blog/'+blog.id">
                    {{blog.title}}
                  </router-link>
                </h4>
                <p>{{blog.description}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <br/>
          <el-pagination class="bpage"
                         background
                         layout="total,prev,pager,next,jumper"
                         :current-page="page"
                         :page-size="limit"
                         :total="total"
                         @current-change="getList">
          </el-pagination>
        </article>
      </div>
    </section>
  </section>
  <!-- /博客列表 结束 -->
</template>

<script>
  //引入调用blog.js文件
  import blogApi from '../../api/blog'
  export default {
    data() {//定义变量和初始值
      return {
        list: {},//查询之后接口返回集合
        page: 1,//当前页
        limit: 3,//每页记录数
        total: '',//总记录数
        queryBlog: {
          username:"",
          title:"",
        }, //条件封装对象
      }
    },
    created() {//页面渲染之前执行
      this.getList(1)
    },
    methods: {//创建具体的方法，调用blog.js定义的方法
      getList(page=1) {
        this.page=page
        console.log(page)
        blogApi.pageMyBlogCondition(this.page, this.limit, this.queryBlog)
          .then(response => {//请求成功
            //response接口返回的数据
            //console.log(response)
            this.total=response.data.data.total
            this.list=response.data.data.myBlog
            console.log(this.list)
            console.log(this.total)
          })
          .catch(error=>{
            console.log(error)
          })//请求失败
      },
      resetData() {//清空的方法
        //表单输入项数据清空
        this.queryBlog= {}
        //查询所有讲师数据
        this.getList()
      }
    }
  }
</script>

<style scoped>

  .block{
    margin: 0 auto;
    text-align: center;
  }

  .bpage{
    margin: 0 auto;
    text-align: center;
  }
  .myblog{
    float:right;
  }
</style>
