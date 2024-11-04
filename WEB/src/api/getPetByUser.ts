import { api } from "@/lib/axios"

export interface GetPetByUser {
    id: string
    name: string
    idade: string
    peso?: string | null
    tipo?: string | null
    descricao?: string | null
    porte?: string | null
    requisitos?: string | null
    fotos?: string | null
    userId: string
    adotado: boolean
}

export async function getPetByUser(id: string ) {
    const response = await api.get<GetPetByUser[]>(`/pet/listbyuser/${id}`)

    return response.data
}