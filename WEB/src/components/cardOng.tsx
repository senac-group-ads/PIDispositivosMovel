import { useState } from "react";
import { OngPerfil } from "./ong-perfil";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

import Dog from '@/assets/logo.svg'

interface OngPerfil {
    ong: {
        id: string,
        name: string
        email: string
        cep: string
        numero: string
        contato: string
        role: string
        avata: string | null
    }
}

export function CardOng({ ong }: OngPerfil) {
    const [isOngOpen, setOngOpen] = useState(false)
    return (
        <Dialog open={isOngOpen} onOpenChange={setOngOpen} >
            <DialogTrigger className="w-[20rem] h-[15rem] bg-muted-foreground flex flex-col items-center justify-center rounded-[10px]">
                <img className="w-[19rem] h-[12rem] rounded-[5px]" src={ong.avata ? ong.avata : Dog} />
                <p className="font-semibold text-[20px] text-muted">{ong.name}</p>
            </DialogTrigger>

            <OngPerfil open={isOngOpen} id={ong.id} />
        </Dialog>
    )
}