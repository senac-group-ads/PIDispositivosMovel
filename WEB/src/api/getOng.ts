import { api } from "@/lib/axios";

export interface GetOng {
    user: {
        id: string,
        name: string
        email: string
        cep: string
        numero: string
        contato: string
        role: string
        avata: string | null
    }[]
}

export async function getOngs() {
    const response = await api.get<GetOng>('/user/list/ong')

    return response.data.user
}