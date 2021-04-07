import {XYZ} from "ol/source";
import TileLayer from "ol/layer/Tile";
var ArcGISOfflineTileLayer=(function (){
    //扩展String类，增加PadLeft，PadRight，PadHelper方法
    String.prototype.PadLeft = function (a, b) {
        return null != b ? this.PadHelper(a, b, !1) : this.PadHelper(a, " ", !1)
    };
    String.prototype.PadRight = function (a, b) {
        return null != b ? this.PadHelper(a, b, !0) : this.PadHelper(a, " ", !0)
    };
    String.prototype.PadHelper = function (a, b, d) {
        if (this.length < a) {
            var c = new String;
            for (let i = 1; i <= a - this.length; i++) c += b;
            return d ? this + c : c + this
        }
        return this
    };
    /**
     * ArcGIS离线切片地图
     * @constructor
     * @param url 切片地址
     */
    // var ArcGISOfflineTileLayer=function (url) {
    //     this.url=url;
    //     this.layer=null;
    // };
    function ArcGISOfflineTileLayer(url){
        this.url=url;
        this.layer=null;
    }
    /**
     * 加载离线底图
     * @private
     */
    ArcGISOfflineTileLayer.prototype.getLayer=function () {
        if(this.layer){
            return this.layer;
        }
        var titleUrl=this.url;
        this.layer=new TileLayer({
            source: new XYZ({
                wrapX: false,
                //attributions: [new ol.Attribution({ html: '&copy; 南京莱斯信息技术股份有限公司' })],
                tileUrlFunction: function (xyz) {
                    var z = xyz[0];
                    var x = Math.abs(xyz[1]);
                    var y = Math.abs(xyz[2]) - 1;
                    x = ('C' + x.toString(16).PadLeft(8, '0')).toUpperCase();
                    y = ( 'R' + y.toString(16).PadLeft(8, '0')).toUpperCase();
                    z = ( 'L' + z.toString().PadLeft(2, '0')).toUpperCase();
                    //var url = 'http://localhost:8080/manager/testmap2/' + z + '/' + y + '/' + x + '.png';//baseuri.local_arcgis_tile + z + '/' + y + '/' + x + '.png';
                    var url = titleUrl + z + '/' + y + '/' + x + '.png';//baseuri.local_arcgis_tile + z + '/' + y + '/' + x + '.png';
                    return url;
                }
            })
        });
        return this.layer;
    };
    return ArcGISOfflineTileLayer;
}(Window));
export default ArcGISOfflineTileLayer;