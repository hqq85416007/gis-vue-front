const reponseData = [
    { "name": "民航苏A002", "pid": "a541622ac6b14cdf93361485b7e412a4", "orgId": "10e52e1f2f7640d09fef87b256eed713", "status": "1" },
    { "name": "民航苏A001", "pid": "963bff93cd8f48d49fd0f3067fcf43c8", "orgId": "6bc3fd15a3e54d8bb184cf138e90d2a0", "status": "0" },
    { "name": "民航苏A003", "pid": "a541622ac6b14cdf93361485b7e412a4", "orgId": "123457aad424c30916bfdb3cc992493", "status": "0" },
    { "name": "民航苏A010", "pid": "a541622ac6b14cdf93361485b7e412a4", "orgId": "92e8bedb52b3497ab387af8dc4de7a66", "status": "0" },
    { "name": "民航苏A006", "pid": "74a69965909146b8bc1633ad81273d7c", "orgId": "474cf77bc91a4155b7d3da1e05605331", "status": "0" },
    { "name": "民航苏A008", "pid": "963bff93cd8f48d49fd0f3067fcf43c8", "orgId": "781eb6091fd54b8db2df311c53ebbe69", "status": "1" },
    { "name": "民航苏A005", "pid": "74a69965909146b8bc1633ad81273d7c", "orgId": "554cf77bc91a4155b7d3da1e05605331", "status": "0" },
    { "name": "民航苏A004", "pid": "0c3e84528d86456386e00099e9af415b", "orgId": "01f9199aec964ef7966d2cfeeb69b2b6", "status": "0" },
    { "name": "民航苏A668", "pid": "963bff93cd8f48d49fd0f3067fcf43c8", "orgId": "8549df0a38934d9f903086c000b82aaa" },
    { "name": "民航苏B001", "pid": "84cb0b8c99e7454d97062db643682dd4", "orgId": "9f6491adc1ab4f468ce40bbeea328418" },
    { "name": "民航苏A007", "pid": "74a69965909146b8bc1633ad81273d7c", "orgId": "cb117a01442f4fd5a6c477df82418e0e" },
    { "name": "民航苏A009", "pid": "a541622ac6b14cdf93361485b7e412a4", "orgId": "fa4ca952ca5b42c39f7a24301dae9cc1" },
    { "name": "机务保障部门", "pid": "84cb0b8c99e7454d97062db643682dd4", "orgId": "963bff93cd8f48d49fd0f3067fcf43c8", "status": "1" },
    { "name": "旅客服务部", "pid": "963bff93cd8f48d49fd0f3067fcf43c8", "orgId": "0c3e84528d86456386e00099e9af415b", "status": "1" },
    { "name": "运维保障部门", "pid": "84cb0b8c99e7454d97062db643682dd4", "orgId": "a541622ac6b14cdf93361485b7e412a4", "status": "1" },
    { "name": "XX机场", "pid": "0", "orgId": "84cb0b8c99e7454d97062db643682dd4", "status": "1" },
    { "name": "货运部", "pid": "bdfbb9912e0b41dd901d3bc87a47a8b7", "orgId": "80cf53660ded463ebfed24007c294384", "status": "1" },
    { "name": "保障部", "pid": "84cb0b8c99e7454d97062db643682dd4", "orgId": "8669f7fc42b54dcbb77f43c206c67429", "status": "1" },
    { "name": "地服保障", "pid": "8669f7fc42b54dcbb77f43c206c67429", "orgId": "10c6109c3c104cb29dfe06d8d02a3c31", "status": "1" },
    { "name": "跑道保障", "pid": "8669f7fc42b54dcbb77f43c206c67429", "orgId": "95e317e0db0048bdb5d21cd6915357c3", "status": "1" },
    { "name": "机务科", "pid": "a541622ac6b14cdf93361485b7e412a4", "orgId": "bdfbb9912e0b41dd901d3bc87a47a8b7", "status": "1" },
    { "name": "巡查科", "pid": "a541622ac6b14cdf93361485b7e412a4", "orgId": "ec00660fdaf84d6b87e7ece1b600f507", "status": "1" }
];
const center = [119.137859, 33.795129];
const fenceDatas = [{ "fenceid": "14612a372643488ba81e25760e34daba", "name": "test1", "type": "1", "startdate": "2021-02-22", "enddate": "2021-03-25", "starttime": "02:22:34", "endtime": "23:22:37", "carlist": null, "rulespec": "200", "creator": null, "createtime": "2021-02-22 18:17:39", "lnglat": "118.873737 33.990789,118.817432 33.753624,119.072864 33.735353,119.092090 33.937257,118.873737 33.990789", "plottype": "1", "width": null, "cartypes": "1", "sortField": null, "sortOrder": null, "removecar": null, "noticeobj": null }, { "fenceid": "9f8e908c0da04695bb0adc3adacd34a1", "name": "1", "type": "1", "startdate": "2021-02-02", "enddate": "2021-03-25", "starttime": "05:00:43", "endtime": "21:00:43", "carlist": null, "rulespec": "11", "creator": null, "createtime": "2021-02-22 18:56:51", "lnglat": "119.085750 33.660352,119.224605 33.706061,119.180355 33.601910,119.085750 33.660352", "plottype": "1", "width": null, "cartypes": "0", "sortField": null, "sortOrder": null, "removecar": null, "noticeobj": null }]
const alarmDatas = [{ "carId": "6bc3fd15a3e54d8bb184cf138e90d2a0", "carNo": "民航苏A001", "type": "1", "alarmId": "5a40a44fcbe842e5809831b69aea1653", "startTime": "2021-02-02 19:00:52", "endTime": null, "alarmDesc": "设备离线告警:车载设备1", "handler": null, "handleDesc": null, "driverName": null, "taskName": null }];
module.exports = [
    {
        url: '/car/queryCarOnLine',
        type: 'post',
        response: () => {
            return {
                code: 1,
                data: reponseData,
                msg: '成功'
            }
        }
    },
    {
        url: "/fence/queryList",
        type: 'post',
        response: () => {
            return {
                code: 1,
                data: fenceDatas,
                msg: '成功'
            }
        }
    },
    {
        url: "/car/location/fenceAlarm",
        type: "post",
        response: () => {
            return {
                code: 1,
                data: alarmDatas,
                msg: "成功"
            }
        }
    },
    {
        url: "/car/location/carTrack",
        type: 'post',
        response: config => {
            console.info(config);
            let centers = [];
            for (let i = 0; i < 120; i++) {
                // let center1 = [center[0] + i * 0.001, center[1] + i * 0.001]
                let obj = {};
                obj.lng = center[0] + i * 0.01;
                obj.lat = center[1] + i * 0.01;
                obj.carNo = "123";
                obj.height = 123;
                obj.speed = 123;
                centers.push(obj);
            }
            return {
                code: 1,
                data: centers,
                msg: '成功'
            }
        }
    }
]