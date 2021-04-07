const tableData=[{
    appServiceId:"1000",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
  }, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
  }, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "失败",
    createTime: "2020-01-01",
}, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
  }, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
}, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
  }, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
}, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
  }, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
}, {
    appServiceId:"1001",
    appCode: "123456",
    serviceId: "k1011",
    status: "正常",
    createTime: "2020-01-01",
}
]
  const echartData=[5, 20, 36, 10, 10, 20] 
  module.exports=[
      {
        url:'/imf/appService/getEcharsData',
        type:'post',
        response: () => {
            return {
              code: 1,
              data: echartData,
              msg:'表格数据加载成功'
            }
          }
    },
    {
      url:'/imf/appService/userData',
      type:'post',
      response: config => {
          console.log(config)
          return {
            code: 1,
            data: tableData,
            msg:'表格数据加载成功'
          }
        }
  }
  ]