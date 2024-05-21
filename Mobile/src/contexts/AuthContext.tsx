import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { userDTO } from "../dtos/UserDTO";

import { storageUserSave, storageUserGet, storageUserRemove } from "../storage/StorageUser";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "../storage/StorageAuthToken";

import { decodeJwt } from "../utils/decodeJwt";

export type AuthContextDataPropos = {
    user: userDTO;
    signIn: ( email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

export const AuthContext = createContext<AuthContextDataPropos>({} as AuthContextDataPropos)

type AuthContextProviderProps = {
    children: ReactNode
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<userDTO>({} as userDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

    async function UserAndTokenUpdate(user: userDTO, token: string) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser(user)

    } // Salva o token do usuario

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('/user/sessions', { email, password }) //Pega o token 
            const response = await api.get(`/user/me`, {headers: {Authorization:`Bearer ${data.token}`}})

            const apiUser = response.data.user
            
            if (apiUser && data.token) {
                setIsLoadingUserStorageData(true)

                await storageUserSave(apiUser)
                await storageAuthTokenSave(data.token)

                UserAndTokenUpdate(apiUser, data.token)
            }
        } catch(err) {
            throw err;
        } finally {
            setIsLoadingUserStorageData(false)
        }
    } // faz a chamada da api de authenticação e de profile

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true)

            const userLogged = await storageUserGet()
            const token = await storageAuthTokenGet()
    
            if(token && userLogged) {
                UserAndTokenUpdate(userLogged, token)
            }
        } catch(err) {
            throw err
        } finally {
            setIsLoadingUserStorageData(false)
        }
    } // verifica se o usuario ja fez login

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true)
            setUser({} as userDTO)
            await storageUserRemove()
            await storageAuthTokenRemove()
        } catch (err) {
            throw err;
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    useEffect(() => {
        loadUserData()
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            isLoadingUserStorageData
        }}>
            { children }
          </AuthContext.Provider>
    );
}