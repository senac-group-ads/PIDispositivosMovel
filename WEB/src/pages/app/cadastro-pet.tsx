import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MediaPicker } from "@/components/mediaPicker";
import { Camera } from "lucide-react";
import AddImage from '@/assets/add.png'
import { FormEvent } from "react";
import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { createPet } from "@/api/createPet";
import { AppErrors } from "@/lib/appErrors";
import { toast } from "sonner";

const token = localStorage.getItem('@token')

export function CadastroPet() {
    const { mutateAsync: CreatePet } = useMutation({
        mutationFn: createPet
    })

    async function handleCreatePet(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const fileToUpload = formData.get('coverURL')
        let coverUrl = ''
        if(fileToUpload) {
            const uploadFormData = new FormData()
            uploadFormData.set('file', fileToUpload)

            const upLoadresponse = await api.post('/pet/img', {fileToUpload}, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            coverUrl = upLoadresponse.data
        }

        const name =  formData.get('name')
        const idade =  formData.get('idade')
        const descricao =  formData.get('descricao')
        const tipo =  formData.get('idade')
        const peso =  formData.get('peso')
        const porte =  formData.get('porte')
        const requisitos =  formData.get('requisitos')

        try {
            await CreatePet({
                name,
                idade,
                descricao,
                tipo,
                peso,
                porte,
                requisitos,
                fotos: coverUrl
            })
            toast.success('Pet cadastrado', {duration: 5000})
            window.location.reload()
        } catch (err) {
            const isAppErro = err instanceof AppErrors
            const title = isAppErro ? err.message : 'Pet não cadastrado'
            toast.error(title, {duration: 50000})
        }
    }
    return (
        <div className="flex flex-col justify-center gap-4 items-center pt-10 w-full">
            <Helmet title="Cadastro de pet" />
            <h2 className="font-semibold text-[25px] mb-4">CADASTRAR</h2>
            <p className="font-light text-[16px]">Cadestre aqui um novo pet para adoção</p>

            <form className="flex flex-col w-[50%] gap-4 mb-5" onSubmit={handleCreatePet}>
                <label htmlFor="media" className="flex w-[10rem] items-center flex-col gap-2 cursor-pointer">
                        <MediaPicker photo={AddImage}/>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Camera className="w-4 h-4"/>
                            Editar foto
                        </div>
                </label>
                <Input id="name" name="name" placeholder="Nome:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Input id="idade" name="idade" placeholder="Idade:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" />
                <Input id="peso" name="peso" placeholder="Peso:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" />
                <Input id="tipo" name="tipo" placeholder="Tipo:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" />
                <Textarea id="descricao" name="descricao" placeholder="Cescrição:" className="bg-muted-foreground/40 w-full text-muted-foreground h-[9rem]" />
                <Input id="porte" name="porte" placeholder="Porte:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]" />
                <Textarea id="requisitos" name="requisitos" placeholder="Requisitos:" className="bg-muted-foreground/40 text-muted-foreground h-[9rem]" />
                <Button type="submit" className="w-full h-[3rem]">
                    CADASTRAR
                </Button>
            </form>
        </div>
    )
}