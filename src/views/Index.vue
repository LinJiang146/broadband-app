<template >
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>
<script>
import Aside from '@/components/aside/Aside.vue'
import Header from '@/components/header/Header.vue'

export default {
  name: 'Index',
  components: {
    Aside,
    Header
  }
}
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: rgb(105, 174, 253);
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 60px;
}


.el-main {
  background-color: #ffffff;
  color: rgb(241, 69, 25);
  text-align: center;
  line-height: 100px !important;
  
}



</style>