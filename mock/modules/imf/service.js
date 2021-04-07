const tableData=[{
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }, {
    serviceId:"1001",
    serviceName: "天气",
    remark: "123456123456789123456789123456789",
    provider: "天气管理系统",
    status: "正常",
  }
  ]
  const echartData=[5, 20, 36, 10, 10, 20] 
  module.exports=[
      {
        url:'/imf/service/getEcharsData',
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
      url:'/imf/service/userData',
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