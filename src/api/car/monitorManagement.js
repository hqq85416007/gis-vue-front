import request from '@/utils/request'
// import Qs from 'qs'

//车辆树结构
export function queryCarOnLine() {
    return request({
        url: '/car/queryCarOnLine',
        method: 'post'
    })
}
//告警信息
export function queryAlarm() {
    return request({
        url: '/car/location/fenceAlarm',
        method: 'post'
    })
}
/**
 * 获取历史数据
 * @param {starttime,endtime,carno} data 
 * @returns 
 */
export function getHistoryData(data) {
    return request({
        url: "/car/location/carTrack",
        method: "post",
        params: data
    })
}