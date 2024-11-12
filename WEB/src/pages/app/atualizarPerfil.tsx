import { OngResponse } from "@/api/getOngId";
import { getPetByUser } from "@/api/getPetByUser";
import { CardAtualizarPet } from "@/components/cardAtualizarPet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppErrors } from "@/lib/appErrors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { api } from "@/lib/axios";
import { updateProfile } from "@/api/updateProfile";
import { useNavigate } from "react-router-dom";

const updateUser = z.object({
    name: z.string(),
    email: z.string().email(),
    contato: z.string(),
    cep: z.string(),
    numero: z.string(),
    avata: z.any()
})

type UpdateUset = z.infer<typeof updateUser>

export function Atualizarperfil() {
    const queryClient = useQueryClient()
    
    const data = queryClient.getQueryData<OngResponse>(['profile'])
    
    const [ previw, setPreview ] = useState<string | null | undefined >(data?.avata)

    const { register, handleSubmit, control, formState: { isSubmitted }} = useForm<UpdateUset>({
        resolver: zodResolver(updateUser),
        values: {
            cep: data?.cep ?? '',
            contato: data?.contato ?? '',
            email: data?.email ?? '',
            name: data?.name ?? '',
            numero: data?.numero ?? '',
            avata: data?.avata ?? previw
        }
    })
    if (!data) {
        return
    }

    const navigate = useNavigate()

    const { data: pets } = useQuery({
        queryKey: ['petByOng'],
        queryFn: () => getPetByUser( data.id ),
    })

    const { mutateAsync: updateUserProfile } = useMutation({
        mutationFn: updateProfile
    })

    async function handleUpdateUser({ cep, contato, email, name, numero, avata }: UpdateUset) {
        try {
            const token = localStorage.getItem('@token')
            const response = await api.post('/pet/img', {avata}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            await updateUserProfile({
                cep,
                contato,
                email,
                name,
                numero,
                avataBody: response.data
            })

            toast.success('Perfil atualizado!')

            navigate('/')
        } catch (err) {
            const isAppError = err instanceof AppErrors
            const title = isAppError ? err.message : 'Falha na atualização'
            toast.error(title)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 justify-center pt-10 w-full">
            <form className="flex flex-col w-[50%] gap-4 mb-5" onSubmit={handleSubmit(handleUpdateUser)}>
            <Controller
                    control={control}
                    name={"avata"}
                    render={({ field: { value, onChange, ...field }}) => {
                        return (
                            <label htmlFor="foto" className="cursor-pointer w-[10rem] h-[10rem] mb-5">
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
                                    <img className="w-[10rem] h-[10rem]" src={previw ?? data.avata}/>
                                )
                                }
                            </label>
                        )
                    }}
                />

                <Input id="name" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("name")} />
                <Input id="email" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("email")}/>
                <Input id="contato" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("contato")}/>
                <Input id="cep" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("cep")}/>
                <Input id="numero" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("numero")}/>
                <Button type="submit" className="w-full h-[3rem]">
                    ATUALIZAR
                </Button>
            </form>
            <div className="grid grid-cols-3 gap-5 justify-items-center mb-5">
                {pets && (
                    pets.map((pet) => (
                        <CardAtualizarPet key={pet.id} pet={pet} />
                    ))
                )}
            </div>
        </div>
    )
}