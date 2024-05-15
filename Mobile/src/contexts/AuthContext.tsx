import { ReactNode, createContext, useState } from "react";
import { api } from "../services/api";
import { userDTO } from "../dtos/UserDTO";

export type AuthContextDataPropos = {
    user: userDTO;
    signIn: ( email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataPropos>({} as AuthContextDataPropos)

type AuthContextProviderProps = {
    children: ReactNode
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<userDTO>({} as userDTO);

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('/user/sessions', { email, password })
            
            const [headerEncoded, payloadEncoded] = data.token.split('.');
            const payload = JSON.parse(atob(payloadEncoded));

            if (payload) {
                setUser(payload)
            }
        } catch(err) {
            throw err;
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            { children }
          </AuthContext.Provider>
    );
}