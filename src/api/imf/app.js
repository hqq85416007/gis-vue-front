import request from '@/utils/request'
export function selectAll(data){
    return request({
        url:'/imf/app/selectAll',
        method:'get',
        params:data
    })
}
export function pageImfApp(data){
    return request({
        url:'/imf/app/pageImfApp',
        method:'get',
        params: data
    })
}
export function deleteById(data){
    return request({
        url:'/imf/app/deleteById',
        method:'post',
        params:data
    })
}
export function save(data){
    return request({
        url:'/imf/app/save',
        method:'post',
        params:data
    })
}
export function updateById(data){
    return request({
        url:'/imf/app/updateById',
        method:'post',
        params:data
    })
}
export function selectById(data){
    return request({
        url:'/imf/app/selectById',
        method:'get',
        params:data
    })
}