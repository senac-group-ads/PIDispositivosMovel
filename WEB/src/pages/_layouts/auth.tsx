import { Outlet } from "react-router-dom";

import logo from '@/assets/logo.svg'
import { Footer } from "@/components/footer";

export function AuthLayout() {
    return (
        <div className="min-h-screen flex flex-col justify-between items-center">
            <div className="flex flex-col items-center gap-3">
                <img src={logo} alt=" logo" className="w-[12rem] h-[11rem]" />
                <h1 className="text-[30px] font-[700]">Find a Friend</h1>
                <p className="w-[25rem] text-[20px] text-center font-[400]">Adote um pet ou ajude uma ong e faça um animal feliz!</p>
            </div>
            
            <div>
                <Outlet/>
            </div>

            <Footer/>
        </div>
    )
}