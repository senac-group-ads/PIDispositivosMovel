import { CardPet } from "@/components/cart-pet";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

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

export function QueroAdotar() {
    const [pet, setPet] = useState([])
    return (
        <div className="min-w-full mt-10 mb-5 flex flex-col items-center">
            <Helmet title="QueroAdotar" />
            <h2 className="font-bold text-[30px]">Conheça nossos belos companheirinhos</h2>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 m-4 mt-5 justify-items-center">
                    {
                        listPets.map((listPet) => (
                           <CardPet  fotos={listPet.fotos} name={listPet.name} />
                        ))
                    }
                </div>
        </div>
    )
}