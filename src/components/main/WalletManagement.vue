<template>
    <div>
        <el-row class="filter">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="收支明细" name="first">收支明细</el-tab-pane>
                <el-tab-pane label="提现审核" name="second">提现审核</el-tab-pane>
                <el-tab-pane label="收益排行" name="third">收益排行</el-tab-pane>
            </el-tabs>
        </el-row>

        <el-row :gutter="20" v-show="activeName == 'first'">
            <el-col :span="24">
                <div class="filter">

                    <el-col :span="5">
                        <el-select v-model="type" placeholder="选择类型">
                            <el-option label="收入" value="收入">
                            </el-option>
                            <el-option label="支出" value="支出">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="5">
                        <el-input v-model="content" placeholder="搜索收款人或描述栏"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker v-model="startTime" type="datetime" placeholder="开始日期时间">
                        </el-date-picker>
                    </el-col>

                    <el-date-picker v-model="endTime" type="datetime" placeholder="结束日期时间">
                    </el-date-picker>



                    <el-button type="primary" @click="getPatmentsList()">查询</el-button>
                </div>

                <el-table height="600px" :data="paymentsTable" style="width: 100%">
                    <el-table-column prop="type" label="类型" width="180">
                    </el-table-column>
                    <el-table-column prop="phone" label="号码" width="180">
                    </el-table-column>
                    <el-table-column label="日期">
                        <template slot-scope="scope">
                            {{ scope.row.dateTime.slice(0, 10) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="时间">
                        <template slot-scope="scope">
                            {{ scope.row.dateTime.slice(11, 19) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="描述栏">
                    </el-table-column>
                    <el-table-column prop="userName" label="收款人">
                    </el-table-column>
                    <el-table-column prop="amount" label="金额">
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>

        <el-row v-show="activeName == 'second'">
            <el-col :span="24">
                <el-table height="600px" :data="walletItemTable">
                    <el-table-column label="提现审核">
                        <el-table-column prop="description" label="提现明细" width="300">
                        </el-table-column>
                        <el-table-column label="备注" width="180">
                            <template slot-scope="scope">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="scope.remark">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <el-button type="primary" @click="click('img')">完成打款</el-button>
                        </el-table-column>
                    </el-table-column>

                </el-table>

            </el-col>
            <input type="file" id="img" hidden="hidden" accept="image/*">
        </el-row>

        
        <el-row :gutter="90" v-show="activeName == 'third'">
            <el-col :span="5" v-for="i in 4">
                <el-table height="300px" :data="walletItemTable">
                    <el-table-column label="今日收益排行榜">
                        <el-table-column label="姓名" width="120">

                        </el-table-column>
                        <el-table-column label="金额" width="120">

                        </el-table-column>
                    </el-table-column>

                </el-table>
            </el-col>

        </el-row>

    </div>
</template>
<script>
export default {
    data() {
        return {


            

            activeName: 'first',

            content: "",
            type: "",
            startTime: null,
            endTime: null,



            walletItemTable: [],
            paymentsTable: [],

        };
    },
    methods: {
        getItemList() {
            this.$api.get('wallet/getWalletItemList', {
            }, response => {
                this.walletItemTable = response.data.data
            })
        },
        
        getPatmentsList() {

            this.$api.get('wallet/getPaymentsList', {
                startTime: this.dateToString(this.startTime),
                endTime: this.dateToString(this.endTime),
                type: this.type,
                content: this.content
            }, response => {
                this.paymentsTable = response.data.data
            })
        },
        dateToString(date) {
            if (date != null) {
                var y = date.getFullYear();
                var M = date.getMonth() + 1;
                var d = date.getDate();
                var H = date.getHours();
                var m = date.getMinutes();
                var s = date.getSeconds();
                return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + " " + (H < 10 ? ('0' + H) : H) + ":" + (m < 10 ? ('0' + m) : m) + ":" + (s < 10 ? ('0' + s) : s);

            }

        },











        getBillDate() {

            this.$api.get('bill/getBillDate', {
            }, response => {
                this.dates = response.data.data
                this.selectedDate = this.dates[this.dates.length - 1]
                this.getCusBillData()
            })
        },
        getCusBillData() {
            this.$api.get('bill/getCusBillData', {
                date: this.selectedDate
            }, response => {
                this.tableData = response.data.data
            })
        },
        commission(row) {
            if (this.policy == "星计划") {
                return ((row.phoneBills - row.grants) * 0.47).toFixed(2)
            }
            if (this.policy == "合伙人") {
                return (row.phoneBills * 0.565).toFixed(2)
            }
        },


        addToList(v, list) {
            for (var i = 0; i < list.length; i++) {
                if (v == list[i]) return;
            }
            list.push(v)
        },
        isInList(v, list) {
            for (var i = 0; i < list.length; i++) {
                if (v == list[i]) return true;
            }
            return false
        },
        customerInMap(customer) {
            this.$router.push({
                path: '/index/map',
                query: {
                    lat: customer.lat,
                    lng: customer.lng,
                    filter: this.filter
                }
            })
        },
        loadExcel() {
            var tableHeader = [
                ['序号', '姓名', '主卡号码', '套餐', '发展人', '状态', '当月话费', '佣金预估', '端口费预估', '合计预估'],
            ]
            var dataList = []
            this.tableData.forEach((item, index) => {
                dataList.push([index + 1, item.name, item.phone, item.packageName, item.createUser, item.status, item.phoneBills, this.commission(item), item.status == "开通" ? 15.2 : 0, Number(this.commission(item)) + (item.status == "开通" ? 15.2 : 0)]);
            })
            dataConversionUtil.dataToExcel('客户信息', tableHeader, dataList)
            this.$message.success('导出成功!');
        },
        filterTable() {
            var i = this.getIndex(this.fileters.townshipValue, "value", this.fileters.townships)
            if (i >= 0 && this.fileters.townships[i].villages != this.fileters.villages) {
                this.fileters.villages = this.fileters.townships[i].villages
                this.fileters.villageValue = ""
            }

            this.tableData = [];
            for (var i = 0; i < this.allDataTable.length; i++) {
                if (this.fileters.statusValue && this.allDataTable[i].status != this.fileters.statusValue) continue;
                if (this.fileters.packageValue && this.allDataTable[i].packageName != this.fileters.packageValue) continue;
                if (this.fileters.typeValue && this.allDataTable[i].type != this.fileters.typeValue) continue;
                if (this.fileters.townshipValue && this.allDataTable[i].township != this.fileters.townshipValue) continue;
                if (this.fileters.villageValue && this.allDataTable[i].village != this.fileters.villageValue) continue;
                this.tableData.push(this.allDataTable[i])

            }


        },
        getIndex(v, name, list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i][name] == v) return i;
            }
            return -1;
        },
        click(id) {
            document.getElementById(id).click();
        },
        uploadJSON() {
            const selectedFile = document.getElementById('json').files[0]
            // 读取文件名
            const name = selectedFile.name
            // 读取文件大小
            const size = selectedFile.size
            // FileReader对象，h5提供的异步api，可以读取文件中的数据。
            const reader = new FileReader()
            // readAsText是个异步操作，只有等到onload时才能显示数据。
            reader.readAsText(selectedFile)
            reader.onload = r => {
                //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
                console.log(r.currentTarget.result);
                this.$api.post("/bill/addBillList",
                    JSON.parse(r.currentTarget.result),
                    response => {
                        this.$alert(response.data.data, '提示', {
                            confirmButtonText: '确定',
                        });
                    }
                )

            }
        },

    },
    mounted() {
        this.getItemList()
        this.getPatmentsList()
    },
    watch: {

        startTime: {
            handler(newValue, preValue) {


            }
        },

        fileters: {
            deep: true,
            handler(newValue, preValue) {
                this.filterTable()
                console.log(1)
            }
        },
        selectedDate: {
            handler(newValue, preValue) {
                this.getCusBillData()
            }
        }
        // 'fileters.townshipValue':{
        //   handler(newValue, preValue) {

        //   }
        // }
    }
}
</script>
<style scoped>
.el-table {

    padding: 0px;
    line-height: 20px;
}
</style>