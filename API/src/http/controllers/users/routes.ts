import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { createUser } from "./createUser";
import { listUser } from './listUser'
import { verifyJwt } from "@/lib/verify-jwt";
import { profile } from "./profile";
import { listUserForId } from "./listUserForId";
import { update } from "./update";
import { deleteUser } from "./DeleteUser";

export async function usersRroutes(app: FastifyInstance) {
    app.post('/create', createUser) // criar usuario
    app.post('/sessions', authenticate) // login

    app.put('/update', { onRequest: [verifyJwt]}, update) // update do usuario
    app.delete('/delete', { onRequest: [verifyJwt]}, deleteUser) //Delete o perfil do usuario

    app.get('/list', { onRequest: [verifyJwt]} , listUser) // lista todos os usuarios
    app.get('/list/:id', { onRequest: [verifyJwt]} , listUserForId) // lista usuario por id
    app.get('/me', { onRequest: [verifyJwt]} , profile) // lista o perfil do usuario logado
}