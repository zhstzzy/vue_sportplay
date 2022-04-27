<template>
  <div class="login_container">
    <!-- 登录块 -->
    <div class="login_box">
      <!-- 图标块 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <div class="login_form">
        <!-- 表单区域 -->
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="100px">
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-denglu-yonghu"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password" show-password></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login('loginFormRef')">登录</el-button>
            <el-button @click="resetLoginForm('loginFormRef')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "用户名为必填项", trigger: "blur" },
          { min: 5, max: 12, message: "用户名需要在 5 ~ 12 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" },
          { min: 6, message: "密码至少需要6位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.axios.post("/login",this.loginForm);
          console.log(res);
          if (res.code == 200) {
            this.$message.success("登录成功")
            this.$router.push({path:"/home"})
          }else{
            this.$message.error("登录失败")
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单内容
    resetLoginForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translate(-50%, 50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 70%;
    padding: 5px;
    box-shadow: 0 0 2px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  text-align: center;
  transform: translate(-10%);
}
.login_form {
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding-right: 30px;
  box-sizing: border-box;
}
</style>
