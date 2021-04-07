<template>
  <div class='olMap' id="map" style="width:100%;height:calc(100% - 60px);background:rgb(28,33,37)">
       
    </div>
</template>
<script>
import axios from 'axios';
import { Map, View } from "ol";
import {defaults as defaultControls} from "ol/control";
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {Fill,Stroke,Style,Text} from 'ol/style';
export default {
    data(){
        return{
            map:null
        }
    },
    methods:{
        initMap(){
            this.map = new Map({
                target: "map",
                view: new View({
                    projection:"EPSG:3857",
                    center: fromLonLat([115.50,39.51],"EPSG:3857"),  
                    zoom: 16,
                    maxZoom:22,
                    minZoom:14
                }),
                layers:[],
                controls: defaultControls({
                    zoom:false
                })
            });
        },
        getAnnotation(){
            axios.get('/gisData/dockAnno_point.json').then(res=>{
                let features=new GeoJSON().readFeatures(res.data,{"featureProjection":"EPSG:3857"});
                let layer=new VectorLayer({
                    source:new VectorSource({
                        features:features
                    }),
                    style:function(feature){
                        let properties = feature.getProperties();
                        return new Style({
                            fill:new Fill({
                                color:"orange" 
                            }),
                            stroke:new Stroke({
                                color:"orange"
                            }),
                            text:new Text({
                                text:properties.dockCode,
                                //scale:1,
                                font:"18px",
                                fill:new Fill({
                                    color:"#fff"
                                }),
                            })
                        })
                    },
                    zIndex:999
                });
                this.map.addLayer(layer);
            })
        },
        showGeoJson(){
            var self = this;
            axios.get('/gisData/polyline.json').then(res=>{
                // console.info(res.data);
                let features=new GeoJSON().readFeatures(res.data,{"featureProjection":"EPSG:3857"});
                let layer=new VectorLayer({
                    source:new VectorSource({
                        features:features
                    }),
                    // style:styleFunction
                });
                self.map.addLayer(layer);
            });
            axios.get('/gisData/dockPolygon.json').then(res=>{
                // console.info(res.data);
                let features=new GeoJSON().readFeatures(res.data,{"featureProjection":"EPSG:3857"});
                let layer=new VectorLayer({
                    source:new VectorSource({
                        features:features
                    }),
                    style:function(){
                        return new Style({
                            fill:new Fill({
                                color:"rgb(66,69,74)"
                            }),
                            stroke:new Stroke({
                                color:"orange"
                            }),
                        })
                    }
                });
                self.map.addLayer(layer);
                self.map.getView().fit(layer.getSource().getExtent());
            });
            axios.get('/gisData/polygon.json').then(res=>{
                // console.info(res.data);
                let features=new GeoJSON().readFeatures(res.data,{"featureProjection":"EPSG:3857"});
                let layer=new VectorLayer({
                    source:new VectorSource({
                        features:features
                    }),
                    // style:styleFunction
                });
                self.map.addLayer(layer);
            })
        }
    },
    mounted(){
        this.initMap();
        this.showGeoJson();
        this.getAnnotation();
    }
}
</script>