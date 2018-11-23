import axios from 'axios'
import {config} from './config.js'

const HTTP = {
    request(params){
        if (!params.method) {
            params.method = 'GET'
        }
        axios({
            url:'/wxqhb/' + params.url,
            method: params.method,
            data: params.data,
            header: {
                'content-type': 'application/json'
            },
        }).then((res) => {
            // console.log(res)
            let result = res.data
                params.success && params.success(res.data)

        }).catch((err) => {
            params.failCallback && params.failCallback(err)
            console.error('验证码接口未通')
        })
    }
}
export { HTTP }