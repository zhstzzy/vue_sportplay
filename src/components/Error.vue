<template>

</template>

<script>
export default {
  name: "Error",
  created() {
    this.$alert('登录信息失效！', '提示', {
      confirmButtonText: '确定',
    }).then((response) =>{
      localStorage.removeItem("user");
      this.$router.replace({path:'/login'})
    });
  }
}
</script>

<style scoped>

</style>