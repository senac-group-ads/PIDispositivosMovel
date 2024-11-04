import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "./ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "./ui/table";
import { useLocation } from 'react-router-dom'

import Dog from '@/assets/logo.svg'
import { OngPerfil } from "./ong-perfil";
import { useQuery } from "@tanstack/react-query";
import { getPetId } from "@/api/getPetId";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface IPet {
    petId: string,
    open: boolean
}

export function PetPerfil({ petId, open }: IPet) {
    const local = useLocation()
    const [ isOngOpen, setOngOpen ] = useState(false)

    const { data: petProfile, isFetching: isFetchingPetProfile } = useQuery({
        queryKey: ['petProfile', petId],
        queryFn: () => getPetId({id: petId}),
        enabled: open
    })
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex flex-col items-center">
                    {isFetchingPetProfile && (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                </DialogTitle>
            </DialogHeader>
            {petProfile && (
                <Table className="flex flex-col items-center">
                    <img src={petProfile?.fotos? petProfile.fotos : Dog} className="w-[8rem]" />
                    <TableBody>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Nome:</TableCell>
                            <TableCell className="flex">{petProfile?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Idade:</TableCell>
                            <TableCell className="flex ">{petProfile?.idade}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Peso:</TableCell>
                            <TableCell className="flex ">{petProfile?.peso}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Porte:</TableCell>
                            <TableCell className="flex ">{petProfile?.porte}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Descrição:</TableCell>
                            <TableCell className="flex ">{petProfile?.descricao}</TableCell>
                        </TableRow>
                    </TableBody>
                    {
                        local.pathname === '/queroajudar' ? 
                        <div></div> :
                        <TableFooter>
                            <Dialog open={isOngOpen} onOpenChange={setOngOpen}>
                                <DialogTrigger asChild>
                                    <Button>QUERO ADOTAR</Button>
                                </DialogTrigger>
                                <OngPerfil id={petProfile.userId} open={isOngOpen}/>
                            </Dialog>
                        </TableFooter>
                    }
                </Table>
            )}
        </DialogContent>
    )
}