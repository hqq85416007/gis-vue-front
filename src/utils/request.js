//针对axios封装的ajax请求工具类
import axios from 'axios'
import {Message} from 'element-ui'

const service=axios.create({
    baseURL:'/',
    timeout:5000
})
service.interceptors.request.use(
    config=>{
        config.headers['token']=''
        return config
    },
    error=>{
        return Promise.reject(error)
    }
    
)
service.interceptors.response.use(
    response=>{
        const  res=response.data
        if(res.code!='1'){
            Message({
                message:res.msg||'请求失败',
                type:'error',
                duration:2*1000
            })
        }else{
            return res
        }
    },
    error=>{
        Message({
            message:error.message,
            type:'error',
            duration:2*1000
        })
        return Promise.reject(error)
    }
)
export default service
