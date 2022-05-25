<template>
  <div class="home">
    <el-container class="home-container">
      <el-header>
        <div class="div-header">
          <img class="logo-header" src="../assets/logo.png" alt />
          <span>个人运动平台</span>
        </div>
        <div>
          <span style="margin-right: 15px;">{{username}}</span>
          <el-button type="info" @click="logout">登出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <template v-slot:title>
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item :index="it.path" v-for="it in item.subList" :key="it.id" @click="saveNavState(it.path)">
                <i :class="it.icon"></i>
                <span>{{ it.title }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      username: "",
      menuList: [],
      activePath:"/user",
    };
  },
  created() {
    this.username = window.sessionStorage.getItem("user");
    // 查询menuList
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 安全退出
    logout() {
      window.sessionStorage.clear(); //清除 session
      this.$router.push("/login");
    },
    // 获取导航菜单方法
    async getMenuList() {
      const { data: res } = await this.axios.get("/menus");
      console.log(res);
      if (res.code != 200) return this.$message.error({ showClose: true, message: res.message });
      this.menuList = res.data.menus;
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath){
      // 放入 session 中
      window.sessionStorage.setItem("activePath",activePath);
      this.activePath = activePath;
    }
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 2%;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .div-header {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #e9eef3;
}

.logo-header {
  width: 65px;
  height: 65px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
