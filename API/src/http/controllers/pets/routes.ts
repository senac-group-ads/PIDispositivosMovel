import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/lib/verify-jwt";

import { createPets } from "./createPets";
import { listPets } from "./listPets";
import { listPetsForId } from "./listPetForId";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/create', { onRequest: [verifyJwt] }, createPets)

    app.get('/list', { onRequest: [verifyJwt] }, listPets)
    app.get('/list/:id', { onRequest: [verifyJwt] }, listPetsForId)
}