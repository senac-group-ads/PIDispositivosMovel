import { Footer } from "@/components/footer";
import { Link, Outlet } from "react-router-dom";

import Logo from '@/assets/logo.svg'
import { Button } from "@/components/ui/button";

export function AppLayout() {
    return (
        <div className=" min-h-screen ">
            <div className="flex items-center justify-around min-w-full">
                <img src={Logo} alt="Logo" className="w-[5rem] h-[4.3rem]" />

                <div className="flex gap-4 items-center">
                    <Link to={'/'}>Inicio</Link>
                    <Link to={'/sobre'}>Sobre</Link>
                    <Link to={'/queroadotar'}>Pets</Link>
                    <Link to={'/queroajudar'}>Ongs</Link>

                    <Button asChild>
                        <Link to={'/sign-in'}>ENTRAR</Link>
                    </Button>

                    <Button asChild variant={"outline"} className="border-popover-foreground">
                        <Link to={'/sign-up'}>CADASTRAR</Link>
                    </Button>
                </div>
            </div>
            
            <div className="min-h-[84.9vh]">
                <Outlet/>
            </div>

            <Footer/>
        </div>
    )
}