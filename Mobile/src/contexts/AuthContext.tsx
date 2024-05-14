import { createContext } from "react";
import { userDTO } from "../dtos/UserDTO";

export type AuthContextDataPropos = {
    user: userDTO
}

export const AuthContext = createContext<AuthContextDataPropos>({} as AuthContextDataPropos)