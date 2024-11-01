import { api } from "@/lib/axios"

export interface GetProfileResponse {
    user: {
        id: string,
        name: string
        email: string
        cep: string
        numero: string
        contato: string
        role: string
        avata: string | null
    }
}

export async function profile() {
    const token = localStorage.getItem('@token')
    const response = await api.get<GetProfileResponse>('/user/me', { headers: {
        Authorization: `Bearer ${token}`
    }})

    return response.data.user
}