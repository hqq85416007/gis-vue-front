<template>
    <div class='olMap'>
        <el-button @click="playTrack">播放航迹</el-button>
        <el-button @click="pauseTrack">停止播放航迹</el-button>
        <div class="map" ref='map'>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import 'ol/ol.css';
import Map from "ol/Map";
import View from "ol/View";
import {OSM} from "ol/source";
import {fromLonLat,transform} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Style,Circle,Fill} from 'ol/style';
// import Measure from '@/utils/openlayers/Measure.js'
import RadarLabelContent from '@/utils/openlayers/RadLabelContent.js';
import RadarLabel from '@/utils/openlayers/RadLabel.js';
import {Vector as VectorLayer,Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import "@/styles/aircraftBoard.css";
var traceData=[]; 
var i=0;
var timeOut=null;
export default {
     data() {
      return {
            map: null,
            heightHasImgLyr:null,
            global_radarTrackData:{},
            boardFlag:true,
            track_Field:{
                "trackNo":"snNo",
                "posSe":"p",
                "lon":"longitude",
                "lat":"latitude",
                "speed":"speed",
                "angle":"direction",
                "height":"height",
                "secondCode":"ssr",
                "flightNo":"acid",
                "startAirport":"adep",
                "endAirport":"ades",
                "planNo":"pn",
                "company":"b",
                "flightNoplan":"d"
            }
        };
    },
    methods: {
        initMap() {
            var mapcontainer = this.$refs.map
            this.map = new Map({
                target: mapcontainer,
                layers: [new TileLayer({
                    source:new OSM()
                })],
                view: new View({
                    projection: 'EPSG:3857',    
                    center: fromLonLat([118, 32]), 
                    zoom: 5
                })
            });
            // this.addTrack();

            // this.measure = new Measure(this.map);
            // this.measure.start("length"); 
            
        },
        
        //播放航迹
        playTrack(){
            let self=this;
            

            axios.get('/gisData/trace.json').then(res=>{
                console.info(res.data);
                traceData=res.data;
                timeOut=setInterval(() => {
                    self.showTrackData()
                }, 4*1000);
            // let features=new GeoJSON().readFeatures(res.data,{"featureProjection":"EPSG:3857"});
            // let layer=new VectorLayer({
            //     source:new VectorSource({
            //         features:features
            //     }),
            //     style:styleFunction
            // });
            // this.map.addLayer(layer);
            })
        },
        //暂停播放航迹
        pauseTrack(){
            if(timeOut){
                clearInterval(timeOut);
                timeOut=null;
            }  
        },
        showTrackData(){
            if(traceData.length>0){
                if(i==traceData.length){
                    i=0;
                }
                let data=traceData[i];
                for(var m=0;m<data.length;m++){
                    this.setFeatureToLyr(data[m]);
                }
                i=i+1;
            }
        },
        setFeatureToLyr(iJsonData) {
            let sourceVec=null;
            if(this.heightHasImgLyr==null){
                sourceVec=new VectorSource;
                this.heightHasImgLyr = new VectorLayer({
                    source:sourceVec,
                    zIndex:99
                });
                this.map.addLayer(this.heightHasImgLyr);
            }else {
                sourceVec= this.heightHasImgLyr.getSource();
            }
            let track_Field=this.track_Field;
            let global_radarTrackData=this.global_radarTrackData;
            var lon=iJsonData[track_Field.lon];
            var lat=iJsonData[track_Field.lat];
            var height=iJsonData[track_Field.height];
            if(iJsonData[track_Field.trackNo]){
                // var coordinates=[lon,lat];
                // var webMector_coordinates=transform(coordinates,'EPSG:4326','EPSG:3857');
                var properties=iJsonData;
                properties.featureName="track";
                // var rotation =iJsonData[track_Field.angle];
                var trackNo=this.getId(iJsonData);
                var labelContent = new RadarLabelContent({
                    ssr:properties[track_Field.secondCode],
                    acid:properties[track_Field.flightNo],
                    height:this.normalHeight(height),
                    adep:properties[track_Field.startAirport],
                    ades:properties[track_Field.endAirport],
                    direction:properties[track_Field.angle],
                    hspeed:properties[track_Field.speed],
                    latitude:lat,
                    longitude:lon
                });
                //find is exist
                var track = global_radarTrackData[trackNo];
                if(track){
                    var feature_finded=sourceVec.getFeatureById(trackNo);
                    if(feature_finded){
                        if(!iJsonData.valid || !iJsonData[track_Field.height]){
                            sourceVec.removeFeature(feature_finded);
                            delete global_radarTrackData[trackNo];
                            //刪除標牌
                            if(feature_finded.label) {
                                feature_finded.label.remove();
                            }
                        }else {
                            iJsonData.board = feature_finded.label;
                            global_radarTrackData[trackNo]=iJsonData;
                            feature_finded.label.updateLabel(labelContent);
                        }
                    }
                }
                else {
                    if(iJsonData.valid && trackNo!=''){
                        var radLabel = new RadarLabel(this.map,{
                            content:labelContent,
                            id:trackNo,
                            imgUrl:require("@/assets/demo/airplane_blue.png")
                            // imgUrl:"@/assets/demo/airplane_blue.png"
                        });
                        if(!this.boardFlag){
                            radLabel.hide();
                        }
                        var labelFeature = radLabel.getLabel();
                        if(labelFeature){
                            sourceVec.addFeature(radLabel.getLabel());
                            iJsonData.board = radLabel;
                            //存储数据
                            global_radarTrackData[trackNo]=iJsonData;
                        }
                    }
                }
            }
        },
        getId(data) {
            return data[this.track_Field.flightNo];
        },
        normalHeight(height) {
            height = height/10;
            if(height<1000){
                height="0"+height;
            }
            return height;
        }
    },
    mounted (){
        this.initMap();
        let feature=new Feature({
            geometry:new Point(transform([118, 32],'EPSG:4326','EPSG:3857'))
        });
        let style=new Style({
            image:new Circle({
                radius:7,
                fill:new Fill({color:'red'})
                // src: require("@/assets/demo/airplane_blue.png"),
                // rotateWithView: true,
                // scale:1,
                // rotation: 0
            }) 
        });
        feature.setStyle(style);
        let layer=new VectorLayer({
            source:new VectorSource({
                feature:[feature]
            })
        });
        this.map.addLayer(layer);
        
        //this.mapClick();
    }
}
</script>
<style lang="less" scoped>
    .olMap{
        width:100%;
        height:800px;
    }
    .map{
        width:100%;
        height:100%
    }  
    .overlay{
        width:100px;
        height: 100px;
        display: none;
        background: chartreuse;
    }
</style>  
