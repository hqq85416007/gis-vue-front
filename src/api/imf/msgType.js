import request from '@/utils/request'
export function deleteById(data){
    return request({
        url:'/imf/imfmsgtype/deleteById',
        method:'post',
        params:data
    })
}
export function pageimfmsgType(data){
    return request({
        url:'/imf/imfmsgtype/pageimfmsgType',
        method:'post',
        params: data
    })
}
export function save(data){
    return request({
        url:'/imf/imfmsgtype/save',
        method:'post',
        params:data
    })
}
export function selectAll(data){
    return request({
        url:'/imf/imfmsgtype/selectAll',
        method:'get',
        params:data
    })
}
export function selectById(data){
    return request({
        url:'/imf/imfmsgtype/selectById',
        method:'get',
        params:data
    })
}
export function updateById(data){
    return request({
        url:'/imf/imfmsgtype/updateById',
        method:'post',
        params:data
    })
}
