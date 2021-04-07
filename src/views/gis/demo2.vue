<template>
  <div class="container">
    <el-button type="primary" @click="showAirport">加载geojson数据</el-button>
    <el-button type="primary" @click="showData">自己数据</el-button>
    <el-button type="primary" @click="layerNum">图层数量</el-button>
    <div id="map"></div>
  </div>
    
</template>
<script>
import axios from 'axios';
import GeoJSON from 'ol/format/GeoJSON';
import "ol/ol.css";
import { Map, View } from "ol";
import {defaults as defaultControls} from "ol/control";
import {Vector as VectorLayer,Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource,OSM} from 'ol/source';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import {Circle as CircleStyle,Fill,Stroke,Style} from 'ol/style';
import {fromLonLat} from 'ol/proj';
const style= new Style({
  image:new CircleStyle({
    radius: 5,
    fill: new Fill({color: 'red'}),
    stroke: new Stroke({color: 'red', width: 1}),
  })
});
export default {
  
  data(){
    return{
      map:null
    }
  },
  methods:{
    showAirport(){
      let styleFunction=function(){
        return style;
      }
      axios.get('/gisData/airport.json').then(res=>{
        let features=new GeoJSON().readFeatures(res.data,{"featureProjection":"EPSG:3857"});
        let layer=new VectorLayer({
          source:new VectorSource({
            features:features
          }),
          style:styleFunction
        });
        this.map.addLayer(layer);
      })
    },
    transformDegree(latlng) {
      let seconds=0;
          if(latlng.indexOf(".")>0){
              let tempindex=latlng.lastIndexOf(".");
              let second=latlng.substring(tempindex,latlng.length);
              console.info(second);
              seconds=parseFloat(second);
              latlng=latlng.substring(0,tempindex);
          }
          //左侧整数
          if(latlng!=""){
              let length=latlng.length;
              let degree=parseFloat(latlng.substring(0,length-4));
              let strRight=latlng.substring(length-4);
              let minute=parseFloat(strRight.substring(0,2));
              seconds+=parseFloat(strRight.substring(2));
              return degree+minute/60+seconds/3600;
          }
          return -1;
      },
    showData(){
      // let feature=new Feature({
      //   geometry: new Point(fromLonLat([118.50,32.00])),
      // });
      
      let str="N422314.6673 E1232241.8671 10 10,N422315.3618 E1232240.3420 10 10,N422314.5539 E1232239.6830 10 10,N422313.8678 E1232241.2259 10 10,N422314.6673 E1232241.8671 10 10";
      let arr=str.split(",");
      let cooraintes=[];
      for(let i=0;i<arr.length;i++){
        let one=arr[i].split(" ");
        let lon=one[1].substring(1);
        let lat=one[0].substring(1);
        lon=this.transformDegree(lon);
        lat=this.transformDegree(lat)
         console.info(lon);
        let coordinate=fromLonLat([lon,lat]);
        cooraintes.push(coordinate);
        
      }
      let feature=new Feature({
        geometry:new LineString(cooraintes)
      });
      // feature.setStyle(style);
      let layer=new VectorLayer({
        source:new VectorSource({
          features:[]
        }),
      });
      this.map.addLayer(layer);
      layer.getSource().addFeature(feature);
      this.map.getView().fit(layer.getSource().getExtent());
    },

    layerNum(){
      console.info(this.map.getLayers());
    }
  },
  mounted(){
    this.map = new Map({
      target: "map",
      view: new View({
        projection:"EPSG:3857",
        center: fromLonLat([118.50,32.00],"EPSG:3857"),  //南京
        zoom: 8,
        maxZoom:16,
        minZoom:5
      }),
      layers:[new TileLayer({
          source: new OSM()
      })],
      controls: defaultControls({
        zoom:false
      })
    });
    let map=this.map;
    map.on("pointermove",function(e){
      let mapPixel=e.pixel;
      if(map.hasFeatureAtPixel(mapPixel)){
        document.getElementById('map').style.cursor='pointer';
      }else{
        document.getElementById('map').style.cursor='';
      }
    });
    map.on("click",function(e){
      let mapPixel=e.pixel;
      if(map.hasFeatureAtPixel(mapPixel)){
        console.info(map.getFeaturesAtPixel(mapPixel));
      }
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