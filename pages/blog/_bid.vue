<template>
  <div>
    <div  class="vblog" style="weight: 100%;text-align: center">
      <h2 style="font-size:38px">{{blog.title}}</h2>
      <i class="el-icon-delete" style="float: right" @click="removeDataById(id)">删除</i>
      <i class="el-icon-update" v-if="userId==memberId"  style="float: right" @click="updateBlog(id)">编辑</i>
      <el-divider></el-divider>
      <div  class="markdown-body" v-html="blog.content"></div>
       <!-- <mavon-editor v-model="blog.content"></mavon-editor>-->
    </div>
    <div class="mt50 commentHtml"><div>
      <h6 class="c-c-content c-infor-title" id="i-art-comment">
        <span class="commentTitle">博客评论</span>
      </h6>
      <section class="lh-bj-list pr mt20 replyhtml">
        <ul>
          <li class="unBr">
            <aside class="noter-pic">
              <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
            </aside>
            <div class="of">
              <section class="n-reply-wrap">
                <fieldset>
                  <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                </fieldset>
                <p class="of mt5 tar pl10 pr10">
                  <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                  <input type="button" @click="addComment()" value="回复" class="lh-reply-btn">
                </p>
              </section>
            </div>
          </li>
        </ul>
      </section>
      <section class="">
        <section class="question-list lh-bj-list pr">
          <ul class="pr10">
            <li v-for="(comment,index) in data.comments" v-bind:key="index">
              <aside class="noter-pic">
                <img width="50" height="50" class="picImg" :src="comment.avatar">
              </aside>
              <div class="of">
                <span class="fl">
                    <font class="fsize12 c-blue">
                      {{comment.nickname}}</font>
                    <font class="fsize12 c-999 ml5">评论：</font></span>
              </div>
              <div class="noter-txt mt5">
                <p>{{comment.content}}</p>
              </div>
              <div class="of mt5">
                <span class="fr"><font class="fsize12 c-999 ml5">{{comment.gmtCreate}}</font></span>
              </div>
            </li>

          </ul>
        </section>

      </section>

      <!-- 公共分页 开始 -->
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="首页"
          @click.prevent="gotoPage(1)">首</a>
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="前一页"
          @click.prevent="gotoPage(data.current-1)">&lt;</a>
        <a
          v-for="page in data.pages"
          :key="page"
          :class="{current: data.current == page, undisable: data.current == page}"
          :title="'第'+page+'页'"
          href="#"
          @click.prevent="gotoPage(page)">{{ page }}</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="后一页"
          @click.prevent="gotoPage(data.current+1)">&gt;</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="末页"
          @click.prevent="gotoPage(data.pages)">末</a>
        <div class="clear"/>
      </div>
      <!-- 公共分页 结束 -->
    </div>
    </div>
  </div>
</template>

<script>
  import 'github-markdown-css/github-markdown.css'
  import blogApi from "../../api/blog";
  import marked from 'marked'

  export default {
    asyncData({ params, error }) {
      return blogApi.detail(params.bid)
        .then(response => {
          console.log(params.bid)
          return {
            blogid:params.bid,
            //blog: response.data.data.blog,
          }
          //console.log(blog)
        })
    },
    data(){
      return{
        blog:{},
        blogId:'',
        data:{},
        page:1,
        limit:4,
        total:10,
        comment:{},
        userId:'',
        memberId:'',
      }
    },
    created() {
      this.init()
      this.initComment()
    },

    methods: {
      init() {
        /*//判断路径有id值,做修改
        if (this.$route.params && this.$route.params.id) {
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getById(id)
        } else { //路径没有id值，做添加
          //清空表单
          this.blog = {}
        }*/
        console.log(this.blogid)
        if (this.blogid!=null){
          this.getById(this.blogid)
          this.isOn()
        }else { //路径没有id值，做添加
          //清空表单
          this.blog = {}
        }
      },
      getById(id) {
        blogApi.detail(this.blogid).then(res => {
          this.blog = res.data.data.blog
          this.memberId=this.blog.memberId
          //console.log(this.blog.memberId)
          var MarkdownIt=require("markdown-it")
          var md=new MarkdownIt()
          var result = md.render(res.data.data.blog.content)
          this.blog.content = result
          //console.log(this.blog.content)
        })
      },
      isOn(){
        blogApi.isLogin()
          .then(res=>{
            this.userId=res.data.data.memberid
            //console.log("===="+this.userId)
          })
      },
      initComment(){
        blogApi.getPageList(this.page, this.limit, this.blogId)
          .then(response => {
          this.data = response.data.data
        })

      },
      addComment(){
        this.comment.blogId = this.blogId
        //this.comment.teacherId = this.courseInfo.teacherId
        blogApi.addComment(this.comment).then(response => {
          if(response.data.success){
            this.comment.content = ''
            this.initComment()
          }
        })
      },
      gotoPage(page){
        blogApi.getPageList(page, this.limit,this.blogid).then(response => {
          this.data = response.data.data
        })
      },
      updateBlog(id){
        this.$router.push({path:'/myBlog/'+this.blogid})
      },
      removeDataById(id) {
        this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  //点击确定，执行then方法
          //调用删除的方法
          blogApi.deleteBlogById(id)
            .then(response =>{//删除成功
              //提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //回到列表页面
            })
        }) //点击取消，执行catch方法
      }

    }
  }
</script>

<style scoped>
  .vblog{
    box-shadow: 0 2px 12px 0px rgba(0,0,0,0.1);
    width: 100%;
    min-height: 700px;
  }
</style>
