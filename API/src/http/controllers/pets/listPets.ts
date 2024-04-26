import { makeListPetsUseCase } from "@/application/use-cases/factories/pets/make-listPets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listPets(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const makeListPet = makeListPetsUseCase()

        const pet = await makeListPet.execut()

        return reply.status(200).send({ pet })
    } catch(err) {
        return reply.status(400).send({ message: err })
    }
}