import { useQuery } from "@tanstack/react-query";
import { MediaPicker } from "./mediaPicker";
import { DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { getPetId } from "@/api/getPetId";

interface PetId {
    id: string
    open: boolean
}

export function AtualizarPet({ id, open }: PetId) {
    console.log(id)

    const { data: pet } = useQuery({
        queryKey: ['petByUser', id],
        queryFn: () => getPetId({ id }),
        enabled: open
    })

    if (!pet) {
        return
    }

    return (
        <DialogContent>
            <form className="grid grid-cols-2 gap-4">
                <MediaPicker photo={pet.fotos} />
                <Input className="col-span-2" id="nome" type="text" placeholder={pet.name ? pet.name : "Nome"}/>
                <Input id="idade" type="text" placeholder="Idade"/>
                <Input id="peso" type="text" placeholder="Peso"/>
                <Input id="porte" type="text" placeholder="Porte"/>
                <Input id="tipo" type="text" placeholder="Tipo"/>
                <Textarea className="col-span-2" placeholder="Descrição"/>
                <Textarea className="col-span-2" placeholder="Requisitos"/>
            </form>
        </DialogContent>
    )
}