import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";

import Home_img from '@/assets/Home-img.png'
import Pote from '@/assets/pote.svg'
import Osso from '@/assets/osso.svg'
import Pata from '@/assets/pata.svg'
import { Link } from "react-router-dom";

export function Home() {
    return (
       <div className="grid grid-cols-2 items-center">
        <Helmet title="Inicio" />
            <h1 className="text-[4rem] font-bold w-[23.5rem]">
                Adote um pet 
                <img className="w-[4rem] mt-[-4.5rem] ml-[7rem] absolute" src={Pote} alt="Pote" />
                <br/> salve uma vida
                <img className="w-[4rem] mt-[-4.5rem] ml-[10rem] absolute" src={Osso} alt="Osso" />
            </h1>
            <img src={Home_img} alt="Imagem inicial" />
            <div className="col-span-2 mt-10 w-[50rem] border-[1px] bg-muted-foreground/30 border-muted-foreground rounded-[20px] h-[18rem] grid grid-cols-2">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold text-[28px] p-5 text-center">Adotar um pet não muda só a sua vida</h2>
                    <p className="text-[19px] p-5 text-center">Veja ao lado alguns pets em destaques, ou va até a pagina de adotar para ver mais</p>
                </div>
                <div className="border-l-[1px] border-b-[1px] border-muted-foreground flex flex-col justify-center items-center">
                    <img src={Home_img} className="w-[11rem] h-[11rem] mb-2" />
                    <p className="font-semibold">Thanos</p>
                </div>
                <div className="col-start-2 border-l-[1px] border-muted-foreground flex justify-center items-center">
                    <Button asChild className="rounded-[1rem] flex items-center justify-center w-[10rem]">
                        <Link to={'/queroadotar'}>ADOTAR | <img src={Pata} className="ml-4"/> </Link>
                    </Button>
                </div>
            </div>
       </div>
    )
}