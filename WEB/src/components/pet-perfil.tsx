import { Button } from "./ui/button";
import { DialogContent } from "./ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "./ui/table";

import Dog from '@/assets/logo.svg'

export function PetPerfil() {
    return (
        <DialogContent>
            <Table className="flex flex-col items-center">
                <img src={Dog} className="w-[8rem]" />
                <TableBody>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Nome:</TableCell>
                        <TableCell className="flex">Toto</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Idade:</TableCell>
                        <TableCell className="flex ">1 ano</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Peso:</TableCell>
                        <TableCell className="flex ">20 kg</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Porte:</TableCell>
                        <TableCell className="flex ">Grande</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Descrição:</TableCell>
                        <TableCell className="flex ">As fontes de tamanho normal podem ajudá-lo a transmitir seu tom e suas emoções, mas e se você simplesmente não conseguir conter o que sente da maneira normal? Para essas ocasiões, use o gerador de texto grande. Gere palavras tão grandes quanto seus sentimentos ou personalidade em um instante.</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <Button>QUERO ADOTAR</Button>
                </TableFooter>
            </Table>
        </DialogContent>
    )
}