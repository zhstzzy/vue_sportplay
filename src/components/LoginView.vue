<template>
  <div class="login_container">
    <!-- 登录块 -->
    <div class="box">
      <!-- 图标块 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登录 -->
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
          <el-form-item>
            <el-button type="primary" @click="login()" class="btns">登录</el-button>
            <!-- <el-button @click="resetLoginForm('loginFormRef')">注册</el-button> -->
          </el-form-item>
          <!-- 注册跳转 -->
          <el-row style="text-align: center; margin-left: 40%">
            <el-link href="/register">没有账号？立即注册</el-link>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, unref, getCurrentInstance } from "vue";
export default {
  setup(prop) {
    const { proxy } = getCurrentInstance();
    const loginFormRef = ref(null);
    const loginForm = reactive({
      username: "",
      password: "",
    });

    const loginRules = {
      username: [
        { required: true, message: "用户名为必填项", trigger: "blur" },
        { min: 5, max: 12, message: "用户名需要在 5 ~ 12 个字符", trigger: "blur" },
      ],
      password: [
        { required: true, message: "密码为必填项", trigger: "blur" },
        { min: 6, message: "密码至少需要6位", trigger: "blur" },
      ],
    };

    const login = async () => {
      const form = unref(loginFormRef);
      if (!form) {
        proxy.$message.error("请输入用户名或密码");
        console.log("error submit!!");
        return false;
      }
      const { data: res } = await proxy.axios.post("/login", loginForm);
      console.log(res);
      if (res.code == 200) {
        proxy.$message.success(res.message);
        window.sessionStorage.setItem("user", res.data.username);
        proxy.$router.push({ path: "/home" });
      } else {
        proxy.$message.error(res.message);
      }
    };

    // const gotoRegister = () => {
    //   proxy.$router.push({ path: "/register" });
    // };

    return {
      loginFormRef,
      loginForm,
      loginRules,
      login,
      // gotoRegister,
    };
  },
  // data() {
  //   return {
  //     loginForm: {
  //       username: "",
  //       password: "",
  //     },
  //     loginRules: {
  //       username: [
  //         { required: true, message: "用户名为必填项", trigger: "blur" },
  //         { min: 5, max: 12, message: "用户名需要在 5 ~ 12 个字符", trigger: "blur" },
  //       ],
  //       password: [
  //         { required: true, message: "密码为必填项", trigger: "blur" },
  //         { min: 6, message: "密码至少需要6位", trigger: "blur" },
  //       ],
  //     },
  //   };
  // },
  // methods: {
  //   // 登录
  //   login(formName) {
  //     this.$refs[formName].validate(async (valid) => {
  //       if (valid) {
  //         const { data: res } = await this.axios.post("/login", this.loginForm);
  //         console.log(res);
  //         if (res.code == 200) {
  //           this.$message.success(res.message);
  //           this.$router.push({ path: "/home" });
  //           window.sessionStorage.setItem("username", res.data.username);
  //         } else {
  //           this.$message.error(res.message);
  //         }
  //       } else {
  //         this.$message.error("请输入用户名或密码");
  //         console.log("error submit!!");
  //         return false;
  //       }
  //     });
  //   },
  //   gotoRegister() {
  //     this.$router.push({ path: "/register" });
  //   },
  // },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.box {
  width: 450px;
  height: 320px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 25x;
  transform: translate(-50%, 78%);
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
  width: 85%;
  transform: translate(-2%);
}
.login_form {
  position: absolute;
  bottom: 5%;
  width: 100%;
  padding-right: 30px;
  box-sizing: border-box;
}
</style>
