import request from '../utils/request';
import { protocol_and_host } from '../config'

export function info() {
    const options = { method: "GET" }
    return request(protocol_and_host + '/account/info', options)
        .then(function(data) {
            return data
        })
}

export function login({ userName, password, message }) {
    const data = { password: password }
    const options = { method: "POST", body: data }
    return request(protocol_and_host + '/account/' + userName, options)
        .then(function(data) {
            console.log(data)
            if (data.status != 'ok') {
                message.warning('账号或密码错误：' + data.msg);
            }
            return data
        })
}

export function register({ mobile, password }) {
    const data = { password, mobile, username:'none' }
    const options = { method: "POST", body: data }
    return request(protocol_and_host + '/account/register', options)
        .then(function(data) {
            console.log(data)
            return data
        })
}

export function logout() {
    const options = { method: "GET" }
    return request(protocol_and_host + '/account/logout', options)
        .then(function(data) {
            console.log(data.results)
            return data
        })
}
