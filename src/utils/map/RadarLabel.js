import { Point, LineString } from 'ol/geom';
import Overlay from 'ol/Overlay';
import { Style, Stroke, Circle, Fill, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { transform } from 'ol/proj';
import DragPan from 'ol/interaction/DragPan';
let RadarLabel = (function () {
    /**
     * 雷达标牌
     * @param map  当前的地图
     * @param options
     * @param options.content RadarLabelContent 标牌内容
     * @param options.id {String} id 唯一标识 必填
     * @param options.imgUrl {String} id 图标url 可选
     * @param options.imgScale 0-1
     * @param options.show
     */
    let RadarLabel = function (map, options) {
        if (!options) {
            options = {};
        }
        this.map = map;
        /**
         * 标牌内容
         */
        this._labelContent = options.content;
        /**
         * 显示内容的overlay
         * @type {null}
         * @private
         */
        this._infoOverlay = null;
        /**
         * 显示内容的dom元素
         * @type {null}
         * @private
         */
        this._infoDiv = null;
        /**
         * 拖拽标志
         * @type {null}
         * @private
         */
        this._dragPan = null;
        this._flag = 0;
        /**
         *
         * @type {null}
         * @private
         */
        this._boardPoint = null;

        this._boardPointBefore = null;//上一次飞机的位置

        this._islabelVisible = options.show || false;

        this._id = options.id;

        this._imgUrl = options.imgUrl;

        this._imgScale = options.imgScale || 1;
        this._text = options.text || "";

        this._DivCoord;
        /**
         * 连接线样式
         * @type {Style}
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
        this._linkLineFeature = new Feature({
            geometry: new LineString([])
        });

        /**
         * 连接线图层
         * @type {layer.Vector}
         * @private
         */
        this._layer = new VectorLayer({
            source: new VectorSource({
                features: [this._linkLineFeature]
            }),
            style: null,
            zIndex: 10,
            updateWhileInteracting: true
        });
        this._point = new Point({

        });
        this._featurePoint = new Feature({
            geometry: this._getPoint()
        });

        //this._rightClick= new BoardAndPlan();
    };

    /**
     * 获取点位置
     * @returns {geom.Point}
     * @private
     */
    RadarLabel.prototype._getPoint = function () {
        let map = this.map;
        let lon = this._labelContent.getLongitude();
        let lat = this._labelContent.getLatitude();
        if (map != null) {
            if (map.getView().getProjection() === "EPSG:4326") {
                return new Point([lon, lat]);
            } else {
                return new Point(transform([lon, lat], "EPSG:4326", "EPSG:3857"));
            }
        }
    };
    /**
     * 创建飞行标牌div
     * @returns {HTMLDivElement}
     * @private
     */
    RadarLabel.prototype._createDiv = function () {
        let popup_element = document.createElement('div');
        popup_element.className = "boardDiv";
        this._infoDiv = popup_element;
        this._infoDiv.style.display = 'block';
        return popup_element;
    };
    /**
     * 创建div叠加图层
     * @returns {Overlay}
     * @private
     */
    RadarLabel.prototype._createOverlay = function () {
        let info_popup = new Overlay(({
            element: this._infoDiv,
            stopEvent: false,
            offset: [0, 0],
            dragging: false,
            positioning: 'bottom-center'
        }));
        this._infoOverlay = info_popup;
        this.map.addOverlay(this._infoOverlay);
        this.map.addLayer(this._layer);
        return info_popup;
    };

    /**
     * 单行信息
     * @param htmls
     * @param val
     * @param valName
     * @private
     */
    RadarLabel.prototype._getRowHTML = function (htmls, val, valName) {
        htmls.push("<tr>");
        htmls.push("<td class='boardInfo-attr-td'>");
        htmls.push(valName);
        htmls.push("</td>");
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
    RadarLabel.prototype._transform = function (val) {
        let degree = Math.floor(val);
        let minutesFloat = val - degree;
        let minutes_float = minutesFloat * 60; //0.12
        let minute = Math.floor(minutesFloat * 60);
        if (minute < 10) {
            minute = "0" + minute;
        }
        let secondsFloat = minutes_float - minute;
        let seconds = Math.floor(secondsFloat * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return "" + degree + minute + seconds;
    };
    /**
     * 事件处理
     * @param
     * @private
     */
    RadarLabel.prototype._eventHandle = function () {
        let map = this.map, self = this;
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
                self._flag = 1;
                self._DivCoord = evt.coordinate;
                self._infoOverlay.setPosition(self._DivCoord);
                self._linkLineFeature.getGeometry().setCoordinates([self._boardPoint, self._DivCoord]);
            }
        });
    };

    /**
     * 获取车辆样式
     * @returns {Style}
     * @private
     */
    RadarLabel.prototype._getStyle = function () {
        let imgUrl = this._imgUrl;
        let rotation = this._labelContent.getDirection();
        let geomarker;
        if (imgUrl) {
            geomarker = new Style({
                image: new Icon({
                    src: imgUrl,
                    rotateWithView: true,
                    scale: 1,
                    rotation: rotation
                })
            });
        } else {
            geomarker = new Style({
                image: new Circle({
                    fill: new Fill({
                        color: "rgba(255,255,255,1)"
                    }),
                    stroke: new Stroke({
                        color: "#000",
                        width: 2
                    }),
                    radius: 8
                })
            })
        }

        return geomarker;
    };

    //初始化
    RadarLabel.prototype._init = function () {
        let self = this;
        if (self._infoDiv == null) {
            self._createDiv();
            self._createOverlay();
        }
        self._boardPoint = [self._labelContent.getLongitude(), self._labelContent.getLatitude()];
        if (self._boardPoint) {
            self._info();
            self._boardPointBefore = self._boardPoint;
            self._DivCoord = self._getLinklineCoor(self._boardPoint[0], self._boardPoint[1]);
            self._infoOverlay.setPosition(self._DivCoord);
            self._boardPoint = new transform(self._boardPoint, 'EPSG:4326', 'EPSG:3857');
            self._linkLineFeature.getGeometry().setCoordinates([self._boardPoint, self._DivCoord]);
            self._linkLineFeature.setStyle(self._lineStyle);
            self._eventHandle();
        }
        if (self._islabelVisible) {
            self._infoDiv.style.display = 'block';
        }
        //self._rightClick.start('boardDiv');
    };
    //暴露给外部的接口

    /**
     * 设置标牌颜色
     */
    RadarLabel.prototype.setLabelColor = function (color) {
        // $(this._infoDiv).css("background", color);
        console.info(color);
    };
    /**
     * 标牌隐藏
     * @param isTrack 是否隐藏航迹点
     */
    RadarLabel.prototype.hide = function (isTrack) {
        if (this._infoDiv) {
            this._infoDiv.style.display = 'none';
            this._linkLineFeature.setStyle(null);
            this._islabelVisible = false;
            if (isTrack && this._pointFeature) {
                this._pointFeature.setStyle(null);
            }

        }
    };
    /**
     * 标牌显示
     * @param isTrack 是否显示航迹点
     */
    RadarLabel.prototype.show = function (isTrack) {
        if (this._infoDiv) {
            this._infoDiv.style.display = 'block';
            this._linkLineFeature.setStyle(this._lineStyle);
            this._islabelVisible = true;
            if (isTrack && this._pointFeature) {
                this._pointFeature.setStyle(this._getStyle());
            }
        }
    };

    /**
     * 标牌是否可见
     * @returns {boolean}
     */
    RadarLabel.prototype.getVisible = function () {
        return this._islabelVisible;
    };
    //移除
    RadarLabel.prototype.remove = function () {
        this.map.removeOverlay(this._infoOverlay);
        this.map.removeLayer(this._layer);
    };

    //设置位置
    RadarLabel.prototype._setDivPosition = function () {
        let diff = [];
        let self = this;
        self._boardPoint = [self._labelContent.getLongitude(), self._labelContent.getLatitude()];
        if (self._boardPoint) {
            self._info();
            if (self._flag == 0) {
                diff[0] = self._boardPoint[0] - self._boardPointBefore[0];
                diff[1] = self._boardPoint[1] - self._boardPointBefore[1];
                self._DivCoord = new transform(self._DivCoord, 'EPSG:3857', 'EPSG:4326');
                self._DivCoord[0] = self._DivCoord[0] + diff[0];
                self._DivCoord[1] = self._DivCoord[1] + diff[1];
                self._boardPointBefore = self._boardPoint;
                self._DivCoord = new transform(self._DivCoord, 'EPSG:4326', 'EPSG:3857');
                self._boardPoint = new transform(self._boardPoint, 'EPSG:4326', 'EPSG:3857');
                self._infoOverlay.setPosition(self._DivCoord);
                self._linkLineFeature.getGeometry().setCoordinates([self._boardPoint, self._DivCoord]);
            } else {
                if (self._boardPointBefore) {
                    diff[0] = self._boardPoint[0] - self._boardPointBefore[0];
                    diff[1] = self._boardPoint[1] - self._boardPointBefore[1];
                    self._DivCoord = new transform(self._DivCoord, 'EPSG:3857', 'EPSG:4326');
                    self._DivCoord[0] = self._DivCoord[0] + diff[0];
                    self._DivCoord[1] = self._DivCoord[1] + diff[1];
                    self._DivCoord = new transform(self._DivCoord, 'EPSG:4326', 'EPSG:3857');
                    self._infoOverlay.setPosition(self._DivCoord);
                    self._boardPointBefore = self._boardPoint;
                    self._boardPoint = new transform(self._boardPoint, 'EPSG:4326', 'EPSG:3857');
                    self._linkLineFeature.getGeometry().setCoordinates([self._boardPoint, self._DivCoord]);
                }
            }

        }
        // self._eventHandle();
    };
    /**
     * 计算偏移
     * @param lon
     * @param lat
     * @returns {transform}
     * @private
     */
    RadarLabel.prototype._getLinklineCoor = function (lon, lat) {
        let zoom = this.map.getView().getZoom();
        let temp = zoom > 10 ? 0.01 : 0.02;
        let lonOffset = lon + temp / zoom;
        let latOffset = lat + temp / zoom;
        return new transform([lonOffset, latOffset], 'EPSG:4326', 'EPSG:3857')
    };


    /**
     * 返回标牌
     */
    RadarLabel.prototype.getLabel = function (isshow) {
        this._islabelVisible = isshow;
        this._init();
        if (isshow) {
            // this.hide();
            this.show();
        } else {
            this.hide();
        }
        let feature = this._featurePoint;
        feature.label = this;
        feature.setProperties(this._labelContent);
        feature.setStyle(this._getStyle());
        feature.setId(this._id);
        if (this._infoDiv) {
            this._infoDiv.feature = feature;
        }
        this._pointFeature = feature;
        return feature;
    };

    /**
     * 更新
     * @param radLabelContent
     */
    RadarLabel.prototype.updateLabel = function (radLabelContent) {
        let feature = this._featurePoint;
        this._labelContent = radLabelContent;
        if (feature) {
            feature.setGeometry(this._getPoint());
            feature.setProperties(radLabelContent);
            feature.setStyle(this._getStyle());
            feature.changed();
            if (feature.label) {
                if (this._infoDiv) {
                    this._setDivPosition();
                    this._infoDiv.feature = feature;
                }
            }
        }
    };

    RadarLabel.prototype.getDivCoordinate = function () {
        return this._DivCoord;
    };
    RadarLabel.prototype.setDivCoordinate = function (option) {
        let coord = option.coord;
        let planeCoordinates = option.plane;
        this._DivCoord = coord;
        this._infoOverlay.setPosition(coord);
        this._linkLineFeature.getGeometry().setCoordinates([new transform(planeCoordinates, 'EPSG:4326', 'EPSG:3857'), coord]);
    };
    RadarLabel.prototype.getImageScale = function () {
        let feature = this._featurePoint;
        let scale = feature.getStyle().getImage().getScale();
        return scale;
    };

    /**
     * 对div的内容进行绑定
     * @param data
     * @private
     */
    RadarLabel.prototype._info = function () {
        let self = this;
        let contenthtml = '';
        let htmls = [];
        htmls.push("<span class='title-span'>" + self._text + "</span>");
        htmls.push("<div class='board-content-div'>");
        htmls.push("<table cellpadding='5' cellspacing='5' style='font-size: 12px'>");
        htmls.push("<tr>");
        htmls.push("<td class='board-mainInfo'>驾驶员</td>");
        htmls.push("<td class='board-mainInfo'>部门</td>");
        htmls.push("<td class='board-mainInfo'>速度</td>")
        htmls.push("</tr>");
        htmls.push("<tr>");
        let driverName = self._labelContent.getDriverName() || '';
        // if(driverName){
        // self._getRowHTML(htmls,driverName,"驾驶员");
        htmls.push("<td class='board-mainInfo-val'>" + driverName + "</td>");
        // }
        let depart = self._labelContent.getDepart() || '';
        // if (depart){
        htmls.push("<td class='board-mainInfo-val'>" + depart + "</td>");
        // self._getRowHTML(htmls,depart,"部门");
        // }
        // let carNo=self._labelContent.getCarNo();
        // if (carNo){
        //     self._getRowHTML(htmls,carNo,"车牌号");
        // }
        let speed = self._labelContent.getSpeed() || '';
        htmls.push("<td class='board-mainInfo-val'>" + speed + "</td>");
        htmls.push("</tr>");
        htmls.push("</table>");
        htmls.push("<table cellpadding='5' cellspacing='5' style='font-size: 12px'>");
        let postime = self._labelContent.getPostime();
        if (postime) {
            self._getRowHTML(htmls, postime, "定位时间");
        }
        let taskDesc = self._labelContent.getTaskDesc() || '';
        if (taskDesc == null) {
            taskDesc = "无";
        }
        self._getRowHTML(htmls, taskDesc, "任务");
        let alarmDesc = self._labelContent.getAlarmDesc();
        if (alarmDesc) {
            let alarmDescArr = [];
            if (alarmDesc.indexOf(";") > 0) {
                alarmDescArr = alarmDesc.split(";");
            } else {
                alarmDescArr[0] = alarmDesc;
            }
            htmls.push("<tr><td colspan='2' class='boardInfo-td'>告警信息</td></tr>");
            for (let i = 0; i < alarmDescArr.length; i++) {
                htmls.push("<tr><td colspan='2' class='boardInfo-td'>" + alarmDescArr[i] + "</td></tr>");
            }

        }
        htmls.push("</table>");
        htmls.push("<div class='board-btn-div'>")
        htmls.push("<a class='board-btn' onclick='onReplayTrack(\"" + self._labelContent.acid + "\")'>");
        htmls.push("<i class='trackBtn'></i>")
        htmls.push("<span class='trackSpan'>轨迹回放</span></a>");
        htmls.push("</div>");
        htmls.push("</div>");
        contenthtml = htmls.join("");
        self._infoDiv.innerHTML = contenthtml;

    };

    return RadarLabel;
})(window);
export default RadarLabel;
