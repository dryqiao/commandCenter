import {fetch} from './axios'
 
export default {

    getScene(params){
        return fetch('/commandCenter-config/getScene',params)
    },

    insertScene(params){
        return fetch('/commandCenter-config/insertScene',params)
    },

    // 更新布景
    updateScene(params){
        return fetch('/commandCenter-config/updateScene',params)
    },

    deleteScene(params){
        return fetch('/commandCenter-config/deleteScene',params)
    },

    getModule(params){
        return fetch('/commandCenter-config/getModule',params)
    },

    insertScheme(params){
        return fetch('/commandCenter-config/insertScheme',params)
    },
}