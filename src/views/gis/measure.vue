<!--测距测面积-->
<template>
  <div ref="map" class="map">
    <div class="formDiv">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="请选择">
          <el-select
            v-model="form.type"
            placeholder="请选择类型"
            @change="handleChange"
          >
            <el-option label="测距" value="length"></el-option>
            <el-option label="测面积" value="area"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import "@/styles/measure.css";
import { Map, View } from "ol";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";
// import { Tile as TileLayer } from "ol/layer";
// import { OSM } from "ol/source";
import Measure from "@/utils/openlayers/Measure.js";

export default {
  data() {
    return {
      form: {
        type: "length",
      },
      map: null,
      measure: null,
    };
  },

  //   components: {},

  //   computed: {},

  mounted() {
    this.initMap();
    this.measure = new Measure(this.map);
    this.measure.start("length");
  },

  methods: {
    initMap() {
      this.map = new Map({
        target: this.$refs.map,
        view: new View({
          projection: "EPSG:3857",
          center: fromLonLat([118.5, 32.0], "EPSG:3857"), //南京
          zoom: 8,
          maxZoom: 16,
          minZoom: 5,
        }),
        controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false,
        }),
        layers: [
          // new TileLayer({
          //   source: new OSM(),
          // }),
        ],
      });
    },
    handleChange(val) {
      console.info(val);
      if (val == "length") {
        console.info("测距");
        this.measure.start("length");
      } else {
        console.info("测面积");
        this.measure.start("area");
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
  background: black;
}
.formDiv {
  position: absolute;
  z-index: 1;
  left: 10px;
  top: 10px;
}
</style>