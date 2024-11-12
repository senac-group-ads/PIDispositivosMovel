import { PetPerfil } from "@/components/pet-perfil"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

type petSchema = {
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
    }
}

export function MiniCardPet({pet}: petSchema) {
    const [ isPetProfileOpen, setPetProfileOpen ] = useState(false)
    return (
        <Dialog open={isPetProfileOpen} onOpenChange={setPetProfileOpen}>
            <DialogTrigger className="flex flex-col justify-center items-center bg-primary rounded-sm w-full h-[5rem]">
                <img className="w-[6rem] h-[3rem]" src={pet.fotos ? pet.fotos : ''} />
                <p className="text-muted-foreground font-bold">{pet.name}</p>
            </DialogTrigger>
            <PetPerfil key={pet.id} open={isPetProfileOpen} petId={pet.id}/>
        </Dialog>
    )
}