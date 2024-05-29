import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/lib/verify-jwt";

import { createPets } from "./createPets";
import { listPets } from "./listPets";
import { listPetsForId } from "./listPetForId";
import { petAdopted } from "./petAdopted";
import { ImageController } from "../ImageController";
import { listPetsForType } from "./listPetForType";
import { listPetByUser } from "./listPetByUser";
import { deletePet } from "./deletePet";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/create', { onRequest: [verifyJwt] }, createPets)
    app.post('/img', { onRequest: [verifyJwt] }, ImageController)

    app.get('/list', { onRequest: [verifyJwt] }, listPets)
    app.get('/list/:id', { onRequest: [verifyJwt] }, listPetsForId)
    app.get('/listfortype', { onRequest: [verifyJwt] }, listPetsForType)
    app.get('/listbyuser/:costumerId', { onRequest: [verifyJwt] }, listPetByUser)

    app.patch('/adopted/:id', { onRequest: [verifyJwt] }, petAdopted)
    app.delete('/delete/:id', { onRequest: [verifyJwt] }, deletePet)
}