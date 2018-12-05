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
axios.defaults.baseURL = 'http://localhost.cntaiping.com:8080/nwxqhb';
// axios.defaults.baseURL = config.api_address_url;

// }
// alert(1)

// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// response.header("Access-Control-Allow-Origin", "*");

// axios.defaults.headers.post["Access-Control-Allow-Methods"] ="PUT,POST,GET,DELETE,OPTIONS"

// axios.defaults.headers.post["Access-Control-Allow-Headers"]= "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
// alert(11)
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
    // console.log(testPage())
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

// function testPage(){
//         axios({
//             method: 'get',
//             url: 'https://tpwxtestcloud.life.cntaiping.com/policy/toPolicyListVue.html',
//             data: '',
//             "Content-Type": "multipart/form-data"
//         }).then((res) => {
//             return true

//         }).catch((err) => {
//             return false
//         })
//         return false
// }