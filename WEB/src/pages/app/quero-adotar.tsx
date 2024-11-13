import { getPet } from "@/api/getPet";
import { CardPet } from "@/components/cart-pet";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export function QueroAdotar() {
    const { data: data } = useQuery({
        queryKey: ['ListPets'],
        queryFn: getPet,
        staleTime: 1000 * 60 * 15, // 15 minutos
        initialData: []
    })

    return (
        <div className="min-w-full mt-10 mb-5 flex flex-col items-center">
            <Helmet title="QueroAdotar" />
            <h2 className="font-bold text-[30px]">Conheça nossos belos companheirinhos</h2>
                {data && (
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 m-4 mt-5 justify-items-center">
                        {
                            data.map((listPet) => {
                            return <CardPet key={listPet.id} pet={listPet}/>
                        })}
                    </div>
                )}
        </div>
    )
}