import { api } from "@/lib/axios"

export interface petId {
    id: string
}

export interface getPetIdResponse {
    pet: {
        id: string
        name: string
        idade: string
        peso?: string | null
        tipo?: string | null
        descricao?: string | null
        porte?: string | null
        requisitos?: string | null
        fotos?: string | null
        costumerId: string
        adotado: boolean
    }
}

export async function getPetId({ id }: petId) {
    const response = await api.get<getPetIdResponse>(`/pet/list/${id}`)

    return response.data.pet
}