import { api } from "@/lib/axios";

export async function deletPet(id: string) {
    const token = localStorage.getItem('@token')
    await api.delete(`/pet/delete/${id}`, {headers: { Authorization: `Bearer ${token}` }})
}