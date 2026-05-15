import {useRouter} from "vue-router";
import {AuthService} from "@/services/auth.service.ts";

export function useLogout() {
    const router = useRouter()

    return () => {
        AuthService.clearAuth()
        router.push('/login')
    }
}