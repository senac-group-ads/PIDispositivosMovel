import { Link } from "react-router-dom";
import { 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuGroup 
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { CircleUser } from 'lucide-react'
import { useQuery } from "@tanstack/react-query";
import { profile } from "@/api/profile";

export function Profile() {

    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: profile,
        staleTime: Infinity
    })

    function signOut() {
        localStorage.removeItem('@token')
        window.location.reload()
    }

    return (
        <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>
                <Link className="flex items-center space-x-3" to={'/atualizarperfil'}>
                    {
                        data?.avata ? 
                        <img src={data.avata} className="w-[2rem] h-[2rem] rounded-[50%]" /> :
                        <CircleUser className="w-[2rem]"/>
                    }
                    <p>{data?.name}</p>
                </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                {
                    data?.role == 'ong' ? 
                    <DropdownMenuItem>
                        <Button variant={"outline"} className="border-blue-700 dark:border-blue-300 w-full" asChild>
                            <Link to={'/cadastropet'}>
                                Cadastrar novo pet
                            </Link>
                        </Button>
                    </DropdownMenuItem> : 
                    <div></div>
                }
                <DropdownMenuItem>
                    <Button onClick={signOut} className="bg-destructive hover:bg-destructive/70 w-full">
                        SAIR
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent >
    )
}