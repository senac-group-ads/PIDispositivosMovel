import { Skeleton } from "./ui/skeleton";

export function SkeletonPetMiniCard(){
    return (
        Array.from({length: 4}).map(() => {
            return (
                <Skeleton className="flex flex-col justify-center items-center bg-primary rounded-sm w-full h-[5rem]">
                    <Skeleton className="w-[6rem] h-[3rem] bg-primary/50"/>
                </Skeleton>
            )
        })
    )
}