import { getOngs } from "@/api/getOng";
import { CardOng } from "@/components/cardOng";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export function QueroAjudar() {
    const { data: GetOngs } = useQuery({
        queryKey: ['getOngs'],
        queryFn: getOngs,
        staleTime: 1000 * 60 * 15, // 15 minutos
    })

    return (
        <div className="min-w-full mt-10 mb-5 flex flex-col items-center">
            <Helmet title="Quero Ajudar" />
            <h2 className="font-bold text-[30px]">Ongs parceiras</h2>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 m-4 mt-5 justify-items-center">
                    { GetOngs &&
                        GetOngs.map((ong) => (
                            <CardOng key={ong.id} ong={ong}/>
                        ))
                    }
                </div>
        </div>
    )
}