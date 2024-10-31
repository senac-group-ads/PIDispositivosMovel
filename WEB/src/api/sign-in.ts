import { api } from "@/lib/axios"


export interface SignInRequest {
    email: string
    password: string
}

export async function signIn({ email, password }: SignInRequest) {
    const { data } = await api.post('/user/sessions', { email, password })
    
    localStorage.setItem('@token', data.token)
    return data
}