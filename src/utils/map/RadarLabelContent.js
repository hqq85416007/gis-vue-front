/**
 * 车辆标牌内容
 * @param options
 * @param options.acid 车辆唯一号
 * @param options.height 高度 单位 10m
 * @param options.direction 方向
 * @param options.speed 速度  km/h
 * @param options.latitude 纬度
 * @param options.longitude 经度
 * @param options.carNo 车牌号 苏A001
 * @param options.featureName 要素属性
 * @param options.driverName  驾驶员名字
 * @param options.depart  车辆部门
 * @param options.alarmDesc 告警描述
 * @param options.imgUrl 告警描述
 */
const RadarLabelContent = (function () {
    function RadarLabelContent(options) {
        this.acid = options.acid;
        this.height = options.height;
        this.direction = options.direction;
        this.speed = options.speed;
        this.latitude = options.latitude;
        this.longitude = options.longitude;
        this.carNo = options.carNo;
        this.featureName = options.featureName;
        this.driverName = options.driverName;
        this.depart = options.depart;
        this.alarmDesc = options.alarmDesc;
        this.imgUrl = options.imgUrl;
        this.taskDesc = options.taskDesc;
        this.postime = options.postime;
    }


    /**
     * 车辆唯一号
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
     * 车辆速度
     * @param speed
     */
    RadarLabelContent.prototype.setSpeed = function (speed) {
        this.speed = speed;
    };
    RadarLabelContent.prototype.getSpeed = function () {
        return this.speed;
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
    };
    /**
     * 车牌号
     * @param carNo
     */
    RadarLabelContent.prototype.setCarNo = function (carNo) {
        this.carNo = carNo;
    };
    RadarLabelContent.prototype.getCarNo = function () {
        return this.carNo;
    };
    /**
     * 要素属性
     * @param featureName
     */
    RadarLabelContent.prototype.setFeatureName = function (featureName) {
        this.featureName = featureName;
    };
    RadarLabelContent.prototype.getFeatureName = function () {
        return this.featureName;
    };
    /**
     * 驾驶员名字
     * @param driverName
     */
    RadarLabelContent.prototype.setDriverName = function (driverName) {
        this.driverName = driverName;
    };
    RadarLabelContent.prototype.getDriverName = function () {
        return this.driverName;
    };
    /**
     * 告警描述
     * @param alarmDesc
     */
    RadarLabelContent.prototype.setAlarmDesc = function (alarmDesc) {
        this.alarmDesc = alarmDesc;
    };
    RadarLabelContent.prototype.getAlarmDesc = function () {
        return this.alarmDesc;
    };
    /**
     * 部门
     * @param depart
     */
    RadarLabelContent.prototype.setDepart = function (depart) {
        this.depart = depart;
    };
    RadarLabelContent.prototype.getDepart = function () {
        return this.depart;
    };
    /**
     * 图片url
     * @param imgUrl
     */
    RadarLabelContent.prototype.setImgUrl = function (imgUrl) {
        this.imgUrl = imgUrl;
    }
    RadarLabelContent.prototype.getImgUrl = function () {
        return this.imgUrl;
    }
    /**
     * 任务描述
     * @param taskDesc
     */
    RadarLabelContent.prototype.setTaskDesc = function (taskDesc) {
        this.taskDesc = taskDesc;
    }
    RadarLabelContent.prototype.getTaskDesc = function () {
        return this.taskDesc;
    }
    /**
     * 定位时间
     * @param postime
     */
    RadarLabelContent.prototype.setPostime = function (postime) {
        this.postime = postime;
    }
    RadarLabelContent.prototype.getPostime = function () {
        return this.postime;
    }
    return RadarLabelContent;
}(Window));
export default RadarLabelContent;