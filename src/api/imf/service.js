import request from '@/utils/request'
export function deleteById(data){
    return request({
        url:'/imf/imfService/deleteById',
        method:'post',
        params:data
    })
}
export function pageimfService(data){
    return request({
        url:'/imf/imfService/pageimfService',
        method:'post',
        params:data
    })
}
export function save(data){
    return request({
        url:'/imf/imfService/save',
        method:'post',
        params:data
    })
}
export function selectAll(data){
    return request({
        url:'/imf/imfService/selectAll',
        method:'get',
        params:data
    })
}
export function selectById(data){
    return request({
        url:'/imf/imfService/selectById',
        method:'get',
        params:data
    })
}
export function updateById(data){
    return request({
        url:'/imf/imfService/updateById',
        method:'post',
        params:data
    })
}