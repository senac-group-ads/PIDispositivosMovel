import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

import Dog from '@/assets/logo.svg'
import { PetPerfil } from "./pet-perfil";
import { useQuery } from "@tanstack/react-query";
import { getPetByUser } from "@/api/getPetByUser";
import { useState } from "react";
import { getOngId, OngResponse } from "@/api/getOngId";
import { Loader2 } from "lucide-react";

interface OngProfile {
    id: string
    open: boolean
}

export function OngPerfil({ id, open }: OngProfile) {
    const [ isPetProfileOpen, setPetProfileOpen ] = useState(false)

    const { data: ong, isLoading: ongLoad, isFetching: ongFething } = useQuery<OngResponse>({
        queryKey: ['ongId'],
        queryFn: () => getOngId(id),
        enabled: open
    })

    const { data: pets } = useQuery({
        queryKey: ['petByOng'],
        queryFn: () => getPetByUser( id ),
        initialData: [],
        enabled: open,
    })

    return (
        <DialogContent className="w-full">
            {ongFething && (
                <Loader2/>
            )}
            {ongLoad && <Loader2 />}
            {ong && (
                <Table className="flex flex-col items-center">
                    <img src={ong.avata ? ong.avata : Dog} className="w-[8rem]" />
                    <TableBody>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Nome:</TableCell>
                            <TableCell className="flex">{ong.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Enail:</TableCell>
                            <TableCell className="flex ">{ong.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Contato:</TableCell>
                            <TableCell className="flex ">{ong.contato}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">Nº:</TableCell>
                            <TableCell className="flex ">{ong.numero}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="w-20 text-muted-foreground">cep:</TableCell>
                            <TableCell className="flex ">{ong.cep}</TableCell>
                        </TableRow>

                        <div className="grid grid-cols-2 gap-5">
                            <h3 className="col-span-2 text-muted-foreground text-[15px]">Alguns dos pets cadastrados por esta Ong</h3>
                            {
                                pets.slice(0, 4).map((pet: any) => (
                                    <Dialog open={isPetProfileOpen} onOpenChange={setPetProfileOpen}>
                                        <DialogTrigger className="flex flex-col justify-center items-center bg-primary rounded-sm w-full h-[5rem]">
                                            <img className="w-[5rem]" src={pet.fotos ? pet.fotos : ''} />
                                            <p className="text-muted-foreground font-bold">{pet.name}</p>
                                        </DialogTrigger>
                                        <PetPerfil open={isPetProfileOpen} petId={pet.id}/>
                                    </Dialog>
                                ))
                            }
                        </div>
                    </TableBody>
                </Table>

            )}
        </DialogContent>
    )
}