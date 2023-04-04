<template>
    <div>
        <el-dialog id="form" title="提现详情" :visible.sync="cardVisible">
                <el-row v-for="attribute in attributes" class="data-item" v-show="dataCard[attribute.value]">
                    <el-col :span="8">{{ attribute.name }}</el-col>
                    <el-col :span="16">{{ dataCard[attribute.value] }}</el-col>
                </el-row>
                <slot>
                </slot>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ['dataCard','attributes'],
    data(){
        return{
            cardVisible:false
        }
    },
    methods:{
        openCard(){
            this.cardVisible = true
        },
        closeCard(){
            this.cardVisible = false
        }
    }
}
</script>
<style scoped>
#form{
    width: 180%;
    margin-left: -40%;
    line-height: 50px;
}
.data-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

</style>