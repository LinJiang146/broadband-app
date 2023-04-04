<template>
    <div class="map">
        <el-dialog id="form" title="客户信息" :visible.sync="dataVisible">
            <el-row class="listItem">
                <el-col :span="8">客户姓名</el-col>
                <el-col :span="16">{{ cusData.name }}</el-col>
            </el-row>
            <el-row class="listItem">
                <el-col :span="8">客户号码</el-col>
                <el-col :span="16">{{ cusData.phone }}</el-col>
            </el-row>
            <el-row class="listItem">
                <el-col :span="8">客户地址</el-col>
                <el-col :span="16">{{ cusData.address }}</el-col>
            </el-row>
            <el-row class="listItem">
                <el-col :span="24">客户家照片</el-col>

                <el-col :span="24">
                    <GetImg ref="image"></GetImg>
                </el-col>
            </el-row>
        </el-dialog>
        <div>
            <div id="container"></div>
        </div>

    </div>
</template>
<script>

import GetImg from '@/components/app/GetImg.vue';
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
    components: {
        GetImg
    },
    data() {
        return {
            filter: '0',
            map: null,
            cusList: [],
            AMap: null,
            markers: [],
            dataVisible: false,
            cusData: {},

            img: '',
        }
    },
    mounted() {
        this.getMap()
        this.getCustomerData()
    },
    methods: {
        getImg(fileName) {
            this.$nextTick(() => {
                this.$refs.image.getImg(fileName)
            })


        },
        getCustomerData() {
            this.$api.get('broadband/getMyCusList', {

            }, response => {
                this.cusList = response.data.data;
            })
        },
        getMap() {
            let lat = this.$route.query.lat
            let lng = this.$route.query.lng
            let filter = this.$route.query.filter
            let zoom = 19
            if (lat == null) {
                lat = 23.069506
            }
            if (lng == null) {
                lng = 110.288625
                zoom = 13
            }
            if (filter != null) {
                this.filter = filter
            }
            AMapLoader.load({
                "key": "7c5fc28c3a02ccee03cc65b4ebc8167c",              // 申请好的Web端开发者Key，首次调用 load 时必填
                "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                this.AMap = AMap
                this.map = new AMap.Map('container', {
                    zoom: zoom,//级别
                    showLabel: false,
                    center: [lng, lat],//中心点坐标
                });
                var wms = new AMap.TileLayer.WMTS({
                    url: 'http://t0.tianditu.gov.cn/img_w/wmts',
                    tileSize: 256,
                    params: {
                        Layer: 'img',
                        Version: '1.0.0',
                        Format: 'tiles',
                        TileMatrixSet: 'w',
                        STYLE: 'default',
                        tk: '49cc61f8faeffc42c5a6b05aadf257a5'
                    }
                });
                var wmx = new AMap.TileLayer.WMTS({
                    url: 'http://t0.tianditu.gov.cn/cia_w/wmts',
                    tileSize: 256,
                    params: {
                        Layer: 'cia',
                        Version: '1.0.0',
                        Format: 'tiles',
                        TileMatrixSet: 'w',
                        STYLE: 'default',
                        tk: '49cc61f8faeffc42c5a6b05aadf257a5'
                    }
                });
                wms.setMap(this.map);
                wmx.setMap(this.map);
                this.setMarker()
            }).catch(e => {
                console.log(e);
            })
        },
        setMarker() {
            var infoWindows = [];
            var infoWindow = ' ';
            var vm = this
            this.map.remove(this.markers);
            console.log(this.markers)
            var markers = [];


            //             var startIcon = new AMap.Icon({
            //     // 图标尺寸
            //     size: new AMap.Size(25, 35),
            //     // 图标的取图地址
            //     image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
            //     // 图标所用图片大小
            //     imageSize: new AMap.Size(25, 35),
            //     // 图标取图偏移量
            //     imageOffset: new AMap.Pixel(0, 0)
            // });

            for (var i = 0; i < this.cusList.length; i++) {
                var marker = new AMap.Marker({
                    extData: {
                        cus: this.cusList[i]
                        //imgname:list.imgnamelist[i] 
                    },
                    position: [this.cusList[i].lng, this.cusList[i].lat], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                });
                marker.setLabel({
                    offset: new AMap.Pixel(-20, -20), //设置文本标注偏移量
                    content: "<form style ='background: rgba(255, 255, 255, 0.0);'><div>" + this.cusList[i].name +
                        "</div></form>", //设置文本标注内容
                    direction: 'bottom-left' //设置文本标注方位
                });

                var onMarkerClick = function (e) {

                    vm.dataVisible = true
                    vm.cusData = e.target.getExtData().cus

                    vm.getImg(e.target.getExtData().cus.image)

                }

                marker.on('click', onMarkerClick); //绑定click事件
                markers.push(marker);
            }

            
            this.map.add(markers);
            this.markers = markers
            console.log(this.markers)
        }
    },
    watch: {
        // filter: {
        //     handler(newValue, preValue) {
        //         this.getCustomerData()
        //     }
        // },
        // cusList: {
        //     handler(newValue, preValue) {
        //         this.setMarker()
        //     }
        // },
        cusList: {
            handler(newValue, preValue) {
                this.setMarker()
            }
        }
    }
}
</script>
<style scoped>
.map {
    color: #000;
}

.filter {
    background-color: white;
    text-align: left;
    margin-top: 0px;
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

#container {
    height: 700px;
}</style>