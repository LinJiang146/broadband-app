<template>
    <div>

        <el-row class="type-filter">
            <el-select v-model="selectedType" @change="" placeholder="请选择任务分类">
                <el-option  label="全部" value=""></el-option>
                <el-option v-for="item in missionType" :label="item.value" :value="item.key"></el-option>
            </el-select>
        </el-row>



        <el-dialog id="missionData" title="任务详情" :visible.sync="dataCardVisible">
            <div v-show="missionDataCard.phone">
                <el-row class="data-item">
                    <el-col :span="8">客户姓名</el-col>
                    <el-col :span="16">{{ missionDataCard.customerName }}</el-col>
                </el-row>
                <el-row class="data-item">
                    <el-col :span="8">客户电话</el-col>
                    <el-col :span="16">{{ missionDataCard.phone }}</el-col>
                </el-row>
                <el-row class="data-item">
                    <el-col :span="8">客户地址</el-col>
                    <el-col :span="16">{{ missionDataCard.address }}</el-col>
                </el-row>
                <el-row class="data-item">
                    <el-col :span="8">客户定位</el-col>
                    <el-col :span="16">
                        <el-button type="primary">定位</el-button>
                    </el-col>
                </el-row>
            </div>

            <el-row class="data-item">
                <el-col :span="8">任务类型</el-col>
                <el-col :span="16">{{ missionType2Str(missionDataCard.type) }}</el-col>
            </el-row>
            <el-row class="data-item">
                <el-col :span="8">任务描述</el-col>
                <el-col :span="16">{{ missionDataCard.description }}</el-col>
            </el-row>
            <el-row class="data-item">
                <el-col :span="8">任务金额</el-col>
                <el-col :span="16">{{ missionDataCard.amount + "￥" }}</el-col>
            </el-row>

            <el-button @click="dataCardVisible = false">取 消</el-button>
            <el-button v-show="!missionDataCard.userName" type="primary"
                @click="claimMission(missionDataCard.id)">领取任务</el-button>
            <el-button v-show="missionDataCard.userName&&missionDataCard.status=='进行中'" type="primary"
                @click="completeMissionFormVisible = true">完成任务</el-button>
        </el-dialog>






        <el-dialog id="completeMissionForm" title="任务详情" :visible.sync="completeMissionFormVisible">
            <div v-if="missionDataCard.type == 1">
                <el-form ref="form1" :model="missionType1Form" label-width="100px">
                    <el-form-item label="客户姓名">
                        <el-input v-model="missionType1Form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客户号码">
                        <el-input v-model="missionType1Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="用户地址">
                        <el-input v-model="missionType1Form.address"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="missionDataCard.type == 2">
                <el-form ref="form2" :model="missionType2Form" label-width="100px">
                    <el-form-item label="客户姓名">
                        <el-input v-model="missionType2Form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客户号码">
                        <el-input v-model="missionType2Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="宽带设备号">
                        <el-input v-model="missionType2Form.broadbandNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="客户定位">
                        <el-button @click="getposition()"> 定位</el-button>
                    </el-form-item>
                    <el-form-item label="客户地址">
                        <el-input type="text" v-model="missionType2Form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="客户家照片">
                        <div v-for="img, index in imgList">
                            <img class="cus-img" :src="img">
                            <i class="el-icon-circle-close" @click="deleteImg(index)"></i>
                        </div>

                        <i class="el-icon-folder-add" @click="click('img')"></i>
                    </el-form-item>

                </el-form>
            </div>
            <div v-if="missionDataCard.type == 3">
                <el-form ref="form3" :model="missionType3Form" label-width="100px">
                    <el-form-item label="宽带设备号">
                        <el-input v-model="missionType3Form.broadbandNumber"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="missionDataCard.type == 4">
                <el-form ref="form4" :model="missionType4Form" label-width="100px">
                    <el-form-item label="客户姓名">
                        <el-input v-model="missionType4Form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客户号码">
                        <el-input v-model="missionType4Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="宽带设备号">
                        <el-input v-model="missionType4Form.broadbandNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="客户定位">
                        <el-button @click="getposition()"> 定位</el-button>
                    </el-form-item>
                    <el-form-item label="客户地址">
                        <el-input type="text" v-model="missionType4Form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="客户家照片">
                        <div v-for="img, index in imgList">
                            <img class="cus-img" :src="img">
                            <i class="el-icon-circle-close" @click="deleteImg(index)"></i>
                        </div>
                        <i class="el-icon-folder-add" @click="click('img')"></i>
                    </el-form-item>
                </el-form>


            </div>
            <div v-if="missionDataCard.type == 5">
                <el-form ref="form5" :model="missionType5Form" label-width="100px">
                    <el-form-item label="主卡号码">
                        <el-input v-model="missionType5Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="携转的副卡号码">
                        <el-input v-model="missionType5Form.subCard"></el-input>
                    </el-form-item>
                    <el-form-item label="副卡描述">
                        <el-input v-model="missionType5Form.description"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="missionDataCard.type == 6">
                <el-form ref="form6" :model="missionType6Form" label-width="100px">
                    <el-form-item label="客户号码">
                        <el-input v-model="missionType6Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="反馈结果">
                        <el-input v-model="missionType6Form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="维系照片">
                        <div v-for="img, index in imgList">
                            <img class="cus-img" :src="img">
                            <i class="el-icon-circle-close" @click="deleteImg(index)"></i>
                        </div>
                        <i class="el-icon-folder-add" @click="click('img')"></i>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="missionDataCard.type == 7">
                <el-form ref="form7" :model="missionType7Form" label-width="80px">

                    <el-form-item label="客户号码">
                        <el-input v-model="missionType7Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="故障问题">
                        <el-select v-model="missionType7Form.failureType" placeholder="">
                            <el-option v-for="item in failureType" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="反馈结果">
                        <el-input v-model="missionType7Form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="维护照片">
                        <div v-for="img, index in imgList">
                            <img class="cus-img" :src="img">
                            <i class="el-icon-circle-close" @click="deleteImg(index)"></i>
                        </div>
                        <i class="el-icon-folder-add" @click="click('img')"></i>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="missionDataCard.type == 8">
                <el-form ref="form8" :model="missionType8Form" label-width="80px">
                    <el-form-item label="客户号码">
                        <el-input v-model="missionType8Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="宽带设备号">
                        <el-input v-model="missionType8Form.broadbandNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="客户定位">
                        <el-button @click="getposition()"> 定位</el-button>
                    </el-form-item>
                    <el-form-item label="客户地址">
                        <el-input type="text" v-model="missionType8Form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="装机及地址照片">
                        <div v-for="img, index in imgList">
                            <img class="cus-img" :src="img">
                            <i class="el-icon-circle-close" @click="deleteImg(index)"></i>
                        </div>
                        <i class="el-icon-folder-add" @click="click('img')"></i>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="missionDataCard.type == 9">
                <el-form ref="form5" :model="missionType5Form" label-width="100px">
                    <el-form-item label="主卡号码">
                        <el-input v-model="missionType9Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="副卡号码">
                        <el-input v-model="missionType9Form.subCard"></el-input>
                    </el-form-item>
                    <el-form-item label="副卡描述">
                        <el-input v-model="missionType9Form.description"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <input type="file" multiple name="myfile" id="img" hidden="hidden" accept="image/*" @change="getCusImage" />

            <el-button @click="completeMissionFormVisible = false">取 消</el-button>
            <el-button v-show="missionDataCard.userName" type="primary" @click="completeMission()">提交任务</el-button>
        </el-dialog>







        <div class="list" v-show="activeName == 'routineMission'">
            <el-row v-if="item.isRoutine == 1 && !item.userName" class="listItem" v-for="item in missionList">
                <el-col :span="6">{{ missionType2Str(item.type) }}</el-col>
                <el-col :span="12">{{ item.description }}</el-col>
                <el-col :span="2">{{ item.amount + "￥" }}</el-col>
                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="openMissionDataCard(item)">
                        详情
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div class="list" v-show="activeName == 'otherMission'">
            <el-row v-if="item.isRoutine == 0 && !item.userName" class="listItem" v-for="item in missionList">
                <el-col :span="6">{{ missionType2Str(item.type) }}</el-col>
                <el-col :span="12">{{ item.description }}</el-col>
                <el-col :span="2">{{ item.amount + "￥" }}</el-col>
                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="openMissionDataCard(item)">
                        详情
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div class="list" v-show="activeName == 'myMission'">
            <el-row v-if="item.userName&&item.status=='进行中'" class="listItem" v-for="item in missionList">
                <el-col :span="6">{{ missionType2Str(item.type) }}</el-col>
                <el-col :span="12">{{ item.description }}</el-col>
                <el-col :span="2">{{ item.amount + "￥" }}</el-col>
                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="openMissionDataCard(item)">
                        详情
                    </el-button>
                </el-col>

            </el-row>
        </div>
        <div class="list" v-show="activeName == 'completedMission'">
            <el-row v-if="item.userName&&item.status=='已完成'" class="listItem" v-for="item in missionList">
                <el-col :span="6">{{ missionType2Str(item.type) }}</el-col>
                <el-col :span="12">{{ item.description }}</el-col>
                <el-col :span="2">{{ item.amount + "￥" }}</el-col>
                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="openMissionDataCard(item)">
                        详情
                    </el-button>
                </el-col>

            </el-row>
        </div>
    </div>
</template>
<script>
import uploadFile from '@/api/uploadFile';
import downloadImg from '@/api/downloadImg';
export default {
    data() {
        return {
            activeName: 'routineMission',
            packageList: [],

            imgNameList: [],
            imgList: [],

            position: {},
            dataCardVisible: false,
            missionDataCard: {},
            completeMissionFormVisible: false,
            selectedType: 1,
            failureType: [
                '光损过大',
                '入户线断',
                '使用问题',
                '设置问题',
                '设备问题'
            ],
        }
    },
    mounted() {
        this.$bus.$emit('header', '我的客户信息');

    },
    methods: {
        getCusImage() {
            uploadFile('img', 'common/uploadImg', (response) => {
                var fileName = response.data.data
                this.imgNameList.push(fileName);
                downloadImg(fileName, 'common/download', (img) => {
                    this.imgList.push(img)
                })
            })
        },
        deleteImg(index) {
            this.imgNameList.splice(index, 1)
            this.imgList.splice(index, 1)
        },
        getposition() {

            navigator.geolocation.getCurrentPosition(this.geoInf, function (e) {
            }, {
                geocode: true,
                provider: 'amap'
            });
        },
        geoInf(position) {
            var codns = position.coords; //获取地理坐标信息；
            this.position.lat = codns.latitude + 0.002697;
            this.position.lng = codns.longitude - 0.004602;
            this.$message.success('定位成功')
        },
        click(id) {
            document.getElementById(id).click();
        },
        getPackageList() {
            this.$api.get('package/alllist', {
            }, response => {
                if (response.data.code == 1) {
                    this.packageList = response.data.data
                } else {
                    // this.$alert(response.data.msg, '错误', {
                    //     confirmButtonText: '确定'
                    // });
                }

            })
        },
        completeMission() {
            //选择当前所用的输入表单
            var missionform = this['missionType' + this.missionDataCard.type + 'Form']
            missionform['type'] = this.missionDataCard.type
            missionform['imgName'] = ''
            this.imgNameList.forEach(item => {
                missionform['imgName'] += item + ';'
            })
            missionform['missionId'] = this.missionDataCard.id
            var type = missionform.type
            if ((type == 2 || type == 4 || type == 8) && (!this.position.lat || !this.position.lng)) {
                this.$message.error("未进行定位")
                return;
            }
            missionform['lat'] = this.position.lat
            missionform['lng'] = this.position.lng

            this.$api.post("mission/completeMission", missionform, response => {
                if (response.data.code == 1) {
                    this.$message.success(response.data.data);
                    this.getMissionList()
                    this.completeMissionFormVisible = false
                    this.dataCardVisible = false
                } else {
                    this.$message.error(response.data.msg);
                }
            })
        },
        openMissionDataCard(row) {
            this.dataCardVisible = true
            this.missionDataCard = row
        },
        claimMission(id) {
            this.$api.get("mission/claimMission", { missionId: id }, response => {
                if (response.data.code == 1) {
                    this.$message.success(response.data.data);
                    this.getMissionList()
                    this.dataCardVisible = false
                } else {
                    this.$message.error(response.data.msg);
                }
            })
        },
        getMissionList() {
            this.$api.get("mission/getMyMissionList", {
                type: this.selectedType
            }, response => {
                if (response.data.code == 1) {
                    this.missionList = response.data.data
                } else {
                    this.$message.error(response.data.msg);
                }
            })
        },
        missionType2Str(i) {
            var str = ""
            this.missionType.forEach(e => {
                if (e.key == i) {
                    str = e.value
                }
            })
            return str
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