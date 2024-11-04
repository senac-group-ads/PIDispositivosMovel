import { MediaPicker } from "@/components/MediaPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

export function Atualizarperfil() {
    return (
        <div className="flex flex-col items-center gap-4 justify-center pt-10 w-full">
            <form className="flex flex-col w-[50%] gap-4 mb-5" action="">
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

                <Input id="nome" placeholder="Nome:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Input id="email" placeholder="E-mail:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Input id="contato" placeholder="Contato:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Input id="cep" placeholder="Cep:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Input id="numero" placeholder="Numero:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Button type="submit" className="w-full h-[3rem]">
                    ATUALIZAR
                </Button>
            </form>
        </div>
    )
}