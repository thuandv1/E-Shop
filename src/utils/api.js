import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/laravel/public/api/'
})

export const get = async (path, options = {}) => {
    const res = await api.get(path, options)
    return res.data
}

export const post = async (path, datas = {}) => {
    const res = await api.post(path, datas)
    return res.data
}

export default api
