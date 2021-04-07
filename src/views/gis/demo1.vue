<template>
  <div class="container">
    <el-button type="primary" @click="showOSM">OSM底图</el-button>
    <el-button type="primary" @click="showTiandi">天地图</el-button>
    <el-button type="primary" @click="showTomcat">tomcat切图</el-button>
    <div id="map"></div>
  </div>
</template>
<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import {defaults as defaultControls} from "ol/control";
import {OSM,XYZ} from "ol/source";
import {fromLonLat} from 'ol/proj';
export default {
  data() {
    return {
      map: null
    }
  },
  methods:{
    showOSM(){
      let layer=new TileLayer({
          source: new OSM()
      });
      this.map.addLayer(layer);
      console.info("加载OSM底图");
    },
    showTiandi(){
      let layer=new TileLayer({
          source: new XYZ({
            url: "http://t4.tianditu.com/DataServer?T=vec_w&tk=3d9dcd214fb19350b83bff6f6e292536&x={x}&y={y}&l={z}"
          })
      });
      let layer1=new TileLayer({
          source: new XYZ({
            url: "http://t4.tianditu.com/DataServer?T=cva_w&tk=3d9dcd214fb19350b83bff6f6e292536&x={x}&y={y}&l={z}"
          })
      });
      this.map.addLayer(layer);
      this.map.addLayer(layer1);
      console.info("加载天地图");
    },
    showTomcat(){
      console.info("加载tomcat底图");
      let titleUrl='http://192.168.11.124:8088/demo/';
      let layer=new TileLayer({
            source: new XYZ({
              wrapX: false,
              //   tileUrlFunction: function (xyz) {
              //      var z = xyz[0];
              //       var x = Math.abs(xyz[1]);
              //       var y = Math.abs(xyz[2]) - 1;
              //       x = ('C' + x.toString(16).PadLeft(8, '0')).toUpperCase();
              //       y = ( 'R' + y.toString(16).PadLeft(8, '0')).toUpperCase();
              //       z= ( 'L' + z.toString().PadLeft(2, '0')).toUpperCase();
              //       var url = titleUrl + 'map/{z}/{x}/{y}.png';
              //       return url;
              //  }
              url:titleUrl + '{z}/{x}/{y}.png'
           })
       });
       this.map.addLayer(layer);
    },
    
  },
  mounted(){
    this.map = new Map({
      target: "map",
      view: new View({
        projection:"EPSG:4326",
        center: fromLonLat([116.50,39.46]),  //南京
        zoom: 10,
        maxZoom:16,
        minZoom:8
      }),
      controls: defaultControls({
        zoom:false
      })
    });
  }
}
</script>
<style scoped>
  .container{
    position:relative; 
    width:100%;
    height:100%;   
  }
  #map{
    width:100%;
    height:100%;
  }
</style>
