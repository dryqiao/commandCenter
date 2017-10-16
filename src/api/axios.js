import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://192.168.31.147:808/api'

axios.interceptors.request.use(config=>{
    if(config.method === 'post'){
        config.data = qs.stringify(config.data)
    }
    return config
},error=>{
    console.log('参数错误')
    return Promise.reject(error)
})

axios.interceptors.response.use(res=>{
    //c=0表示接口报错
    if(!res.data.c){
        return Promise.reject(res)
    }
    return res
},error=>{
    console.log(error)
    console.log('网络异常')
    return Promise.reject(error)
})


export function fetch(url,params) {
    // console.log('fetch')
    
    return new Promise((resolve,reject)=>{
        axios.post(url,params)
            .then(res =>{
                resolve(res.data)
            }, err=>{
                reject(err)
            })
            .catch(error=>{
                reject(error)
            })
    })
}