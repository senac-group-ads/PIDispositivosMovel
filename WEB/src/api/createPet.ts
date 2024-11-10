import { api } from "@/lib/axios"

interface CreatePetRequest {
    name: any
    idade: any
    peso?: any
    tipo?: any
    descricao?: any
    porte?: any
    requisitos?: any
    fotos?: any
}

export async function createPet({ idade, name, descricao, fotos, peso, porte, requisitos, tipo }: CreatePetRequest) {
    const token = localStorage.getItem('@token')
    await api.post('/pet/create', {
        idade,
        name,
        descricao,
        fotos,
        peso,
        requisitos,
        porte,
        tipo
    },
    {headers: {Authorization: `Bearer ${token}`,}}
)
}