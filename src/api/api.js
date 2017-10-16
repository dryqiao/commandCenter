import {fetch} from './axios'
 
export default {
    //获取布景
    getScene(params){
        return fetch('/commandCenter-config/getScene',params)
    },
    //插入布景
    insertScene(params){
        return fetch('/commandCenter-config/insertScene',params)
    },

    // 更新布景
    updateScene(params){
        return fetch('/commandCenter-config/updateScene',params)
    },
    //删除布景
    deleteScene(params){
        return fetch('/commandCenter-config/deleteScene',params)
    },

    getModule(params){
        return fetch('/commandCenter-config/getModule',params)
    },

    //获取预案
    getScheme(params){
        return fetch('/commandCenter-config/getScheme',params)
    },
    //插入预案
    insertScheme(params){
        return fetch('/commandCenter-config/insertScheme',params)
    },
    //更新预案
    updateScheme(params){
        return fetch('/commandCenter-config/updateScheme',params)
    },
    //删除预案
    deleteScheme(params){
        return fetch('/commandCenter-config/deleteScheme',params)
    },
    
}