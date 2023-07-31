import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    timeout: 10000,
    withCredentials: true,
})

instance.interceptors.request.use(
    function (config) {
        const refreshToken = localStorage.getItem('refreshToken')
        config.headers['Authorization'] = 'Bearer ' + refreshToken
        return config
    }, 
    function (error) {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function (response) {
        return response.data
    }, 
    function (error) {
        return Promise.reject(error)
    }
)

export default instance