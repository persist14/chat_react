import  request from '../utils/request'
import config from '../config'
const { api } = config
export const login = async (data) => {
    return await request({
        url: api.login,
        method: 'post',
        data
    })
}
export const demo = async () => {
    return await request({
        url: 'demo',
    })
}