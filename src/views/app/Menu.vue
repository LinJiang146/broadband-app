<template>
    <div>
        <el-row>
            <el-col class="menu-item" :span="8">
                <div @click="goto('mission')">
                    <i class="el-icon-s-claim"></i>
                    <div class="text">任务大厅</div>
                </div>
            </el-col>
            <el-col class="menu-item" :span="8">
                <div @click="goto('wallet')">
                    <i class="el-icon-wallet"></i>
                    <div class="text">我的钱包</div>
                </div>
            </el-col>
            <el-col class="menu-item" :span="8">
                <div @click="goto('userData')">
                    <i class="el-icon-user"></i>
                    <div class="text">我的客户</div>
                </div>
            </el-col>
            <el-col class="menu-item" :span="8">
                <div @click="goto('package')">
                    <i class="el-icon-box"></i>
                    <div class="text">套餐详情</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$bus.$emit('header', '菜单');
    },
    methods: {
        goto(path) {
            this.$router.push({
                path: '/index/' + path,
            })
        }
    }
}
</script>
<style scoped>
.menu-item {
    font-size: 400%;
    background-color: white;
    margin-bottom: 5px;

    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.text {
    font-size: 35%;
    color: black;
    margin-top: -35%;
}
</style>