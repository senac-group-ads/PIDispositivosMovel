import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CadastroPet() {
    return (
        <div className="flex flex-col justify-center gap-4 items-center pt-10 w-full">
            <Helmet title="Cadastro de pet" />
            <h2 className="font-semibold text-[25px] mb-4">CADASTRAR</h2>
            <p className="font-light text-[16px]">Cadestre aqui um novo pet para adoção</p>

            <form className="flex flex-col w-[50%] gap-4 mb-5" action="">
                <Input id="foto" type="file" className="w-[14rem] h-[8rem] bg-muted-foreground/40 leading-[46rem] cursor-pointer"/>
                
                <Input id="nome" placeholder="Nome:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Input id="idade" placeholder="Idade:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Input id="peso" placeholder="Peso:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Input id="tipo" placeholder="Tipo:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Textarea id="descricao" placeholder="Cescrição:" className="bg-muted-foreground/40 w-full text-muted-foreground h-[9rem]"/>
                <Input id="porte" placeholder="Porte:" type="text" className="bg-muted-foreground/40 text-muted-foreground h-[3rem]"/>
                <Textarea id="requisito" placeholder="Requisitos:" className="bg-muted-foreground/40 text-muted-foreground h-[9rem]"/>
                <Button type="submit" className="w-full h-[3rem]">
                    CADASTRAR
                </Button>
            </form>
        </div>
    )
}