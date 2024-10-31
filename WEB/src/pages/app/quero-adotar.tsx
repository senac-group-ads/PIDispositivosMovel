import { CardPet } from "@/components/cart-pet";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

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