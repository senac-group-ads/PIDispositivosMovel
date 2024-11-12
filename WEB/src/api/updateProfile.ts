import { api } from "@/lib/axios";

interface UpdateProfileRequest {
    name: string
    email: string
    cep: string
    numero: string
    avataBody: string
    contato: string
}

export async function updateProfile({ avataBody, cep, contato, email, name, numero }: UpdateProfileRequest) {
    const token = localStorage.getItem('@token')
    await api.put(`/user/update`, {
        avataBody,
        cep, 
        contato, 
        email,
        name,
        numero
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}