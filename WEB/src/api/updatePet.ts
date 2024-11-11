import { api } from "@/lib/axios";

interface PetRequest {
    id: string,
    name?: string,
    idade?: string,
    tipo?: string | null,
    porte?: string | null,
    descricao?: string | null,
    peso?: string | null,
    requisitos?: string | null,
    fotos?: string | null
}

export async function updatePet({id, name, idade, tipo, porte, descricao, peso, requisitos, fotos}: PetRequest) {
    const token = localStorage.getItem('@token')
    await api.put(`/pet/update/${id}`, {
        name, 
        idade, 
        tipo, 
        porte, 
        descricao, 
        peso, 
        requisitos, 
        fotos
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}