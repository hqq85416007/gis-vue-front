import track_Field from "@/utils/map/track_Field.js";
import olStyle from "@/utils/map/style_config.js"
export function getId(data) {
    return data[track_Field.acid];
}

export function normalHeight(height) {
    height = height / 10;
    if (height < 1000) {
        height = "0" + height;
    }
    return height;
}
/**
 * 获取图片的URL
 * @param data
 */
export function getImageUrl(data) {
    var alarmDesc = data[track_Field.alarmDesc]; //告警类型
    var taskId = data[track_Field.taskId];  //任务类型
    //告警描述
    if (alarmDesc != null && alarmDesc.length > 0) {
        return olStyle.car.alarm;
    }
    if (taskId != null && taskId.length > 0) {
        return olStyle.car.work;
    }
    return olStyle.car.free;
}

/**
 * 判断当前车是否在筛选车中
 * @param data
 * @returns {boolean}
 */
export function isCarInSelect(data) {
    var nodeObj = {};
    var str = JSON.stringify(nodeObj);

    if (str == "{}") {
        return true;
    } else {
        var id = getId(data);
        if (nodeObj[id]) {
            return true;
        } else {
            return false;
        }
    }
}


/**
 * 获取标牌内容
 * @param data
 * @returns {string}
 */
export function getBoradText(data) {
    return data[track_Field.carNo]
}