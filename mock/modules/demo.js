const tableData=[{
  date: '2020-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}, {
  date: '2020-05-04',
  name: '王大虎',
  address: '上海市普陀区金沙江路 1517 弄',
   region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}, {
  date: '2020-05-01',
  name: '王中虎',
  address: '上海市普陀区金沙江路 1519 弄',
   region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}, {
  date: '2020-05-03',
  name: '王全虎',
  address: '上海市普陀区金沙江路 1516 弄',
   region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}, {
  date: '2020-05-04',
  name: '王大虎',
  address: '上海市普陀区金沙江路 1517 弄',
   region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
},
{
  date: '2020-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}, {
  date: '2020-05-04',
  name: '王大虎',
  address: '上海市普陀区金沙江路 1517 弄',
   region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}, {
  date: '2020-05-01',
  name: '王中虎',
  address: '上海市普陀区金沙江路 1519 弄',
   region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}, {
  date: '2020-05-03',
  name: '王全虎',
  address: '上海市普陀区金沙江路 1516 弄',
   region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}, {
  date: '2020-05-04',
  name: '王大',
  address: '上海市普陀区金沙江路 1517 弄',
   region:'上海',
  delivery:'是',
  type:['线下主题活动'],
  resource:'男'
}
]
const echartData=[5, 20, 36, 10, 10, 20] 
module.exports=[
    {
      url:'/demo/getEcharsData',
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
    url:'/demo/userData',
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