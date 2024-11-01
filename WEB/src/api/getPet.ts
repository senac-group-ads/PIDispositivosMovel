import { api } from "@/lib/axios";

export interface GetPetResponse {
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
        userId: string
        adotado: boolean
    }[]
}

export async function getPet() {
    const response = await api.get<GetPetResponse>('/pet/list', {
        params: {page: `1`}
    })

    return response.data.pet
}