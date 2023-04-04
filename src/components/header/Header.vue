<template>
    <div class="header">
        <div class="back" @click="back()">
            <i class="el-icon-arrow-left"></i>
        </div>

        <div class="font">
            {{ pageName }}
        </div>

    </div>
</template>



  
<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            pageName: 'aaa'
        };
    },
    mounted() {
        this.$bus.$on('header', (name) => this.getHeaderName(name))
    }
    ,
    methods: {
        getHeaderName(name) {
            this.pageName = name
        },
        back(){
            this.$router.back();
        }
    },
    beforeDestroy() {
    this.$bus.$off('header'); //销毁解绑
  }
}
</script>
<style scoped>
.header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: rgb(110, 156, 255);
}
.back{
    float: left;
    font-size: 250%;
}
.font {
    width: 100%;
    font-family: "PingFang SC";
    font-size: 25px;
    background-color: rgb(105, 174, 253);
}

.exit {
    float: right;
    color: rgb(235, 163, 8);
    border-right: 20px;
    border-left: 20px;
}

.username {
    float: right;
    color: rgb(255, 255, 254);

}
</style>