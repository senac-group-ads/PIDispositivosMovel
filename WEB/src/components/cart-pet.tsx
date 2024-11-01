import { useState } from "react";
import { PetPerfil } from "./pet-perfil";
import { Dialog, DialogTrigger } from "./ui/dialog";

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

export function CardPet({ pet }: petSchema) {
    const [ isPetProfileOpen, setPetProfileOpen ] = useState(false)
    return (
        <Dialog open={isPetProfileOpen} onOpenChange={setPetProfileOpen}>
            <DialogTrigger className="w-[20rem] h-[15rem] bg-primary flex flex-col items-center justify-center rounded-[10px]">
                <img className="w-[18rem] h-[12rem] rounded-[5px]" src={pet.fotos ? pet.fotos : ''} alt={pet.name} />
                <p className="font-semibold text-[20px] text-muted">{pet.name}</p>
            </DialogTrigger >

            <PetPerfil open={isPetProfileOpen} petId={pet.id}/>
        </Dialog>
    )
}