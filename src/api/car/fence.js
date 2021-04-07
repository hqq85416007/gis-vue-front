import request from '@/utils/request'


//获取分页数据
export function getFenceData(data) {
    return request({
        url: '/fence/query',
        method: 'get',
        params: data
    })
}
//新增数据
export function insertFenceData(data) {
    return request({
        url: '/fence/insert',
        method: 'post',
        data
    })
}
//更新数据
export function updateFenceData(data) {
    return request({
        url: '/fence/update',
        method: 'post',
        data
    })
}

//删除数据
export function deleteFenceData(data) {
    return request({
        url: '/fence/delete',
        method: 'post',
        data
    })
}

//排除车辆数据
export function carData(data) {
    return request({
        url: '/taskmng/task/getCarTree',
        method: 'post',
        data
    })
}
//通知人员数据
export function getDriverNodeData(data) {
    return request({
        url: '/taskmng/task/getDriverTree',
        method: 'post',
        data
    })
}
/**
 * 监视主页------正在生效电子围栏
 */
export function getValidFenceData() {
    return request({
        url: '/fence/queryList',
        method: 'post'
    })
}