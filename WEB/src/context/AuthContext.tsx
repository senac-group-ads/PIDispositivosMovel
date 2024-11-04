import { AppErrors } from "@/lib/appErrors"
import { api } from "@/lib/axios"
import { createContext, ReactNode, useEffect } from "react"
import { toast } from "sonner"

type AuthContextDataProps = {
    signOut: () => void
}

type AuthContextProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }:AuthContextProviderProps) {
    async function signOut() {
        try {
            localStorage.removeItem('@token')
            window.location.reload()
        } catch (err) {
            const isAppError = err instanceof AppErrors
            const title = isAppError ? err.message : 'Erro inesperado'
            toast.error(title)
        }
    }

    useEffect(() => {
        const subscribe = api.registerIntercepetTokenMeneger(signOut)

        return () => {
            subscribe()
        }
    }, [signOut])

    return (
        <AuthContext.Provider value={{
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}