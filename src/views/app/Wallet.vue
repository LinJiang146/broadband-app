<template>
    <div>
        <div class="details">
            <el-row>
                <el-col :span="12">
                    总收益：{{ income }}￥
                </el-col>
                <el-col :span="12">
                    已提现：{{ cash }}￥
                </el-col>
                <el-col :span="12">
                    　余额：{{ user.balance }}￥
                </el-col>
                <el-col :span="12">
                    提现中：{{ withdrawaling }}￥
                </el-col>
            </el-row>
        </div>
        <el-row class="filter">
            <el-col :span="12">
                <el-select v-model="activeName">
                    <el-option label="收益明细" value="1"></el-option>
                    <el-option label="提现明细" value="2"></el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" @click="withdrawalsVisible = true">提现</el-button>
            </el-col>
        </el-row>
        <div class="list" v-if="activeName == 1">
            <el-row class="listItem" v-for="item in paymentsList">
                <el-col :span="3">{{ item.status == 1 ? "正常" : "冻结" }}</el-col>
                <el-col :span="15">{{ item.description }}</el-col>
                <el-col :span="2">{{ item.amount + "￥" }}</el-col>


                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="opendataCard(item)">
                        详情
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div class="list" v-if="activeName == 2">
            <el-row class="listItem" v-for="item in withdrawalsList">
                <!-- <el-col :span="6">{{ item.type }}</el-col> -->
                <el-col :span="3">　{{ item.status == 1 ? "已提现" : item.status == 2 ? "已驳回" : "待审核" }}</el-col>

                <el-col :span="15">　{{ item.remark }}</el-col>
                <el-col :span="2">{{ item.amount + "￥" }}</el-col>


                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="opendataCard(item)">
                        详情
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <!-- <div class="list">
            <el-row class="listItem" v-for="item in paymentsList">
                <el-col :span="18">{{ item.description }}</el-col>
                <el-col :span="2">{{ item.amount + "￥" }}</el-col>


                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="">
                        详情
                    </el-button>
                </el-col>
            </el-row>
        </div> -->
        <el-dialog id="form" title="提现申请" :visible.sync="withdrawalsVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="提现金额">
                    <el-input v-model="form.amount"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="withdrawals()">
                        提交
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <DataCard ref="paymentCard" :attributes="[{ name: '收益状态', value: 'status' },
        { name: '获取来源', value: 'description' },
        { name: '获取时间', value: 'dateTime' },
        { name: '提现金额', value: 'amount' }]" :data-card="dataCard">

        </DataCard>
        <DataCard ref="withdrawalsCard" :attributes="[{ name: '提现状态', value: 'status' },
        { name: '提现备注', value: 'remark' },
        { name: '申请时间', value: 'dateTime' },
        { name: '审核时间', value: 'processDateTime' },
        { name: '提现金额', value: 'amount' }]" :data-card="dataCard">

            <el-row class="missionDataItem" v-show="dataCard.billingImg">
                <el-col :span="24">提现凭证</el-col>
                <el-col :span="24">
                    <GetImg ref="image"></GetImg>
                </el-col>
            </el-row>
        </DataCard>
        <!-- <el-dialog id="form" title="提现详情" :visible.sync="cardVisible">
            <div v-if="activeName == 1">
                <el-row class="missionDataItem">
                    <el-col :span="8">收益状态</el-col>
                    <el-col :span="16">{{ dataCard.status == 0 ? "冻结" : "正常" }}</el-col>
                </el-row>
                <el-row class="missionDataItem">
                    <el-col :span="8">获取来源</el-col>
                    <el-col :span="16">{{ dataCard.description }}</el-col>
                </el-row>
                <el-row class="missionDataItem">
                    <el-col :span="8">获取时间</el-col>
                    <el-col :span="16">{{ dataCard.dateTime }}</el-col>
                </el-row>
                <el-row class="missionDataItem">
                    <el-col :span="8">提现金额</el-col>
                    <el-col :span="16">{{ dataCard.amount }}</el-col>
                </el-row>

            </div>

            <div v-if="activeName == 2">
                <el-row class="missionDataItem">
                    <el-col :span="8">提现状态</el-col>
                    <el-col :span="16">{{ dataCard.status == 0 ? "待审核" : dataCard.status == 1 ? "已提款" : "已驳回" }}</el-col>
                </el-row>
                <el-row class="missionDataItem" v-show="dataCard.remark">
                    <el-col :span="8">提现备注</el-col>
                    <el-col :span="16">{{ dataCard.remark }}</el-col>
                </el-row>
                <el-row class="missionDataItem">
                    <el-col :span="8">申请时间</el-col>
                    <el-col :span="16">{{ dataCard.dateTime }}</el-col>
                </el-row>
                <el-row class="missionDataItem" v-show="dataCard.processDateTime">
                    <el-col :span="8">审核时间</el-col>
                    <el-col :span="16">{{ dataCard.processDateTime }}</el-col>
                </el-row>
                <el-row class="missionDataItem">
                    <el-col :span="8">提现金额</el-col>
                    <el-col :span="16">{{ dataCard.amount }}</el-col>
                </el-row>

                <el-row class="missionDataItem" v-show="dataCard.billingImg">
                    <el-col :span="24">提现凭证</el-col>
                    <el-col :span="24">
                        <img :src="img" :style="{ width: '100%' }">
                    </el-col>
                </el-row>
            </div>

        </el-dialog> -->
    </div>
</template>
<script>
import downloadImg from '@/api/downloadImg';
import DataCard from '@/components/app/DataCard.vue';
import GetImg from '@/components/app/GetImg.vue';
export default {
    components: {
        DataCard,
        GetImg

    },
    data() {
        return {
            paymentsList: [],
            withdrawalsList: [],


            activeName: '1',


            user: {},


            form: {},
            withdrawalsVisible: false,


            cardVisible: false,
            dataCard: {},
            img: '',
            imgMap: new Map()
        }
    },
    mounted() {
        this.$bus.$emit('header', '我的钱包');
        this.getPaymentsList()
        this.getMyUser()
        this.getMyWithdrawals()
    },
    methods: {
        opendataCard(item) {
            if (this.activeName=='1') {
                this.$refs.paymentCard.openCard()
            }else{
                this.$refs.withdrawalsCard.openCard()

            }
            this.dataCard = item
            // this.cardVisible = true
            if (item.billingImg) {
                this.$refs.image.getImg(item.billingImg)
            }
        },
        withdrawals() {
            this.$api.get("wallet/withdrawals", this.form,
                response => {
                    if (response.data.code == 1) {
                        this.$message.success(response.data.data)
                        this.withdrawalsVisible = false
                        this.getMyWithdrawals()
                        this.getMyUser()
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
        },

        getMyUser() {
            this.$api.get('/user/getMyUser', {}, response => {
                if (response.data.code == 1) {
                    localStorage.setItem('user', JSON.stringify(response.data.data))
                    this.user = response.data.data
                } else {
                    this.$message.error(response.data.msg);
                }
            })
        },

        getMyWithdrawals() {
            this.$api.get("wallet/getMyWithdrawals", {}, response => {
                if (response.data.code == 1) {
                    this.withdrawalsList = response.data.data
                } else {
                    this.$message.error(response.data.msg);
                }
            })
        },

        getPaymentsList() {
            this.$api.get('wallet/getMyPaymentsList', {
                // startTime: this.dateToString(this.startTime),
                // endTime: this.dateToString(this.endTime),
                // type: this.type,
                // content: this.content,
                // status: this.status,
                // userId: this.userId
            }, response => {
                this.paymentsList = response.data.data
            })
        },
    },
    computed: {
        income: function () {
            var count = 0;
            this.paymentsList.forEach(item => {
                if (item.status == 1) {
                    count += item.amount
                }

            })
            return count
        },
        cash: function () {
            var count = 0
            this.withdrawalsList.forEach(item => {
                if (item.status == 1) {
                    count += item.amount
                }
            })
            return count
        },
        withdrawaling: function () {
            var count = 0
            this.withdrawalsList.forEach(item => {
                if (item.status == 0) {
                    count += item.amount
                }
            })
            return count
        }

    }
}
</script>
<style scoped>
.filter {
    line-height: 4;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.missionDataItem {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.details {
    background-color: rgb(146, 197, 255);
    color: #000;
    border-width: 1px;
    border-color: rgb(9, 51, 238);
    border-radius: 10px;
    border-style: solid;
    font-size: 130%;
    line-height: 2;
}

.list {
    line-height: 60px;
}

#form {
    width: 180%;
    margin-left: -40%;
    line-height: 50px;

}

.listItem {
    font-size: 80%;
    color: #000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>