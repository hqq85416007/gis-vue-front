const tableData=[{
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }, {
    msgTypeId:"1001",
    msgTypeName: "天气",
  }
  ]
  const echartData=[5, 20, 36, 10, 10, 20] 
  module.exports=[
      {
        url:'/imf/msgType/getEcharsData',
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
      url:'/imf/msgType/userData',
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