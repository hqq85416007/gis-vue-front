const tableData=[{
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
  }, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
  }, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
}, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
  }, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
}, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
  }, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
}, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
  }, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
  }, {
    msgCode:"1001",
    msgType: "历史信息",
    from: "011.01",
    to: ['运输','技术'],
    remark: "1001",
    status: "有效",
  }
  ]
  const echartData=[5, 20, 36, 10, 10, 20] 
  module.exports=[
      {
        url:'/imf/msg/getEcharsData',
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
      url:'/imf/msg/userData',
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