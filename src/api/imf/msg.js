import request from '@/utils/request'
export function deleteById(data){
    return request({
        url:'/imf/msg/deleteById',
        method:'post',
        params:data
    })
}
export function pagemsg(data){
    return request({
        url:'/imf/msg/pagemsg',
        method:'get',
        params: data
    })
}
export function save(data){
    return request({
        url:'/imf/msg/save',
        method:'post',
        params:data
    })
}
export function selectAll(data){
    return request({
        url:'/imf/msg/selectAll',
        method:'get',
        params:data
    })
}
export function selectById(data){
    return request({
        url:'/imf/msg/selectById',
        method:'get',
        params:data
    })
}
export function updateById(data){
    return request({
        url:'/imf/msg/updateById',
        method:'post',
        params:data
    })
}