import { useQuery } from '@tanstack/react-query'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { getPet } from '@/api/getPet'

export function CarouselPet() {
    const { data: pet } = useQuery({
        queryKey: ['ListPet'],
        queryFn: getPet,
        staleTime: Infinity,
        initialData: []
    })
    
    return (
        <Carousel plugins={[
            Autoplay({
                delay:4000,
            })
        ]}>
            <CarouselContent>
                {
                    pet.slice(0, 4).map((pet: any) => (
                        <CarouselItem key={pet.id} className='flex flex-col justify-center items-center'>
                            <img src={pet.fotos ? pet.fotos : '' } alt={pet.name} className="w-[11rem] h-[11rem] mb-2" />
                            <p className="font-semibold">{pet.name}</p>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
        </Carousel>
    )
}