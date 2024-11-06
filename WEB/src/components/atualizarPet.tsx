import { useMutation, useQuery } from "@tanstack/react-query";
import { MediaPicker } from "./mediaPicker";
import { DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { getPetId } from "@/api/getPetId";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTrigger 
} from "./ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { deletPet } from "@/api/deletPet";
import { AppErrors } from "@/lib/appErrors";

interface PetId {
    id: string
    open: boolean
}

export function AtualizarPet({ id, open }: PetId) {

    const { data: pet } = useQuery({
        queryKey: ['petByUser', id],
        queryFn: () => getPetId({ id }),
        enabled: open
    })

    const { mutateAsync: delet } = useMutation({
        mutationFn: deletPet
    })

    async function deletarPet(id: string) {
        try {
            await delet(id)
            toast('Pet deletado com sucesso!')
            window.location.reload()
        } catch (err) {
            const isAppError = err instanceof AppErrors
            const title = isAppError ? err.message : 'Não foi possivel continuar...'

            toast.error(title)
        }
    }

    if (!pet) {
        return
    }

    return (
        <DialogContent>
            <form className="grid grid-cols-2 gap-4">
                <MediaPicker photo={pet.fotos} />
                <Input className="col-span-2" id="nome" type="text" placeholder={pet.name ? pet.name : "Nome"}/>
                <Input id="idade" type="text" placeholder={pet.idade ? pet.idade : "Idade"}/>
                <Input id="peso" type="text" placeholder={pet.peso ? pet.peso : "Peso"}/>
                <Input id="porte" type="text" placeholder={pet.porte ? pet.porte : "Porte"}/>
                <Input id="tipo" type="text" placeholder={pet.tipo ? pet.tipo : "Tipo"}/>
                <Textarea className="col-span-2" placeholder={pet.descricao ? pet.descricao : "Descrição"}/>
                <Textarea className="col-span-2" placeholder={pet.requisitos ? pet.requisitos : "Requisitos"}/>
                <Button type="submit">SALVAR</Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button type="button" variant={"outline"} className="border-destructive text-destructive">DELETAR PET</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza que deseja deletar esse pet?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Após confirmar não será possível recuperar o item deletado
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>CANCELAR</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deletarPet(pet.id)}>CONTINUAR</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        </DialogContent>
    )
}