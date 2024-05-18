import { makeListPetsUseCase } from "@/application/use-cases/factories/pets/make-listPets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPets(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const pageSchema = z.object({
            page: z.string()
        })
        const { page } = pageSchema.parse(request.query)
        const pg = parseInt(page)
        const makeListPet = makeListPetsUseCase()

        const pet = await makeListPet.execut(pg)

        return reply.status(200).send({ pet })
    } catch(err) {
        return reply.status(400).send({ message: err })
    }
}