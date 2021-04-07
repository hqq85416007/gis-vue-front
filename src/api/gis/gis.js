import request from '@/utils/request'
export function showJsonData(){
    return request({
        url:'/gisData/airport.json',
        method:'get'
    })
}