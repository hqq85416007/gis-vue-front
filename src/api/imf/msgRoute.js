import request from '@/utils/request'
export function deleteById(data){
    return request({
        url:'/imf/imfMsgRoute/deleteById',
        method:'post',
        params:data
    })
}
export function pageimfmsg(data){
    return request({
        url:'/imf/imfMsgRoute/pageimfmsg',
        method:'get',
        params:data
    })
}
export function save(data){
    return request({
        url:'/imf/imfMsgRoute/save',
        method:'post',
        params:data
    })
}
export function selectAll(data){
    return request({
        url:'/imf/imfMsgRoute/selectAll',
        method:'get',
        params:data
    })
}
export function selectById(data){
    return request({
        url:'/imf/imfMsgRoute/selectById',
        method:'get',
        params:data
    })
}
export function updateById(data){
    return request({
        url:'/imf/imfMsgRoute/updateById',
        method:'post',
        params:data
    })
}