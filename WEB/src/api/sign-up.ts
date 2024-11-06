import { api } from "@/lib/axios"

export interface SignUpRequest {
    name: string
    password: string
    email: string
    cep: string
    numero: string
    contato: string
    roleBody: string
    avata?: string | null
}

export interface SignUpResponse {
    user: {
        id: string
        name: string
        email: string
        cep: string
        numero: string
        contato: string
        roleBody: string
        avata?: string | null
    }
}

export async function signUp( { avata, cep, contato, email, name, numero, password, roleBody }: SignUpRequest ) {
    await api.post<SignUpResponse>('/user/create', {
        avata,
        cep,
        contato,
        email,
        name,
        numero,
        password,
        roleBody
    })
}