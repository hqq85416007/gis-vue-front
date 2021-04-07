<template>
  <div ref="map" class="map">
    <div class="content">
      <el-collapse v-model="activeName" accordion @change="changePanel">
        <el-collapse-item title="查找" name="search">
          <div>
            <el-form
              ref="searchForm"
              :model="searchForm"
              label-width="80px"
              size="mini"
            >
              <el-form-item label="查找车辆">
                <el-input
                  v-model="searchForm.text"
                  @input="changeCarText"
                ></el-input>
              </el-form-item>
            </el-form>

            <el-tree
              :props="props"
              :data="searchTreeData"
              show-checkbox
              ref="searchCarTree"
              :filter-node-method="filterNode"
              @check-change="searchCarTreeChange"
            ></el-tree>
          </div>
        </el-collapse-item>
        <el-collapse-item title="轨迹" name="2">
          <el-form
            label-width="80px"
            ref="replayForm"
            :model="replayForm"
            :rules="replayRules"
            size="mini"
          >
            <el-form-item label="开始时间" prop="starTime" required>
              <el-date-picker
                v-model="replayForm.startTime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime" required>
              <el-date-picker
                v-model="replayForm.endTime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="选择车辆" prop="carNo" required>
              <el-cascader
                v-model="replayForm.carNo"
                :options="replayCarOptions"
                :props="replayCarProps"
                :show-all-levels="false"
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <a class="formBtn" @click="onReplay()">查询</a>
              <a v-bind:class="activePauseOrPlay" @click="setPauseOrPlay"></a>
              <a v-bind:class="activeStop" @click="resetReplay"></a>
              <a class="formBtn" @click="changeSpeed">{{ speedText }}</a>
            </el-form-item>
          </el-form>
          <el-slider
            v-model="replaySlide"
            :show-tooltip="false"
            :max="replay.slideMax"
            disabled
            class="slide"
          ></el-slider>
        </el-collapse-item>
        <el-collapse-item title="围栏" name="fence">
          <el-table
            ref="singleTable"
            :data="fence.fenceTableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column
              property="name"
              label="名称"
              width="120"
            ></el-table-column>
            <el-table-column
              property="starttime"
              label="开始时间"
              width="120"
            ></el-table-column>
            <el-table-column
              property="endtime"
              label="结束时间"
            ></el-table-column>
            <el-table-column property="type" label="类型"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="queryFenceRow(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="告警" name="alarm">
          <el-table
            :data="alarm.alarmTableData"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column
              property="carNo"
              label="车辆"
              width="120"
            ></el-table-column>
            <el-table-column
              property="type"
              label="告警类型"
              width="120"
              :formatter="alarmTypeFormatter"
            ></el-table-column>
            <el-table-column
              property="startTime"
              label="告警时间"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template>
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="tool">
      <i class="length" @click="onMeasureLength" title="测距"></i>
      <i class="area" @click="onMeasureArea" title="测面积"></i>
    </div>
    <fenceForm
      :dialogFenceFormVisible.sync="fence.dialogFenceFormVisible"
      @handleFenceFormVisible="setFenceVisible"
      ref="fenceForm"
    ></fenceForm>
  </div>
</template>
<script>
// import { table_alarm_type } from "@/bizcode/codelistBizcode.js";
import "ol/ol.css";
import { Map, View } from "ol";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";
import {
  getPolygonLyr,
  getLineLyr,
  getDockLineLyr,
} from "@/utils/map/getBaseData.js";
import {
  queryCarOnLine,
  queryAlarm,
  getHistoryData,
} from "@/api/car/monitorManagement.js";
import { getValidFenceData } from "@/api/car/fence.js";
import { getTree } from "@/utils/common.js";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { transform } from "ol/proj";
import Feature from "ol/Feature";
import { Polygon, LineString } from "ol/geom";
import "@/styles/map/measure.css";
import {
  getBoradText,
  getId,
  getImageUrl,
  normalHeight,
} from "@/utils/map/dynamicData.js";
import RadarLabelContent from "@/utils/map/RadarLabelContent.js";
import RadarLabel from "@/utils/map/RadarLabel.js";
import track_Field from "@/utils/map/track_Field.js";
import "@/styles/map/radarLabel.css";
// import Emq from "emq-util";
import fenceForm from "@/views/car/monitorManagement/fenceForm.vue";
import Measure from "@/utils/map/Measure.js";
import olStyle from "@/utils/map/style_config.js";
const table_alarm_type = [{ id: 1, text: "2" }];
export default {
  components: { fenceForm },
  data() {
    var validatorTime = (rule, value, callback) => {
      if (this.$refs.replayForm) {
        this.$refs.replayForm.clearValidate();
      }
      let starttime = this.replayForm.startTime;
      let endtime = this.replayForm.endTime;
      if (!starttime && !endtime) {
        callback(new Error("请选择时间"));
      } else {
        if (starttime > endtime) {
          callback(new Error("开始时间不能大于结束时间"));
        } else {
          if (
            endtime.getTime() - starttime.getTime() >
            1 * 60 * 60 * 1000 + 900
          ) {
            callback(new Error("开始时间和结束时间相差不能超过1小时"));
          } else {
            callback();
          }
        }
      }
    };

    return {
      map: null,
      searchTreeData: [],
      searchForm: {
        text: "",
      },
      activeName: "search",
      props: {
        children: "children",
        label: "name",
        disabled: function (data) {
          if (data.status == "0") {
            return true;
          } else {
            return false;
          }
        },
      },
      //实时车辆图层
      heightHasImgLyr: null,
      global_radarTrackData: {},
      boardFlag: true,
      fence: {
        fenceTableData: [],
        dialogFenceFormVisible: false,
        fenceRowData: null,
      },
      //告警
      alarm: {
        alarmTableData: [],
      },
      //回放

      replayForm: {
        startTime: new Date(new Date().getTime() - 2 * 60 * 1000),
        endTime: new Date(),
        carNo: "",
      },
      replayRules: {
        startTime: [
          {
            // required: true,
            type: "date",
            validator: validatorTime,
          },
        ],
        endTime: [
          {
            // required: true,
            type: "date",
            validator: validatorTime,
          },
        ],
        carNo: [
          {
            // required: true,
            message: "请选择车辆",
          },
        ],
      },
      replayCarOptions: [],
      replayCarProps: {
        label: "name",
        value: "orgId",
        emitPath: false,
      },

      slideMax: 0,

      replaySlide: 0,
      replayTrackLyr: null,
      playInterval: null,
      measure: null,
      trackSteps: 1 * 1000,
      track_FieldCopy: track_Field,
      //回放参数设置
      playObj: { replay: false, index: 0, speed: 1, play: true },
      forwardText: [1, 10, 20],
      speedText: "X1",
      replayMoveLineFeature: null,
      activePauseOrPlay: "trackPause",
      activeStop: "trackStop",
      olStyle: olStyle,
    };
  },
  mounted() {
    this.initMap();
    this.measure = new Measure(this.map);
    /**
     * 加载车辆树节点
     */
    queryCarOnLine().then((res) => {
      if (res.data.length > 0) {
        this.searchTreeData = getTree(res.data, 0, "orgId", "pid");
        this.replayCarOptions = getTree(res.data, 0, "orgId", "pid");
      } else {
        console.info("没有值");
      }
    });
    // //emq消息
    // this.emq = new Emq({
    //   ip: "192.28.4.23", //192.28.4.23
    //   // ip: process.env.VUE_APP_EMQ_ADDRESS,
    //   port: 8083,
    //   userName: "admin",
    //   password: "public",
    //   cleanSession: true,
    //   clientId: "dsdsdsds21sd1"
    // });
    // this.emq.setHandler(res => {
    //   try {
    //     var data = res.data;
    //     console.log(data);
    //     this.updateRadarData(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
    // this.emq.setOnConSuccess(() => {
    //   console.log("链接成功");
    //   this.emq.subscribe("carPostion");
    // });
    // this.emq.connect();
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
      this.map = new Map({
        target: this.$refs.map,
        view: new View({
          projection: "EPSG:3857",
          center: fromLonLat([119.137859, 33.795129], "EPSG:3857"), //淮安涟水国际机场
          // center: fromLonLat([116.5, 39.4], "EPSG:3857"),
          zoom: 10,
          maxZoom: 16,
          minZoom: 8,
        }),
        layers: [getPolygonLyr(), getLineLyr(), getDockLineLyr()],
        controls: defaultControls({
          zoom: false, //显示放大缩小按钮
        }),
      });
    },
    /**
     * 面板监听事件
     */
    changePanel(value) {
      let openFlag = true;
      if (value) {
        this.panelValCopy = value;
      } else {
        openFlag = false;
      }
      switch (this.panelValCopy) {
        case "fence": {
          if (openFlag) {
            //加载电子围栏数据
            getValidFenceData().then((res) => {
              this.fence.fenceTableData = res.data;
            });
          } else {
            this.clearPlotLyr();
          }
          break;
        }
        case "search": {
          if (openFlag) {
            //清除电子围栏数据
            this.clearPlotLyr();
            //清除回放图层数据
            this.resetReplay();
            //重新加载树节点
            queryCarOnLine().then((res) => {
              if (res.data.length > 0) {
                this.searchTreeData = getTree(res.data, 0, "orgId", "pid");
                this.replayCarOptions = getTree(res.data, 0, "orgId", "pid");
              }
            });
          } else {
            console.info("重置表单，去掉车辆中心点");
          }

          break;
        }
        case "alarm": {
          queryAlarm().then((res) => {
            this.alarm.alarmTableData = res.data;
          });
          break;
        }
      }
    },

    // 依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
    searchCarTreeChange(data, checked) {
      let id = data.orgId;
      if (this.heightHasImgLyr) {
        var feature = this.heightHasImgLyr().getSource().getFeatureById(id);
        if (checked) {
          if (feature && feature.label) {
            feature.label.show();
          }
        } else {
          if (feature && feature.label) {
            feature.label.hide();
          }
        }
      }
    },

    //---------------------------------查找车辆-----------------------------------//
    /**
     * 监听文本框事件
     */
    changeCarText(val) {
      this.$refs.searchCarTree.filter(val);
    },
    /**
     * 过滤树节点
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //---------------------------------电子围栏操作-------------------------------//
    /**
     * 行内查看电子围栏详情
     */
    queryFenceRow(row) {
      this.fence.dialogFenceFormVisible = true;
      this.$refs.fenceForm.setFormData(row);
    },
    /**
     * 电子围栏详情表单显示与否
     */
    setFenceVisible(val) {
      this.fence.dialogFenceFormVisible = val.dialogFenceFormVisible;
    },
    /**
     * 处理当前数据
     */
    handleCurrentChange(val) {
      if (val) {
        this.getPlotLyr({ ...val });
      } else {
        console.info("请选择一条数据");
      }
    },
    /**
     * 显示选中数据
     */
    getPlotLyr(obj) {
      let lnglat = obj.lnglat.split(",");
      let coordinates = [];
      let coordinatess = [];
      for (let i = 0; i < lnglat.length; i++) {
        let str = lnglat[i].split(" ");
        let lon = parseFloat(str[0]);
        let lat = parseFloat(str[1]);
        let coordinate = transform([lon, lat], "EPSG:4326", "EPSG:3857");
        coordinates.push(coordinate);
      }
      coordinatess.push(coordinates);
      let feature = new Feature({
        geometry: new Polygon(coordinatess),
      });
      if (this.plotLyr) {
        this.plotLyr.getSource().clear();
      } else {
        this.plotLyr = new VectorLayer({
          source: new VectorSource(),
        });
        this.map.addLayer(this.plotLyr);
      }
      this.plotLyr.getSource().addFeature(feature);
    },
    /**
     * 清除电子围栏数据
     */
    clearPlotLyr() {
      if (this.plotLyr) {
        this.plotLyr.getSource().clear();
      }
    },
    //---------------------------------告警详情------------------------------//
    alarmTypeFormatter(row) {
      if (table_alarm_type[row.type]) {
        return table_alarm_type[row.type].text;
      } else {
        return "";
      }
    },
    //----------------------------------测距按钮------------------//
    onMeasureLength() {
      this.measure.start("length");
    },
    onMeasureArea() {
      this.measure.start("area");
    },
    //-----------------------轨迹回放--------------------------//
    /**
     * 回放查询所有数据
     */
    onReplay() {
      //1、校验表单
      let self = this;
      self.$refs.replayForm.validate((valid) => {
        if (valid) {
          //修改回放参数
          self.playObj.replay = true;
          self.playObj.play = true;
          self.playObj.index = 0;
          //发送后台数据
          let options = {};
          options.startTime = self.replayForm.startTime;
          options.endTime = self.replayForm.endTime;
          options.carId = self.replayForm.carNo;
          self.getSlideMax(options.startTime, options.endTime);
          self.setPlay(options);
        } else {
          self.playObj.replay = false;
          self.playObj.play = false;
        }
      });
    },
    /**
     * 播放暂停按钮
     */
    setPauseOrPlay() {
      if (this.playObj.replay && this.playObj.play) {
        if (this.activePauseOrPlay == "trackPause") {
          this.activePauseOrPlay = "trackStart";
          //暂停状态
          if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
          }
        } else {
          this.activePauseOrPlay = "trackPause";
          //继续从当前位置播放
          this.startInterval();
        }
      }
    },
    /**
     * 开始定时
     */
    startInterval() {
      let self = this;
      self.playInterval = setInterval(function () {
        let flag = self.replaySlide;
        if (flag > 0 && flag < self.replay.slideMax) {
          self.updateReplayCarFeature(flag);
          self.getMoveLineFeature(flag);
        } else if (flag == 0) {
          self.showReplayLine(self.replayDatas);
        } else {
          if (self.playInterval) {
            clearInterval(self.playInterval);
            self.playInterval = null;
            console.info("停止播放");
          }
        }
        self.replaySlide += 1;
      }, (1 * 1000) / self.playObj.speed);
    },
    /**
     * 更新车辆位置
     * @param index
     */
    updateReplayCarFeature(index) {
      if (this.replayTrackLyr && this.replayDatas.length > 0) {
        let features = this.replayTrackLyr.getSource().getFeatures();
        for (let i = 0; i < features.length; i++) {
          let feature = features[i];
          let property = feature.getProperties();
          if (property.featureName && property.featureName == "trace") {
            let data = this.replayDatas[index];
            let lon = data[track_Field.lon];
            let lat = data[track_Field.lat];
            let height = data[track_Field.height];
            let properties = data;
            let labelContent = new RadarLabelContent({
              acid: properties[track_Field.acid],
              height: normalHeight(height),
              direction: 0,
              speed: properties[track_Field.speed],
              latitude: lat,
              longitude: lon,
              featureName: "trace",
              carNo: properties[track_Field.carNo],
              imgUrl: getImageUrl(properties),
            });
            feature.label.updateLabel(labelContent);
          }
        }
      }
    },
    /**
     * 滑块最大值
     */
    getSlideMax(starttime, endtime) {
      let trackSteps = this.trackSteps;
      this.replay.slideMax = parseInt(
        (endtime.getTime() - starttime.getTime()) / trackSteps
      );
    },
    /**
     * 播放参数
     */
    setPlay(obj) {
      let self = this;
      getHistoryData(obj).then((res) => {
        if (res.data == null) {
          self.replayDatas = [];
        } else {
          self.replayDatas = res.data;
        }
        if (self.playInterval) {
          clearInterval(self.playInterval);
          self.playInterval = null;
        }
        if (self.replayDatas.length > 0) {
          // if(self.replaySlide)
          self.replaySlide = 0;
          self.startInterval();
        }
      });
    },
    /**
     * 显示小车,回放总轨迹
     */
    showReplayLine(result) {
      let track_Field = this.track_FieldCopy;
      if (this.replayTrackLyr) {
        this.clearReplayLyr();
      } else {
        this.replayTrackLyr = new VectorLayer({
          source: new VectorSource({
            features: [],
          }),
          zIndex: 50,
        });
        this.map.addLayer(this.replayTrackLyr);
      }
      let coordinates = [];
      for (let i = 0; i < result.length; i++) {
        let data = result[i];
        let coordinate = [parseFloat(data.lng), parseFloat(data.lat)];
        // let coordinate = result[i];
        coordinate = transform(coordinate, "EPSG:4326", "EPSG:3857");
        coordinates.push(coordinate);
        if (i == 0) {
          //创建一个汽车坐标
          let trackNo = getId(data);
          let lon = data[track_Field.lon];
          let lat = data[track_Field.lat];
          let height = data[track_Field.height];
          let carNo = getBoradText(data);
          let properties = data;
          let labelContent = new RadarLabelContent({
            acid: properties[track_Field.acid],
            height: normalHeight(height),
            direction: 0,
            speed: properties[track_Field.speed],
            latitude: lat,
            longitude: lon,
            featureName: "trace",
            carNo: properties[track_Field.carNo],
            imgUrl: getImageUrl(properties),
          });
          let radLabel = new RadarLabel(this.map, {
            content: labelContent,
            imgUrl: getImageUrl(data),
            imgScale: 1,
            text: carNo,
            id: trackNo,
          });
          let carFeature = radLabel.getLabel(this.boardFlag);
          if (carFeature) {
            this.replayTrackLyr.getSource().addFeature(carFeature);
          }
        }
      }
      let lineFeature = new Feature({
        geometry: new LineString(coordinates),
      });
      let style = this.olStyle.track.clone();
      lineFeature.setStyle(style);
      this.replayTrackLyr.getSource().addFeature(lineFeature);
    },
    /**
     * 获取移动线条
     */
    getMoveLineFeature(flag) {
      console.info("当前位置" + flag);
      let obj = this.replayDatas[flag];
      let coordinate = this.normalCoordinate([obj.lng, obj.lat]);
      if (this.replayMoveLineFeature && coordinate) {
        // coordinate = this.normalCoordinate(coordinate);
        this.replayMoveLineFeature.getGeometry().appendCoordinate(coordinate);
      } else {
        if (this.replayDatas.length > 2) {
          let firstCoordinate = [
            this.replayDatas[0].lng,
            this.replayDatas[0].lat,
          ];
          let secondCoordinate = [
            this.replayDatas[1].lng,
            this.replayDatas[1].lat,
          ];
          let lineCoordinate1 = this.normalCoordinate(firstCoordinate);
          let lineCoordinate2 = this.normalCoordinate(secondCoordinate);
          this.replayMoveLineFeature = new Feature({
            geometry: new LineString([lineCoordinate1, lineCoordinate2]),
          });
          let style = this.olStyle.selectTrack.clone();
          this.replayMoveLineFeature.setStyle(style);
          this.replayTrackLyr
            .getSource()
            .addFeature(this.replayMoveLineFeature);
        }
      }
    },
    /**
     * 格式化经纬度
     */
    normalCoordinate(coordinate) {
      return transform(coordinate, "EPSG:4326", "EPSG:3857");
    },
    /**
     * 停止按钮,重置按钮和图层
     */
    resetReplay() {
      //重置表单
      this.$refs.replayForm.resetFields();
      //清空回放图层要素,显示实时车辆图层
      this.replayMoveLineFeature = null;
      this.clearReplayLyr();
      this.hideOrShowLyr(this.heightHasImgLyr, true);
      //回放参数设置初始化,倍速回到x1
      if (this.playInterval) {
        clearInterval(this.playInterval);
        this.playInterval = null;
      }
      this.playObj = { replay: false, index: 0, speed: 1, play: true };
      this.speedText = "X1";
      this.replaySlide = 0;
      //播放按钮
      this.activePauseOrPlay = "trackPause";
    },
    /**
     * 清空回放图层,回放线
     */
    clearReplayLyr() {
      let lyr = this.replayTrackLyr;
      this.replayMoveLineFeature = null;
      if (lyr) {
        let features = lyr.getSource().getFeatures();
        for (var i = 0; i < features.length; i++) {
          var feature = features[i];
          if (feature.label) {
            feature.label.remove();
          }
        }
        lyr.getSource().clear();
      }
    },
    /**
     * 显示或隐藏图层
     */
    hideOrShowLyr(lyr, flag) {
      if (lyr) {
        lyr.setVisible(flag);
      }
    },
    /**
     * 改变回放倍速
     */
    changeSpeed() {
      let speedArr = this.forwardText;
      if (this.playObj.replay && this.playObj.play) {
        //显示文本需要改变
        for (let i = 0; i < speedArr.length; i++) {
          if (this.speedText === "X" + speedArr[i]) {
            if (i == speedArr.length - 1) {
              this.speedText = "X" + speedArr[0];
              this.playObj.speed = speedArr[0];
            } else {
              this.speedText = "X" + speedArr[i + 1];
              this.playObj.speed = speedArr[i + 1];
            }
            break;
          }
        }
        this.startInterval();
      }
    },
    /**
     * 更新车辆实时数据
     */
    updateRadarData(jsondata) {
      for (let i = 0; i < jsondata.length; i++) {
        let data = jsondata[i];
        this.singleTraceHandle(data);
      }
    },

    /**
     * 处理单个车辆数据
     */
    singleTraceHandle(iJsonData) {
      if (this.heightHasImgLyr == null) {
        this.heightHasImgLyr = new VectorLayer({
          source: new VectorSource(),
          zIndex: 99,
        });
        this.map.addLayer(this.heightHasImgLyr);
      }
      //实时车辆图层
      this.setFeatureToLyr(iJsonData, this.heightHasImgLyr);
    },
    /**
     *
     * @param iJsonData
     * @param lyr
     */
    setFeatureToLyr(iJsonData, lyr) {
      let sourceVec = null,
        heightHasImgLyr = lyr;
      let track_Field = this.track_FieldCopy;
      if (heightHasImgLyr == null) {
        sourceVec = new VectorSource();
        heightHasImgLyr = new VectorLayer({
          source: sourceVec,
          zIndex: 99,
        });
      } else {
        sourceVec = heightHasImgLyr.getSource();
      }
      let lon = iJsonData[track_Field.lon];
      let lat = iJsonData[track_Field.lat];
      let height = iJsonData[track_Field.height];
      let carNo = getBoradText(iJsonData);
      let taskSEtime = iJsonData[track_Field.taskSEtime] || "";
      // let taskStartTime=iJsonData[track_Field.taskStartTime];
      // console.info(taskStartTime);
      // taskStartTime=normalTime(taskStartTime);
      // let taskEndTime=iJsonData[track_Field.taskEndTime];
      // taskEndTime=normalTime(taskEndTime);
      if (iJsonData[track_Field.acid]) {
        // let coordinates = [lon, lat];
        let properties = iJsonData;
        properties.featureName = "track";
        let taskDesc = properties[track_Field.taskName] || "";
        if (taskDesc.length == 0) {
          if (taskSEtime.length == 0) {
            taskDesc = "";
          } else {
            taskDesc = taskSEtime;
          }
        } else {
          if (taskSEtime.length > 0) {
            taskDesc = taskDesc + "&nbsp;" + taskSEtime;
          }
        }
        let trackNo = getId(iJsonData);
        let isVaild = properties[track_Field.vaild];
        let labelContent = new RadarLabelContent({
          acid: properties[track_Field.acid],
          height: normalHeight(height),
          direction: 0,
          speed: properties[track_Field.speed],
          latitude: lat,
          longitude: lon,
          featureName: "trace",
          carNo: properties[track_Field.carNo],
          driverName: properties[track_Field.driverName],
          alarmDesc: properties[track_Field.alarmDesc] || "",
          depart: properties[track_Field.depart],
          imgUrl: getImageUrl(properties),
          // taskDesc:properties[track_Field.taskName]+"&nbsp;"+taskStartTime+"-"+taskEndTime,
          taskDesc: taskDesc,
          postime: properties[track_Field.postime],
        });
        //find is exist
        let track = this.global_radarTrackData[trackNo];
        if (track) {
          let feature_finded = sourceVec.getFeatureById(trackNo);
          //小车已存在
          if (feature_finded) {
            if (isVaild == "0") {
              if (feature_finded.label) {
                feature_finded.label.hide();
                sourceVec.removeFeature(feature_finded);
              }
              delete this.global_radarTrackData[trackNo];
            } else {
              //存在，且符合条件
              // if (isCarInSelect(iJsonData)) {
              // if (true) {
              this.global_radarTrackData[trackNo] = iJsonData;
              feature_finded.label.updateLabel(labelContent);
              // } else {
              //存在，不符合条件
              // if (feature_finded.label) {
              // feature_finded.label.hide();
              // sourceVec.removeFeature(feature_finded);
              // }
              // }
            }
          } else {
            //小车不存在，但符合条件
            // if (isCarInSelect(iJsonData) && isVaild == "1") {
            // if (true) {
            let radLabel = new RadarLabel(this.map, {
              content: labelContent,
              id: trackNo,
              imgUrl: getImageUrl(iJsonData),
              imgScale: 1,
              text: carNo,
            });
            let labelFeature = radLabel.getLabel(this.boardFlag);
            if (labelFeature) {
              sourceVec.addFeature(labelFeature);
              //存储数据
              this.global_radarTrackData[trackNo] = iJsonData;
            }
            // }
          }
        } else {
          if (trackNo != "" && isVaild == "1") {
            // if (isCarInSelect(iJsonData)) {
            let radLabel = new RadarLabel(this.map, {
              content: labelContent,
              id: trackNo,
              imgUrl: getImageUrl(iJsonData),
              imgScale: 1,
              text: carNo,
            });
            let labelFeature = radLabel.getLabel(this.boardFlag);
            if (labelFeature) {
              sourceVec.addFeature(labelFeature);
              //存储数据
              this.global_radarTrackData[trackNo] = iJsonData;
            }
            // }
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
}
.content {
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 10px;
  width: 340px;
}
.trackPause {
  display: inline-block;
  background: url("~@/assets/map/pause.png") no-repeat 8px 7px;
  width: 32px;
  height: 30px;
  border: 1px solid #31a1ec;
  margin-left: 4px;
}
.el-icon-my-export {
  background: url("~@/assets/map/pause.png") center no-repeat;
  background-size: cover;
}
.trackStart {
  display: inline-block;
  background: url("~@/assets/map/play.png") no-repeat 8px 7px;
  width: 32px;
  height: 30px;
  border: 1px solid #31a1ec;
  margin-left: 4px;
}
.trackStop {
  display: inline-block;
  background: url("~@/assets/map/stop.png") no-repeat 8px 6px;
  width: 32px;
  height: 30px;
  border: 1px solid #31a1ec;
  margin-left: 4px;
  margin-right: 4px;
}
.tool {
  position: absolute;
  z-index: 1;
  right: 10px;
  top: 10px;
  cursor: pointer;
  width: 32px;
}
.length {
  background: url("~@/assets/map/length1.5x.png") no-repeat;
  width: 32px;
  height: 32px;
  display: inline-block;
}
.area {
  background: url("~@/assets/map/area.png") no-repeat;
  width: 32px;
  height: 32px;
  display: inline-block;
}
.formBtn {
  width: 60px;
  display: inline-block;
  height: 30px;
  vertical-align: top;
  border: 1px solid #31a1ec;
  text-align: center;
  line-height: 30px;
}
.slide {
  margin: -25px 10px 10px;
}
.el-cascader--mini {
  width: 260px;
}
.el-collapse-item__content {
  padding-bottom: 0px;
}
</style>