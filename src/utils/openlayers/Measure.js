import Vector from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { getDistance } from 'ol/sphere';
import Feature from 'ol/Feature';
import { LineString, Polygon } from 'ol/geom'
import Draw from "ol/interaction/Draw";
import Overlay from "ol/Overlay";
import { unByKey } from "ol/Observable"
import { Fill, Stroke, Circle, Style } from 'ol/style';
import { transform } from 'ol/proj';


/**
 * 测量类
 * @constructor
 * #class Measure
 * @param map
 * @param options
 */
var Measure = (function () {
    function Measure(map, options) {
        if (!options)
            options = {};
        //地图相关
        this.map = map;
        this.draw = null;
        this.source = new Vector();
        this.sphereradius = options.sphereradius || 6378137;

        //{uuid,对象}
        this._allfeatures = {};
        this._allFeaturesId = [];
        //定义矢量图层
        this.vector = new VectorLayer({
            source: this.source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255,255,255,0.2)'
                }),
                stroke: new Stroke({
                    color: '#e21e0a',
                    width: 2
                }),
                image: new Circle({
                    radius: 5,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            }),
            zIndex: 9999
        });
        //将矢量图层添加到地图中
        map.addLayer(this.vector);

        //提示信息
        //创建一个帮助提示框对象
        this._helpTooltipElement = null;
        //创建一个帮助提示信息对象
        this._helpTooltip = null;
        //创建一个测量提示框对象
        this._measureTooltipElement = null;
        //创建一个测量提示信息对象
        this._measureTooltip = null;

        this._count = 0;

        this.isMeasureStatus = false;
    }

    Measure.prototype._mousemove = function () {
        //创建一个帮助提示框对象
        var helpTooltipElement = this._helpTooltipElement;
        //创建一个帮助提示信息对象
        var helpTooltip = this._helpTooltip;
        //鼠标移动触发的函数
        var self = this;
        var pointerMoveHandler = function (evt) {
            var count = self._count;
            //如果是平移地图则直接结束
            if (evt.dragging) {
                return;
            }
            //帮助提示信息
            var helpMsg = "";
            if (count == 0) {
                helpMsg = '单击开始测量';
            } else {
                helpMsg = '双击结束测量';
            }
            //设置帮助提示要素的内标签为帮助提示信息
            helpTooltipElement.innerHTML = helpMsg;
            //设置帮助提示信息的位置
            //The coordinate in view projection corresponding to the original browser event.
            helpTooltip.setPosition(evt.coordinate);

            //移除帮助提示要素的隐藏样式
            // helpTooltipElement.('hidden');

        };

        //触发pointermove事件
        this.map.on('pointermove', pointerMoveHandler);
    };
    /**
     * 添加交互式绘图对象的函数
     * @param measuretype
     */
    Measure.prototype._addInteraction = function (measuretype) {
        var self = this, map = self.map;
        // 获取当前选择的绘制类型
        var type = measuretype == 'area' ? 'Polygon' : 'LineString';
        //创建一个交互式绘图对象
        this.draw = new Draw({
            //绘制的数据源
            source: self.source,
            //绘制类型
            type: type,
            //绘制过程中的样式
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255,255,255,0.2)'
                }),
                stroke: new Stroke({
                    color: 'rgba(70,77,82,0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new Circle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(0,0,0,0.7)'
                    }),
                    fill: new Fill({
                        color: 'rgba(255,255,255,0.2)'
                    })
                })
            })
        });
        //将交互绘图对象添加到地图中
        map.addInteraction(this.draw);
        //创建帮助提示框
        self._createHelpTooltip();

        //定义一个事件监听
        var listener;
        var uuid = null;
        var sketch = null;
        //绘制开始事件
        this.draw.on('drawstart', function (evt) {
            let map = self.map;
            self.isMeasureStatus = true;
            sketch = evt.feature;
            uuid = self._uuid();
            self._allFeaturesId.push(uuid);
            self._allfeatures[uuid] = [sketch];
            self._createMeasureTooltip();
            listener = sketch.getGeometry().on('change', function (evt) {
                //The event target.
                let geom = evt.target, tooltipCoord, output;
                //定义一个输出对象，用于记录面积和长度
                if (geom instanceof Polygon) {
                    map.removeEventListener('singleclick');
                    map.removeEventListener('dblclick');
                    //输出多边形的面积
                    output = self._formatArea(geom);
                    //获取多变形内部点的坐标
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof LineString) {
                    //输出多线段的长度
                    output = self._formatLength(geom);
                    //获取多线段的最后一个点的坐标
                    tooltipCoord = geom.getLastCoordinate();
                }
                //设置测量提示框的内标签为最终输出结果
                self._measureTooltipElement.innerHTML = output;
                self._measureTooltipElement.style.display = 'none';
                let innerHTML = self._helpTooltipElement.innerHTML;
                innerHTML = "双击结束测量" + '<br>' + output;
                self._helpTooltipElement.innerHTML = innerHTML;
                //设置测量提示信息的位置坐标
                self._measureTooltip.setPosition(tooltipCoord);
            });
            //地图单击事件
            self._clickE = map.on('singleclick', function (evt) {
                if (!self.isMeasureStatus) return;
                console.info("jijijijij");
                //设置测量提示信息的位置坐标，用来确定鼠标点击后测量提示框的位置
                self._measureTooltip.setPosition(evt.coordinate);
                self._measureTooltipElement.style.display = 'block';
                self._allfeatures[uuid].push(self._measureTooltip);//存储单点overlay
                //如果是第一次点击，则设置测量提示框的文本内容为起点
                self._measureTooltipElement.className = 'tooltip tooltip-static';
                if (self._count == 0) {
                    self._measureTooltipElement.innerHTML = "起点";
                }
                self._createMeasureTooltip();
                self._count++;
            });

        }, this);
        //绘制结束事件
        this.draw.on('drawend', function () {
            self.isMeasureStatus = false;
            //添加关闭按钮
            var popupcloser = document.createElement('a');
            popupcloser.setAttribute("id", uuid);
            popupcloser.setAttribute("title", "删除");
            popupcloser.href = 'javascript:void(0);';
            popupcloser.classList.add('ol-popup-closer');
            self._measureTooltipElement.appendChild(popupcloser);
            self._measureTooltipElement.style.zIndex = 99;
            self._count = 0;
            //设置测量提示框的样式
            self._measureTooltipElement.className = 'tooltip tooltip-static';
            self._measureTooltipElement.style.display = 'block';
            //设置偏移量
            self._measureTooltip.setOffset([0, -7]);
            self._allfeatures[uuid].push(self._measureTooltip);
            //清空绘制要素
            sketch = null;
            //清空测量提示要素
            self._measureTooltipElement = null;
            //创建测量提示框
            // self._createMeasureTooltip();
            //移除事件监听
            unByKey(listener);
            //移除地图单击事件
            // map.removeEventListener('singleclick');
            unByKey(self._clickE);
            self.stop();
            //关闭按钮触发事件
            popupcloser.onclick = function () {
                var uuid = this.getAttribute("id");
                var features = self._allfeatures[uuid];
                for (var i = 0; i < features.length; i++) {
                    var feature = features[i];
                    if (feature instanceof Overlay) {
                        map.removeOverlay(feature);
                    } else if (feature instanceof Feature) {
                        if (feature)
                            self.source.removeFeature(feature);
                    }
                    else {
                        map.removeLayer(feature);
                    }
                }
            };
        }, this);
    };
    /**
     * //创建测量提示框，随时显示当前点到起点的位置
     */
    Measure.prototype._createHelpTooltip = function () {
        //如果已经存在帮助提示框则移除
        if (this._helpTooltipElement) {
            this._helpTooltipElement.parentNode.removeChild(this._helpTooltipElement);
        }
        //创建帮助提示要素的div
        this._helpTooltipElement = document.createElement('div');
        //设置帮助提示要素的样式
        this._helpTooltipElement.className = 'tooltip hidden';
        //创建一个帮助提示的覆盖标注
        this._helpTooltip = new Overlay({
            element: this._helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        //将帮助提示的覆盖标注添加到地图中
        this.map.addOverlay(this._helpTooltip);
    };
    /**
     *创建帮助提示框，起点，中间点，终点
        */
    Measure.prototype._createMeasureTooltip = function () {
        //创建测量提示框的div
        this._measureTooltipElement = document.createElement('div');
        // this._measureTooltipElement.setAttribute('id', 'lengthLabel');
        //设置测量提示要素的样式
        this._measureTooltipElement.className = 'tooltip tooltip-measure';
        //创建一个测量提示的覆盖标注
        this._measureTooltip = new Overlay({
            element: this._measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        //将测量提示的覆盖标注添加到地图中
        this.map.addOverlay(this._measureTooltip);
    };
    /**
     * 格式化测量长度
     * @returns {*}
     * @private
     */
    Measure.prototype._formatLength = function (line) {
        //定义长度变量
        var length;
        var coordinates = line.getCoordinates();
        length = 0;
        var sourceProj = this.map.getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += getDistance(c1, c2);
        }
        //定义输出变量
        var output;
        //如果长度大于1000，则使用km单位，否则使用m单位
        if (length > 1000) {
            output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'; //换算成KM单位
        } else {
            output = (Math.round(length * 100) / 100) + ' ' + 'm'; //m为单位
        }
        return output;
    };
    /**
     * 格式化测量面
     * @returns {*}
     * @private
     */
    Measure.prototype._formatArea = function (polygon) {
        //定义面积变量
        var area = polygon.getArea();
        //定义输出变量
        var output;
        //当面积大于10000时，转换为平方千米，否则为平方米
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
        }
        return output;
    };
    /**
     * 建立唯一值编号
     * @returns {string}
     */
    Measure.prototype._uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    /**
     * 开始测量
     * @param type {}"area",'length'
     */
    Measure.prototype.start = function (type) {
        if (this.draw) {
            this.map.removeInteraction(this.draw);
        }
        this._addInteraction(type);
        this._mousemove();
    };
    Measure.prototype.stop = function () {
        this.map.removeInteraction(this.draw);
        this.map.removeEventListener('mousemove');
        this._helpTooltipElement.style.display = 'none';
        this.isMeasureStatus = false;
    };
    Measure.prototype.isStart = function () {
        return this.isMeasureStatus;
    };

    Measure.prototype.removeAll = function () {
        var allFeatures = this._allfeatures;
        for (var m = 0; m < this._allFeaturesId.length; m++) {
            if (allFeatures[this._allFeaturesId[m]]) {
                var features = allFeatures[this._allFeaturesId[m]];
                for (var i = 0; i < features.length; i++) {
                    var feature = features[i];
                    if (feature instanceof Overlay) {
                        this.map.removeOverlay(feature);
                    } else if (feature instanceof Feature) {
                        if (feature)
                            this.source.removeFeature(feature);
                    }
                    else {
                        this.map.removeLayer(feature);
                    }
                }
            }
        }
        this._allfeatures = {};
        this._allFeaturesId = [];
    }
    return Measure;
}(Window));
export default Measure;


