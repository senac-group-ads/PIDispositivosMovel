import { Skeleton } from "./ui/skeleton";

export function SkeletonOngCard(){
    return (
        Array.from({length: 3}).map(() => {
            return (
                <Skeleton className="w-[20rem] h-[15rem] bg-muted-foreground flex flex-col items-center justify-center rounded-[10px]">
                    <Skeleton className="w-[17rem] h-[10rem] bg-muted/40 mb-4"/>
                    <Skeleton className="w-[17rem] h-[2rem] bg-muted/40"/>
                </Skeleton>
            )
        })
    )
}