const tableData=[{
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }, {
    routeId:"192.168.1.1/192.168.0.1",
    msgCode: "1001",
    appCode: "q2001",
    status: "正常",
    createTime: "10",
  }
  ]
  const echartData=[5, 20, 36, 10, 10, 20] 
  module.exports=[
      {
        url:'/imf/msgRoute/getEcharsData',
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
      url:'/imf/msgRoute/userData',
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