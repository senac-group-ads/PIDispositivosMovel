import { createBrowserRouter } from "react-router-dom";

import { Home } from "./app/home"
import { SignIn } from "./auth/sign-in";
import { AppLayout } from "./_layouts/app";
import { AuthLayout } from "./_layouts/auth";
import { SignUp } from "./auth/sign-up";
import { QueroAdotar } from "./app/quero-adotar";
import { QueroAjudar } from "./app/quero-ajudar";
import { CadastroPet } from "./app/cadastro-pet";
import { Atualizarperfil } from "./app/atualizarPerfil";

export const routes = createBrowserRouter([
    {
        path: '/', 
        element: <AppLayout />, 
        children: [
            { path: '/', element: <Home /> },
            { path: '/queroadotar', element: <QueroAdotar /> },
            { path: '/queroajudar', element: <QueroAjudar /> },
            { path: '/cadastropet', element: <CadastroPet /> },
            { path: '/atualizarperfil', element: <Atualizarperfil /> },
        ]
    },
    {
        path: '/', 
        element: <AuthLayout/>,
        children: [
            { path: '/sign-in', element: <SignIn/> },
            { path: '/sign-up', element: <SignUp/> }
        ]
    }
])