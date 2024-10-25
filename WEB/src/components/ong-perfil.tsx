import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

import Dog from '@/assets/logo.svg'
import { Button } from "./ui/button";
import { PetPerfil } from "./pet-perfil";

const listPets = [
    {
        id: "f1v3gjhi8iake0800eq7vt6a",
        name: "toto 2",
        idade: "1 ano",
        peso: "20 kg",
        porte: "grande",
        tipo: "Cachorro",
        descricao: "Um lindo e grande dog preto e branco e cheio de amor pra dar.",
        requisitos: "Ter lucar espaçoso",
        fotos: "https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png",
        userId: "hr84i3xjfohzgi6s9zhijo4m",
        adotado: false
    },
    {
        id: "f1v3gjhi8iake0800eq7vt6a",
        name: "toto 2",
        idade: "1 ano",
        peso: "20 kg",
        porte: "grande",
        tipo: "Cachorro",
        descricao: "Um lindo e grande dog preto e branco e cheio de amor pra dar.",
        requisitos: "Ter lucar espaçoso",
        fotos: "https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png",
        userId: "hr84i3xjfohzgi6s9zhijo4m",
        adotado: false
    },
    {
        id: "f1v3gjhi8iake0800eq7vt6a",
        name: "toto 2",
        idade: "1 ano",
        peso: "20 kg",
        porte: "grande",
        tipo: "Cachorro",
        descricao: "Um lindo e grande dog preto e branco e cheio de amor pra dar.",
        requisitos: "Ter lucar espaçoso",
        fotos: "https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png",
        userId: "hr84i3xjfohzgi6s9zhijo4m",
        adotado: false
    },
    {
        id: "f1v3gjhi8iake0800eq7vt6a",
        name: "toto 2",
        idade: "1 ano",
        peso: "20 kg",
        porte: "grande",
        tipo: "Cachorro",
        descricao: "Um lindo e grande dog preto e branco e cheio de amor pra dar.",
        requisitos: "Ter lucar espaçoso",
        fotos: "https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png",
        userId: "hr84i3xjfohzgi6s9zhijo4m",
        adotado: false
    },
    {
        id: "f1v3gjhi8iake0800eq7vt6a",
        name: "toto 2",
        idade: "1 ano",
        peso: "20 kg",
        porte: "grande",
        tipo: "Cachorro",
        descricao: "Um lindo e grande dog preto e branco e cheio de amor pra dar.",
        requisitos: "Ter lucar espaçoso",
        fotos: "https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png",
        userId: "hr84i3xjfohzgi6s9zhijo4m",
        adotado: false
    },
    {
        id: "f1v3gjhi8iake0800eq7vt6a",
        name: "toto 2",
        idade: "1 ano",
        peso: "20 kg",
        porte: "grande",
        tipo: "Cachorro",
        descricao: "Um lindo e grande dog preto e branco e cheio de amor pra dar.",
        requisitos: "Ter lucar espaçoso",
        fotos: "https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png",
        userId: "hr84i3xjfohzgi6s9zhijo4m",
        adotado: false
    }
]

export function OngPerfil() {
    return (
        <DialogContent className="w-full">
            <Table className="flex flex-col items-center">
                <img src={Dog} className="w-[8rem]" />
                <TableBody>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Nome:</TableCell>
                        <TableCell className="flex">Toto</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Enail:</TableCell>
                        <TableCell className="flex ">marcos.moliveira@outlook.com</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Contato:</TableCell>
                        <TableCell className="flex ">21 99988-7722</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">Nº:</TableCell>
                        <TableCell className="flex ">16</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-20 text-muted-foreground">cep:</TableCell>
                        <TableCell className="flex ">26170330</TableCell>
                    </TableRow>

                    <div className="grid grid-cols-2 gap-5">
                        <h3 className="col-span-2 text-muted-foreground text-[15px]">Alguns dos pets cadastrados por esta Ong</h3>
                        {
                            listPets.slice(0, 4).map((pet) => (
                                <Dialog>
                                    <DialogTrigger>
                                        <Button className="flex flex-col justify-center items-center bg-primary rounded-sm w-full h-[5rem]">
                                            <img className="w-[5rem]" src={pet.fotos} />
                                            <p>{pet.name}</p>
                                        </Button>
                                    </DialogTrigger>
                                    <PetPerfil/>
                                </Dialog>
                            ))
                        }
                    </div>
                </TableBody>
            </Table>
        </DialogContent>
    )
}