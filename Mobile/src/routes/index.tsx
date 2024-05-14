import { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"

import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes"
import { AuthContext } from "../contexts/AuthContext"

export function Routes() {
    
    const contextData = useContext(AuthContext)

    return (
        <NavigationContainer>
            <AuthRoutes />
        </NavigationContainer>
    )
}