import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/lib/verify-jwt";

import { authenticate } from "./authenticate";
import { createUser } from "./createUser";
import { listUser } from './listUser'
import { profile } from "./profileUser";
import { listUserForId } from "./listUserForId";
import { update } from "./updateUser";
import { deleteUser } from "./DeleteUser";
import { ImageController } from "../ImageController";
import { listUserOng } from "./listOng";
import { patchAvataPicture } from "./patchAvataPicture";

export async function usersRroutes(app: FastifyInstance) {
    app.post('/create', createUser) // criar usuario
    app.post('/sessions', authenticate) // login
    app.post('/img', ImageController)

    app.put('/update', { onRequest: [verifyJwt]}, update) // update do usuario
    app.patch('/avata', { onRequest: [verifyJwt]}, patchAvataPicture)
    app.delete('/delete', { onRequest: [verifyJwt]}, deleteUser) //Delete o perfil do usuario

    app.get('/list', { onRequest: [verifyJwt]} , listUser) // lista todos os usuarios
    app.get('/list/:id', { onRequest: [verifyJwt]} , listUserForId) // lista usuario por id
    app.get('/me', { onRequest: [verifyJwt]} , profile) // lista o perfil do usuario logado
    app.get('/list/ong', { onRequest: [verifyJwt]}, listUserOng)
}