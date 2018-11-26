import axios from 'axios'
import {config} from './config.js'
/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
// import axios from 'axios';
import QS from 'qs';
import { Toast } from 'vant';
// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
// import store from '../store/index.js';

// 环境的切换
// if (process.env.NODE_ENV == 'development') { 
//  axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV == 'debug') { 
//  axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') { 
// axios.defaults.baseURL = 'https://tpwxtestcloud.life.cntaiping.com/wxqhb';
// }

// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data';

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}