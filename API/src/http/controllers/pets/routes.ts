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
import { updatePet } from "./updatePet";

const image = new ImageController()

export async function petsRoutes(app: FastifyInstance) {
    app.post('/create', { onRequest: [verifyJwt] }, createPets)
    app.post('/img', { onRequest: [verifyJwt] }, async (request, reply) => {
        return image.upload(request, reply)
    })

    app.get('/list', listPets)
    app.get('/list/:id', listPetsForId)
    app.get('/listfortype', listPetsForType)
    app.get('/listbyuser/:costumerId', listPetByUser)

    app.patch('/adopted/:id', { onRequest: [verifyJwt] }, petAdopted)
    app.put('/update/:id', { onRequest: [verifyJwt] }, updatePet)
    app.delete('/delete/:id', { onRequest: [verifyJwt] }, deletePet)
}