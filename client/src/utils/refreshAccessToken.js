import authApi from '../api/authApi'
import router from '../router'

export default function refreshAccessToken(){
    authApi.refreshToken() 
    .then ( response => {
        const accessToken = {
            name: 'accessToken',
            value: response.accessToken,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), 
        }
        document.cookie = `${accessToken.name}=${accessToken.value}; expires=${accessToken.expires.toUTCString()}`
    })
    .catch ( error => {
        document.cookie = `${'accessToken'}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        localStorage.removeItem('refreshToken')
        router.push({ path: '/login'})
    })
}