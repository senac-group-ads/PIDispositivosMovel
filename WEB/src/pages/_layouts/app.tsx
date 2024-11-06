import { Footer } from "@/components/footer";
import { Link, Outlet } from "react-router-dom";
import { CircleUser } from 'lucide-react'

import Logo from '@/assets/logo.svg'
import { Button } from "@/components/ui/button";
import { Profile } from "@/components/profile";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";

interface user {
    id: string;
    name: string;
    email: string;
    cep: string;
    numero: string;
    contato: string;
    role: string;
    avata: string | null
}

export function AppLayout() {
    const queryClient = useQueryClient()
    let token = localStorage.getItem('@token')

    const profile = queryClient.getQueryData<user>(['profile'])

    return (
        <div className=" min-h-screen ">
            <div className="flex items-center justify-around min-w-full">
                <img src={Logo} alt="Logo" className="w-[5rem] h-[4.3rem]" />

                <div className="flex gap-4 items-center">
                    <Link to={'/'}>Inicio</Link>
                    <Link to={'/sobre'}>Sobre</Link>
                    <Link to={'/queroadotar'}>Pets</Link>
                    <Link to={'/queroajudar'}>Ongs</Link>

                    {
                        token ? 
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="cursor-pointer" >
                                {
                                    profile?.avata ? 
                                    <img src={profile.avata} className="w-[3rem] h-[3rem] rounded-[50%]"/> : 
                                    <CircleUser className="w-[3rem] h-[3rem]" />
                                }
                            </DropdownMenuTrigger>

                            <Profile/>
                        </DropdownMenu> :
                   
                        <div className="space-x-5">
                            <Button asChild>
                                <Link to={'/sign-in'}>ENTRAR</Link>
                            </Button>

                            <Button asChild variant={"outline"} className="border-popover-foreground">
                                <Link to={'/sign-up'}>CADASTRAR</Link>
                            </Button>
                        </div>

                    }
                </div>
            </div>
            
            <div className="min-h-[84.9vh]">
                <Outlet/>
            </div>

            <Footer/>
        </div>
    )
}