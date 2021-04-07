/**
     * 雷达标牌内容
     * @param options
     * @param options.ssr 二次代码
     * @param options.acid 航班号
     * @param options.height 高度 单位 10m
     * @param options.adep 起飞机场
     * @param options.ades 降落机场
     * @param options.direction 方向 单位：弧度
     * @param options.hspeed 地速 10km/h
     * @param options.vspeed 垂直速度 m/s
     * @param options.latitude 纬度
     * @param options.longitude 经度
     */
var RadarLabelContent = (function(){
    function RadarLabelContent(options) {
        this.ssr = options.ssr;
        this.acid = options.acid;
        this.height = options.height;
        this.adep = options.adep;
        this.ades = options.ades;
        this.direction = options.direction;
        this.hspeed = options.hspeed;
        this.vspeed = options.vspeed;
        this.latitude = options.latitude;
        this.longitude = options.longitude;
    }
    /**
     * 二次代码
     * @param ssr
     */
    RadarLabelContent.prototype.setSSR = function (ssr) {
        this.ssr = ssr;
    };
    RadarLabelContent.prototype.getSSR = function () {
        return this.ssr;
    };

    /**
     * 航班号或者呼号
     * @param acid
     */
    RadarLabelContent.prototype.setAcid = function (acid) {
        this.acid = acid;
    };
    RadarLabelContent.prototype.getAcid = function () {
        return this.acid;
    };

    /**
     * 高度
     * @param height
     */
    RadarLabelContent.prototype.setHeight = function (height) {
        this.height = height;
    };
    RadarLabelContent.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * 起飞机场
     * @param adep
     */
    RadarLabelContent.prototype.setAdep = function (adep) {
        this.adep = adep;
    };
    RadarLabelContent.prototype.getAdep = function () {
        return this.adep;
    };

    /**
     * 落地机场
     * @param ades
     */
    RadarLabelContent.prototype.setAdes = function (ades) {
        this.ades = ades;
    };
    RadarLabelContent.prototype.getAdes = function () {
        return this.ades;
    };

    /**
     * 地速
     * @param speed
     */
    RadarLabelContent.prototype.setHspeed = function (speed) {
        this.hspeed = speed;
    };
    RadarLabelContent.prototype.getHspeed = function () {
        return this.hspeed;
    };

    /**
     * 垂直速度
     * @param speed
     */
    RadarLabelContent.prototype.setVspeed = function (speed) {
        this.vspeed = speed;
    };
    RadarLabelContent.prototype.getVspeed = function () {
        return this.vspeed;
    };

    /**
     * 纬度
     * @param lat
     */
    RadarLabelContent.prototype.setLatitude = function (lat) {
        this.latitude = lat;
    };
    RadarLabelContent.prototype.getLatitude = function () {
        return this.latitude;
    };

    /**
     * 经度
     * @param lon
     */
    RadarLabelContent.prototype.setLongitude = function (lon) {
        this.longitude = lon;
    };
    RadarLabelContent.prototype.getLongitude = function () {
        return this.longitude;
    };

    /**
     * 方向
     * @param dir
     */
    RadarLabelContent.prototype.setDirection = function (dir) {
        this.direction = dir;
    };
    RadarLabelContent.prototype.getDirection = function () {
        return this.direction;
    }
    return RadarLabelContent;
}(Window));
export default RadarLabelContent;