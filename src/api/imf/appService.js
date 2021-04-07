import request from '@/utils/request'
export function deleteById(data){
    return request({
        url:'/imf/appService/deleteById',
        method:'post',
        params:data
    })
}
export function pagemsg(data){
    return request({
        url:'/imf/appService/pagemsg',
        method:'post',
        params:data
    })
}
export function selectAll(data){
    return request({
        url:'/imf/appService/selectAll',
        method:'get',
        params:data
    })
}

export function save(data){
    return request({
        url:'/imf/appService/save',
        method:'post',
        params:data
    })
}
export function updateById(data){
    return request({
        url:'/imf/appService/updateById',
        method:'post',
        params:data
    })
}
export function selectById(data){
    return request({
        url:'/imf/appService/selectById',
        method:'get',
        params:data
    })
}