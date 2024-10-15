import { createBrowserRouter } from "react-router-dom";
import { Home } from "./app/home"
import { SignIn } from "./auth/sign-in";
import { AppLayout } from "./_layouts/app";
import { AuthLayout } from "./_layouts/auth";
import { SignUp } from "./auth/sign-up";

export const routes = createBrowserRouter([
    {
        path: '/', 
        element: <AppLayout />, 
        children: [
            { path: '/', element: <Home /> }
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