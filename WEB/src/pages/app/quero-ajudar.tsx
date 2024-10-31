import { OngPerfil } from "@/components/ong-perfil";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export function QueroAjudar() {
    return (
        <div className="min-w-full mt-10 mb-5 flex flex-col items-center">
            <Helmet title="Quero Ajudar" />
            <h2 className="font-bold text-[30px]">Ongs parceiras</h2>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 m-4 mt-5 justify-items-center">
                    {
                        listPets.map((listPet) => (
                            <Dialog>
                                <DialogTrigger>
                                    <Button className="w-[20rem] h-[15rem] bg-muted-foreground flex flex-col items-center justify-center rounded-[10px]">
                                        <img className="w-[19rem] rounded-[5px]" src={listPet.fotos} alt={listPet.name} />
                                        <p className="font-semibold text-[20px] text-muted">{listPet.name}</p>
                                    </Button>
                                </DialogTrigger>
                                <OngPerfil/>
                            </Dialog>
                        ))
                    }
                </div>
        </div>
    )
}