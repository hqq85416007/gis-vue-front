import {Point,LineString} from 'ol/geom';
import Overlay from 'ol/Overlay';
import {Style,Stroke,Circle,Fill,Icon} from 'ol/style';
import Feature from 'ol/Feature';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {transform} from 'ol/proj';
import DragPan from 'ol/interaction/DragPan';
var RadarLabel=(function (){
    /**
     * 雷达标牌
     * @param map  当前的地图
     * @param options
     * @param options.content RadarLabelContent 标牌内容
     * @param options.id {String} id 唯一标识 必填
     * @param options.imgUrl {String} id 图标url 可选
     * @param options.imgScale 0-1
     * @param
     */
    var RadarLabel=function (map,options) {
        if (!options){
            options={};
        }
        this.map=map;
        /**
         * 标牌内容
         */
        this._labelContent = options.content;
        /**
         * 显示内容的overlay
         * @type {null}
         * @private
         */
        this._infoOverlay=null;
        /**
         * 显示内容的dom元素
         * @type {null}
         * @private
         */
        this._infoDiv=null;
        /**
         * 拖拽标志
         * @type {null}
         * @private
         */
        this._dragPan=null;
        this._flag=0;
        /**
         *
         * @type {null}
         * @private
         */
        this._boardPoint=null;

        this._boardPointBefore=null;//上一次飞机的位置

        this._islabelVisible = true;

        this._id = options.id;

        this._imgUrl = options.imgUrl;

        this._DivCoord;
        /**
         * 连接线样式
         * @type Style
         * @private
         */
        this._lineStyle = new Style({
            stroke: new Stroke({
                color: '#000000',
                width: 1,
                //lineDash: [10, 10]
            })
        });
        /**
         * 连接线
         * @type {Feature}
         * @private
         */
        this._linkLineFeature=new Feature({
            geometry: new LineString([])
        });

        /**
         * 连接线图层
         * @type {VectorLayer}
         * @private
         */
        this._layer= new VectorLayer({
            source: new VectorSource({
                features: [this._linkLineFeature]
            }),
            style:null,
            zIndex:10,
            updateWhileInteracting: true
        });
        this._point = new Point({

        });
        this._featurePoint = new Feature({
            geom: this._getPoint()
        });

        // this._rightClick= new BoardAndPlan();
    };

    /**
     * 获取点位置
     * @returns {Point}
     * @private
     */
    RadarLabel.prototype._getPoint = function(){
        var map = this.map;
        var lon = this._labelContent.getLongitude();
        var lat = this._labelContent.getLatitude();
        if(map!=null){
            if(map.getView().getProjection() === "EPSG:4326"){
                return new Point([lon,lat]);
            }else {
                return new Point(transform([lon,lat],"EPSG:4326","EPSG:3857"));
            }
        }
    };
    /**
     * 创建飞行标牌div
     * @returns {HTMLDivElement}
     * @private
     */
    RadarLabel.prototype._createDiv=function(){
        var popup_element = document.createElement('div');
        popup_element.className="boardDiv";
        this._infoDiv=popup_element;
        this._infoDiv.style.display='block';
        return popup_element;
    };
    /**
     * 创建div叠加图层
     * @returns {Overlay}
     * @private
     */
    RadarLabel.prototype._createOverlay=function(){
        var info_popup = new Overlay(({
            element: this._infoDiv,
            stopEvent: false,
            offset: [0, 0],
            dragging:false,
            positioning: 'bottom-center'
        }));
        this._infoOverlay=info_popup;
        this.map.addOverlay(this._infoOverlay);
        this.map.addLayer(this._layer);
        return info_popup;
    };
    /**
     * 对div的内容进行绑定
     * @param data
     * @private
     */
    RadarLabel.prototype._info=function () {
        var self=this;
        var contenthtml='';
        // var key_chnname=self._key_chnname;
        var htmls=[];
        htmls.push("<table cellpadding='5' cellspacing='5'>");
        //二次代码
        var ssr = this._labelContent.getSSR();
        if(ssr){
           /* htmls.push("<tr>");
            htmls.push("<td class='boardInfo-val-td'>");
            htmls.push(ssr);
            htmls.push("</td>");
            htmls.push("</tr>");*/
           self._getRowHTML(htmls,ssr);
        }
        //航班号
        var acid = this._labelContent.getAcid();
        if(acid){
            self._getRowHTML(htmls,acid);
        }
        //高度
        var height = this._labelContent.getHeight();
        if(height){
            var vspeed = this._labelContent.getVspeed();
            height = parseInt(height);
            if(vspeed){
                height = height+" "+parseInt(vspeed);
            }else {
                height +=" ";
            }
            var hspeed = this._labelContent.getHspeed();
            if(hspeed){
                hspeed = parseInt(hspeed/10);
                if(hspeed<100){
                    hspeed="0"+hspeed;
                }
                height += hspeed;
            }
            self._getRowHTML(htmls,height);
        }
        /*if( key_chnname){
            for(var p in key_chnname){
                if(key_chnname[p]) {
                    var value=data[p];
                    if(value==null) value='';
                    if (p=='coordinates'){
                        value=self._transform(data[p][0])" "self._transform(data[p][1]);
                    }
                    htmls.push("<tr class='boardattr'>");
                    /!* htmls.push("<td class='boardInfo-attr-td'>");
                     htmls.push(key_chnname[p]"：");
                     htmls.push("</td>");*!/
                    htmls.push("<td class='boardInfo-val-td'>");
                    htmls.push(value);
                    htmls.push("</td>");
                    htmls.push("</tr>");
                }
            }
        }*/
        htmls.push("</table>");
        contenthtml=htmls.join("");
        self._infoDiv.innerHTML=contenthtml;
    };

    /**
     * 创建单行的信息内容
     * @param htmls
     * @param val
     * @private
     */
    RadarLabel.prototype._getRowHTML=function(htmls,val){
        htmls.push("<tr>");
        htmls.push("<td class='boardInfo-val-td'>");
        htmls.push(val);
        htmls.push("</td>");
        htmls.push("</tr>");
    };
    /**
     * 坐标转换
     * @param val
     * @returns {string}
     * @private
     */
    RadarLabel.prototype._transform=function(val){
        var degree=Math.floor(val);
        var minutesFloat=val-degree;
        var minutes_float=minutesFloat*60; //0.12
        var minute=Math.floor(minutesFloat*60);
        if(minute<10){
            minute="0"+minute;
        }
        var secondsFloat=minutes_float-minute;
        var seconds=Math.floor(secondsFloat*60);
        if(seconds<10){
            seconds='0'+seconds;
        }
        return ""+degree+minute+seconds;
    };
    /**
     * 事件处理
     * @param
     * @private
     */
    RadarLabel.prototype._eventHandle=function() {
        var map=this.map,self=this;
        map.getInteractions().forEach(function (interaction) {
            if (interaction instanceof DragPan) {
                self._dragPan = interaction;
            }
        });
        //当div可拖动的时候，地图应当是不可拖动的
        self._infoDiv.addEventListener('mousedown', function () {
            self._dragPan.setActive(false);
            self._infoOverlay.set('dragging', true);
            // document.getElementById('map').style.cursor='move';
        });
        //当鼠标提起时，div块不可移动，地图可以移动
        map.on('pointerup', function () {
            if (self._infoOverlay.get('dragging') === true) {
                self._dragPan.setActive(true);
                self._infoOverlay.set('dragging', false);
            }
            // document.getElementById('map').style.cursor='default';
        });
        map.on('pointermove', function (evt) {
           // document.getElementById('map').style.cursor='move';
            if (self._infoOverlay.get('dragging') === true) {
                self._flag=1;
                self._DivCoord = evt.coordinate;
                self._infoOverlay.setPosition(self._DivCoord);
                self._linkLineFeature.getGeometry().setCoordinates([self._boardPoint, self._DivCoord]);
            }
        });
    };

    /**
     * 获取航迹点样式
     * @returns {ol.style.Style}
     * @private
     */
    RadarLabel.prototype._getStyle = function(){
        /*var textStyle=new ol.style.Text({
            offsetx: 15,
            offsetY: 25,
            font: "16px 微软雅黑",
            fill: new ol.style.Fill({
                color: 'black'
            }),
            text:getBoradText(data)
        });*/

        var imgUrl = this._imgUrl;
        var rotation = this._labelContent.getDirection();
        var geomarker;
        // let map=this.map;
        // var zoom = map.getView().getZoom();
        if(imgUrl){
            geomarker=new Style({
                image:new Icon({
                    src: require("@/assets/demo/airplane_blue.png"),
                    rotateWithView: true,
                    scale:1,
                    rotation: rotation
                })
            });
        }else {
            geomarker = new Style({
                image:new Circle({
                    fill:new Fill({
                        color:"rgba(0,0,0,0)"
                    }),
                    stroke: new Stroke({
                        color : "#000",
                        width:2
                    }),
                    radius:8
                })
            })
        }

        return geomarker;
    };

    //初始化
    RadarLabel.prototype._init=function(){
        var self=this;
        if (self._infoDiv==null){
            self._createDiv();
            self._createOverlay();
        }
        self._boardPoint=[self._labelContent.getLongitude(),self._labelContent.getLatitude()];
        if (self._boardPoint){
            self._info();
            self._boardPointBefore=self._boardPoint;
            self._DivCoord=self._getLinklineCoor(self._boardPoint[0],self._boardPoint[1]);
            self._boardPoint=transform(self._boardPoint, 'EPSG:4326', 'EPSG:3857');
            self._infoOverlay.setPosition(self._DivCoord);
            self._linkLineFeature.getGeometry().setCoordinates([self._boardPoint, self._DivCoord]);
            self._linkLineFeature.setStyle(self._lineStyle);
        }

        // self._rightClick.start('boardDiv');
    };
    //暴露给外部的接口

    /**
     * 设置标牌颜色
     */
    RadarLabel.prototype.setLabelColor = function(color){
        // $(this._infoDiv).css("background",color);
        console.info(color);
    };
    /**
     * 标牌隐藏
     * @param isTrack 是否隐藏航迹点
     */
    RadarLabel.prototype.hide=function (isTrack) {
        if(this._infoDiv){
            this._infoDiv.style.display='none';
            this._linkLineFeature.setStyle(null);
            this._islabelVisible = false;
            if(isTrack && this._pointFeature){
                this._pointFeature.setStyle(null);
            }

        }
    };
    /**
     * 标牌显示
     * @param isTrack 是否显示航迹点
     */
    RadarLabel.prototype.show=function (isTrack) {
        if(this._infoDiv){
            this._infoDiv.style.display='block';
            this._linkLineFeature.setStyle(this._lineStyle);
            this._islabelVisible = true;
            if(isTrack && this._pointFeature){
                this._pointFeature.setStyle(this._getStyle());
            }
        }
    };

    /**
     * 标牌是否可见
     * @returns {boolean}
     */
    RadarLabel.prototype.getVisible=function(){
        return this._islabelVisible;
    };
    //移除
    RadarLabel.prototype.remove=function () {
        this.map.removeOverlay(this._infoOverlay);
        this.map.removeLayer(this._layer);
    };

    //设置位置
    RadarLabel.prototype._setDivPosition=function(){
        var diff=[];
        var self=this;
        self._boardPoint=[self._labelContent.getLongitude(),self._labelContent.getLatitude()];
        if (self._boardPoint){
            self._info();
            if (self._flag==0){
                diff[0]=self._boardPoint[0]-self._boardPointBefore[0];
                diff[1]=self._boardPoint[1]-self._boardPointBefore[1];
                self._DivCoord=transform(self._DivCoord, 'EPSG:3857', 'EPSG:4326');
                self._DivCoord[0]=self._DivCoord[0]+diff[0];
                self._DivCoord[1]=self._DivCoord[1]+diff[1];
                self._boardPointBefore=self._boardPoint;
                self._DivCoord=transform(self._DivCoord, 'EPSG:4326', 'EPSG:3857');
                self._boardPoint=transform(self._boardPoint, 'EPSG:4326', 'EPSG:3857');
                self._infoOverlay.setPosition(self._DivCoord);
                self._linkLineFeature.getGeometry().setCoordinates([self._boardPoint, self._DivCoord]);
            }else{
                if (self._boardPointBefore){
                    diff[0]=self._boardPoint[0]-self._boardPointBefore[0];
                    diff[1]=self._boardPoint[1]-self._boardPointBefore[1];
                    self._DivCoord=transform(self._DivCoord, 'EPSG:3857', 'EPSG:4326');
                    self._DivCoord[0]=self._DivCoord[0]+diff[0];
                    self._DivCoord[1]=self._DivCoord[1]+diff[1];
                    self._DivCoord=transform(self._DivCoord, 'EPSG:4326', 'EPSG:3857');
                    self._infoOverlay.setPosition(self._DivCoord);
                    self._boardPointBefore=self._boardPoint;
                    self._boardPoint=transform(self._boardPoint, 'EPSG:4326', 'EPSG:3857');
                    self._linkLineFeature.getGeometry().setCoordinates([self._boardPoint, self._DivCoord]);
                }
            }

        }
        self._eventHandle();
    };
    /**
     * 计算偏移
     * @param lon
     * @param lat
     * @returns {ol.proj.transform}
     * @private
     */
    RadarLabel.prototype._getLinklineCoor=function(lon,lat){
        let map=this.map;
        var zoom = map.getView().getZoom();
        var temp = zoom>10?0.1:0.5;
        var lonOffset = lon+temp/zoom;
        var latOffset = lat+temp/zoom;
        return transform([lonOffset,latOffset], 'EPSG:4326', 'EPSG:3857')
    };


    /**
     * 返回标牌
     */
    RadarLabel.prototype.getLabel = function(){
        this._init();
        var feature=this._featurePoint;
        feature.label = this;
        feature.setProperties(this._labelContent);
        feature.setStyle(this._getStyle());
        feature.setId(this._id);
        this._infoDiv.feature=feature;
        this._pointFeature = feature;
        return feature;
    };

    /**
     * 更新
     * @param radLabelContent
     */
    RadarLabel.prototype.updateLabel = function(radLabelContent){
        var feature = this._featurePoint;
        this._labelContent = radLabelContent;
        if(feature){
            feature.setGeometry(this._getPoint());
            feature.setProperties(radLabelContent);
            feature.setStyle(this._getStyle());
            if(feature.label){
                this._setDivPosition();
                this._infoDiv.feature=feature;
            }
        }
    };

    RadarLabel.prototype.getDivCoordinate=function(){
        return this._DivCoord;
    };
    RadarLabel.prototype.setDivCoordinate=function(option){
        var coord=option.coord;
        var planeCoordinates=option.plane;
        this._DivCoord=coord;
        this._infoOverlay.setPosition(coord);
        this._linkLineFeature.getGeometry().setCoordinates([transform(planeCoordinates,'EPSG:4326','EPSG:3857'),coord]);
    };
    RadarLabel.prototype.getImageScale=function(){
        var feature=this._featurePoint;
        var scale=feature.getStyle().getImage().getScale();
        return scale;
    };
    return RadarLabel;
}(Window));
export default RadarLabel;
