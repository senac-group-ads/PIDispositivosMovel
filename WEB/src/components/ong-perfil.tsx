import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { DialogContent } from "./ui/dialog";

import Dog from '@/assets/logo.svg'
import { useQuery } from "@tanstack/react-query";
import { getPetByUser } from "@/api/getPetByUser";
import { getOngId, OngResponse } from "@/api/getOngId";
import { Loader2 } from "lucide-react";
import { MiniCardPet } from "@/api/miniCardPet";
import { SkeletonPetMiniCard } from "./skeletonPetMiniCard";

interface OngProfile {
    id: string
    open: boolean
}

export function OngPerfil({ id, open }: OngProfile) {
    const { data: ong, isLoading: ongLoad} = useQuery<OngResponse>({
        queryKey: ['ongId', id],
        queryFn: () => getOngId(id),
        staleTime: 1000 * 60 * 15, // 15 minutos
        enabled: open
    })

    const { data: pets, isFetching: isPetFetching } = useQuery({
        queryKey: ['petByOng'],
        queryFn: () => getPetByUser( id ),
        initialData: [],
        enabled: open
    })

    return (
        <DialogContent className="w-full">
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
                            <TableCell className="w-20 text-muted-foreground">Email:</TableCell>
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
                            { isPetFetching ? <SkeletonPetMiniCard /> :
                                pets.slice(0, 4).map((pet: any) => {
                                    return <MiniCardPet key={pet.id} pet={pet} />
                                })
                            }
                        </div>
                    </TableBody>
                </Table>

            )}
        </DialogContent>
    )
}