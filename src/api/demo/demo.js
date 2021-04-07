import request from '@/utils/request'
//获取用户信息，这里方法与后台Controller方法名一致
export function getUserData(data){
    return request({
        url:'/demo/userData',
        method:'post',
        data
    })
}
export function getEcharsData(data){
    return request({
        url:'/demo/getEcharsData',
        method:'post',
        data
    })
}