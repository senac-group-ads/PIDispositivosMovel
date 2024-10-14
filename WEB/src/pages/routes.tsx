import { createBrowserRouter } from "react-router-dom";
import { Home } from "./app/home"
import { SignIn } from "./auth/sign-in";
import { AppLayout } from "./_layouts/app";
import { AuthLayout } from "./_layouts/auth";

export const routes = createBrowserRouter([
    {
        path: '/', 
        element: <AppLayout />, 
        children: [
            { path: '/', element: <Home /> }
        ]
    },
    {
        path: '/sign-in', 
        element: <AuthLayout/>,
        children: [
            { path: '/sign-in', element: <SignIn/> }
        ]
    }
])