import { useMutation, useQuery } from "@tanstack/react-query";
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
import { Controller, useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";
import { api } from "@/lib/axios";
import { updatePet } from "@/api/updatePet";

interface PetId {
    id: string
    open: boolean
}

const petSchema = z.object({
    name: z.string(),
    idade: z.string(),
    peso: z.string(),
    descricao: z.string(),
    porte: z.string(),
    requisitos: z.string(),
    tipo: z.string(),
    fotos: z.any()
})

type PetSchema = z.infer<typeof petSchema>

export function AtualizarPet({ id, open }: PetId) {
    const { data: pet } = useQuery({
        queryKey: ['petByUser', id],
        queryFn: () => getPetId({ id }),
        enabled: open
    })

    const { register, handleSubmit, control } = useForm<PetSchema>({
        resolver: zodResolver(petSchema),
        values: {
            name: pet?.name ?? '',
            idade: pet?.idade ?? '',
            peso: pet?.peso ?? '',
            descricao: pet?.descricao ?? '',
            porte: pet?.porte ?? '',
            requisitos: pet?.requisitos ?? '',
            tipo: pet?.tipo ?? '',
            fotos: pet?.fotos ?? ''
        }
    })

    const [ previw, setPreview ] = useState<string | null | undefined >(pet?.fotos)

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

    const { mutateAsync: petUpdate } = useMutation({
        mutationFn: updatePet
    })

    if (!pet) {
        return
    }

    async function handlePetSubmit(data: PetSchema) {
       try {
            const token = localStorage.getItem('@token')
            const foto = data.fotos
            const response = await api.post('/pet/img', {foto}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            await petUpdate({
                id: pet?.id ?? '',
                name: data.name,
                idade: data.idade,
                descricao: data.descricao,
                fotos: response.data,
                peso: data.peso,
                porte: data.porte,
                requisitos: data.requisitos,
                tipo: data.tipo

            })
            toast.success('Pet Atualizado!', {
                duration: 5000
            })
            // window.location.reload()
       } catch (err) {
        const isAppError = err instanceof AppErrors
        const title = isAppError ? err.message : 'Erro de atualização'
        toast.error(title)
       }
    }


    return (
        <DialogContent>
            <form onSubmit={handleSubmit(handlePetSubmit)} className="grid grid-cols-2 gap-4">
                <Controller
                    control={control}
                    name={"fotos"}
                    render={({ field: { value, onChange, ...field }}) => {
                        return (
                            <label htmlFor="foto" className="cursor-pointer">
                                <Input
                                    {...field}
                                    value={value?.fileName}
                                    type="file"
                                    id="foto"
                                    name="fotos"
                                    className="invisible h-0 w-0"
                                    onChange={(e) => {
                                        if(e.target.files) {
                                            const previewUrl = URL.createObjectURL(e.target.files[0])
                                            setPreview(previewUrl)
                                            onChange(e.target.files[0])
                                        }
                                    }}
                                />{ previw && (
                                    <img className="w-[10rem] h-[10rem]" src={previw ?? pet.fotos}/>
                                )
                                }
                            </label>
                        )
                    }}
                />
                <Input className="col-span-2" id="name" type="text" {...register('name')} />
                <Input id="idade" type="text" {...register('idade')} />
                <Input id="peso" type="text" {...register('peso')}/>
                <Input id="porte" type="text" {...register('porte')}/>
                <Input id="tipo"  type="text" {...register('tipo')}/>
                <Textarea id="descricao"  className="col-span-2" {...register('descricao')}/>
                <Textarea id="requisitos" className="col-span-2" {...register('requisitos')}/>
                <Button className="col-span-2" type="submit">SALVAR</Button>

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
                <Button type="button" variant={"outline"} className="border-muted-foreground">Pet adotado</Button>
            </form>
        </DialogContent>
    )
}