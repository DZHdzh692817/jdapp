import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/cdf5aab90f10c3b7badb3cd0c0491e4f/jdapp',
    timeout: 10000
})

export const post = (url, data = {}) => {
    return new Promise( (resolve, reject) => {
        instance.post(url, data, {
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            resolve(response.data)//resolve(response)//只传递data里的数据
        }, err => {
            reject(err)
        })
    })
}

export const get = (url, params = {}) => {
    return new Promise( (resolve, reject) => {
        instance.get(url, { params }, {
        }).then((response) => {
            resolve(response.data)//resolve(response)//只传递data里的数据
        }, err => {
            reject(err)
        })
    })
}