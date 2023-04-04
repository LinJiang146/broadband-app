<template>
    <div>

        <el-row class="type-filter">
            <el-col :span="12">
                <el-select v-model="selected" @change="" placeholder="">
                    <el-option label="全部" value=""></el-option>

                </el-select>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" @click="cusInMap()">地图查看</el-button>
            </el-col>
        </el-row>

        <div class="list">
            <el-row class="listItem" v-for="cus in cusList">
                <el-col :span="4">{{ cus.name }}</el-col>
                <el-col :span="6">{{ cus.phone }}</el-col>
                <el-col :span="10">{{ cus.packageName }}</el-col>
                <el-col :span="4">

                    <el-button type="primary" size="mini" @click="openDataCard(cus)">
                        详情
                    </el-button>



                </el-col>
            </el-row>
        </div>

        <DataCard ref="userDataCard" :attributes="[{ name: '客户姓名', value: 'name' },
        { name: '客户号码', value: 'phone' },
        { name: '备用号码', value: 'alternatePhone' },
        { name: '客户地址', value: 'address' },
        { name: '套餐名称', value: 'packageName' },
        { name: '宽带号码', value: 'broadbandNumber' },
        { name: '客户状态', value: 'status' }]" :data-card="dataCard">
            <el-row class="data-item" v-show="dataCard.image">
                <el-col :span="24">提现凭证</el-col>
                <el-col :span="24">
                    <GetImg ref="image"></GetImg>
                </el-col>
            </el-row>
            <el-row class="data-item" v-show="dataCard.lat">
                <el-col :span="8">定位</el-col>
                <el-col :span="16">
                    <el-button type="primary" @click="cusInMap(dataCard)">地图查看</el-button>
                </el-col>
            </el-row>

        </DataCard>
    </div>
</template>
<script>

import DataCard from '@/components/app/DataCard.vue';
import GetImg from '@/components/app/GetImg.vue';


export default {
    components: {
        DataCard,
        GetImg
    },
    data() {
        return {
            cusList: [],
            dataCard: {},
            selected: ''
        }
    },
    mounted() {
        this.$bus.$emit('header', '我的客户信息');
        this.getCusList()
    },
    methods: {

        cusInMap(customer) {
            if (customer) {
                this.$router.push({
                    path: '/index/map',
                    query: {
                        lat: customer.lat,
                        lng: customer.lng,
                    }
                })
            }
            else {
                this.$router.push({
                    path: '/index/map'
                })
            }
        },
        getCusList() {
            this.$api.get("broadband/getMyCusList", {}, response => {
                this.cusList = response.data.data
            })
        },

        deleteImg(index) {
            this.imgNameList.splice(index, 1)
            this.imgList.splice(index, 1)
        },




        openDataCard(row) {
            this.dataCard = row
            this.$refs.userDataCard.openCard()
            this.$nextTick(() => {
                this.$refs.image.getImg(row.image)
            })

        },
    }
}
</script>
<style scoped>
.type-filter {
    line-height: 0px;
    width: 100%;
    text-align: left;
}

.el-icon-circle-close {
    font-size: 15px;
}

.cus-img {
    width: 100%;
}

.el-icon-folder-add {
    font-size: 50px;
}

.filter {
    line-height: 120px;
}

.list {
    line-height: 60px;
}

.listItem {
    font-size: 80%;
    color: #000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#missionData {
    width: 180%;
    margin-left: -40%;
    line-height: 50px;

}

.data-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#completeMissionForm {
    width: 180%;
    margin-left: -40%;
    line-height: 50px;
}
</style>