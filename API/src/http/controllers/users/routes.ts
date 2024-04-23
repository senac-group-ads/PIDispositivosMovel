import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { createUser } from "./createUser";

export async function usersRroutes(app: FastifyInstance) {
    app.post('/create', createUser)
    app.post('/sessions', authenticate)
}