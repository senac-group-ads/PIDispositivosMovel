import { MediaPicker } from "@/components/MediaPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppErrors } from "@/lib/appErrors";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateUser = z.object({
    nome: z.string(),
    email: z.string().email(),
    contato: z.string(),
    cep: z.string(),
    numero: z.string()
})

type UpdateUset = z.infer<typeof updateUser>

export function Atualizarperfil() {
    const { register, handleSubmit, formState: { isSubmitted }} = useForm<UpdateUset>()

    async function handleUpdateUser({ cep, contato, email, nome, numero }: UpdateUset) {
        try {
            console.log(cep, contato, email, nome, numero)
        } catch (err) {
            const isAppError = err instanceof AppErrors
            const title = isAppError ? err.message : 'Falha na atualização'
            toast.error(title)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 justify-center pt-10 w-full">
            <form className="flex flex-col w-[50%] gap-4 mb-5" onSubmit={handleSubmit(handleUpdateUser)}>
                <label 
                htmlFor="media"
                className="flex items-center flex-col gap-2 cursor-pointer"
                >
                    <MediaPicker photo={'https://github.com/MarcosMOliveiradev.png'}/>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Camera className="w-4 h-4"/>
                        Editar foto
                    </div>
                </label>

                <Input id="nome" placeholder="Nome:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("nome")} />
                <Input id="email" placeholder="E-mail:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("email")}/>
                <Input id="contato" placeholder="Contato:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("contato")}/>
                <Input id="cep" placeholder="Cep:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("cep")}/>
                <Input id="numero" placeholder="Numero:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" {...register("numero")}/>
                <Button type="submit" className="w-full h-[3rem]">
                    ATUALIZAR
                </Button>
            </form>
        </div>
    )
}