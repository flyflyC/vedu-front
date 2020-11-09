<template>
  <div class="m-content" >
    <el-form v-if="isLogin>0" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <mavon-editor v-model="ruleForm.content"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm(ruleForm)">保存博客</el-button>
        <el-button type="primary" @click="submitForm(ruleForm)">立即发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="isLogin==0" style="height: 200px" >
      <!-- /无数据提示 开始-->
        <h2 class="c-666 fsize14 ml10 vam" style="color: green; background:center">还没有登录，请先登录吧...</h2>
      <!-- /无数据提示 结束-->
    </el-form>
  </div>


</template>

<script>
  import blogApi from "../../api/blog";
  export default {
    data() {
      return {
        ruleForm: {
          title: '',
          description: '',
          content: ''
        },
        isLogin:0,
        blogId:'',
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入摘要', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.isOn();
    },
    methods: {
      submitForm(blog) {
        console.log(blog)
        blogApi.addMyBlog(blog)
        .then(res=>{
          //获取返回的blog号
          //this.blogId = res.data.data.blog;
          //跳转至详情界面 TODO
          //跳转至个人博客页面
          this.$router.push({path:'/myBlog'})
        })
      },
      saveForm(blog){
        blogApi.saveBlog(blog)
        .then(res=>{
          //跳转至个人博客页面
          this.$router.push({path:'/myBlog'})
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      isOn(){
        blogApi.isLogin()
        .then(res=>{
          this.isLogin=res.data.data.isLogin;
        })
      }
    }
  }
</script>

<style scoped>

</style>
