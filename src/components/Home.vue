<template>
  <div>
    Home 首页！！！
    <el-button type="info" @click="logout">登出</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username:"",  
    }
  },
  methods:{
    logout(){
      window.sessionStorage.removeItem("username")
      this.$router.push("/login");
    },
  },
}
</script>

<style>

</style>


