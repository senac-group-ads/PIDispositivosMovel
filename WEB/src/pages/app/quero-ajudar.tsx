import { getOngs } from "@/api/getOng";
import { CardOng } from "@/components/cardOng";
import { SkeletonOngCard } from "@/components/skeletonOngCard";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export function QueroAjudar() {
    const { data: GetOngs, isFetching: isOngFetching } = useQuery({
        queryKey: ['getOngs'],
        queryFn: getOngs,
        initialData: []
    })

    return (
        <div className="min-w-full mt-10 mb-5 flex flex-col items-center">
            <Helmet title="QueroAjudar" />
            <h2 className="font-bold text-[30px]">Ongs parceiras</h2>
                { GetOngs &&
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 m-4 mt-5 justify-items-center">
                        { isOngFetching ? <SkeletonOngCard/> :
                            GetOngs.map((ong) => {
                                return <CardOng key={ong.id} ong={ong}/>
                            })}
                    </div>
                }
        </div>
    )
}