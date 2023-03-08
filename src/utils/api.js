import axios from 'axios'
import { LoginContext } from 'Context/LoginContext'
import { useContext } from 'react'

const api = axios.create({
    baseURL: 'http://localhost:8080/laravel/public/api/'
})

export const get = async (path, options = {}) => {
    const res = await api.get(path, options)
    return res.data
}

export const post = async (path, datas = {}, config = {}) => {
    const res = await api.post(path, datas, config)
    return res.data
}

export default api
console.log('thuandv1')
