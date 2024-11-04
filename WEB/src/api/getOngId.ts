import { api } from "@/lib/axios"

export interface OngResponse {
    id: string,
    name: string
    email: string
    cep: string
    numero: string
    contato: string
    role: string
    avata: string | null
}

export async function getOngId(id: string) {
    const response = await api.get(`/user/list/${id}`)

    return response.data
}