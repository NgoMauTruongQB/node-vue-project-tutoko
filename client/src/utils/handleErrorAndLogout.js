import router from '../router'
import { useToastStore } from '../stores/toast'

export default function handleErrorAndLogout(){
    const storeToast = useToastStore()
    document.cookie = `${'accessToken'}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    localStorage.removeItem('refreshToken')
    storeToast.addToast('Please log in to continue!', 'danger', 'Error')
    router.push({ path: '/login'})
}