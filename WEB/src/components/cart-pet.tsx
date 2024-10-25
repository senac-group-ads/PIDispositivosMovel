import { PetPerfil } from "./pet-perfil";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

type petSchema = {
    name: string
    fotos: string
}

export function CardPet(listPet: petSchema) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="w-[20rem] h-[15rem] bg-primary flex flex-col items-center justify-center rounded-[10px]">
                    <img className="w-[19rem] rounded-[5px]" src={listPet.fotos} alt={listPet.name} />
                    <p className="font-semibold text-[20px] text-muted">{listPet.name}</p>
                </Button>
            </DialogTrigger>
            <PetPerfil/>
        </Dialog>
    )
}