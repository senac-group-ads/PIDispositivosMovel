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

const user = {
    nome: 'marcos',
    role: 'ong',
    avata: 'https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png'
}


export function Profile() {
    return (
        <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>
                <Link className="flex items-center space-x-3" to={'/'}>
                    {
                        user.avata ? 
                        <img src={user.avata} className="w-[2rem] h-[2rem] rounded-[50%]" /> :
                        <CircleUser className="w-[2rem]"/>
                    }
                    <p>Marcos Monteiro</p>
                </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                {
                    user.role == 'ong' ? 
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
                    <Button className="bg-destructive hover:bg-destructive/70 w-full" asChild>
                        <Link to={'/'}>
                            SAIR
                        </Link>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent >
    )
}