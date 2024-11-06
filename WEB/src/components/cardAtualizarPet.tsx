import { useState } from "react"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { AtualizarPet } from "./atualizarPet"

interface Pet {
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

export function CardAtualizarPet({ pet }: Pet) {
    const [isPetOpen, setPetOpen] = useState(false)

    return (
        <Dialog open={isPetOpen} onOpenChange={setPetOpen}>
            <DialogTrigger asChild>
                <Button className="w-[20rem] h-[15rem] bg-muted-foreground flex flex-col items-center justify-center rounded-[10px]">
                    <img className="w-[18rem] h-[12rem] rounded-[5px]" src={pet.fotos ? pet.fotos : ''} alt={pet.name} />
                    <p className="font-semibold text-[20px] text-muted">{pet.name}</p>
                </Button>
            </DialogTrigger>

            <AtualizarPet id={pet.id} open={isPetOpen}/>
        </Dialog>
    )
}